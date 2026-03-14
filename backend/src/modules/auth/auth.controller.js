// const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../../config/mail');

const User = require('../users/user.model');
const Ticket = require('../tickets/ticket.model')
const Quote = require('../quotes/quote.model')
const AccessLog = require('../visitors/visitor.model')


//==============REGISTER USER===============
const registerUser = async(req, res) => {
    try{
        const{name, email, password, repassword, contact, gender, role } = req.body;

        if(!name || !email || !password || !repassword || !contact || !gender ) {
        return res.status(400).json({ message: "All fields are required" })
        }

        if(password !== repassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(409).json({ message: "User already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
            gender,
            role: "user"
        })

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                id:user._id,
                name:user.name,
                role: user.role
            }
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server Error" })
    }
}

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await loginLogic(email, password);

        // if(!email || !password) {
        //     return res.status(400).json({ message: "Email and password are required" })
        // }

        // const user = await User.findOne({email}).select("+password");
        // if(!user) {
        //     return res.status(401).json({message: "Invalid credentials"})
        // }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch) {
        //     return res.status(401).json({message: "Invalid credentials"});
        // }

        const token = jwt.sign(
            {
            id: user._id,
            role: user.role.toLowerCase()
            },
            process.env.JWT_SECRET, {expiresIn : "7d"}
        )

        return res.status(200).json({message: "Login Successfully",
            token,
            user: {
            id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        });
    }
    catch(err) {
        if (err.message === "Invalid credentials" ||
            err.message === "Email and password are required") {

            return res.status(401).json({
                message: err.message
            });
        }

        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

const loginAdmin = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await loginLogic(email, password);

        if(user.role.toLowerCase() !== "admin"){
            return res.status(403).json({message: "Access Denied Only Admin can access"});
        }

          const token = jwt.sign(
            {
            id: user._id,
            role: user.role.toLowerCase()
            },
            process.env.JWT_SECRET, {expiresIn : "7d"}
        )

        res.status(200).json({
            message: "Admin login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
         if (err.message === "Invalid credentials") {
        return res.status(401).json({ message: err.message });
    }

    res.status(500).json({ message: "Server Error" });
    }
}


const loginLogic = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
};

//Send OTP
const sendOtp = async (req, res) => {
    try {
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
        }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email not registered" });

    //Generate a 4 digit otp
    const otp = Math.floor(1000 + Math.random() * 9000);

    // bcrypt expects string - toString()
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    user.otp = hashedOtp;

    // Save OTP and expiry in the user document
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save({ validateBeforeSave: false });
    

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code is",
            text: `Your OTP from CRM system is ${otp}. It will expire in 5 minutes.`,
        })
        res.json({ message: "OTP sent to your email!" });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error sending OTP" });
    }
}

// 2️⃣ Verify OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email }).select("+otp");
    if (!user) return res.status(404).json({ message: "Email not registered" });

    if (!user.otp) return res.status(400).json({ message: "No OTP found. Request a new one." });

    if (Date.now() > user.otpExpiry) return res.status(400).json({ message: "OTP expired" });

    const isValid = await bcrypt.compare(otp.toString(), user.otp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "OTP verified" });

};


// 3️⃣ Reset Password
const resetPassword = async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmPassword)
        return res.status(400).json({ message: "All fields are required" });

    if (newPassword !== confirmPassword)
        return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findOne({ email }).select("+otp");
    if (!user) return res.status(404).json({ message: "Email not registered" });

    if (!user.otp) return res.status(400).json({ message: "No OTP found. Request a new one." });

    if (Date.now() > user.otpExpiry) return res.status(400).json({ message: "OTP expired" });

    const isValid = await bcrypt.compare(otp.toString(), user.otp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save({ validateBeforeSave: false });

    res.json({ message: "Password reset successfully" });
};



const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }
//     console.log("Entered:", currentPassword);
// console.log("Hash:", user.password);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    // console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be same as current password"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; 
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword
};
const express = require('express');
const router = express.Router();


const {registerUser, loginUser, loginAdmin, sendOtp, verifyOtp, resetPassword, changePassword } = require('./auth.controller');
const { protect, isUser } = require('../../middleware/authMiddleware');



// const { createTicket} = require('../controller/adminController');

// router.get('/admindashboard', protect, isAdmin, (req,res) => {
//     res.json({message: "Welcome Admin",  admin: req.user.name})
// })

// router.get('/admindashboard', protect, isAdmin, adminDashboard);

router.get('/userdashboard', protect, isUser, (req,res) => {
    res.json({
        success: true,
        data: {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', loginAdmin);

router.post("/forgotpassword", sendOtp);      // Step 1: send OTP
router.post("/verifyotp", verifyOtp);         // Step 2: verify OTP
router.post("/resetpassword", resetPassword); // Step 3: reset password

router.put("/changepassword", protect, changePassword);

// router.post("/ticket", createTicket);


module.exports=router;
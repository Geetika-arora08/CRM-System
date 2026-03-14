// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware'); // JWT verifies here
// const User = require('../models/User');


// router.get('/userdashboard', protect, async (req,res) => {
//     try {
//          // Find user by ID from JWT payload
//         const user = await User.findById(req.user._id).select('-password');

//         // If user not found
//         if(!user) { 
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.json({
//             success: true,
//             data: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             }
//         });
//     }
//     catch (err) {
//         console.log("Error fetching user dashboard:" ,err.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();

const { protect, isUser } = require("../../middleware/authMiddleware");
const userController = require("./user.controller");
const User = require("../users/user.model");

router.get(
  "/userdashboard",
  protect,
  userController.userdashboard
);

router.put("/profile", protect, isUser, async (req, res) => {
  try {
    const { name } = req.body;

    const userId = req.user._id;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
});


module.exports = router;
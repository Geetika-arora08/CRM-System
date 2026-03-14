const jwt = require('jsonwebtoken');
const User = require('../modules/users/user.model');


//=================Protect Middleware - Verify JWT==========
const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("DECODED TOKEN:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        // console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};


//=====================ADMIN Role Check================
const isAdmin = (req, res, next) => {
    if (!req.user || req.user?.role?.toLowerCase() !== "admin") {
        return res.status(403).json({
            message: "Access denied, only admin can access"
        });
    }
    next();
};

//=====================USER Role Check================
const isUser = (req, res, next) => {
    if (!req.user || req.user?.role?.toLowerCase() !== "user") {
        return res.status(403).json({
            message: "Access denied, only user can access"
        });
    }
    next();
};

module.exports = { protect, isAdmin, isUser };

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if token exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user and remove password
        const user = await User.findById(decoded.id).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Store user in request object
        req.user = user;

        // Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

module.exports = protect;
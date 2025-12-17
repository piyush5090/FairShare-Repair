const User = require('../models/users.js');

// @desc    Get current logged in user
// @route   GET /api/users/me
exports.getMe = async (req, res) => {
    try {
        // req.user is set by the authenticateToken middleware
        const user = await User.findById(req.user.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Only return public-safe info
        res.json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            upiId: user.upiId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ allUsers: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Set UPI ID for a user
// @route   POST /api/users/:id/set-upi
exports.setUpi = async (req, res) => {
    try {
        const userId = req.params.id;
        const upiId = req.body.change.upi;

        // Ensure the logged-in user can only update their own UPI
        if (req.user.user._id.toString() !== userId) {
            return res.status(403).json({ message: "User not authorized to update this profile" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.upiId = upiId;
        await user.save();
        res.status(200).json({ message: "UPI ID set successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

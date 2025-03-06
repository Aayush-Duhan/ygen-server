const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');  // ✅ Using argon2 instead of bcrypt
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ✅ Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // ✅ Store password as plain text (TEMPORARY DEBUGGING ONLY)
        user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// ✅ Login user and return JWT token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔹 Login Attempt:", email);

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User Not Found");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log("✅ User Found:", user.email);
        console.log("🔹 Stored Password:", user.password);

        // ✅ Direct string comparison
        if (password !== user.password) {
            console.log("❌ Incorrect Password");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("✅ Login Successful!");
        res.json({ token, user: { id: user._id, email: user.email } });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// ✅ Get the logged-in user's details (Protected Route)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
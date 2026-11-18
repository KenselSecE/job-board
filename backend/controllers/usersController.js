const bcrypt = require('bcryptjs');
const User = require('../models/User');

let register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        let existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not found' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        req.session.user = { id: user._id, email: user.email, name: user.name };
        res.json({ success: true, message: 'Login successful', user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

let logout = async (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out' });
};

let getMe = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }
    res.json({ success: true, user: req.session.user });
};

module.exports = { register, login, logout, getMe };

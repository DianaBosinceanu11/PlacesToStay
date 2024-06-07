
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const loginUser = (req, res) => {
    const { username, password } = req.body;

    User.findUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = user;
                return res.status(200).json({ message: `Logged in as ${user.username}`, user: user.username });
            } else {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
        });
    });
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        } else {
            return res.status(200).json({ message: 'Logged out successfully' });
        }
    });
};

const getCurrentUser = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ user: req.session.user.username });
    } else {
        return res.status(200).json({ user: null });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    getCurrentUser
};

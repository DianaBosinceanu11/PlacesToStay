
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/database');  // import the database connection

// Existing routes
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
// Route to get the current user
router.get('/current-user', userController.getCurrentUser); 

// Route to create a user (for testing purposes only)
router.post('/add-user', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO acc_users (username, password, admin) VALUES (?, ?, ?)';
        db.run(sql, [username, hashedPassword, 0], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User created successfully', id: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

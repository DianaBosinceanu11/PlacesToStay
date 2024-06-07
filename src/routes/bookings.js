const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Route for creating a new booking
router.post('/', bookingsController.createBooking);

// Route to get all bookings
router.get('/', bookingsController.getAllBookings);

module.exports = router;

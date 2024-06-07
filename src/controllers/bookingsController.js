const Booking = require('../models/bookingModel');
const moment = require('moment');

const createBooking = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'You must be logged in to book accommodation' });
    }

    const { accID, thedate, npeople } = req.body;
    const username = req.session.user.username;

    // Error-checking for missing details
    if (!accID || !thedate || !username || !npeople) {
        return res.status(400).json({ error: 'All booking details (ID, date, username, number of people) are required.' });
    }

    // Check if the date is in the past
    if (moment(thedate).isBefore(moment(), 'day')) {
        return res.status(400).json({ error: 'Cannot book for past dates.' });
    }

    Booking.checkAvailability(accID, thedate, npeople, (err, available) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while checking availability.' });
        }

        if (!available) {
            return res.status(400).json({ error: 'Not enough availability for the requested date and number of people.' });
        }

        Booking.createBooking(accID, thedate, username, npeople, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while creating the booking.' });
            } else {
                return res.status(201).json({ message: `Booking added with ID: ${data.id}` });
            }
        });
    });
};


// Function to get all bookings for testing purposes
const getAllBookings = (req, res) => {
    Booking.getAllBookings((err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
};

module.exports = {
    createBooking,
    getAllBookings
};


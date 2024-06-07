const db = require('./database');

const createBooking = (accID, thedate, username, npeople, callback) => {
    const sql = 'INSERT INTO acc_bookings (accID, thedate, username, npeople) VALUES (?, ?, ?, ?)';
    db.run(sql, [accID, thedate, username, npeople], function (err) {
        if (!err) {
            const updateAvailabilitySql = 'UPDATE acc_dates SET availability = availability - ? WHERE accID = ? AND thedate = ?';
            db.run(updateAvailabilitySql, [npeople, accID, thedate], (updateErr) => {
                callback(updateErr, { id: this.lastID });
            });
        } else {
            callback(err, null);
        }
    });
};

const checkAvailability = (accID, thedate, npeople, callback) => {
    const sql = 'SELECT availability FROM acc_dates WHERE accID = ? AND thedate = ?';
    db.get(sql, [accID, thedate], (err, row) => {
        if (err) {
            callback(err, null);
        } else if (row && row.availability >= npeople) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
};




// Function to get all bookings for testing purposes
const getAllBookings = (callback) => {
    const sql = 'SELECT * FROM acc_bookings';
    db.all(sql, [], callback);
};

module.exports = {
    createBooking,
    getAllBookings,
    checkAvailability
};

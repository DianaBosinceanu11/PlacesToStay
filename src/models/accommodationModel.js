const db = require('./database');

const createAccommodation = (name, type, location, latitude, longitude, description, callback) => {
    const sql = 'INSERT INTO accommodation (name, type, location, latitude, longitude, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [name, type, location, latitude, longitude, description], function (err) {
        callback(err, { id: this.lastID });
    });
};

const getAllAccommodations = (callback) => {
    const sql = 'SELECT * FROM accommodation';
    db.all(sql, [], callback);
};

const getAccommodationsByLocation = (location, callback) => {
    const sql = 'SELECT * FROM accommodation WHERE location = ?';
    db.all(sql, [location], callback);
};

const getAccommodationsByTypeAndLocation = (type, location, callback) => {
    const sql = 'SELECT * FROM accommodation WHERE type = ? AND location = ?';
    db.all(sql, [type, location], callback);
};

module.exports = {
    createAccommodation,
    getAllAccommodations,
    getAccommodationsByLocation,
    getAccommodationsByTypeAndLocation,
};

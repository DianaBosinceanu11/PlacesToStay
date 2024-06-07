const Accommodation = require('../models/accommodationModel');
const db = require('../models/database');


// Hardcode availability
const populateAvailability = (req, res) => {
    const startDate = new Date('2024-06-06'); // Adjust to the test start date
    const endDate = new Date('2025-01-01');
    const availability = 3;

    const accIDs = [2, 3, 4, 5];
    let sql = 'INSERT INTO acc_dates (accID, thedate, availability) VALUES ';
    const values = [];

    accIDs.forEach(accID => {
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            sql += '(?, ?, ?),';
            values.push(accID, d.toISOString().split('T')[0], availability);
        }
    });

    sql = sql.slice(0, -1); // Remove trailing comma

    db.run(sql, values, function(err) {
        if (err) {
            console.error('Error inserting availability:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Availability populated successfully' });
    });
};




const addAccDate = (req, res) => {
    const { accID, thedate, availability } = req.body;

    if (!accID || !thedate || availability === undefined) {
        return res.status(400).json({ error: 'All fields (accID, thedate, availability) are required.' });
    }

    const sql = 'INSERT INTO acc_dates (accID, thedate, availability) VALUES (?, ?, ?)';
    db.run(sql, [accID, thedate, availability], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Date added successfully', id: this.lastID });
    });
};

const updateAccDateAvailability = (req, res) => {
    console.log('Update request received:', req.body);  // Debug log

    const { id, availability } = req.body;

    if (!id || availability === undefined) {
        return res.status(400).json({ error: 'ID and availability are required.' });
    }

    const sql = 'UPDATE acc_dates SET availability = ? WHERE id = ?';
    db.run(sql, [availability, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Availability updated successfully' });
    });
};

const addAccDateRange = (req, res) => {
    const { accID, startDate, endDate, availability } = req.body;

    if (!accID || !startDate || !endDate || availability === undefined) {
        return res.status(400).json({ error: 'All fields (accID, startDate, endDate, availability) are required.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        return res.status(400).json({ error: 'Start date must be before end date.' });
    }

    let sql = 'INSERT INTO acc_dates (accID, thedate, availability) VALUES ';
    const values = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        sql += '(?, ?, ?),';
        values.push(accID, d.toISOString().split('T')[0], availability);
    }

    sql = sql.slice(0, -1); // Remove trailing comma

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Dates added successfully' });
    });
};




const getAllAccommodations = (req, res) => {
    Accommodation.getAllAccommodations((err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
};

const getAccommodationsByLocation = (req, res) => {
    const { location } = req.params;
    Accommodation.getAccommodationsByLocation(location, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
};

const getAccommodationsByTypeAndLocation = (req, res) => {
    const { type, location } = req.params;
    Accommodation.getAccommodationsByTypeAndLocation(type, location, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
};

const createAccommodation = (req, res) => {
    const { name, type, location, latitude, longitude, description } = req.body;
    Accommodation.createAccommodation(name, type, location, latitude, longitude, description, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send(`Accommodation added with ID: ${data.id}`);
        }
    });
};

module.exports = {
    addAccDate,
    getAllAccommodations,
    getAccommodationsByLocation,
    getAccommodationsByTypeAndLocation,
    createAccommodation,
    populateAvailability,
    updateAccDateAvailability,
    addAccDateRange
};

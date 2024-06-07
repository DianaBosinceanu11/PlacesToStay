const sqlite3 = require('sqlite3').verbose();
const dbName = 'myDatabase.db';

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the database.");

        db.run(`CREATE TABLE IF NOT EXISTS accommodation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255),
            type VARCHAR(255),
            location VARCHAR(255),
            latitude FLOAT,
            longitude FLOAT,
            description TEXT
        )`, handleError);

        db.run(`CREATE TABLE IF NOT EXISTS acc_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255),
            password VARCHAR(255),
            admin INTEGER
        )`, handleError);

        db.run(`CREATE TABLE IF NOT EXISTS acc_dates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accID INTEGER,
            thedate TEXT,
            availability INTEGER,
            FOREIGN KEY (accID) REFERENCES accommodation(id)
        )`, handleError);

        db.run(`CREATE TABLE IF NOT EXISTS acc_bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accID INTEGER,
            thedate TEXT,
            username VARCHAR(255),
            npeople INTEGER,
            FOREIGN KEY (accID) REFERENCES accommodation(id),
            FOREIGN KEY (username) REFERENCES acc_users(username)
        )`, handleError);
    }
});

function handleError(err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table created successfully.');
    }
}

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});

module.exports = db;

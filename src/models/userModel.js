
const db = require('./database');

const findUserByUsername = (username, callback) => {
    const sql = 'SELECT * FROM acc_users WHERE username = ?';
    db.get(sql, [username], callback);
};

module.exports = {
    findUserByUsername
};

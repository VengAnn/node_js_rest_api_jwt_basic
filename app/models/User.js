const db = require('../../config/database');

const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [data.name, data.email, data.password], callback);
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },

    deleteById: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },

    updateById: (id, data, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
        db.query(query, [data.name, data.email, data.password, id], callback);
    },
};

module.exports = User;

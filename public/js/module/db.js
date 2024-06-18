// db.js
const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'board'
});

// MySQL 연결
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;

const mysql = require('mysql');

//online
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	password: '',
	database: 'angkakreditdb',
	user: 'root'
});

module.exports = pool;
const mysql = require('mysql');

//online
const pool = mysql.createPool({
	host: '194.59.165.198',
	password: 'Sony@7777',
	database: 'waenadesadb',
	user: 'Ocph23'
});

module.exports = pool;
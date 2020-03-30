const pool = require('./dbconnection');
const Persyaratan = {};

Persyaratan.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			persyaratan`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

Persyaratan.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			Persyaratan where idpersyaratan=? `,
			[ Id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result[0]);
			}
		);
	});
};

Persyaratan.post = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into persyaratan  (nama, deskripsi, status) values(?,?,?)',
				[ data.nama, data.deskripsi, data.status ],
				(err, result) => {
					if (err) {
						return reject(err);
					} else {
						data.idpersyaratan = result.insertId;
						resolve(data);
					}
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

Persyaratan.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update persyaratan set nama=?, deskripsi=?, status=? where idpersyaratan=? ',
				[ data.nama, data.deskripsi, data.status, data.idpersyaratan ],
				(err, result) => {
					if (err) {
						return reject(err);
					} else resolve(data);
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

Persyaratan.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from Persyaratan where idpersyaratan=? ', [ id ], (err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			});
		} catch (err) {
			return reject(err);
		}
	});
};

module.exports = Persyaratan;

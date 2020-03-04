const pool = require('./dbconnection');
const Jabatan = {};

Jabatan.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			jabatan`,
            (err, result) => {
                if (err) {
                    return reject(err);
                } else
                    resolve(result);
            }
        );
    });
};

Jabatan.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			jabatan where idjabatan=? `,
            [Id],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else
                    resolve(result[0]);
            }
        );
    });
};

Jabatan.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'insert into jabatan  (nama, deskripsi) values(?,?)',
                [data.nama, data.deskripsi],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idjabatan = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

Jabatan.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update jabatan set nama=?, deskripsi=? where idjabatan=? ',
                [data.nama, data.deskripsi, data.idjabatan],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else

                        resolve(data);
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

Jabatan.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from jabatan where idjabatan=? ', [id], (err, result) => {
                if (err) {
                    return reject(err);
                } else
                    resolve(true);
            });
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = Jabatan;
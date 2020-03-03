const pool = require('./dbconnection');
const db = {};

db.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			permohonan`,
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    result.forEach(element => {
                        element.data = JSON.parse(element.data)
                    });
                    resolve(result);
                }
            }
        );
    });
};

db.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			permohonan where idpermohonan=? `,
            [Id],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    if (result.length <= 0)
                        resolve(result)
                    else {
                        var item = result[0];
                        item.data = JSON.parse(item.data);
                        resolve(item);
                    }

                }
            }
        );
    });
};



db.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.tanggalpengajuan = new Date();
            pool.query(
                'insert into permohonan  (idpenduduk,tanggalpengajuan, data,idjenispermohonan) values(?,?,?,?)',
                [data.idpenduduk, data.tanggalpengajuan, JSON.stringify(data.data), data.idjenispermohonan],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.permohonan = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};


db.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update permohonan set idpenduduk=?,tanggalpengajuan=?, data=?,idjenispermohonan=? where idpermohonan=? ',
                [data.idpenduduk, data.tanggalpengajuan, JSON.stringify(data.data), data.idjenispermohonan, data.idpermohonan],
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

db.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from permohonan where idpermohonan=? ', [id], (err, result) => {
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

module.exports = db;
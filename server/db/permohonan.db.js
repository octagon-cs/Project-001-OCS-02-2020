const pool = require('./dbconnection');
const db = {};

db.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
            permohonan.*,
            penduduk.nama,
            penduduk.nik,
            penduduk.nkk,
            users.username,
            users.email,
            users.idusers
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN users ON penduduk.idusers = users.idusers`,
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    result.forEach(element => {
                        element.data = JSON.parse(element.data);
                        element.persetujuan = JSON.parse(element.persetujuan)
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
            `SELECT
            permohonan.*,
            penduduk.nama,
            penduduk.nik,
            penduduk.nkk,
            users.username,
            users.email,
            users.idusers
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN users ON penduduk.idusers = users.idusers where idpermohonan=? `,
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
                        item.persetujuan = JSON.parse(item.persetujuan);
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
                'insert into permohonan  (idpenduduk,tanggalpengajuan, data,persetujuan,idjenispermohonan) values(?,?,?,?,?)',
                [data.idpenduduk, data.tanggalpengajuan, JSON.stringify(data.data), JSON.stringify(data.persetujuan), data.idjenispermohonan],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idpermohonan = result.insertId;
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
                'update permohonan set idpenduduk=?,tanggalpengajuan=?, data=?, persetujuan=?, idjenispermohonan=? where idpermohonan=? ',
                [data.idpenduduk, data.tanggalpengajuan, JSON.stringify(data.data), JSON.stringify(data.persetujuan), data.idjenispermohonan, data.idpermohonan],
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
const pool = require('./dbconnection');
const jenispermohonan = {};

jenispermohonan.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			jenispermohonan`,
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    result.forEach(element => {
                        element.persyaratan = JSON.parse(element.persyaratan)
                    });
                    resolve(result);
                }
            }
        );
    });
};

jenispermohonan.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			jenispermohonan where idjenispermohonan=? `,
            [Id],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    if (result.length <= 0)
                        resolve(result)
                    else {
                        var item = result[0];
                        item.persyaratan = JSON.parse(item.persyaratan);
                        resolve(item);
                    }

                }
            }
        );
    });
};

jenispermohonan.getByJenis = async (Jenis) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			jenispermohonan where jenis=? `,
            [Jenis],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    if (result.length <= 0)
                        resolve(result)
                    else {
                        var item = result[0];
                        item.persyaratan = JSON.parse(item.persyaratan);
                        resolve(item);
                    }

                }
            }
        );
    });
};

jenispermohonan.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'insert into jenispermohonan  (nama, persyaratan, jenis,deskripsi) values(?,?,?,?)',
                [data.nama, JSON.stringify(data.persyaratan), data.jenis, data.deskripsi],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idjenispermohonan = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

jenispermohonan.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update jenispermohonan set nama=?, persyaratan=?, jenis=? deskripsi=? where idjenispermohonan=? ',
                [data.nama, JSON.stringify(data.persyaratan), data.jenis, data.deskripsi, data.idjenispermohonan],
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

jenispermohonan.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from jenispermohonan where idjenispermohonan=? ', [id], (err, result) => {
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

module.exports = jenispermohonan;
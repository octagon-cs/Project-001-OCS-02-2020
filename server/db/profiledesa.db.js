const pool = require('./dbconnection');
const profile = {};

profile.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			profile`,
            (err, result) => {
                if (err) {
                    return reject(err);
                } else
                    resolve(result);
            }
        );
    });
};

profile.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			profile where idprofile=? `,
            [Id],
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


profile.getByName = async (nama) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			profile where nama=? `,
            [nama],
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

profile.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'insert into profile  (nama, tahun, data) values(?,?,?)',
                [data.nama, data.tahun, JSON.stringify(data.data)],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idprofile = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

profile.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update profile set nama=?, tahun=?, data=? where idprofile=? ',
                [data.nama, data.tahun, JSON.stringify(data.data), data.idprofile],
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

profile.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from profile where idprofile=? ', [id], (err, result) => {
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

module.exports = profile;
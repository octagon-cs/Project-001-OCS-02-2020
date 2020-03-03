const pool = require('./dbconnection');
const db = {};

db.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			penduduk`,
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
			penduduk where idpenduduk=? `,
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


db.getByName = async (nama) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			penduduk where nama=? `,
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


db.getByNIK = async (nik) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			penduduk where nik=? `,
            [nik],
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

db.getByNKK = async (nkk) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			penduduk where nkk=? `,
            [nkk],
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



db.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'insert into penduduk  (nama, nik, nkk, idusers, data, statusdalamkeluarga,status) values(?,?,?,?,?,?,?)',
                [data.nama, data.nik, data.nkk, data.idusers, JSON.stringify(data.data), data.statusdalamkeluarga, data.status],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idpenduduk = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

db.registrasi = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((error, connection) => {
                if (error) {
                    return reject(error);
                } else {
                    var password = bcrypt.hashSync(data.nik, 8);
                    connection.query(
                        'insert into users (username,password,email) values(?,?,?)',
                        [data.email, password, data.email],
                        (error, result) => {
                            if (error) {
                                connection.rollback(function () {
                                    connection.release();
                                    return reject(error);
                                });
                            } else {
                                data.idusers = result.insertId;
                                pool.query(
                                    'insert into penduduk  (nama, nik, nkk, idusers, data, statusdalamkeluarga,status) values(?,?,?,?,?,?,?)',
                                    [data.nama, data.nik, data.nkk, data.idusers, JSON.stringify(data.data), data.statusdalamkeluarga, data.status],
                                    (err, result) => {
                                        if (err) {
                                            return reject(err);
                                        } else {
                                            data.idpenduduk = result.insertId;
                                            resolve(data);
                                        }
                                    }
                                );
                            }
                        })
                }
            })
        } catch (error) {
            return reject(error);
        }
    })
};




db.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update penduduk set nama=?, nik=?, nkk=?, idusers=?, data=?, statusdalamkeluarga=?,status=? where idpenduduk=? ',
                [data.nama, data.nik, data.nkk, data.idusers, JSON.stringify(data.data), data.statusdalamkeluarga, data.status, data.idpenduduk],
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
            pool.query('delete from penduduk where idpenduduk=? ', [id], (err, result) => {
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
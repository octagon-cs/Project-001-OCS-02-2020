const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');
const pejabat = {};

pejabat.get = async () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
            pejabat.*,
            jabatan.nama AS namajabatan,
            jabatan.deskripsi
          FROM
            pejabat
            LEFT JOIN jabatan ON jabatan.idjabatan = pejabat.idjabatan`,
            (error, result) => {
                if (error) {
                    return reject(error);
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

pejabat.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
            pejabat.*,
            jabatan.nama AS namajabatan,
            jabatan.deskripsi
          FROM
            pejabat
            LEFT JOIN jabatan ON jabatan.idjabatan = pejabat.idjabatans where idpejabat=? `,
            [Id],
            (error, result) => {
                if (error) {
                    return reject(error);
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

pejabat.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((error, connection) => {
                if (error) {
                    return reject(error);
                } else {
                    if (!data.role) {
                        connection.query(
                            'insert into pejabat  (nama, data, foto, idjabatan) values(?,?,?,?)',
                            [data.nama, JSON.stringify(data.data), data.foto, data.idjabatan],
                            (error, result) => {
                                if (error) {
                                    connection.rollback(function () {
                                        connection.release();
                                        return reject(error);
                                    });
                                } else {
                                    data.idpejabat = result.insertId;
                                    connection.commit(function (err) {
                                        if (err) {
                                            return connection.rollback(function () {
                                                return reject(err);
                                            });
                                        }
                                        return resolve(data);
                                    });
                                }
                            }
                        );
                    } else {
                        var password = bcrypt.hashSync("admin", 8);
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

                                    connection.query(
                                        'select * from roles where name=?',
                                        [data.role],
                                        (err, roleResult) => {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    return reject(err);
                                                });
                                            } else {
                                                var role = roleResult[0];
                                                connection.query(
                                                    'insert into userinrole(idusers,idroles) values(?,?)',
                                                    [data.idusers, role.idroles],
                                                    (err, result) => {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                connection.release();
                                                                return reject(err);
                                                            });
                                                        } else {
                                                            connection.query(
                                                                'insert into pejabat  (nama, data, foto, idjabatan, idusers) values(?,?,?,?,?)',
                                                                [data.nama, JSON.stringify(data.data), data.foto, data.idjabatan, data.idusers],
                                                                (error, result) => {
                                                                    if (error) {
                                                                        return reject(error);
                                                                    } else {
                                                                        data.idpejabat = result.insertId;
                                                                        connection.commit(function (err) {
                                                                            if (err) {
                                                                                return connection.rollback(function () {
                                                                                    return reject(err);
                                                                                });
                                                                            }
                                                                            return resolve(data);
                                                                        });
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        })
                                }
                            })
                    }
                }
            })
        } catch (error) {
            return reject(error);
        }
    })
}

pejabat.put = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update pejabat set nama=?, data=?, foto=?, idjabatan=?, idusers=? where idpejabat=? ',
                [data.nama, JSON.stringify(data.data), data.foto, data.idjabatan, data.idusers, data.idpejabat],

                (error, result) => {
                    if (error) {
                        return reject(error);
                    } else

                        resolve(data);
                }
            );
        } catch (error) {
            return reject(error);
        }
    });
};

pejabat.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from pejabat where idpejabat=? ', [id], (error, result) => {
                if (error) {
                    return reject(error);
                } else
                    resolve(true);
            });
        } catch (error) {
            return reject(error);
        }
    });
};

module.exports = pejabat;
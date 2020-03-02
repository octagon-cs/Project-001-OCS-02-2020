const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');
const helper = require('../helper');
const config = require('../auth/config');
const UserDb = {};

UserDb.login = async (user) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            } else
                connection.beginTransaction((err) => {
                    try {
                        if (err) {
                            connection.rollback(function () {
                                connection.release();
                                return reject(err);
                            });
                        } else
                            connection.query('select * from users', (err, result) => {
                                if (err) {
                                    connection.rollback(function () {
                                        connection.release();
                                        return reject(err);
                                    });
                                } else {
                                    if (result.length <= 0) {
                                        var sql = 'insert into roles (name) values ? ';
                                        var values = [];
                                        config.Roles.forEach(x => {
                                            values.push([x]);
                                        })
                                        connection.query(sql, [values], (err, result) => {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    return reject(err);
                                                });
                                            } else {
                                                user.username = "admin@gmail.com";
                                                var password = bcrypt.hashSync("admin", 8);
                                                connection.query(
                                                    'insert into users (username,password,email) values(?,?,?)',
                                                    [user.username, password, user.username],
                                                    (err, result) => {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                connection.release();
                                                                return reject(err);
                                                            });
                                                        } else {
                                                            if (result.insertId > 0) {
                                                                user.idUser = result.insertId;
                                                                connection.query(
                                                                    'select * from roles where name=?',
                                                                    ['admin'],
                                                                    (err, roleResult) => {
                                                                        if (err) {
                                                                            connection.rollback(function () {
                                                                                connection.release();
                                                                                return reject(err);
                                                                            });
                                                                        } else {
                                                                            var data = roleResult[0];
                                                                            connection.query(
                                                                                'insert into userinrole(idusers,idroles) values(?,?)',
                                                                                [user.idUser, data.idroles],
                                                                                (err, result) => {
                                                                                    if (err) {
                                                                                        connection.rollback(function () {
                                                                                            connection.release();
                                                                                            return reject(err);
                                                                                        });
                                                                                    } else
                                                                                        connection.commit(function (err) {
                                                                                            if (err) {
                                                                                                return connection.rollback(function () {
                                                                                                    return reject(err);
                                                                                                });
                                                                                            }
                                                                                            return resolve(result[0]);
                                                                                        });
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            } else
                                                                return reject('Data Tidak Tersimpan');
                                                        }
                                                    }
                                                );
                                            }
                                        });
                                    } else {
                                        pool.query(
                                            `SELECT *, roles.name as roles
                                            FROM
                                                users LEFT JOIN
                                                userinrole ON users.idusers = userinrole.idusers LEFT JOIN
                                                roles ON userinrole.idroles = roles.idroles where users.username=? or users.email=?`,
                                            [user.username, user.username],
                                            (err, result) => {
                                                if (err) {
                                                    connection.rollback(function () {
                                                        connection.release();
                                                        return reject(err);
                                                    });
                                                } else {
                                                    connection.commit(function (err) {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                return reject(err);
                                                            });
                                                        } else {
                                                            connection.release();
                                                            resolve(result);
                                                        }
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            });
                    } catch (err) {
                        connection.rollback(function () {
                            connection.release();
                            return reject(err);
                        });
                    }
                });
        });
    });
};

UserDb.changepassword = async (user) => {
    return new Promise((resolve, reject, nex) => {
        pool.query('update users set password=? where idusers=?', [user.newpassword, user.idusers], (err, result) => {
            if (err) {
                return reject(err);
            } else resolve(true);
        });
    });
};

UserDb.resetpassword = async (email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                return reject(err);
            } else {
                connection.beginTransaction((err) => {
                    if (err) {
                        connection.rollback(function () {
                            connection.release();
                            return reject(err);
                        });
                    } else {
                        connection.query('select email form users where email=?', [email], (err, result) => {
                            if (err) {
                                connection.rollback(function () {
                                    connection.release();
                                    return reject(err);
                                });
                            } else {
                                if (result.length <= 0) {
                                    connection.rollback(function () {
                                        connection.release();
                                        return reject({
                                            message: "Account Anda Tidak Ditemukan"
                                        });
                                    });

                                } else {
                                    var user = result[0];
                                    if (!user) {
                                        connection.rollback(function () {
                                            connection.release();
                                            return reject({
                                                message: "Account Anda Tidak Ditemukan"
                                            });
                                        });

                                    } else {
                                        var password = helper.makeid(5);
                                        connection.query('update users set password=? where idusers=?', [password, user.idusers], (err, result) => {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    return reject(err);
                                                });

                                            } else {
                                                helper.sendEmail({
                                                    to: data.email,
                                                    subject: 'Reset Password',
                                                    password: password
                                                }).then(res => {
                                                    resolve({
                                                        message: "Periksa Email Anda"
                                                    });
                                                }, err => {
                                                    connection.rollback(function () {
                                                        connection.release();
                                                        return reject({
                                                            message: "Account Anda Tidak Ditemukan"
                                                        });
                                                    });


                                                })
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                })
            }

        });


    });

};

UserDb.changeFoto = async (user) => {
    return new Promise((resolve, reject, nex) => {
        pool.query('update users set photo=? where idusers=?', [user.photo, user.idusers], (err, result) => {
            if (err) {
                return reject(err);
            } else resolve(true);
        });
    });
};

UserDb.registerDosen = async (dosen) => {
    return new Promise((resolve, reject, next) => {

        helper
            .sendEmail({
                to: dosen.email,
                subject: 'Account',
                password: dosen.passwordText
            })
            .then(
                (x) => {
                    pool.getConnection((err, connection) => {

                        try {
                            if (err) {
                                connection.release();
                                return reject(err);
                            } else
                                connection.beginTransaction((err) => {
                                    if (err) {
                                        connection.rollback(function () {
                                            connection.release();
                                            return reject(err);
                                        });
                                    } else
                                        connection.query('select * from role where name=?', ['dosen'], (err, roleResult) => {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    return reject(err);
                                                });
                                            } else {
                                                var role = roleResult[0];
                                                connection.query(
                                                    'insert into users (username, password, email) values(?,?,?)',
                                                    [dosen.nidn, dosen.password, dosen.email],
                                                    (err, userResult) => {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                connection.release();
                                                                return reject(err);
                                                            });
                                                        } else {
                                                            dosen.iduser = userResult.insertId;
                                                            connection.query(
                                                                'insert into userinrole(idusers, idrole) values (?,?)',
                                                                [dosen.iduser, role.idrole],
                                                                (err, result) => {
                                                                    if (err) {
                                                                        connection.rollback(function () {
                                                                            connection.release();
                                                                            return reject(err);
                                                                        });
                                                                    } else {
                                                                        connection.query(
                                                                            `insert into dosen(iduser,idjabatan, nidn, tanggallahir, tempatlahir, jeniskelamin, pendidikanterakhir,
																	 jabatanakademik, masakerja, idprogramstudi, namadosen) values (?,?,?,?,?,?,?,?,?,?,?)`,
                                                                            [
                                                                                dosen.iduser,
                                                                                dosen.idjabatan,
                                                                                dosen.nidn,
                                                                                dosen.tanggallahir,
                                                                                dosen.tempatlahir,
                                                                                dosen.jeniskelamin,
                                                                                dosen.pendidikanterakhir,
                                                                                dosen.jabatanakademik,
                                                                                dosen.masakerja,
                                                                                dosen.idprogramstudi,
                                                                                dosen.namadosen
                                                                            ],
                                                                            (err, result) => {
                                                                                if (err) {
                                                                                    connection.rollback(function () {
                                                                                        connection.release();
                                                                                        return reject(err);
                                                                                    });
                                                                                } else {
                                                                                    dosen.iddosen = result.insertId;
                                                                                    dosen.role = 'dosen';
                                                                                    connection.commit(function (err) {
                                                                                        if (err) {
                                                                                            return connection.rollback(function () {
                                                                                                return reject(err);
                                                                                            });
                                                                                        } else {
                                                                                            connection.release();
                                                                                            resolve(dosen);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    }
                                                );
                                            }

                                        });
                                });
                        } catch (err) {
                            connection.rollback(function () {
                                connection.release();
                                return reject(err);
                            });
                        }
                    });
                },
                (err) => {
                    return reject(err);
                }
            );
    });
};

UserDb.profile = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
		dosen.iddosen,
		dosen.iduser,
		dosen.idprogramstudi,
		dosen.nidn,
		dosen.tanggallahir,
		dosen.tempatlahir,
		dosen.jeniskelamin,
		dosen.pendidikanterakhir,
		dosen.jabatanakademik,
		dosen.masakerja,
		dosen.idjabatan,
		dosen.namadosen,
		programstudi.namaprogramstudi,
		fakultas.namafakultas,
		universitas.namauniversitas,
		fakultas.idfakultas,
		universitas.iduniversitas,
		users.email,users.photo,
		role.idrole,
		role.name AS rolename,
		role.deskripsi,
		jabatanfungsional.jabatan,
		jabatanfungsional.pangkat,
		jabatanfungsional.golongan,
		jabatanfungsional.ruang
	  FROM
		dosen
		LEFT JOIN programstudi ON dosen.idprogramstudi =
	  programstudi.idprogramstudi
		LEFT JOIN fakultas ON programstudi.idfakultas = fakultas.idfakultas
		LEFT JOIN universitas ON fakultas.iduniversitas =
	  universitas.iduniversitas
		LEFT JOIN users ON dosen.iduser = users.idusers
		LEFT JOIN userinrole ON users.idusers = userinrole.idusers
		LEFT JOIN role ON userinrole.idrole = role.idrole
		LEFT JOIN jabatanfungsional ON dosen.idjabatan =
	  jabatanfungsional.idjabatan where iduser =?`,
            [userId],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            }
        );
    });
};

module.exports = UserDb;
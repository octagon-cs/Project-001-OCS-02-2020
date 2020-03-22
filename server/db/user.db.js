const pool = require('./dbconnection');
const bcrypt = require('bcryptjs');
const helper = require('../helper');
const config = require('../auth/config');
const jwt = require('jsonwebtoken');
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
							connection.rollback(function() {
								connection.release();
								return reject(err);
							});
						} else
							connection.query('select * from users', (err, result) => {
								if (err) {
									connection.rollback(function() {
										connection.release();
										return reject(err);
									});
								} else {
									if (result.length <= 0) {
										var sql = 'insert into roles (name) values ? ';
										var values = [];
										config.Roles.forEach((x) => {
											values.push([ x ]);
										});
										connection.query(sql, [ values ], (err, result) => {
											if (err) {
												connection.rollback(function() {
													connection.release();
													return reject(err);
												});
											} else {
												user.username = 'admin@gmail.com';
												var password = bcrypt.hashSync('admin', 8);
												connection.query(
													'insert into users (username,password,email) values(?,?,?)',
													[ user.username, password, user.username ],
													(err, result) => {
														if (err) {
															connection.rollback(function() {
																connection.release();
																return reject(err);
															});
														} else {
															if (result.insertId > 0) {
																user.idusers = result.insertId;
																connection.query(
																	'select * from roles where name=?',
																	[ 'admin' ],
																	(err, roleResult) => {
																		if (err) {
																			connection.rollback(function() {
																				connection.release();
																				return reject(err);
																			});
																		} else {
																			var data = roleResult[0];
																			connection.query(
																				'insert into userinrole(idusers,idroles) values(?,?)',
																				[ user.idusers, data.idroles ],
																				(err, result) => {
																					if (err) {
																						connection.rollback(function() {
																							connection.release();
																							return reject(err);
																						});
																					} else {
																						connection.commit(function(
																							err
																						) {
																							if (err) {
																								return connection.rollback(
																									function() {
																										connection.release();
																										return reject(
																											err
																										);
																									}
																								);
																							} else {
																								connection.release();
																								return resolve(
																									result[0]
																								);
																							}
																						});
																					}
																				}
																			);
																		}
																	}
																);
															} else {
																connection.rollback(function() {
																	connection.release();
																	return reject('Data Tidak Tersimpan');
																});
															}
														}
													}
												);
											}
										});
									} else {
										connection.query(
											`SELECT *, roles.name as role
                                            FROM
                                                users LEFT JOIN
                                                userinrole ON users.idusers = userinrole.idusers LEFT JOIN
                                                roles ON userinrole.idroles = roles.idroles where users.username=? or users.email=?`,
											[ user.username, user.username ],
											(err, result) => {
												if (err) {
													connection.rollback(function() {
														connection.release();
														return reject(err);
													});
												} else {
													 connection.commit(function(err) {
														if (err) {
															connection.rollback(function() {
																connection.release();
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
						connection.rollback(function() {
							connection.release();
							return reject(err);
						});
					}
				});
		});
	});
};

UserDb.register = async (idpenduduk, user, hostname) => {
	return new Promise((resolve, reject) => {
		try {
			pool.getConnection((err, connection) => {
				if (err) {
					return reject(err);
				} else
					connection.beginTransaction((err) => {
						var password = bcrypt.hashSync(user.password, 8);
						var token = jwt.sign(
							{
								user: user.email
							},
							config.secret,
							{
								expiresIn: 86400 * 30 * 12 // expires in 24 hours
							}
						);

						connection.query(
							'insert into users (username,password,email,emailconfirm) values(?,?,?,?)',
							[ user.email, password, user.email, token ],
							(err, result) => {
								if (err) {
									connection.rollback(function() {
										connection.release();
										return reject(err);
									});
								} else {
									if (result.insertId > 0) {
										user.idusers = result.insertId;
										connection.query(
											'select * from roles where name=?',
											[ 'pemohon' ],
											(err, roleResult) => {
												if (err) {
													connection.rollback(function() {
														connection.release();
														return reject(err);
													});
												} else {
													var data = roleResult[0];
													connection.query(
														'insert into userinrole(idusers,idroles) values(?,?)',
														[ user.idusers, data.idroles ],
														(err, result) => {
															if (err) {
																connection.rollback(function() {
																	connection.release();
																	return reject(err);
																});
															} else {
																connection.query(
																	'update penduduk set idusers=? where idpenduduk=?',
																	[ user.idusers, idpenduduk ],
																	(err, result) => {
																		if (err) {
																			connection.rollback(function() {
																				connection.release();
																				return reject(err);
																			});
																		} else {
																			helper
																				.sendEmailConfirmEmail(user, hostname)
																				.then(
																					(x) => {
																						connection.commit(function(
																							err
																						) {
																							if (err) {
																								return connection.rollback(
																									function() {
																										connection.release();
																										return reject(
																											err
																										);
																									}
																								);
																							} else {
																								connection.release();
																								return resolve(true);
																							}
																						});
																					},
																					(err) => {
																						connection.rollback(function() {
																							connection.release();
																							return reject(err);
																						});
																					}
																				);
																		}
																	}
																);
															}
														}
													);
												}
											}
										);
									} else {
										connection.rollback(function() {
											connection.release();
											return reject('Data Tidak Tersimpan');
										});
									}
								}
							}
						);
					});
			});
		} catch (error) {
			connection.rollback(function() {
				connection.release();
				return reject(error);
			});
		}
	});
};

UserDb.profile = async (userid, role) => {
	return new Promise((resolve, reject) => {
		var query = '';

		if (role == 'pemohon') {
			query = `SELECT
            users.email,
            users.username,
            users.photo,
            penduduk.*
          FROM
            users
            LEFT JOIN penduduk ON users.iduserss = penduduk.iduserss
          WHERE
            users.iduserss = ?`;
		} else if (role == 'admin') {
			query = `SELECT
                            users.email,
                            users.username,
                            users.username as nama,
                            users.photo,
                            users.iduserss
                        FROM
                            users
                        where users.iduserss=?`;
		} else {
			query = `SELECT
            users.email,
            users.username,
            users.photo,
            users.iduserss,
            pejabat.nama AS nama
          FROM
            users
            LEFT JOIN pejabat ON users.iduserss = pejabat.iduserss
          WHERE
            users.iduserss = ?`;
		}
		pool.query(query, [ userid ], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(result[0]);
		});
	});
};

UserDb.changepassword = async (userid, password) => {
	return new Promise((resolve, reject) => {
		pool.query('update users set password=? where idusers=?', [ password, userid ], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(true);
		});
	});
};

UserDb.resetpassword = async (email, hostname) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				connection.release();
				return reject(err);
			} else {
				connection.beginTransaction((err) => {
					if (err) {
						connection.rollback(function() {
							connection.release();
							return reject(err);
						});
					} else {
						connection.query('select * from users where email=?', [ email ], (err, result) => {
							if (err) {
								connection.rollback(function() {
									connection.release();
									return reject(err);
								});
							} else {
								if (result.length <= 0) {
									connection.rollback(function() {
										connection.release();
										return reject({
											message: 'Account Anda Tidak Ditemukan'
										});
									});
								} else {
									var user = result[0];
									if (!user) {
										connection.rollback(function() {
											connection.release();
											return reject({
												message: 'Account Anda Tidak Ditemukan'
											});
										});
									} else {
										var password = helper.makeid(5);
										connection.query(
											'update users set password=? where email=?',
											[ password, user.email ],
											(err, result) => {
												if (err) {
													connection.rollback(function() {
														connection.release();
														return reject(err);
													});
												} else {
													helper.sendEmailResetPassword(user, hostname).then(
														(res) => {
															connection.commit(function(err) {
																if (err) {
																	return connection.rollback(function() {
																		return reject(err);
																	});
																} else {
																	connection.release();
																	return resolve({
																		message: 'Periksa Email Anda'
																	});
																}
															});
														},
														(err) => {
															connection.rollback(function() {
																connection.release();
																return reject({
																	message: 'Account Anda Tidak Ditemukan'
																});
															});
														}
													);
												}
											}
										);
									}
								}
							}
						});
					}
				});
			}
		});
	});
};

UserDb.changeFoto = async (user) => {
	return new Promise((resolve, reject, nex) => {
		pool.query('update users set photo=? where idusers=?', [ user.photo, user.iduserss ], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(true);
		});
	});
};

UserDb.confirmemail = async (userid) => {
	return new Promise((resolve, reject, nex) => {
		pool.query(
			'update users set aktif=?, emailconfirm=? where idusers=?',
			[ true, null, userid ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			}
		);
	});
};

UserDb.getUserByEmail = async (email) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			users where email=? `,
			[ email ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result[0]);
			}
		);
	});
};

UserDb.getUserUserId = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			users where idusers=? `,
			[ id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result[0]);
			}
		);
	});
};

UserDb.getUserPejabatAktif = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            users.iduserss,
            users.username,
            users.email,
            users.aktif,
            roles.name AS role,
            users.status,
            users.devicetoken
          FROM
            users
            LEFT JOIN userinrole ON users.iduserss = userinrole.iduserss
            LEFT JOIN roles ON userinrole.idroles = roles.idroles
            WHERE
            users.aktif = 1 AND
            roles.name != 'pemohon'`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

UserDb.AddDeviceToken = (token, iduser) => {
	return new Promise((resolve, reject, nex) => {
		pool.query('update users set devicetoken=? where idusers=?', [ token, iduser ], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(true);
		});
	});
};

UserDb.getDeviceToken = (iduser) => {
	return new Promise((resolve, reject, nex) => {
		pool.query('select devicetokenfrom users where idusers=?', [ iduser ], (err, result) => {
			if (err) {
				return reject(err);
			} else resolve(result[0]);
		});
	});
};

module.exports = UserDb;

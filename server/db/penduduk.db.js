const pool = require('./dbconnection');
const db = {};

db.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT *
		  FROM
			pendudukview`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
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
			[ Id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					if (result.length <= 0) resolve(result);
					else {
						var item = result[0];
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
			[ nama ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					if (result.length <= 0) resolve(result);
					else {
						var item = result[0];
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
			[ nik ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					if (result.length <= 0) resolve(result);
					else {
						var item = result[0];
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
			[ nkk ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
};

db.post = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			data.status = 'aktif';
			pool.query(
				`insert into penduduk (
                    nama, nik, nkk, statusdalamkeluarga, statuskepemilikanktp, tanggallahir, tempatlahir, aktalahir, dusun,
                     rt, rw, kodepost, email, alamatlangkap, kontakhp, golongandarah, statusperkawinan, agama, pekerjaan, 
                     pendidikanterakhir, suku, kewarganegawaan, tempattinggal, statussosial, statuskip, jeniskelamin, bacahuruf, 
					 penghasilantetap, statuskis, statuskk, namaayah, keterangan, status) values 
					 (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					data.nama,
					data.nik,
					data.nkk,
					data.statusdalamkeluarga,
					data.statuskepemilikanktp,
					data.tanggallahir,
					data.tempatlahir,
					data.aktalahir,
					data.dusun,
					data.rt,
					data.rw,
					data.kodepost,
					data.email,
					data.alamatlangkap,
					data.kontakhp,
					data.golongandarah,
					data.statusperkawinan,
					data.agama,
					data.pekerjaan,
					data.pendidikanterakhir,
					data.suku,
					data.kewarganegawaan,
					data.tempattinggal,
					data.statussosial,
					data.statuskip,
					data.jeniskelamin,
					data.bacahuruf,
					data.penghasilantetap,
					data.statuskis,
					data.statuskk,
					data.namaayah,
					data.keterangan,
					data.status
				],
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
						[ data.email, password, data.email ],
						(error, result) => {
							if (error) {
								connection.rollback(function() {
									connection.release();
									return reject(error);
								});
							} else {
								data.idusers = result.insertId;
								connection.query(
									'insert into penduduk  (nama, nik, nkk, idusers, data, statusdalamkeluarga,status) values(?,?,?,?,?,?,?)',
									[
										data.nama,
										data.nik,
										data.nkk,
										data.idusers,
										JSON.stringify(data.data),
										data.statusdalamkeluarga,
										data.status
									],
									(err, result) => {
										if (err) {
											connection.rollback(function() {
												connection.release();
												return reject(error);
											});
										} else {
											data.idpenduduk = result.insertId;
											resolve(data);
										}
									}
								);
							}
						}
					);
				}
			});
		} catch (error) {
			return reject(error);
		}
	});
};

db.put = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`update penduduk set nama=?, nik=?, nkk=?, statusdalamkeluarga=?, statuskepemilikanktp=?, tanggallahir=?, tempatlahir=?, aktalahir=?, dusun=?,
				rt=?, rw=?, kodepost=?, email=?, alamatlangkap=?, kontakhp=?, golongandarah=?, statusperkawinan=?, agama=?, pekerjaan=?, 
				pendidikanterakhir=?, suku=?, kewarganegawaan=?, tempattinggal=?, statussosial=?, statuskip=?, jeniskelamin=?, bacahuruf=?, 
				penghasilantetap=?, statuskis=?, statuskk=?, namaayah=?, namaibu=?, keterangan=?, status=? where idpenduduk=?`,
				[
					data.nama,
					data.nik,
					data.nkk,
					data.statusdalamkeluarga,
					data.statuskepemilikanktp,
					data.tanggallahir,
					data.tempatlahir,
					data.aktalahir,
					data.dusun,
					data.rt,
					data.rw,
					data.kodepost,
					data.email,
					data.alamatlangkap,
					data.kontakhp,
					data.golongandarah,
					data.statusperkawinan,
					data.agama,
					data.pekerjaan,
					data.pendidikanterakhir,
					data.suku,
					data.kewarganegawaan,
					data.tempattinggal,
					data.statussosial,
					data.statuskip,
					data.jeniskelamin,
					data.bacahuruf,
					data.penghasilantetap,
					data.statuskis,
					data.statuskk,
					data.namaayah,
					data.namaibu,
					data.keterangan,
					data.status,
					data.idpenduduk
				],
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

db.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from penduduk where idpenduduk=? ', [ id ], (err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			});
		} catch (err) {
			return reject(err);
		}
	});
};

db.getDocument = (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				`SELECT
				persyaratan.idpersyaratan,
				persyaratan.nama,
				persyaratan.status,
				dokumenpenduduk.iddokumenpenduduk,
				dokumenpenduduk.idpenduduk,
				dokumenpenduduk.file,
				dokumenpenduduk.typefile,
				dokumenpenduduk.idpermohonan,
				dokumenpenduduk.jenis,
				 penduduk.statusdalamkeluarga,
				penduduk.nkk AS nokk
				FROM       
				persyaratan
				LEFT JOIN dokumenpenduduk ON persyaratan.idpersyaratan= dokumenpenduduk.idpersyaratan and (dokumenpenduduk.idpenduduk=? or   persyaratan.status=2) 
				
				LEFT JOIN penduduk ON penduduk.idpenduduk = dokumenpenduduk.idpenduduk  
					
				WHERE
				persyaratan.status IN (1, 2, 3)  And( IF(penduduk.nkk=? and (penduduk.idpenduduk=? or penduduk.statusdalamkeluarga='Kepala Keluarga'),1,0)=1 or  penduduk.nkk is null)`,
				[ data.idpenduduk, data.nkk, data.idpenduduk ],
				(err, result) => {
					if (err) {
						return reject(err);
					} else {
						resolve(result);
					}
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

db.updateDocument = (model) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'update dokumenpenduduk set file=?, jenis=?, typefile=?, idpersyaratan=?, idpermohonan=?  where iddokumenpenduduk=? ',
				[
					model.file,
					model.jenis,
					model.typefile,
					model.idpersyaratan,
					model.idpermohonan,
					model.iddokumenpenduduk
				],
				(err, result) => {
					if (err) {
						return reject(err);
					} else resolve(model);
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

db.insertDocument = (model) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into dokumenpenduduk (idpenduduk, file, jenis,typefile, idpersyaratan, idpermohonan) values(?,?,?,?,?,?)',
				[ model.idpenduduk, model.file, model.jenis, model.typefile, model.idpersyaratan, model.idpermohonan ],
				(err, result) => {
					if (err) {
						return reject(err);
					} else {
						model.iddokumenpenduduk = result.insertId;
						resolve(model);
					}
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

db.updateStatusPenduduk = (idpenduduk, status, data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.getConnection((err, connection) => {
				if (err) {
					return reject(err);
				} else {
					connection.query(
						'update penduduk set status=? where idpenduduk=?',
						[ status, idpenduduk ],
						(err, result) => {
							if (err) {
								connection.rollback(function() {
									connection.release();
									return reject(err);
								});
							} else {
								connection.query(
									'insert into detailpenduduk (idpenduduk, idjenispermohonan, data) values (?,?,?)',
									[ idpenduduk, data.idjenispermohonan, JSON.parse(data) ],
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
													resolve(true);
												}
											});
										}
									}
								);
							}
						}
					);
				}
			});
		} catch (err) {
			return reject(err);
		}
	});
};

module.exports = db;

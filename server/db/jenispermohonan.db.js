const pool = require('./dbconnection');
const rx = require('rxjs');
const helper = require('../helper');
const jenispermohonan = {};

jenispermohonan.get = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            jenispermohonan.*,
            persyaratan.nama AS namapersyaratan,
            persyaratan.deskripsi AS deskripsipersyaratan,
            persyaratan.status,
            detailpersyaratan.iddetailpersyaratan,
            detailpersyaratan.idpersyaratan
          FROM
            jenispermohonan
            LEFT JOIN detailpersyaratan ON jenispermohonan.idjenispermohonan =
          detailpersyaratan.idjenispermohonan
            LEFT JOIN persyaratan ON detailpersyaratan.idpersyaratan =
          persyaratan.idpersyaratan`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.idjenispermohonan));
					var dataJenisPermohonan = Object.values(datas);
					var results = [];
					dataJenisPermohonan.forEach((items) => {
						var jenisPermohonan = {
							persyaratan: [],
							idjenispermohonan: items[0].idjenispermohonan,
							nama: items[0].nama,
							jenis: items[0].jenis
						};

						var dataPersyaratan = Object.values(
							rx.of(items).pipe((data) => helper.GroupBy(items, (item) => item.idpersyaratan))
						);
						dataPersyaratan.forEach((syarat) => {
							var persyaratan = {
								iddetailpersyaratan: syarat[0].iddetailpersyaratan,
								idpersyaratan: syarat[0].idpersyaratan,
								nama: syarat[0].namapersyaratan,
								deskripsi: syarat[0].deskripsipersyaratan,
								status: syarat[0].status
							};

							if (persyaratan.idpersyaratan) {
								jenisPermohonan.persyaratan.push(persyaratan);
							}
						});
						results.push(jenisPermohonan);
					});
					resolve(results);
				}
			}
		);
	});
};

jenispermohonan.getById = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            jenispermohonan.*,
            persyaratan.nama AS namapersyaratan,
            persyaratan.deskripsi AS deskripsipersyaratan,
            persyaratan.status,
            detailpersyaratan.iddetailpersyaratan,
            detailpersyaratan.idpersyaratan
          FROM
            jenispermohonan
            LEFT JOIN detailpersyaratan ON jenispermohonan.idjenispermohonan =
          detailpersyaratan.idjenispermohonan
            LEFT JOIN persyaratan ON detailpersyaratan.idpersyaratan =
          persyaratan.idpersyaratan where jenispermohonan.idjenispermohonan=?`,
			[ Id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.idjenispermohonan));
					var dataJenisPermohonan = Object.values(datas);
					var results = [];
					dataJenisPermohonan.forEach((items) => {
						var jenisPermohonan = {
							persyaratan: [],
							idjenispermohonan: items[0].idjenispermohonan,
							nama: items[0].nama,
							jenis: items[0].jenis
						};

						var dataPersyaratan = Object.values(
							rx.of(items).pipe((data) => helper.GroupBy(items, (item) => item.idpersyaratan))
						);
						dataPersyaratan.forEach((syarat) => {
							var persyaratan = {
								iddetailpersyaratan: syarat[0].iddetailpersyaratan,
								idpersyaratan: syarat[0].idpersyaratan,
								nama: syarat[0].namapersyaratan,
								deskripsi: syarat[0].deskripsipersyaratan,
								status: syarat[0].status
							};

							if (persyaratan.idpersyaratan) {
								jenisPermohonan.persyaratan.push(persyaratan);
							}
						});
						results.push(jenisPermohonan);
					});
					resolve(results[0]);
				}
			}
		);
	});
};

jenispermohonan.getByJenis = async (Jenis) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            jenispermohonan.*,
            persyaratan.nama AS namapersyaratan,
            persyaratan.deskripsi AS deskripsipersyaratan,
            persyaratan.status,
            detailpersyaratan.iddetailpersyaratan,
            detailpersyaratan.idpersyaratan
          FROM
            jenispermohonan
            LEFT JOIN detailpersyaratan ON jenispermohonan.idjenispermohonan =
          detailpersyaratan.idjenispermohonan
            LEFT JOIN persyaratan ON detailpersyaratan.idpersyaratan =
          persyaratan.idpersyaratan where jenispermohonan.jenis=?`,
			[ Jenis ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					var datas = rx.of(result).pipe((data) => helper.GroupBy(result, (item) => item.idjenispermohonan));
					var dataJenisPermohonan = Object.values(datas);
					var results = [];
					dataJenisPermohonan.forEach((items) => {
						var jenisPermohonan = {
							persyaratan: [],
							idjenispermohonan: items[0].idjenispermohonan,
							nama: items[0].nama,
							jenis: items[0].jenis
						};

						var dataPersyaratan = Object.values(
							rx.of(items).pipe((data) => helper.GroupBy(items, (item) => item.idpersyaratan))
						);
						dataPersyaratan.forEach((syarat) => {
							var persyaratan = {
								iddetailpersyaratan: syarat[0].iddetailpersyaratan,
								idpersyaratan: syarat[0].idpersyaratan,
								nama: syarat[0].namapersyaratan,
								deskripsi: syarat[0].deskripsipersyaratan,
								status: syarat[0].status
							};

							if (persyaratan.idpersyaratan) {
								jenisPermohonan.persyaratan.push(persyaratan);
							}
						});
						results.push(jenisPermohonan);
					});
					resolve(results[0]);
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
				[ data.nama, JSON.stringify(data.persyaratan), data.jenis, data.deskripsi ],
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
				[ data.nama, JSON.stringify(data.persyaratan), data.jenis, data.deskripsi, data.idjenispermohonan ],
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

jenispermohonan.delete = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from jenispermohonan where idjenispermohonan=? ', [ id ], (err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			});
		} catch (err) {
			return reject(err);
		}
	});
};

jenispermohonan.postPersyaratan = async (data) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				'insert into detailpersyaratan  (idjenispermohonan, idpersyaratan) values(?,?)',
				[ data.idjenispermohonan, data.idpersyaratan ],
				(err, result) => {
					if (err) {
						return reject(err);
					} else {
						data.iddetailpersyaratan = result.insertId;
						resolve(data);
					}
				}
			);
		} catch (err) {
			return reject(err);
		}
	});
};

jenispermohonan.deletePersyaratan = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query('delete from detailpersyaratan where iddetailpersyaratan=? ', [ id ], (err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			});
		} catch (err) {
			return reject(err);
		}
	});
};

module.exports = jenispermohonan;

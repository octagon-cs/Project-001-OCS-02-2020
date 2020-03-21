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
            jenispermohonan.nama AS namapermohonan,
            jenispermohonan.jenis,
            pejabat.nama AS namapejabat,
            pejabat.nip,
            jabatan.nama AS namajabatan
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN jenispermohonan ON permohonan.idjenispermohonan =
          jenispermohonan.idjenispermohonan
            LEFT JOIN pejabat ON permohonan.idpejabat = pejabat.idpejabat
            LEFT JOIN jabatan ON pejabat.idpejabat = jabatan.idjabatan`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					result.forEach((element) => {
						element.data = JSON.parse(element.data);
						element.persetujuan = JSON.parse(element.persetujuan);
					});
					resolve(result);
				}
			}
		);
	});
};

db.getMyPermohonan = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            permohonan.*,
            penduduk.nama,
            penduduk.nik,
            penduduk.nkk,
            jenispermohonan.nama AS namapermohonan,
            jenispermohonan.jenis,
            pejabat.nama AS namapejabat,
            pejabat.nip,
            jabatan.nama AS namajabatan
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN jenispermohonan ON permohonan.idjenispermohonan =
          jenispermohonan.idjenispermohonan
            LEFT JOIN pejabat ON permohonan.idpejabat = pejabat.idpejabat
            LEFT JOIN jabatan ON pejabat.idpejabat = jabatan.idjabatan where penduduk.idusers=?`,
			[ id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					result.forEach((element) => {
						element.data = JSON.parse(element.data);
						element.persetujuan = JSON.parse(element.persetujuan);
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
            jenispermohonan.nama AS namapermohonan,
            jenispermohonan.jenis,
            pejabat.nama AS namapejabat,
            pejabat.nip,
            jabatan.nama AS namajabatan
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN jenispermohonan ON permohonan.idjenispermohonan =
          jenispermohonan.idjenispermohonan
            LEFT JOIN pejabat ON permohonan.idpejabat = pejabat.idpejabat
            LEFT JOIN jabatan ON pejabat.idjabatan = jabatan.idjabatan where idpermohonan=? `,
			[ Id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					if (result.length <= 0) resolve(result);
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

db.getByJenis = async (Id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            permohonan.*,
            penduduk.nama,
            penduduk.nik,
            penduduk.nkk,
            jenispermohonan.nama AS namapermohonan,
            jenispermohonan.jenis,
            pejabat.nama AS namapejabat,
            pejabat.nip,
            jabatan.nama AS namajabatan
          FROM
            permohonan
            LEFT JOIN penduduk ON permohonan.idpenduduk = penduduk.idpenduduk
            LEFT JOIN jenispermohonan ON permohonan.idjenispermohonan =
          jenispermohonan.idjenispermohonan
            LEFT JOIN pejabat ON permohonan.idpejabat = pejabat.idpejabat
            LEFT JOIN jabatan ON pejabat.idjabatan = jabatan.idjabatan where permohonan.idjenispermohonan=? `,
			[ Id ],
			(err, result) => {
				if (err) {
					return reject(err);
				} else {
					result.forEach((element) => {
						element.data = JSON.parse(element.data);
						element.persetujuan = JSON.parse(element.persetujuan);
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
			data.tanggalpengajuan = new Date();
			pool.query(
				'insert into permohonan  (idpenduduk, idpejabat, tanggalpengajuan, data,persetujuan,idjenispermohonan, nomorsurat) values(?,?,?,?,?,?,?)',
				[
					data.idpenduduk,
					data.idpejabat,
					data.tanggalpengajuan,
					JSON.stringify(data.data),
					JSON.stringify(data.persetujuan),
					data.idjenispermohonan,
					data.nomorsurat
				],
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
			data.tanggalpengajuan = new Date(data.tanggalpengajuan);
			pool.query(
				'update permohonan set idpenduduk=?, idpejabat=?, tanggalpengajuan=?, data=?, persetujuan=?, status=?, idjenispermohonan=?, nomorsurat=? where idpermohonan=? ',
				[
					data.idpenduduk,
					data.idpejabat,
					data.tanggalpengajuan,
					JSON.stringify(data.data),
					JSON.stringify(data.persetujuan),
					data.status,
					data.idjenispermohonan,
					data.nomorsurat,
					data.idpermohonan
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
			pool.query('delete from permohonan where idpermohonan=? ', [ id ], (err, result) => {
				if (err) {
					return reject(err);
				} else resolve(true);
			});
		} catch (err) {
			return reject(err);
		}
	});
};

module.exports = db;

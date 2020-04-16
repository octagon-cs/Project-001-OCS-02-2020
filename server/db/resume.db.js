const pool = require('./dbconnection');
const db = {};

db.getDasboard = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
            count(*) as penduduk,
            count(IF(JenisKelamin='Laki-Laki',1,null)) as laki,
            count(IF(JenisKelamin!='Laki-Laki',1,null)) as perempuan,
            count(IF(StatusDalamKeluarga='Kepala Keluarga',1,null)) as kk
            FROM
             penduduk`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.kelompokUmur = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
				CASE
					WHEN umur <= 6 THEN '0-6'
					WHEN umur BETWEEN 7 and 17 THEN '7 - 17'
					WHEN umur BETWEEN 18 and 35 THEN '18 - 35'
							WHEN umur BETWEEN 36 and 65 THEN '36 - 65'
					WHEN umur > 65 THEN '>65'
					WHEN umur IS NULL THEN '(NULL)'
				END as label,
				COUNT(*) AS jumlah,
				SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
        		SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			
			FROM (select nik, nama, jeniskelamin, tanggallahir, TIMESTAMPDIFF(YEAR, tanggallahir, CURDATE()) AS umur from penduduk where penduduk.status='aktif' )  as dummy_table
			GROUP BY label
			ORDER BY label;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.golonganDarah = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT golongandarah as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY golongandarah;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.pekerjaan = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT pekerjaan as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY pekerjaan;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.statusPerkawinan = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statusperkawinan as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statusperkawinan;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.pendidikan = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT pendidikanterakhir as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY pendidikanterakhir;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.agama = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT agama as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY agama;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.suku = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT suku as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY suku;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};
db.jenisKelamin = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT jeniskelamin as label, COUNT(*) as jumlah
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY jeniskelamin;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.kewargaNegaraan = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT kewarganegawaan as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY kewarganegawaan;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.statusKIP = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statuskip as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statuskip;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.statusKIS = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statuskis as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statuskis;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.penghasilan = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT penghasilantetap as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY penghasilantetap;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.statusKK = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statuskk as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statuskk;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.kedudukanDalamKeluarga = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statusdalamkeluarga as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statusdalamkeluarga;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.statusSosial = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT statussosial as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY statussosial;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.tempatTinggal = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT tempattinggal as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY tempattinggal;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

db.bacaHuruf = async () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT bacahuruf as label, COUNT(*) as jumlah,
			SUM(CASE WHEN jeniskelamin = 'LAKI-LAKI' THEN 1 ELSE 0 END) AS pria,
			SUM(CASE WHEN jeniskelamin = 'PEREMPUAN' THEN 1 ELSE 0 END) AS wanita
			FROM penduduk where penduduk.status='aktif'     
			GROUP BY bacahuruf;`,
			(err, result) => {
				if (err) {
					return reject(err);
				} else resolve(result);
			}
		);
	});
};

module.exports = db;

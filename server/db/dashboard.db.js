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

module.exports = db;

const express = require('express');
const router = express.Router();
const contextDb = require('../db');

router.get('/dashboard', async (req, res) => {
	try {
		var data = await contextDb.Dashboard.getDasboard();
		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/kelompok/:param', async (req, res) => {
	try {
		var param = req.params.param;
		var data = null;
		switch (param) {
			case 'umur':
				data = await contextDb.Resume.kelompokUmur();
				break;
			case 'agama':
				data = await contextDb.Resume.agama();
				break;
			case 'baca huruf':
				data = await contextDb.Resume.bacaHuruf();
				break;
			case 'golongan darah':
				data = await contextDb.Resume.golonganDarah();
				break;
			case 'jenis kelamin':
				data = await contextDb.Resume.jenisKelamin();
				break;
			case 'kedudukan dalam keluarga':
				data = await contextDb.Resume.kedudukanDalamKeluarga();
				break;
			case 'kewarganegaraan':
				data = await contextDb.Resume.kewargaNegaraan();
				break;
			case 'pekerjaan':
				data = await contextDb.Resume.pekerjaan();
				break;
			case 'pendidikan':
				data = await contextDb.Resume.pendidikan();
				break;
			case 'penghasilan':
				data = await contextDb.Resume.penghasilan();
				break;
			case 'status KIP':
				data = await contextDb.Resume.statusKIP();
				break;
			case 'status KIS':
				data = await contextDb.Resume.statusKIS();
				break;
			case 'status KK':
				data = await contextDb.Resume.statusKK();
				break;
			case 'status perkawinan':
				data = await contextDb.Resume.statusPerkawinan();
				break;
			case 'status sosial':
				data = await contextDb.Resume.statusSosial();
				break;
			case 'suku':
				data = await contextDb.Resume.suku();
				break;
			case 'tempat tinggal':
				data = await contextDb.Resume.tempatTinggal();
				break;

			default:
				throw Error('Kelompok ' + param + ' Tidak Ditemukan');
		}
		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', async (req, res) => {
	try {
		contextDb.Penduduk.get().then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/:id', async (req, res) => {
	var id = req.params.id;
	try {
		contextDb.Penduduk.getById(id).then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/byname/:nama', async (req, res) => {
	var nama = req.params.nama;
	try {
		contextDb.Penduduk.getByName(nama).then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/bynkk/:nkk', async (req, res) => {
	var nkk = req.params.nkk;
	try {
		contextDb.Penduduk.get(nkk).then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/bynik/:nik', async (req, res) => {
	var nik = req.params.nik;
	try {
		contextDb.Penduduk.get(nik).then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const user = req.body;
		if (user.tanggallahir) {
			user.tanggallahir = new Date(user.tanggallahir);
		}
		contextDb.Penduduk.post(user).then(
			(data) => {
				res.status(200).json(data);
			},
			(err) => {
				res.status(400).json({
					message: err.message
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.put('/', async (req, res) => {
	try {
		const user = req.body;
		contextDb.Penduduk.put(user).then(
			(data) => {
				res.status(200).json(data);
			},
			(err) => {
				res.status(400).json({
					message: err.message
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.delete('/:id', async (req, res) => {
	var id = req.params.id;
	try {
		const user = req.body;
		contextDb.Penduduk.delete(id).then(
			(data) => {
				res.status(200).json(data);
			},
			(err) => {
				res.status(400).json({
					message: err.message
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/dokumen', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var data = req.body;
		var fileType = data.jenis === 'ktp' ? 'ktp' : data.jenis === 'kk' ? 'kk' : 'lain';
		var filename = 'client\\document\\' + fileType + '\\' + uuid.v1() + '.' + data.extention;
		data.file = filename;
		fs.writeFile(filename, data.data, 'base64', async function(err) {
			if (err) {
				res.status(400).json({
					message: 'document tidak tersimpan'
				});
			} else {
				var document = await contextDb.Penduduk.getDocument(model.idpenduduk);
				var docExist = document.find((x) => x.jenis == fileType && x.jenis !== 'lain');
				if (docExist) {
					fs.unlink(docExist.file, function(err) {});
					docExist.file = data.file;
					data = await contextDb.Penduduk.updateDocument(docExist);
				} else {
					data = await contextDb.Penduduk.insertDocuemnt(data);
				}
				res.status(200).json(data);
			}
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

module.exports = router;

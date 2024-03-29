const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');
const uuid = require('uuid');
const fs = require('fs');

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
		contextDb.Penduduk.getByNKK(nkk).then((data) => {
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
		contextDb.Penduduk.getByNIK(nik).then((data) => {
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

router.get('/dokumen/:idpenduduk', async (req, res) => {
	try {
		var penduduk = await contextDb.Penduduk.getById(req.params.idpenduduk);
		var document = await contextDb.Penduduk.getDocument(penduduk);
		if (document) {
			res.status(200).json(document);
		} else {
			throw new Error('Dokument Tidak Ditemukan');
		}
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/dokumen', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var data = req.body;
		var folder = 'client\\document\\';
		var filename = uuid.v1() + '.' + data.extention;
		data.file = filename;

		fs.writeFile(folder + filename, data.data, 'base64', async function(err) {
			if (err) {
				res.status(400).json({
					message: 'document tidak tersimpan'
				});
			} else {
				var documents = await contextDb.Penduduk.getDocument(data);
				var doc =
					data.status > 0
						? documents.find((x) => x.idpersyaratan == data.idpersyaratan && x.status > 0)
						: documents.find(
								(x) => x.idpersyaratan == data.idpersyaratan && x.idpermohonan == data.idpermohonan
							);
				if (doc && doc.iddokumenpenduduk) {
					
					var docFIle = doc.file;
					doc.file = filename;
					var document = await contextDb.Penduduk.updateDocument(doc);
					if (document) {
						fs.unlinkSync(folder + docFIle);
						res.status(200).json(document);
					} else {
						fs.unlinkSync(folder + filename);
						res.status(400).json({
							message: 'document tidak tersimpan'
						});
					}
				} else {
					a = Object.assign({}, data);
					if(doc.status==2 && data.statusdalamkeluarga!=='Kepala Keluarga'){
						var penduduk = await contextDb.Penduduk.getByNKK(data.nkk);
						a.idpenduduk = penduduk.find(itempenduduk => itempenduduk.statusdalamkeluarga=='Kepala Keluarga').idpenduduk;
					}
					var document = await contextDb.Penduduk.insertDocument(a);
					if (document) {
						document.idpenduduk=data.idpenduduk;
						res.status(200).json(document);
					} else {
						fs.unlinkSync(folder + filename);
						res.status(400).json({
							message: 'document tidak tersimpan'
						});
					}
				}
			}
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

module.exports = router;

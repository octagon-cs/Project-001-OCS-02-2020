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

module.exports = router;

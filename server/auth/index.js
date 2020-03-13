const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authJwt = require('./verifyToken.js');
const config = require('../auth/config');
const fs = require('fs');
const uuid = require('uuid');
const fcm = require('../notification')

router.get('/', async (req, res, next) => {
	try {
		const data = await contextDb.Users.get().then(result => {
			res.status(200).json({
				data: data
			});
		});;

	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = req.body;
		contextDb.Users.login(user).then(
			(data) => {
				if (!data || data.length <= 0) {
					res.status(401).json({
						message: 'Anda Tidak Memiliki User Akses, Silahkan Registrasi'
					});
				} else {
					var item = data[0];

					if (!item.aktif) {
						res.status(401).json({
							message: 'Silahkan Confirmasi Email Anda !'
						});
						return;

					}

					if (!bcrypt.compareSync(req.body.password, item.password)) {
						res.status(401).json({
							message: 'Password Anda Salah'
						});
						return;

					} else {
						item.roles = [];
						data.forEach((element) => {
							item.roles.push(element.role);
						});

						var token = jwt.sign({
							id: item.idusers,
							username: item.email,
							roles: item.roles,
							iat: 86400 * 30
						}, config.secret);
						item.password = null;
						item.token = token;
						return res.status(200).send(item);
					}
				}
			},
			(err) => {
				res.status(401).json({
					message: 'Anda Tidak Memiliki User Akses, Silahkan Registrasi'
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/devicetoken', [authJwt.verifyToken], async (req, res) => {
	try {
		const data = req.body;
		var user = req.User;
		var result = await contextDb.Users.AddDeviceToken(data.token, user.userid);
		if (result) {
			await fcm.subscribe("all", data.token);
			res.status(200).json(result);
		} else {
			res.status(400).json({
				message: "Anda Belum Registrasi Memiliki Akun"
			});
		}


	} catch (err) {
		if (err.errno && err.errno == 1062) {
			res.status(400).json({
				errno: err.errno,
				message: "Anda Belum Telah Memiliki Akun"
			});
		} else
			res.status(400).json({
				message: err.message
			});
	}

});


router.post('/registrasi', async (req, res) => {
	try {
		const user = req.body;

		if (user.nik && user.nkk) {
			var penduduk = await contextDb.Penduduk.getByNIK(user.nik);
			if (penduduk.idusers)
				throw Error("Anda Telah Memiliki Akun");


			if (penduduk) {
				if (penduduk.nkk != user.nkk)
					throw Error("Nomor KK Anda Salah");
				var hostname = req.protocol + "://" + req.headers.host
				var result = await contextDb.Users.register(penduduk.idpenduduk, user, hostname);
				if (result) {
					res.status(200).json({
						message: "Berhasil !, Silahkan Confirmasi Email Anda",
						penduduk: penduduk
					})
				}
			} else throw Error("Data Kependudukan Anda Tidak Ditemukan");

		} else {
			throw Error("Data Kependudukan Anda Tidak Ditemukan");
		}
	} catch (err) {
		if (err.errno && err.errno == 1062) {
			res.status(400).json({
				errno: err.errno,
				message: "Anda Telah Memiliki Akun"
			});
		} else
			res.status(400).json({
				message: err.message
			});
	}

});


router.post('/changepassword', [authJwt.verifyToken], async (req, res) => {
	try {
		const user = req.body;
		var newpassword = bcrypt.hashSync(user.password, 8);
		contextDb.Users.changepassword(req.User.userid, newpassword).then((x) => {
			res.status(200).json(x);
		}, err => {
			res.status(400).json({
				message: err.message
			});
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/confirmemail', [authJwt.verifyToken], async (req, res) => {
	try {
		const data = req.body;
		var result = await contextDb.Users.confirmemail(req.User.userid);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({
				message: "Terjadi Kesalahan, Coba Ulangi Lagi Nanti.."
			});
		}
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/resetpassword', async (req, res) => {
	try {
		const data = req.body;
		var hostname = req.protocol + "://" + req.headers.host
		contextDb.Users.resetpassword(data.email, hostname).then(
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


router.get('/profile', [authJwt.verifyToken], async (req, res) => {
	try {
		var userId = req.userId;
		var isadministrator = req.roles.find((x) => x === 'administrator');
		if (isadministrator) {
			contextDb.Administrator.profile(userId).then(
				(response) => {
					res.status(200).json(response);
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else {
			contextDb.Users.profile(userId).then(
				(response) => {
					res.status(200).json(response);
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		}
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/foto', [authJwt.verifyToken], async (req, res) => {
	var data = req.body;
	var userid = req.userId;
	var filename = uuid.v1() + '.png';
	fs.writeFile('assets\\profile\\' + filename, data.data, 'base64', function (err) {
		if (err) {
			res.status(400).json({
				message: 'err'
			});
		} else {
			contextDb.Users.changeFoto({
				idusers: userid,
				photo: filename
			}).then(
				(x) => {
					res.status(200).json({
						data: filename
					});
				},
				(err) => {
					res.status(400).json({
						message: 'err'
					});
				}
			);
		}
	});
});





module.exports = router;
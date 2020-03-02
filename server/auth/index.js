const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authJwt = require('./verifyToken.js');
const config = require('../auth/config');
const fs = require('fs');
const uuid = require('uuid');
const helper = require('../helper');

router.get('/', async (req, res) => {
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
						message: 'Anda Tidak Memiliki User Akses'
					});
				} else {
					var item = data[0];
					if (!bcrypt.compareSync(req.body.password, item.password))
						res.status(401).json({
							message: 'Anda Tidak Memiliki User Akses'
						});
					else {
						item.roles = [];
						data.forEach((element) => {
							item.roles.push(element.role);
						});

						var token = jwt.sign({
							id: item.idusers,
							roles: item.roles
						}, config.secret, {
							expiresIn: 86400 // expires in 24 hours
						});
						item.password = null;
						item.token = token;
						res.status(200).json(item);
					}
				}
			},
			(err) => {
				res.status(401).json({
					message: 'Anda Tidak Memiliki User Akses'
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/changepassword', async (req, res) => {
	try {
		const user = req.body;
		contextDb.Users.login(user).then(
			(data) => {
				if (!data || data.length <= 0) {
					res.status(401).json({
						message: 'Anda Tidak Memiliki User Akses'
					});
				} else {
					var item = data[0];
					if (!bcrypt.compareSync(user.password, item.password))
						res.status(401).json({
							message: 'Password Lama Anda Salah'
						});
					else {
						user.newpassword = bcrypt.hashSync(user.newpassword, 8);
						contextDb.Users.changepassword(user).then((x) => {
							res.status(200).json(x);
						});
					}
				}
			},
			(err) => {
				res.status(401).json({
					message: 'Anda Tidak Memiliki User Akses'
				});
			}
		);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/resetpassword', async (req, res) => {
	try {
		const data = req.body;
		contextDb.Users.resetpassword(data.email).then(
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

router.post('/registerdosen', async (req, res) => {
	try {
		const user = req.body;
		user.passwordText = helper.makeid(5);
		user.password = bcrypt.hashSync(user.passwordText, 8);
		contextDb.Users.registerDosen(user).then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					res.status(400).json({
						message: 'Data Tidak Tersimpan'
					});
				}
			},
			(err) => {
				if (err.errno) {
					var message = "";
					switch (err.errno) {
						case 1062:
							message = 'username/email user telah terdaftar'
							break;
						default:
							message = err.message
							break;
					}

					res.status(400).json({
						message: message
					});

				} else {
					res.status(400).json(err);
				}

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
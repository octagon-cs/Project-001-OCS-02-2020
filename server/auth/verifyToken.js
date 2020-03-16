const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const db = require('../db');

verifyToken = (req, res, next) => {
	try {
		let header = req.headers['authorization'];
		if (!header) {
			return res.status(403).send({
				auth: false,
				message: 'Anda Tidak Memiliki Akses.'
			});
		}
		let token = header.split(' ')[1];
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					auth: false,
					message: 'Fail to Authentication. Error -> ' + err
				});
			}

			db.Users.getUserByEmail(decoded.username).then(user => {
				if (user) {
					req.User = {
						userid: decoded.id,
						username: decoded.username,
						roles: decoded.roles
					}
					next();
				} else {
					return res.status(401).send({
						auth: false,
						message: 'Fail to Authentication. Error -> ' + err
					});
				}
			});

		});
	} catch (error) {
		return res.status(401).send({
			auth: false,
			message: 'Fail to Authentication. Error -> ' + err
		});
	}
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
// authJwt.isAdmin = isAdmin;
// authJwt.isMitra = isMitra;
// authJwt.CheckRole = ChechRole;
module.exports = authJwt;
const nodemailer = require('nodemailer');
const helper = {};
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const config = require('./auth/config');

const senderEmail = "ocph23.test@gmail.com";
var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: senderEmail,
		pass: 'Sony@7777'
	}
});

const handlebarOptions = {
	viewEngine: {
		extName: '.hbs',
		partialsDir: './server/notification/emails',
		layoutsDir: './server/notification/emails',
		defaultLayout: 'password.hbs'
	},
	viewPath: './server/notification/emails',
	extName: '.hbs'
};


helper.GroupBy = (data, key) =>
	data.reduce((agg, item) => {
		const group = key(item);
		agg[group] = [...(agg[group] || []), item];
		return agg;
	}, {});


helper.sendEmailResetPassword = (data, hostname) => {
	return new Promise((resolve, reject) => {
		var token = jwt.sign({
			id: data.idusers,
			username: data.email,
			iat: 86400 * 1
		}, config.secret);

		var url = hostname + "/#!/account/changepassword/" + token;

		var temlate = "resetpassword"

		handlebarOptions.viewEngine.defaultLayout = temlate + ".hbs";
		transporter.use('compile', hbs(handlebarOptions));
		var mailOptions = {
			from: senderEmail,
			to: data.email,
			subject: "Reset Password",
			template: temlate,
			context: {
				url: url
			},
			text: 'Reset Password',
			attachments: [{
				filename: 'wonlogo.png',
				path: './server/notification/emails/wonlogo.png',
				cid: 'unique@cid'
			}]
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				reject(error);
			} else {
				resolve(true);
			}
		});
	});
};



helper.sendEmailConfirmEmail = (data, hostname) => {
	return new Promise((resolve, reject) => {
		var token = jwt.sign({
			id: data.idusers,
			username: data.email,
			iat: 86400 * 1
		}, config.secret);

		var url = hostname + "/#!/account/confirmemail/" + token;

		var temlate = "confirmemail"

		handlebarOptions.viewEngine.defaultLayout = temlate + ".hbs";
		transporter.use('compile', hbs(handlebarOptions));
		var mailOptions = {
			from: senderEmail,
			to: data.email,
			subject: "Confirm Email",
			template: temlate,
			context: {
				url: url
			},
			text: 'Confirm Email',
			attachments: [{
				filename: 'wonlogo.png',
				path: './server/notification/emails/wonlogo.png',
				cid: 'unique@cid'
			}]
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				reject(error);
			} else {
				resolve(true);
			}
		});
	});
};




helper.makeid = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

module.exports = helper;
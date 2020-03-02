const nodemailer = require('nodemailer');
const helper = {};
const hbs = require('nodemailer-express-handlebars');

helper.GroupBy = (data, key) =>
	data.reduce((agg, item) => {
		const group = key(item);
		agg[group] = [...(agg[group] || []), item];
		return agg;
	}, {});

helper.sendEmail = (message) => {
	return new Promise((resolve, reject) => {
		const senderEmail = 'reinsemboari@gmail.com';

		var transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: senderEmail,
				pass: 'Blesed473185'
			}
		});

		const handlebarOptions = {
			viewEngine: {
				extName: '.hbs',
				partialsDir: 'emailtemplate/email',
				layoutsDir: 'emailtemplate/email',
				defaultLayout: 'password.hbs'
			},
			viewPath: 'emailtemplate/email',
			extName: '.hbs'
		};

		transporter.use('compile', hbs(handlebarOptions));

		var mailOptions = {
			from: senderEmail,
			to: message.to,
			subject: message.subject,
			template: 'password',
			context: {
				username: message.to,
				password: message.password
			},
			text: 'Success',
			attachments: [{
				filename: 'lldikti.png',
				path: 'assets/img/lldikti.png',
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
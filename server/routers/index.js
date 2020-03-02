module.exports = function (app) {
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use('/api/auth', require('../auth'));
};
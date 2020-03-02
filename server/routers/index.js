module.exports = function (app) {
	app.use('/api/auth', require('../auth'));
	app.use('/api/jabatan', require('../routers/jabatan.router'));
	app.use('/api/pejabat', require('../routers/pejabat.router'));
	app.use('/api/jenispermohonan', require('../routers/jenispermohonan'));
	app.use('/api/profildesa', require('../routers/profiledesa.roter'));
};
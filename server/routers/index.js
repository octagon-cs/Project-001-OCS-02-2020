module.exports = function (app) {
	app.use('/api/auth', require('../auth'));
	app.use('/api/jabatan', require('../routers/jabatan.router'));
	app.use('/api/pejabat', require('../routers/pejabat.router'));
	app.use('/api/jenispermohonan', require('../routers/jenispermohonan.router'));
	app.use('/api/profildesa', require('../routers/profiledesa.roter'));
	app.use('/api/penduduk', require('../routers/penduduk.router'))
	app.use('/api/permohonan', require('../routers/permohonan.reouter'))
};
module.exports = function(app) {
	app.use('/api/auth', require('../auth'));
	app.use('/api/jabatan', require('../routers/jabatan.router'));
	app.use('/api/pejabat', require('../routers/pejabat.router'));
	app.use('/api/jenispermohonan', require('../routers/jenispermohonan.router'));
	app.use('/api/profildesa', require('../routers/profiledesa.roter'));
	app.use('/api/penduduk', require('../routers/penduduk.router'));
	app.use('/api/inbox', require('../routers/inbox.router'));
	app.use('/api/permohonan', require('../routers/permohonan.reouter'));
	app.use('/api/persyaratan', require('../routers/persyaratan.router'));
	app.use('/api/resume', require('../routers/resume.router'));
};

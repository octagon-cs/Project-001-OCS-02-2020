const dbContext = {
	Users: require('./user.db'),
	Roles: require('./role.db'),
	Jabatan: require('./jabatan.db'),
	Pejabat: require('./pejabat.db'),
	JenisPermohonan: require('./jenispermohonan.db'),
	Profile: require('./profiledesa.db'),
	Penduduk: require('./penduduk.db'),
	Permohonan: require('./permohonan.db'),
	Inbox: require('./inbox.db'),
};

module.exports = dbContext;
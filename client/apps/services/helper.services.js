angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};
	service.url = 'http://localhost:3000';
	service.KepemilikanKTP=["Sudah Memiliki KTP", "Belum Memiliki KTP", "Pembuatan KTP Dalam Proses"];
	service.GolonganDarah=["A", "B", "AB", "O"];
	service.Agama=["Islam", "Katholik", "Kristen", "Hindu", "Budha", "Lainnya"];
	service.JenisKelamin=["Pria", "Wanita"];
	service.PendidikanTerakhir=["Tidak/Belum Sekolah", "Belum Tamat SD/Sederajat", "Tamat SD/Sederajat", "SLTP/Sederajat", "SLTA/Sederajat", "Diploma I/II", "Akademi/Diploma III/Sarjana Muda", "Diploma IV/Strata I", "Strata II", "Strata III"];
	service.PenghasilanTetap=["Lebih Dari Rp 1.000.000", "Lebih Dari Rp 750.000 s/d Rp 1.000.000", "Lebih Dari Rp 500.000 s/d Rp 750.000", "Rp 500.000 atau Kurang"];
	service.Kewarganegaraan=["Warga Negara Indonesia (WNI)", "Warga Negara Asing (WNA)", "Lainnya..."];
	service.StatusTT=["Rumah Milik Sendiri", "Kontrak Rumah", "Sewa Tanah", "Tinggal Dengan Oranng Tua", "Tinggal Dengan Mertua", "Numpang Dengan Saudara", "Numpang Dengan Tetangga", "Numpang Dengan Teman", "Tidak Memiliki Rumah", "Lainnya..."  ];
	service.StatusKIS=["Sudah Memiliki KIS", "Belum Memiliki KIS", "KIS Masih Dalam Proses"];
	service.StatusSosial=["Penduduk Sangat Miskin", "Penduduk Miskin", "Penduduk Hampir Miskin", "Penduduk Rentan Miskin", "Penduduk Tidak Miskin", "Tidak Tahu"];
	service.StatusKK=["Sudah Memiliki KK", "belum Memiliki KK", "KK Masih Dalam Proses"];
	service.StatusKIP=["Sudah Memiliki KIP", "Belum Memiliki KIP", "KIP Masih Dalam Proses"];
	service.StatusKeluarga=["Kepala Keluarga", "Orang Tua", "Suami", "Istri", "Anak", "Menantu", "Mertua", "Cucu", "Keluarga Lain", "Pembantu", "Lainnya..."];


	return {
		url: service.url,
		StatusKepemilikanKTP: service.KepemilikanKTP,
		Agama: service.Agama,
		PendidikanTerakhir: service.PendidikanTerakhir,
		PenghasilanTetap: service.PenghasilanTetap,
		Kewarganegaraan: service.Kewarganegaraan,
		StatusTT: service.StatusTT,
		StatusKIS: service.StatusKIS,
		StatusSosial: service.StatusSosial,
		StatusKK: service.StatusKK,
		StatusKIP: service.StatusKIP,
		StatusKeluarga: service.StatusKeluarga
	};
}
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


	return {
		url: service.url,
		StatusKepemilikanKTP: service.KepemilikanKTP
	};
}
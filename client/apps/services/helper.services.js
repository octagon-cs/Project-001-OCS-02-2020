angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};

	//service.url = 'http://waena-desa.id';
	service.url = 'http://localhost:3000';


	service.KepemilikanKTP = ["Sudah Memiliki KTP", "Belum Memiliki KTP", "Pembuatan KTP Dalam Proses"];
	service.GolonganDarah = ["O", "A", "A-", "A+", "AB", "AB-", "AB+", "B", "B-", "O-", "O+", "TIDAK TAHU"];
	service.Agama = ["ISLAM", "KATHOLOK", "KRISTEN", "HINDU", "BUDHA", "LAINNYA"];
	service.JenisKelamin = ["LAKI-LAKI", "PEREMPUAN"];
	service.PendidikanTerakhir = ["Tidak/Belum Sekolah", "Belum Tamat SD/Sederajat", "Tamat SD/Sederajat", "SLTP/Sederajat", "SLTA/Sederajat", "Diploma I/II", "Akademi/Diploma III/Sarjana Muda", "Diploma IV/Strata I", "Strata II", "Strata III"];
	service.PenghasilanTetap = ["Lebih Dari Rp 1.000.000", "Lebih Dari Rp 750.000 s/d Rp 1.000.000", "Lebih Dari Rp 500.000 s/d Rp 750.000", "Rp 500.000 atau Kurang"];
	service.Kewarganegaraan = ["Warga Negara Indonesia (WNI)", "Warga Negara Asing (WNA)", "Lainnya..."];
	service.StatusTT = ["Rumah Milik Sendiri", "Kontrak Rumah", "Sewa Tanah", "Tinggal Dengan Oranng Tua", "Tinggal Dengan Mertua", "Numpang Dengan Saudara", "Numpang Dengan Tetangga", "Numpang Dengan Teman", "Tidak Memiliki Rumah", "Lainnya..."];
	service.StatusKIS = ["Sudah Memiliki KIS", "Belum Memiliki KIS", "KIS Masih Dalam Proses"];
	service.StatusSosial = ["Penduduk Sangat Miskin", "Penduduk Miskin", "Penduduk Hampir Miskin", "Penduduk Rentan Miskin", "Penduduk Tidak Miskin", "Tidak Tahu"];
	service.StatusKK = ["Sudah Memiliki KK", "belum Memiliki KK", "KK Masih Dalam Proses"];
	service.StatusKIP = ["Sudah Memiliki KIP", "Belum Memiliki KIP", "KIP Masih Dalam Proses"];
	service.StatusKeluarga = ["Kepala Keluarga", "Orang Tua", "Suami", "Istri", "Anak", "Menantu", "Mertua", "Cucu", "Keluarga Lain", "Pembantu", "Lainnya..."];
	service.StatusPerkawinan = ["BELUM KAWIN", "KAWIN", "DUDA", "JANDA", "CERAI HIDUP", "CERAI MATI"];
	service.Kewarganegawaan = ["WNI", "WNA"];
	service.BacaHuruf = [
		"Tidak Dapat Membaca (Buta Huruf)",
		"Huruf Daerah",
		"Huruf Indonesia",
		"Huruf Inggris",
		"Huruf Arab",
		"Indonesia dan Daerah",
		"Indonesia dan Inggris",
		"Indonesia dan Arab",
		"Indoneisa Daeah dan Inggris",
		"Indoneisa Daeah dan Arab",
		"Indoneisa Daeah Inggris dan Arab",
		"Huruf Lainnya",
		"Belum Membaca"
	];
	service.Pekerjaan = [
		"BELUM/TIDAK BEKERJA",
		"ANGGOTA DPRD KABUPATEN/KOTA",
		"ARSITEK",
		"BIDAN",
		"BUPATI",
		"BURUH HARIAN LEPAS",
		"BUTUH TANI/PERKEBUNAN",
		"DOKTER",
		"DOSEN",
		"GURU",
		"INDUSTRI",
		"KARYAWAN BUMD",
		"KARYAWAN BUMN",
		"KARYAWAN HONORER",
		"KARYAWAN SWASTA",
		"KEPALA DESA",
		"KEPOLISIAN RI",
		"KONSULTAN",
		"MEKANIK",
		"PENGURUS RUMAH TANGGA",
		"NELAYAN/PERIKANAN",
		"NOTARIS",
		"PASTOR",
		"PEDAGANG",
		"PEGAWAI NEGERI SIPIL",
		"PELAJAR/MAHASISWA",
		"PELAUT",
		"PEMBANTU RUMAH TANGGA",
		"PENATA RAMBUT",
		"PENDETA",
		"PENELITI",
		"PENGACARA",
		"PENSIUNAN",
		"PENYIAR TELEVISI",
		"PERANGKAT DESA",
		"PERAWAT",
		"PERDAGANGAN",
		"PETANI/PERKEBUNAN",
		"PETERNAK",
		"SOPIR",
		"TNI",
		"TUKANG BATU",
		"TUKANG JAHIT",
		"LAINNYA"
	];
	service.PermohonanJenis = [
		"Pengantar KTP", "Pengantar KK", "Tidak Mampu", "Keterangan Domisili", "Keterangan SKCK", "Keterangan Usaha",
		"Penguasaan Tanah", "Keterangan Desa", "Keterangan Cerai", "Keterangan eKTP", "Keterangan Nikah", "Kelahiran", "Sudah Menikah",
		"Belum Menikah", "Kematian", "Keterangan Lainnya", "Pindah"
	];
	service.Roles = ["pemohon", "admin", "kasi", "seklur", "lurah"]


	return {
		url: service.url,
		BacaHuruf: service.BacaHuruf,
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
		StatusKeluarga: service.StatusKeluarga,
		GolonganDarah: service.GolonganDarah,
		StatusPerkawinan: service.StatusPerkawinan,
		JenisKelamin: service.JenisKelamin,
		Pekerjaan: service.Pekerjaan,
		Kewarganegawaan: service.Kewarganegawaan,
		PermohonanJenis: service.PermohonanJenis,
		Roles: service.Roles
	};
}
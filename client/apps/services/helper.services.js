angular
	.module('helper.service', [])
	.factory('helperServices', helperServices)
	.factory('approvedService', approvedService)
	.factory('tabService', tabServices);

function helperServices() {
	var service = {};
	var source = {};

	//service.url = 'http://waena-desa.id';
	service.url = 'http://localhost:3000';
	source.KepemilikanKTP = [ 'Sudah Memiliki KTP', 'Belum Memiliki KTP', 'Pembuatan KTP Dalam Proses' ];
	source.GolonganDarah = [ 'O', 'A', 'A-', 'A+', 'AB', 'AB-', 'AB+', 'B', 'B-', 'O-', 'O+', 'TIDAK TAHU' ];
	source.Agama = [ 'ISLAM', 'KATOLIK', 'KRISTEN', 'HINDU', 'BUDHA', 'KONGHUCHU', 'LAINNYA' ];
	source.JenisKelamin = [ 'LAKI-LAKI', 'PEREMPUAN' ];
	source.PendidikanTerakhir = [
		'Tidak/Belum Sekolah',
		'Belum Tamat SD/Sederajat',
		'Tamat SD/Sederajat',
		'SLTP/Sederajat',
		'SLTA/Sederajat',
		'Diploma I/II',
		'Akademi/Diploma III/Sarjana Muda',
		'Diploma IV/Strata I',
		'Strata II',
		'Strata III'
	];
	source.PenghasilanTetap = [
		'Lebih Dari Rp 1.000.000',
		'Lebih Dari Rp 750.000 s/d Rp 1.000.000',
		'Lebih Dari Rp 500.000 s/d Rp 750.000',
		'Rp 500.000 atau Kurang'
	];
	source.Kewarganegaraan = [ 'Warga Negara Indonesia (WNI)', 'Warga Negara Asing (WNA)', 'Lainnya...' ];
	source.StatusTT = [
		'Rumah Milik Sendiri',
		'Kontrak Rumah',
		'Sewa Tanah',
		'Tinggal Dengan Oranng Tua',
		'Tinggal Dengan Mertua',
		'Numpang Dengan Saudara',
		'Numpang Dengan Tetangga',
		'Numpang Dengan Teman',
		'Tidak Memiliki Rumah',
		'Lainnya...'
	];
	source.StatusKIS = [ 'Sudah Memiliki KIS', 'Belum Memiliki KIS', 'KIS Masih Dalam Proses' ];
	source.StatusSosial = [
		'Penduduk Sangat Miskin',
		'Penduduk Miskin',
		'Penduduk Hampir Miskin',
		'Penduduk Rentan Miskin',
		'Penduduk Tidak Miskin',
		'Tidak Tahu'
	];
	source.StatusKK = [ 'Sudah Memiliki KK', 'belum Memiliki KK', 'KK Masih Dalam Proses' ];
	source.StatusKIP = [ 'Sudah Memiliki KIP', 'Belum Memiliki KIP', 'KIP Masih Dalam Proses' ];
	source.StatusKeluarga = [
		'Kepala Keluarga',
		'Orang Tua',
		'Suami',
		'Istri',
		'Anak',
		'Menantu',
		'Mertua',
		'Cucu',
		'Keluarga Lain',
		'Pembantu',
		'Lainnya...'
	];
	source.StatusPerkawinan = [ 'BELUM KAWIN', 'KAWIN', 'DUDA', 'JANDA', 'CERAI HIDUP', 'CERAI MATI' ];
	source.Kewarganegawaan = [ 'WNI', 'WNA' ];

	source.BacaHuruf = [
		'Tidak Dapat Membaca (Buta Huruf)',
		'Huruf Daerah',
		'Huruf Indonesia',
		'Huruf Inggris',
		'Huruf Arab',
		'Indonesia dan Daerah',
		'Indonesia dan Inggris',
		'Indonesia dan Arab',
		'Indoneisa Daeah dan Inggris',
		'Indoneisa Daeah dan Arab',
		'Indoneisa Daeah Inggris dan Arab',
		'Huruf Lainnya',
		'Belum Membaca'
	];
	source.Pekerjaan = [
		'BELUM/TIDAK BEKERJA',
		'ANGGOTA DPRD KABUPATEN/KOTA',
		'ARSITEK',
		'BIDAN',
		'BUPATI',
		'BURUH HARIAN LEPAS',
		'BUTUH TANI/PERKEBUNAN',
		'DOKTER',
		'DOSEN',
		'GURU',
		'INDUSTRI',
		'KARYAWAN BUMD',
		'KARYAWAN BUMN',
		'KARYAWAN HONORER',
		'KARYAWAN SWASTA',
		'KEPALA DESA',
		'KEPOLISIAN RI',
		'KONSULTAN',
		'MEKANIK',
		'PENGURUS RUMAH TANGGA',
		'NELAYAN/PERIKANAN',
		'NOTARIS',
		'PASTOR',
		'PEDAGANG',
		'PEGAWAI NEGERI SIPIL',
		'PELAJAR/MAHASISWA',
		'PELAUT',
		'PEMBANTU RUMAH TANGGA',
		'PENATA RAMBUT',
		'PENDETA',
		'PENELITI',
		'PENGACARA',
		'PENSIUNAN',
		'PENYIAR TELEVISI',
		'PERANGKAT DESA',
		'PERAWAT',
		'PERDAGANGAN',
		'PETANI/PERKEBUNAN',
		'PETERNAK',
		'SOPIR',
		'TNI',
		'TUKANG BATU',
		'TUKANG JAHIT',
		'LAINNYA'
	];
	source.PermohonanJenis = [
		'Pengantar KTP',
		'Pengantar KK',
		'Tidak Mampu',
		'Keterangan Domisili',
		'Keterangan SKCK',
		'Keterangan Usaha',
		'Penguasaan Tanah',
		'Keterangan Desa',
		'Keterangan Cerai',
		'Keterangan eKTP',
		'Keterangan Nikah',
		'Kelahiran',
		'Sudah Menikah',
		'Belum Menikah',
		'Kematian',
		'Keterangan Lainnya',
		'Pindah'
	];
	source.Roles = [ 'pemohon', 'admin', 'seklur', 'lurah' ];
	source.Hari = [ 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu' ];

	function print(id) {
		var w = 750;
		var h = 850;
		var centerLeft = parseInt((window.screen.availWidth - w) / 2);
		var centerTop = parseInt((window.screen.availHeight - h) / 2);
		var windowFeatures =
			'width=' +
			w +
			',height=' +
			h +
			',left=' +
			centerLeft +
			',top=' +
			centerTop +
			',scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no';

		var innerContents = document.getElementById(id).innerHTML;
		var popupWinindow = window.open('', '_blank', windowFeatures);
		popupWinindow.document.open();
		popupWinindow.document.write(
			'<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' +
				innerContents +
				'</html>'
		);
		popupWinindow.document.close();
	}

	function getState(state) {
		switch (state) {
			case 'Pengantar KTP':
				return 'admin-suratpengantarktp';

			default:
				return null;
		}
	}

	return {
		url: service.url,
		source: source,
		print: print,
		state: getState
	};
}

function tabServices() {
	var service = {};
	service.show = function(item, item1, item2, item3) {
		service.list = false;
		service.tambah = false;
		service.edit = false;
		service.approved = false;
		if (item) setTrue(item);
		if (item1) setTrue(item1);
		if (item2) setTrue(item2);
		if (item3) setTrue(item3);
	};

	function setTrue(data) {
		switch (data) {
			case 'tambah':
				service.tambah = true;
				return;
			case 'edit':
				service.edit = true;
				return;
			case 'list':
				service.list = true;
				return;
			case 'approved':
				service.approved = true;
				return;
			default:
				break;
		}
	}

	function getService() {
		service.list = true;
		service.tambah = false;
		service.edit = false;
		service.approved = false;
		return service;
	}

	return {
		createTab: getService
	};
}

function approvedService(helperServices) {
	approvedAction = function(param, userRole) {
		if (param.length !== 0) {
			param.forEach((value) => {
				if (value.persetujuan && value.persetujuan.length > 0) {
					var lastPersetujuan = value.persetujuan[value.persetujuan.length - 1];
					if (lastPersetujuan.role == 'lurah' && lastPersetujuan.status == 'selesai') {
						value.SetButtonPrint = true;
						value.SetButtonApproved = false;
					} else {
						var lastindex = helperServices.source.Roles.indexOf(lastPersetujuan.role);
						var nextRole =
							lastPersetujuan.status == 'dikembalikan'
								? helperServices.source.Roles[lastindex - 1]
								: helperServices.source.Roles[lastindex + 1];
						if (nextRole == userRole) {
							value.SetButtonPrint = false;
							value.SetButtonApproved = true;
						} else {
							value.SetButtonPrint = false;
							value.SetButtonApproved = false;
						}
					}
				} else {
					value.SetButtonPrint = false;
					value.SetButtonApproved = true;
				}
			});
		}
	};

	return {
		approvedView: approvedAction
	};
}

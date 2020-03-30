angular.module('admin.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: 'adminController',
			templateUrl: 'apps/views/admin/index.html'
		})
		.state('admin-home', {
			url: '/home',
			parent: 'admin',
			controller: 'adminHomeController',
			templateUrl: 'apps/views/admin/home.html'
		})
		.state('admin-datakepaladesa', {
			url: '/datakepaladesa',
			parent: 'admin',
			controller: 'admindatakepaladesaController',
			templateUrl: 'apps/views/admin/datakepaladesa.html'
		})
		.state('admin-dataumumdesa', {
			url: '/dataumumdesa',
			parent: 'admin',
			controller: 'admindataumumdesaController',
			templateUrl: 'apps/views/admin/dataumumdesa.html'
		})
		.state('admin-jenispermohonan', {
			url: '/jenispermohonan',
			parent: 'admin',
			controller: 'adminJenisPermohonanController',
			templateUrl: 'apps/views/admin/jenisPermohonan.html'
		})
		.state('admin-suratpengantarktp', {
			url: '/suratpengantarktp',
			parent: 'admin',
			controller: 'adminsuratpengantarktpController',
			templateUrl: 'apps/views/admin/suratpengantarktp.html'
		})
		.state('admin-datapenduduk', {
			url: '/datapenduduk',
			parent: 'admin',
			controller: 'admindatapendudukController',
			templateUrl: 'apps/views/admin/datapenduduk.html'
		})
		.state('admin-inputdatapenduduk', {
			url: '/inputdatapenduduk',
			parent: 'admin',
			controller: 'admindatapendudukController',
			templateUrl: 'apps/views/admin/inputdatapenduduk.html'
		})
		.state('admin-tambahpermohonan', {
			url: '/tambahpermohonan',
			parent: 'admin',
			controller: 'admintambahpermohonanController',
			templateUrl: 'apps/views/admin/tambahpermohonan.html'
		})
		.state('admin-preview', {
			url: '/preview',
			parent: 'admin',
			controller: 'adminpreviewController',
			templateUrl: 'apps/views/admin/preview.html'
		})
		.state('admin-surattidakmampu', {
			url: '/surattidakmampu',
			parent: 'admin',
			controller: 'adminsurattidakmampuController',
			templateUrl: 'apps/views/admin/surattidakmampu.html'
		})
		.state('admin-suratketdomisili', {
			url: '/suratketdomisili',
			parent: 'admin',
			controller: 'adminsuratketdomisiliController',
			templateUrl: 'apps/views/admin/suratketdomisili.html'
		})
		.state('admin-permohonan', {
			url: '/permohonan',
			parent: 'admin',
			controller: 'adminpermohonanController',
			templateUrl: 'apps/views/admin/permohonan.html'
		})
		.state('admin-pejabat', {
			url: '/pejabat',
			parent: 'admin',
			controller: 'adminpejabatController',
			templateUrl: 'apps/views/admin/pejabat.html'
		})
		.state('admin-suratskck', {
			url: '/suratskck',
			parent: 'admin',
			controller: 'adminsuratskckController',
			templateUrl: 'apps/views/admin/suratskck.html'
		})
		.state('admin-suratpenguasaantanah', {
			url: '/suratpenguasaantanah',
			parent: 'admin',
			controller: 'adminsuratpenguasaantanahController',
			templateUrl: 'apps/views/admin/suratpenguasaantanah.html'
		})
		.state('admin-suratketusaha', {
			url: '/suratketusaha',
			parent: 'admin',
			controller: 'adminsuratketusahaController',
			templateUrl: 'apps/views/admin/suratketusaha.html'
		})
		.state('admin-suratbelummenikah', {
			url: '/suratbelummenikah',
			parent: 'admin',
			controller: 'adminsuratbelummenikahController',
			templateUrl: 'apps/views/admin/suratbelummenikah.html'
		})
		.state('admin-suratketmenikah', {
			url: '/suratketmenikah',
			parent: 'admin',
			controller: 'adminsuratketmenikahController',
			templateUrl: 'apps/views/admin/suratketmenikah.html'
		})
		.state('admin-suratkelahiran', {
			url: '/suratkelahiran',
			parent: 'admin',
			controller: 'adminsuratkelahiranController',
			templateUrl: 'apps/views/admin/suratkelahiran.html'
		})
		.state('admin-suratketcerai', {
			url: '/suratketcerai',
			parent: 'admin',
			controller: 'adminsuratketceraiController',
			templateUrl: 'apps/views/admin/suratketcerai.html'
		})
		.state('admin-suratketcerai-edit', {
			url: '/suratketcerai/:id',
			parent: 'admin',
			controller: 'adminsuratketceraiController',
			templateUrl: 'apps/views/admin/suratketcerai.html'
		})
		.state('admin-suratketdesa', {
			url: '/suratketdesa',
			parent: 'admin',
			controller: 'adminsuratketdesaController',
			templateUrl: 'apps/views/admin/suratketdesa.html'
		})
		.state('admin-suratketektp', {
			url: '/suratketektp',
			parent: 'admin',
			controller: 'adminsuratketektpController',
			templateUrl: 'apps/views/admin/suratketektp.html'
		})
		.state('admin-suratketlainnya', {
			url: '/suratketlainnya',
			parent: 'admin',
			controller: 'adminsuratketlainnyaController',
			templateUrl: 'apps/views/admin/suratketlainnya.html'
		})
		.state('admin-suratketnikah', {
			url: '/suratketnikah',
			parent: 'admin',
			controller: 'adminsuratketnikahController',
			templateUrl: 'apps/views/admin/suratketnikah.html'
		})
		.state('admin-suratpindah', {
			url: '/suratpindah',
			parent: 'admin',
			controller: 'adminsuratpindahController',
			templateUrl: 'apps/views/admin/suratpindah.html'
		})
		.state('admin-persyaratan', {
			url: '/persyaratan',
			parent: 'admin',
			controller: 'adminpersyaratanController',
			templateUrl: 'apps/views/admin/persyaratan.html'
		})
		.state('admin-inbox', {
			url: '/inbox',
			parent: 'admin',
			controller: 'InboxController',
			templateUrl: 'apps/views/inbox.html'
		})
		.state('admin-suratall', {
			url: '/suratall',
			parent: 'admin',
			controller: 'adminSuratAllController',
			templateUrl: 'apps/views/admin/suratall.html'
		})
		.state('admin-surat', {
			url: '/surat',
			parent: 'admin',
			controller: 'adminSuratController',
			templateUrl: 'apps/views/admin/surat.html'
		});
});

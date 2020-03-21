angular.module('seklur.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('seklur', {
            url: '/seklur',
            controller: 'seklurController',
            templateUrl: 'apps/views/seklur/index.html'
        }).state('seklur-home', {
            url: '/home',
            parent: 'seklur',
            controller: 'seklurHomeController',
            templateUrl: 'apps/views/seklur/home.html'
        }).state('seklur-dataseklur', {
            url: '/dataseklur',
            parent: 'seklur',
            controller: 'dataseklurController',
            templateUrl: 'apps/views/seklur/dataseklur.html'
        }).state('seklur-datart', {
            url: '/datart',
            parent: 'seklur',
            controller: 'datartController',
            templateUrl: 'apps/views/seklur/datart.html'
        }).state('seklur-datarw', {
            url: '/datarw',
            parent: 'seklur',
            controller: 'datarwController',
            templateUrl: 'apps/views/seklur/datarw.html'
        })

        .state('seklur-datakepaladesa', {
            url: '/datakepaladesa',
            parent: 'seklur',
            controller: 'admindatakepaladesaController',
            templateUrl: 'apps/views/admin/datakepaladesa.html'
        }).state('seklur-dataumumdesa', {
            url: '/dataumumdesa',
            parent: 'seklur',
            controller: 'admindataumumdesaController',
            templateUrl: 'apps/views/admin/dataumumdesa.html'
        }).state('seklur-jenispermohonan', {
            url: '/jenispermohonan',
            parent: 'seklur',
            controller: 'adminJenisPermohonanController',
            templateUrl: 'apps/views/admin/jenisPermohonan.html'
        }).state('seklur-suratpengantarktp', {
            url: '/suratpengantarktp',
            parent: 'seklur-surat',
            controller: 'adminsuratpengantarktpController',
            templateUrl: 'apps/views/admin/suratpengantarktp.html'
        }).state('seklur-datapenduduk', {
            url: '/datapenduduk',
            parent: 'seklur',
            controller: 'admindatapendudukController',
            templateUrl: 'apps/views/admin/datapenduduk.html'
        }).state('seklur-inputdatapenduduk', {
            url: '/inputdatapenduduk',
            parent: 'seklur',
            controller: 'admindatapendudukController',
            templateUrl: 'apps/views/admin/inputdatapenduduk.html'
        }).state('seklur-tambahpermohonan', {
            url: '/tambahpermohonan',
            parent: 'seklur',
            controller: 'admintambahpermohonanController',
            templateUrl: 'apps/views/admin/tambahpermohonan.html'
        }).state('seklur-preview', {
            url: '/preview',
            parent: 'seklur',
            controller: 'adminpreviewController',
            templateUrl: 'apps/views/admin/preview.html'
        }).state('seklur-surattidakmampu', {
            url: '/surattidakmampu',
            parent: 'seklur-surat',
            controller: 'adminsurattidakmampuController',
            templateUrl: 'apps/views/admin/surattidakmampu.html'
        }).state('seklur-suratketdomisili', {
            url: '/suratketdomisili',
            parent: 'seklur-surat',
            controller: 'adminsuratketdomisiliController',
            templateUrl: 'apps/views/admin/suratketdomisili.html'
        }).state('seklur-inbox', {
            url: '/inbox',
            parent: 'seklur',
            controller: 'InboxController',
            templateUrl: 'apps/views/inbox.html'
        }).state('seklur-permohonan', {
            url: '/permohonan',
            parent: 'seklur',
            controller: 'adminpermohonanController',
            templateUrl: 'apps/views/admin/permohonan.html'
        }).state('seklur-pejabat', {
            url: '/pejabat',
            parent: 'seklur',
            controller: 'adminpejabatController',
            templateUrl: 'apps/views/admin/pejabat.html'
        }).state('seklur-suratskck', {
            url: '/suratskck',
            parent: 'seklur-surat',
            controller: 'adminsuratskckController',
            templateUrl: 'apps/views/admin/suratskck.html'
        }).state('seklur-suratpenguasaantanah', {
            url: '/suratpenguasaantanah',
            parent: 'seklur-surat',
            controller: 'adminsuratpenguasaantanahController',
            templateUrl: 'apps/views/admin/suratpenguasaantanah.html'
        }).state('seklur-suratketusaha', {
            url: '/suratketusaha',
            parent: 'seklur-surat',
            controller: 'adminsuratketusahaController',
            templateUrl: 'apps/views/admin/suratketusaha.html'
        }).state('seklur-suratbelummenikah', {
            url: '/suratbelummenikah',
            parent: 'seklur-surat',
            controller: 'adminsuratbelummenikahController',
            templateUrl: 'apps/views/admin/suratbelummenikah.html'
        }).state('seklur-suratketmenikah', {
            url: '/suratketmenikah',
            parent: 'seklur-surat',
            controller: 'adminsuratketmenikahController',
            templateUrl: 'apps/views/admin/suratketmenikah.html'
        }).state('seklur-suratkelahiran', {
            url: '/suratkelahiran',
            parent: 'seklur-surat',
            controller: 'adminsuratkelahiranController',
            templateUrl: 'apps/views/admin/suratkelahiran.html'
        }).state('seklur-suratketcerai', {
            url: '/suratketcerai',
            parent: 'seklur-surat',
            controller: 'adminsuratketceraiController',
            templateUrl: 'apps/views/admin/suratketcerai.html'
        }).state('seklur-suratketdesa', {
            url: '/suratketdesa',
            parent: 'seklur-surat',
            controller: 'adminsuratketdesaController',
            templateUrl: 'apps/views/admin/suratketdesa.html'
        }).state('seklur-suratketektp', {
            url: '/suratketektp',
            parent: 'seklur-surat',
            controller: 'adminsuratketektpController',
            templateUrl: 'apps/views/admin/suratketektp.html'
        }).state('seklur-suratketlainnya', {
            url: '/suratketlainnya',
            parent: 'seklur-surat',
            controller: 'adminsuratketlainnyaController',
            templateUrl: 'apps/views/admin/suratketlainnya.html'
        }).state('seklur-suratketnikah', {
            url: '/suratketnikah',
            parent: 'seklur-surat',
            controller: 'adminsuratketnikahController',
            templateUrl: 'apps/views/admin/suratketnikah.html'
        }).state('seklur-suratall', {
			url: '/suratall',
			parent: 'seklur-surat',
			controller: 'adminSuratAllController',
			templateUrl: 'apps/views/admin/suratall.html'
		}).state('seklur-surat', {
			url: '/surat',
			parent: 'seklur',
			controller: 'adminSuratController',
			templateUrl: 'apps/views/admin/surat.html'
		});

});
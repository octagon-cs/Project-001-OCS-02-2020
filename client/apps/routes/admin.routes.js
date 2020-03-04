angular.module('admin.router', ['ui.router']).config(function ($stateProvider,$urlRouterProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: 'adminHomeController',
			templateUrl: '../client/apps/views/admin/index.html'
		}).state('admin-home', {
            url: '/home',
            parent: 'admin',
			controller: 'adminHomeController',
			templateUrl: '../client/apps/views/admin/home.html'
        }).state('admin-datakepaladesa', {
            url: '/datakepaladesa',
            parent: 'admin',
			controller: 'admindatakepaladesaController',
			templateUrl: '../client/apps/views/admin/datakepaladesa.html'
		}).state('admin-dataumumdesa', {
            url: '/dataumumdesa',
            parent: 'admin',
			controller: 'admindataumumdesaController',
			templateUrl: '../client/apps/views/admin/dataumumdesa.html'
		}).state('admin-suratpengantarkk', {
            url: '/suratpengantarkk',
            parent: 'admin',
			controller: 'adminsuratpengantarkkController',
			templateUrl: '../client/apps/views/admin/suratpengantarkk.html'
		}).state('admin-suratpengantarktp', {
            url: '/suratpengantarktp',
            parent: 'admin',
			controller: 'adminsuratpengantarktpController',
			templateUrl: '../client/apps/views/admin/suratpengantarktp.html'
		}).state('admin-datapenduduk', {
            url: '/datapenduduk',
            parent: 'admin',
			controller: 'admindatapendudukController',
			templateUrl: '../client/apps/views/admin/datapenduduk.html'
		}).state('admin-inputdatapenduduk', {
            url: '/inputdatapenduduk',
            parent: 'admin',
			controller: 'admindatapendudukController',
			templateUrl: '../client/apps/views/admin/inputdatapenduduk.html'
		}).state('admin-preview', {
            url: '/preview',
            parent: 'admin',
			controller: 'adminpreviewController',
			templateUrl: '../client/apps/views/admin/preview.html'
		}).state('admin-surattidakmampu', {
            url: '/surattidakmampu',
            parent: 'admin',
			controller: 'adminsurattidakmampuController',
			templateUrl: '../client/apps/views/admin/surattidakmampu.html'
		});
		
});
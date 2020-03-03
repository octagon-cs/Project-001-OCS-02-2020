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
			controller: 'admindatakeuanganController',
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
		});
		
});
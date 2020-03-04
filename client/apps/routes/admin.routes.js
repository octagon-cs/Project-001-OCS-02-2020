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
        }).state('admin-tambahdatadesa', {
            url: '/tambahdatadesa',
            parent: 'admin',
			controller: 'admintambahdatadesaController',
			templateUrl: '../client/apps/views/admin/tambahdatadesa.html'
		}).state('admin-datakeuangan', {
            url: '/datakeuangan',
            parent: 'admin',
			controller: 'admindatakeuanganController',
			templateUrl: '../client/apps/views/admin/datakeuangan.html'
		}).state('admin-suratpengantarktp', {
            url: '/suratpengantarktp',
            parent: 'admin',
			controller: 'adminsuratpengantarktpController',
			templateUrl: '../client/apps/views/admin/suratpengantarktp.html'
		});
		
});
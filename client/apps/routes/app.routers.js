angular
	.module('app.routers', [
		'account.router',
		'admin.router',
		'admin.param.routes',
		'approved.router',
		'ui.router',
		'seklur.router',
		'lurah.router',
		'grafik.router',
		'admin.surat.param.router',
		'seklur.surat.param.router',
		'lurah.surat.param.router'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('load', {
			url: '/',
			controller: 'LoaderController',
			templateUrl: 'apps/views/load.html'
		});
	});

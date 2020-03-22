angular.module('app.routers', ['account.router', 'admin.router', 'approved.router', 'ui.router', 'seklur.router', 'lurah.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/account/login');
		$stateProvider
		.state('load', {
			url: '/',
			templateUrl: 'apps/views/load.html'
		})
	});
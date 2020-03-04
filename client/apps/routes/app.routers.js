angular.module('app.routers', ['account.router', 'admin.router', 'ui.router', 'seklur.router', 'lurah.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/account/login');
	});
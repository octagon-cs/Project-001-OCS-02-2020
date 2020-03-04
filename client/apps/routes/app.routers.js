angular.module('app.routers', ['account.router', 'admin.router', 'ui.router', 'seklur.router', 'lurah.routers'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/account/login');
	});
angular
	.module('app.routers', [
		'account.router',
		'admin.router',
		'approved.router',
		'ui.router',
		'seklur.router',
		'lurah.router'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('load', {
			url: '/',
			controller: 'LoaderController',
			templateUrl: 'apps/views/load.html'
		});
	});

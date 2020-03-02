angular.module('app.routers', ['account.router', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '../client/apps/views/home.html'
		})
});
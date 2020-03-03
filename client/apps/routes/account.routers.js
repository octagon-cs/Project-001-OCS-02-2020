angular.module('account.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('account', {
			url: '/account',
			controller: 'AccountController',
			templateUrl: '../client/apps/views/accounts/home.html'
		})
		.state('login', {
			url: '/login',
			parent: 'account',
			controller: 'LoginController',
			templateUrl: '../client/apps/views/accounts/sign-in.html'
		})
		.state('register', {
			url: '/register',
			parent: 'account',
			controller: 'RegisterController',
			templateUrl: '../client/apps/views/accounts/sign-up.html'
		})
		.state('about', {
			url: '/about',
			parent: 'account',
			templateUrl: '../client/apps/views/accounts/about.html'
		});
});
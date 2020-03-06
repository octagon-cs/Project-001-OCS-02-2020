angular.module('account.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('account', {
			url: '/account',
			controller: 'AccountController',
			templateUrl: 'apps/views/accounts/home.html'
		})
		.state('login', {
			url: '/login',
			parent: 'account',
			controller: 'LoginController',
			templateUrl: 'apps/views/accounts/sign-in.html'
		})
		.state('register', {
			url: '/register',
			parent: 'account',
			controller: 'RegisterController',
			templateUrl: 'apps/views/accounts/sign-up.html'
		})
		.state('about', {
			url: '/about',
			parent: 'account',
			templateUrl: 'apps/views/accounts/about.html'
		});
});
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
			url: '/sign-up',
			parent: 'account',
			controller: 'RegisterController',
			templateUrl: 'apps/views/accounts/sign-up.html'
		})
		.state('changepassword', {
			url: '/changepassword/:token',
			parent: 'account',
			controller: 'NewPasswordController',
			templateUrl: 'apps/views/accounts/changepassword.html'
		})
		.state('resetpassword', {
			url: '/resetpassword',
			parent: 'account',
			controller: 'ResetPasswordController',
			templateUrl: 'apps/views/accounts/resetpassword.html'
		})
		.state('confirmemail', {
			url: '/confirmemail/:token',
			parent: 'account',
			controller: 'ConfirmEmailController',
			templateUrl: 'apps/views/accounts/confirmemail.html'
		})
		.state('about', {
			url: '/about',
			parent: 'account',
			templateUrl: 'apps/views/accounts/about.html'
		});

});
angular.module('app.routers', ['account.router', 'admin.router','ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/account/login');
});
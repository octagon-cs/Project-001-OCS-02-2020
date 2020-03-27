angular.module('grafik.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('admin-grafik', {
		url: '/grafik/:param',
		parent: 'admin',
		controller: 'grafikPieController',
		templateUrl: 'apps/views/grafik/pie.html'
	});
});

angular.module('lurah.surat.param.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('lurah-edit-suratpengantarktp', {
			url: '/itemsuratpengantarktp/:id',
			parent: 'lurah',
			controller: 'adminsurateditpengantarktpController',
			templateUrl: 'apps/views/admin/edit/suratpengantarktp.html'
		})
		.state('lurah-edit-surattidakmampu', {
			url: '/itemsurattidakmampu/:id',
			parent: 'lurah',
			controller: 'adminsuratedittidakmampuController',
			templateUrl: 'apps/views/admin/edit/surattidakmampu.html'
		})
		.state('lurah-edit-suratketdomisili', {
			url: '/itemsuratketdomisili/:id',
			parent: 'lurah',
			controller: 'adminsurateditketdomisiliController',
			templateUrl: 'apps/views/admin/edit/suratketdomisili.html'
		})
		.state('lurah-edit-suratskck', {
			url: '/itemsuratskck/:id',
			parent: 'lurah',
			controller: 'adminsurateditskckController',
			templateUrl: 'apps/views/admin/edit/suratskck.html'
		})
		.state('lurah-edit-suratpenguasaantanah', {
			url: '/itemsuratpenguasaantanah/:id',
			parent: 'lurah',
			controller: 'adminsurateditpenguasaantanahController',
			templateUrl: 'apps/views/admin/edit/suratpenguasaantanah.html'
		})
		.state('lurah-edit-suratketusaha', {
			url: '/itemsuratketusaha/:id',
			parent: 'lurah',
			controller: 'adminsurateditketusahaController',
			templateUrl: 'apps/views/admin/edit/suratketusaha.html'
		})
		.state('lurah-edit-suratbelummenikah', {
			url: '/itemsuratbelummenikah/:id',
			parent: 'lurah',
			controller: 'adminsurateditbelummenikahController',
			templateUrl: 'apps/views/admin/edit/suratbelummenikah.html'
		})
		.state('lurah-edit-suratketmenikah', {
			url: '/itemsuratketmenikah/:id',
			parent: 'lurah',
			controller: 'adminsurateditketmenikahController',
			templateUrl: 'apps/views/admin/edit/suratketmenikah.html'
		})
		.state('lurah-edit-suratkelahiran', {
			url: '/itemsuratkelahiran/:id',
			parent: 'lurah',
			controller: 'adminsurateditkelahiranController',
			templateUrl: 'apps/views/admin/edit/suratkelahiran.html'
		})
		.state('lurah-edit-suratketcerai', {
			url: '/itemsuratketcerai/:id',
			parent: 'lurah',
			controller: 'adminsurateditketceraiController',
			templateUrl: 'apps/views/admin/edit/suratketcerai.html'
		})
		.state('lurah-edit-suratketdesa', {
			url: '/itemsuratketdesa/:id',
			parent: 'lurah',
			controller: 'adminsurateditketdesaController',
			templateUrl: 'apps/views/admin/edit/suratketdesa.html'
		})
		.state('lurah-edit-suratketektp', {
			url: '/itemsuratketektp/:id',
			parent: 'lurah',
			controller: 'adminsurateditketektpController',
			templateUrl: 'apps/views/admin/edit/suratketektp.html'
		})
		.state('lurah-edit-suratketlainnya', {
			url: '/itemsuratketlainnya/:id',
			parent: 'lurah',
			controller: 'adminsurateditketlainnyaController',
			templateUrl: 'apps/views/admin/edit/suratketlainnya.html'
		})
		.state('lurah-edit-suratketnikah', {
			url: '/itemsuratketnikah/:id',
			parent: 'lurah',
			controller: 'adminsurateditketnikahController',
			templateUrl: 'apps/views/admin/edit/suratketnikah.html'
		})
		.state('lurah-edit-suratpindah', {
			url: '/itemsuratpindah/:id',
			parent: 'lurah',
			controller: 'adminsurateditpindahController',
			templateUrl: 'apps/views/admin/edit/suratpindah.html'
		});
});

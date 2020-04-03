angular.module('seklur.surat.param.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('seklur-edit-suratpengantarktp', {
			url: '/itemsuratpengantarktp/:id',
			parent: 'seklur',
			controller: 'adminsurateditpengantarktpController',
			templateUrl: 'apps/views/admin/edit/suratpengantarktp.html'
		})
		.state('seklur-edit-surattidakmampu', {
			url: '/itemsurattidakmampu/:id',
			parent: 'seklur',
			controller: 'adminsuratedittidakmampuController',
			templateUrl: 'apps/views/admin/edit/surattidakmampu.html'
		})
		.state('seklur-edit-suratketdomisili', {
			url: '/itemsuratketdomisili/:id',
			parent: 'seklur',
			controller: 'adminsurateditketdomisiliController',
			templateUrl: 'apps/views/admin/edit/suratketdomisili.html'
		})
		.state('seklur-edit-suratskck', {
			url: '/itemsuratskck/:id',
			parent: 'seklur',
			controller: 'adminsurateditskckController',
			templateUrl: 'apps/views/admin/edit/suratskck.html'
		})
		.state('seklur-edit-suratpenguasaantanah', {
			url: '/itemsuratpenguasaantanah/:id',
			parent: 'seklur',
			controller: 'adminsurateditpenguasaantanahController',
			templateUrl: 'apps/views/admin/edit/suratpenguasaantanah.html'
		})
		.state('seklur-edit-suratketusaha', {
			url: '/itemsuratketusaha/:id',
			parent: 'seklur',
			controller: 'adminsurateditketusahaController',
			templateUrl: 'apps/views/admin/edit/suratketusaha.html'
		})
		.state('seklur-edit-suratbelummenikah', {
			url: '/itemsuratbelummenikah/:id',
			parent: 'seklur',
			controller: 'adminsurateditbelummenikahController',
			templateUrl: 'apps/views/admin/edit/suratbelummenikah.html'
		})
		.state('seklur-edit-suratketmenikah', {
			url: '/itemsuratketmenikah/:id',
			parent: 'seklur',
			controller: 'adminsurateditketmenikahController',
			templateUrl: 'apps/views/admin/edit/suratketmenikah.html'
		})
		.state('seklur-edit-suratkelahiran', {
			url: '/itemsuratkelahiran/:id',
			parent: 'seklur',
			controller: 'adminsurateditkelahiranController',
			templateUrl: 'apps/views/admin/edit/suratkelahiran.html'
		})
		.state('seklur-edit-suratketcerai', {
			url: '/itemsuratketcerai/:id',
			parent: 'seklur',
			controller: 'adminsurateditketceraiController',
			templateUrl: 'apps/views/admin/edit/suratketcerai.html'
		})
		.state('seklur-edit-suratketdesa', {
			url: '/itemsuratketdesa/:id',
			parent: 'seklur',
			controller: 'adminsurateditketdesaController',
			templateUrl: 'apps/views/admin/edit/suratketdesa.html'
		})
		.state('seklur-edit-suratketektp', {
			url: '/itemsuratketektp/:id',
			parent: 'seklur',
			controller: 'adminsurateditketektpController',
			templateUrl: 'apps/views/admin/edit/suratketektp.html'
		})
		.state('seklur-edit-suratketlainnya', {
			url: '/itemsuratketlainnya/:id',
			parent: 'seklur',
			controller: 'adminsurateditketlainnyaController',
			templateUrl: 'apps/views/admin/edit/suratketlainnya.html'
		})
		.state('seklur-edit-suratketnikah', {
			url: '/itemsuratketnikah/:id',
			parent: 'seklur',
			controller: 'adminsurateditketnikahController',
			templateUrl: 'apps/views/admin/edit/suratketnikah.html'
		})
		.state('seklur-edit-suratpindah', {
			url: '/itemsuratpindah/:id',
			parent: 'seklur',
			controller: 'adminsurateditpindahController',
			templateUrl: 'apps/views/admin/edit/suratpindah.html'
		});
});

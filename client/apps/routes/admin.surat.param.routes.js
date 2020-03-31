angular.module('admin.surat.param.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('admin-edit-suratpengantarktp', {
			url: '/itemsuratpengantarktp/:id',
			parent: 'admin',
			controller: 'adminsurateditpengantarktpController',
			templateUrl: 'apps/views/admin/edit/suratpengantarktp.html'
		})
		.state('admin-edit-surattidakmampu', {
			url: '/itemsurattidakmampu/:id',
			parent: 'admin',
			controller: 'adminsuratedittidakmampuController',
			templateUrl: 'apps/views/admin/edit/surattidakmampu.html'
		})
		.state('admin-edit-suratketdomisili', {
			url: '/itemsuratketdomisili/:id',
			parent: 'admin',
			controller: 'adminsurateditketdomisiliController',
			templateUrl: 'apps/views/admin/edit/suratketdomisili.html'
		})
		.state('admin-edit-suratskck', {
			url: '/itemsuratskck/:id',
			parent: 'admin',
			controller: 'adminsurateditskckController',
			templateUrl: 'apps/views/admin/edit/suratskck.html'
		})
		.state('admin-edit-suratpenguasaantanah', {
			url: '/itemsuratpenguasaantanah/:id',
			parent: 'admin',
			controller: 'adminsurateditpenguasaantanahController',
			templateUrl: 'apps/views/admin/edit/suratpenguasaantanah.html'
		})
		.state('admin-edit-suratketusaha', {
			url: '/itemsuratketusaha/:id',
			parent: 'admin',
			controller: 'adminsurateditketusahaController',
			templateUrl: 'apps/views/admin/edit/suratketusaha.html'
		})
		.state('admin-edit-suratbelummenikah', {
			url: '/itemsuratbelummenikah/:id',
			parent: 'admin',
			controller: 'adminsurateditbelummenikahController',
			templateUrl: 'apps/views/admin/edit/suratbelummenikah.html'
		})
		.state('admin-edit-suratketmenikah', {
			url: '/itemsuratketmenikah/:id',
			parent: 'admin',
			controller: 'adminsurateditketmenikahController',
			templateUrl: 'apps/views/admin/edit/suratketmenikah.html'
		})
		.state('admin-edit-suratkelahiran', {
			url: '/itemsuratkelahiran/:id',
			parent: 'admin',
			controller: 'adminsurateditkelahiranController',
			templateUrl: 'apps/views/admin/edit/suratkelahiran.html'
		})
		.state('admin-edit-suratketcerai', {
			url: '/itemsuratketcerai/:id',
			parent: 'admin',
			controller: 'adminsurateditketceraiController',
			templateUrl: 'apps/views/admin/edit/suratketcerai.html'
		})
		.state('admin-edit-suratketdesa', {
			url: '/itemsuratketdesa/:id',
			parent: 'admin',
			controller: 'adminsurateditketdesaController',
			templateUrl: 'apps/views/admin/edit/suratketdesa.html'
		})
		.state('admin-edit-suratketektp', {
			url: '/itemsuratketektp/:id',
			parent: 'admin',
			controller: 'adminsurateditketektpController',
			templateUrl: 'apps/views/admin/edit/suratketektp.html'
		})
		.state('admin-edit-suratketlainnya', {
			url: '/itemsuratketlainnya/:id',
			parent: 'admin',
			controller: 'adminsurateditketlainnyaController',
			templateUrl: 'apps/views/admin/edit/suratketlainnya.html'
		})
		.state('admin-edit-suratketnikah', {
			url: '/itemsuratketnikah/:id',
			parent: 'admin',
			controller: 'adminsurateditketnikahController',
			templateUrl: 'apps/views/admin/edit/suratketnikah.html'
		})
		.state('admin-edit-suratpindah', {
			url: '/itemsuratpindah/:id',
			parent: 'admin',
			controller: 'adminsurateditpindahController',
			templateUrl: 'apps/views/admin/edit/suratpindah.html'
		});
});

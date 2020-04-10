angular.module('admin.param.routes', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('admin-edit-datapenduduk', {
        url: '/editdatapenduduk/:id',
        parent: 'admin',
        controller: 'editadmindatapendudukController',
        templateUrl: 'apps/views/admin/edit/datapenduduk.html'
    });
});

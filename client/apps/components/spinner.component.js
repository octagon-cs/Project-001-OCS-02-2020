angular
	.module('spinner.component', [])
	.component('spinner', {
		bindings: {
			value: '<'
		},
		controller: function() {},
		templateUrl: 'apps/components/templates/spinner.html'
	})
	.component('loader', {
		controller: function($scope, $rootScope, loaderService) {
			$scope.IsBusy = true;
			$rootScope.$on('show', (event, value) => {
				$scope.IsBusy = value;
			});
		},
		templateUrl: 'apps/components/templates/loader.html'
	});

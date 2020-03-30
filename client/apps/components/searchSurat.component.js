angular.module('searchSurat.component', []).component('searchsurat', {
	controller: function($scope, $state, AuthService, helperServices, JenisPermohonanService) {
		JenisPermohonanService.get().then((jenispermohonan) => {
			$scope.DatasJenis = jenispermohonan;
			AuthService.profile().then((profile) => {
				$scope.profile = profile;
			});
		});

		$scope.selected = function(param) {
			setTimeout((x) => {
				var state = helperServices.state(param.jenis, $scope.profile.rolename);
				if (state) {
					$state.go(state);
				} else {
					$scope.UserRole == 'admin'
						? $state.go('admin-suratall')
						: $scope.UserRole == 'seklur' ? $state.go('seklur-suratall') : $state.go('lurah-suratall');
				}
			}, 300);
		};
	},
	templateUrl: 'apps/components/templates/searchsurat.html'
});

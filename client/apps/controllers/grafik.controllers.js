angular
	.module('grafik.controller', [])
	.controller('grafikPieController', PieController)
	.controller('grafikBarController', BarController);

function PieController($scope, $http, loaderService, AuthService, helperServices, $stateParams) {
	var type = $stateParams.param;
	loaderService.setValue(false);
	$scope.Title = 'Data Berdasarkan ' + type;
	$scope.colors = helperServices.source.colors;
	$scope.include = "../../../apps/views/grafik/data/" + type +".html";
	$scope.Data=[];
	$scope.TampilData = true;
	$http({
		url: helperServices.url + '/api/resume/kelompok/' + type,
		method: 'get',
		headers: AuthService.getHeader()
	}).then(
		(x) => {
			$scope.Data = x.data
			$scope.labels = [];
			$scope.data = [];
			x.data.forEach((data) => {
				$scope.labels.push(data.label);
				$scope.data.push(data.jumlah);
			});
		},
		(err) => {}
	);
}

function BarController() {}

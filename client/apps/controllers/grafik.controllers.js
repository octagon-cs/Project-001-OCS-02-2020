angular
	.module('grafik.controller', [])
	.controller('grafikPieController', PieController)
	.controller('grafikBarController', BarController);

function PieController($scope, $http, loaderService, AuthService, helperServices, $stateParams, PejabatService) {
	$scope.type = $stateParams.param;
	loaderService.setValue(false);
	$scope.Title = 'Data Berdasarkan ' + $scope.type;
	$scope.colors = helperServices.source.colors;
	$scope.include = "../../../apps/views/grafik/data/" + $scope.type.replace(/\s+/g, '') +".html";
	$scope.Data=[];
	$scope.TampilData = true;
	$scope.Pejabat={};
	$http({
		url: helperServices.url + '/api/resume/kelompok/' + $scope.type,
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
			PejabatService.getByJabatanName('Lurah', 1).then((x)=>{
				$scope.Pejabat = x;
				$scope.Pejabat.tanggal = getTanggalIndonesia(new Date());
			})
		},
		(err) => {}
	);

	$scope.Print = function() {
		setTimeout(function() {
			helperServices.print($scope.type.replace(/\s+/g, ''));
		}, 900);
	};
}

function BarController() {}

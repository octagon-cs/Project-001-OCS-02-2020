angular
	.module('admin.param.controller', [])
	.controller('editadmindatapendudukController', editadmindatapendudukController);

function editadmindatapendudukController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	tabService,
	PendudukService,
	PejabatService,
	loaderService,
	$state,
	$stateParams
) {
	$scope.tab = tabService.createTab();
	$scope.Datas = [];
	$scope.DataInput = {};
	$scope.Penduduk = {};
	$scope.RW = [];
	$scope.helper = helperServices.source;
	$scope.model = {};
	$scope.edit = false;
	$scope.view = false;
	$scope.UserRole;

	$scope.Init = function () {
		PendudukService.get().then((penduduk) => {
			$scope.Datas = penduduk;
			PejabatService.get().then((pejabat) => {
				var DataPejabat = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RW');
				DataPejabat.forEach((itempejabat) => {
					itempejabat.RT = pejabat.filter(
						(x) => x.status == 1 && x.namajabatan == 'RT' && x.data.nomorrw == itempejabat.data.nomorrw
					);
				});
				if ($stateParams.id) {
					PendudukService.getById($stateParams.id, true).then((itempenduduk) => {
						itempenduduk.tanggallahir = new Date(itempenduduk.tanggallahir);
						$scope.model = itempenduduk;
						PendudukService.getDocById($stateParams.id).then((berkas) => {
							var a = berkas.find(x=>x.idpersyaratan==3);
							$scope.model.photo = a;
						})
					})
				}
				loaderService.setValue(false);
			});
		})
	};
	$scope.stringnumber = (number) => {
		return helperServices.stringnumber(number);
	};
	$scope.Simpan = function () {
		var m;
		if ($scope.tab.tambah) {
			m = 'post';
		} else {
			m = 'put';
		}
		var today = new Date($scope.Penduduk.tanggallahir);
		$scope.Penduduk.tanggallahir = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		$http({
			method: m,
			url: helperServices.url + '/api/penduduk',
			Header: AuthService.getHeader(),
			data: $scope.Penduduk
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.Datas.push(angular.copy(param.data));
					$scope.Penduduk = {};
					$scope.tab.show('list');
					message.info('Data Berhasil Disimpan');
				} else {
					message.info('Data Berhasil Diubah');
					$scope.tab.show('list');
				}
			},
			(error) => { }
		);
	};

	$scope.Ubah = function () {
		$http({
			method: 'put',
			url: helperServices.url + '/api/penduduk',
			Header: AuthService.getHeader(),
			data: $scope.Penduduk
		}).then(
			(param) => {
				alert('Data Berhasil di Ubah');
			},
			(error) => {
				alert(error.message);
			}
		);
	};
}

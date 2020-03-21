angular
	.module('seklur.controller', [])
	.controller('seklurController', seklurController)
	.controller('seklurHomeController', seklurHomeController)
	.controller('dataseklurController', dataseklurController)
	.controller('datartController', datartController)
	.controller('datarwController', datarwController)
	.controller('seklurSuratController', seklurSuratController)
	.controller('seklurSuratAllController', seklurSuratAllController);

function seklurSuratController($scope, $state, helperServices, JenisPermohonanService, PersetujuanService, message) {
	$scope.DatasJenis = [];
	JenisPermohonanService.get().then((jenispermohonan) => {
		$scope.DatasJenis = jenispermohonan;
	});
	$scope.Init = function () {
		$state.go('admin-suratall');
	}
	// $scope.state;
	$scope.helper = helperServices.source;
	$scope.SelectePermohonan = (param) => {
		setTimeout((x) => {
			var state = helperServices.state(param.jenis);
			if (state) {
				$state.go(state);
			} else {
				$state.go('admin-suratall');
			}
		}, 300);
	};

}

function seklurSuratAllController($scope, PermohonanService, helperServices, $rootScope, $state, tabService, message, approvedService, PermohonanService, AuthService, PersetujuanService) {
	$scope.tab = tabService.createTab();
	$scope.UserRole = "";
	AuthService.profile().then((param) => {
		$scope.UserRole = param.rolename;
		PermohonanService.get().then((data) => {
			approvedService.approvedView(data, $scope.UserRole);
			$scope.datas = data.filter((x) => x.status != 'selesai' && x.status != 'ditolak');
		});
	})

	$scope.go = (permohonan) => {
		var state = helperServices.state(permohonan.jenis);
		$rootScope.permohonan = permohonan;
		$state.go(state);
	};

	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Setuju = function (item) {
		message.dialog("Anda yakin menyetujui permohonan???", "Setuju", "Batal").then(x => {
			PersetujuanService.get(item.idpermohonan).then(x => {
				item.SetButtonApproved = false;
				message.info("Permohonan di setujui!!!");
			}, error => {
				message.errorText(error.data);
			})
		}, error => {
			message.errorText("Persetujuan di batalkan");
		})
	}
	$scope.model = {};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog("Anda Yakin menolak permohonan???", "Ya", "Batal").then((x) => {
			$scope.model.idpermohonan = item.idpermohonan;
			$('#TampilPesan').modal('show');
		}, error => {
			message.errorText("Proses Penolakan di batalkan!!!");
		})
	}
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then((x) => {
			var item = $scope.datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
			var index = $scope.datas.indexOf(item);
			$scope.datas.splice(index, 1);
			message.info("Anda berhasil menolak permohonan!!!");
		}, error => {
			message.errorText("Penolakan Gagal, Sistem Error");
		})
	}
}

function seklurController(AuthService) {
	AuthService.Init(['seklur']);
}

function seklurHomeController() { }

function dataseklurController() { }

function datartController() { }

function datarwController() { }

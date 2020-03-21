angular
	.module('admin.controller', [])
	.controller('adminController', adminController)
	.controller('adminHomeController', adminHomeController)
	.controller('admindatakepaladesaController', admindatakepaladesaController)
	.controller('admindataumumdesaController', admindataumumdesaController)
	.controller('admindatapendudukController', admindatapendudukController)
	.controller('adminJenisPermohonanController', adminJenisPermohonanController)
	.controller('adminJabatanController', adminJabatanController)
	.controller('adminpreviewController', adminpreviewController)
	.controller('admintambahpermohonanController', admintambahpermohonanController)
	.controller('adminpermohonanController', adminpermohonanController)
	.controller('adminSuratController', adminSuratController)
	.controller('adminSuratAllController', adminSuratAllController)
	.controller('adminpejabatController', adminpejabatController);

function adminSuratController($scope, $state, helperServices, JenisPermohonanService, PersetujuanService, message, AuthService) {
	$scope.DatasJenis = [];
	$scope.UserRole;
	JenisPermohonanService.get().then((jenispermohonan) => {
		$scope.DatasJenis = jenispermohonan;
	});
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
		})
	}
	// $scope.state;
	$scope.helper = helperServices.source;
	$scope.SelectePermohonan = (param) => {
		setTimeout((x) => {
			var state = helperServices.state(param.jenis);
			if (state) {
				$state.go(state);
			} else {
				$scope.UserRole=="admin"?$state.go('admin-suratall') : $scope.UserRole=="seklur"?$state.go('seklur-suratall'):$state.go('lurah-suratall');
			}
		}, 300);
	};

}

function adminSuratAllController($scope, PermohonanService, helperServices, $rootScope, $state, tabService, message, approvedService, PermohonanService, AuthService, PersetujuanService) {
	$scope.tab = tabService.createTab();
	$scope.UserRole="";
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
	$scope.model={};
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
		PersetujuanService.tolak($scope.model).then((x)=>{
			var item  = $scope.datas.find((x)=>x.idpermohonan==$scope.model.idpermohonan);
			var index = $scope.datas.indexOf(item);
			$scope.datas.splice(index,1);
			message.info("Anda berhasil menolak permohonan!!!");
		},error=>{
			message.errorText("Penolakan Gagal, Sistem Error");
		})
	}
}

function adminController(AuthService) {
	AuthService.Init(['admin']);
}

function admininboxController() { }

function adminpejabatController($http, helperServices, AuthService, $scope) {
	$scope.DatasPejabat = [];
	$scope.DataJabatan = [];
	$scope.Jabatan = {};
	$scope.Pejabat = {};
	$scope.ItemJabatan = '';
	$scope.NoJabatan = false;
	$scope.SetJabatan = '';
	$scope.helper = helperServices.source;
	$scope.SetEmail = false;
	$scope.Init = function () {
		$http({
			method: 'get',
			url: helperServices.url + '/api/pejabat',
			Header: AuthService.getHeader()
		}).then((param) => {
			$scope.DatasPejabat = param.data;
		});

		$http({
			method: 'get',
			url: helperServices.url + '/api/jabatan',
			Header: AuthService.getHeader()
		}).then((param) => {
			$scope.DataJabatan = param.data;
		});
	};
	$scope.SelectedJabatan = function (item) {
		if (item.nama == 'Lurah' || item.nama == 'Sekertaris Lurah' || item.nama == 'Admin') {
			$scope.NoJabatan = false;
			$scope.Pejabat.idjabatan = item.idjabatan;
			$scope.SetEmail = true;
		} else {
			$scope.NoJabatan = true;
			$scope.Pejabat.idjabatan = item.idjabatan;
			$scope.SetJabatan = $scope.ItemJabatan.nama;
			$scope.SetEmail = false;
		}
	};
	$scope.Simpan = function () {
		var role = $scope.ItemJabatan.nama.includes('Lurah')
			? 'lurah'
			: $scope.ItemJabatan.nama.includes('Sekertaris') ? 'seklur' : null;
		if (role) {
			$scope.Pejabat.role = role;
		}

		$http({
			method: 'post',
			url: helperServices.url + '/api/pejabat',
			Header: AuthService.getHeader(),
			data: $scope.Pejabat
		}).then(
			(param) => {
				$scope.DatasPejabat.push(angular.copy(param.data));
				alert('Berhasil Simpan');
			},
			(error) => {
				alert(error.message);
			}
		);
	};

	$scope.Ubah = function () {
		$http({
			method: 'put',
			url: helperServices.url + '/api/jabatan',
			Header: AuthService.getHeader(),
			data: $scope.InputPermohonan
		}).then(
			(param) => {
				alert('Berhasil Melakukan perubahan');
			},
			(error) => {
				alert(error.message);
			}
		);
	};

	$scope.Hapus = function (item) {
		$http({
			method: 'delete',
			url: helperServices.url + '/api/jabatan/' + item.idjenispermohonan,
			Header: AuthService.getHeader()
		}).then(
			(param) => {
				alert('Data Berhasil Di hapus');
			},
			(error) => {
				alert(error.message);
			}
		);
	};
}

function adminpermohonanController() { }

function admintambahpermohonanController($http, helperServices, AuthService, $scope) {
	$scope.Selected;
	$scope.Penduduk = [];
	$http({
		method: 'get',
		url: helperServices.url + '/api/penduduk',
		Header: AuthService.getHeader()
	}).then(
		(param) => {
			$scope.Penduduk = param.data;
		},
		(error) => { }
	);
}

function adminpreviewController() { }

function adminHomeController($http, helperServices, AuthService, $scope, InboxService) {
	$scope.LuasWilayah = {};
	$scope.Profile = {};
	$scope.Penduduk = {};
	$scope.Pekerjaan = {};
	$scope.Jarak = {};
	InboxService.get().then((res) => {
		$http({
			method: 'get',
			url: helperServices.url + '/api/profildesa',
			Header: AuthService.getHeader()
		}).then((response) => {
			response.data.forEach((value) => {
				if (value.nama == 'Luas Wilayah') {
					$scope.LuasWilayah = value;
				} else if (value.nama == 'Profile') {
					$scope.Profile = value;
				} else if (value.nama == 'Pekerjaan') {
					$scope.Pekerjaan = value;
				} else if (value.nama == 'Jarak') {
					$scope.Jarak = value;
				}
			});
		});
	});

	$scope.Simpan = function (item) {
		if (item == 'Profile') {
			if ($scope.Profile.nama == undefined) {
				$scope.Profile.nama = 'Profile';
				$scope.Profile.tahun = new Date().getFullYear();
				$http({
					method: 'post',
					url: helperServices.url + '/api/profildesa',
					Header: AuthService.getHeader(),
					data: $scope.Profile
				}).then(
					(response) => {
						alert('Berhasil Simpan');
					},
					(error) => {
						alert(error.message);
					}
				);
			}
		} else if (item == 'LuasWilayah') {
			if ($scope.LuasWilayah.nama == undefined) {
				$scope.LuasWilayah.nama = 'LuasWilayah';
				$scope.LuasWilayah.tahun = new Date().getFullYear();
				$http({
					method: 'post',
					url: helperServices.url + '/api/profildesa',
					Header: AuthService.getHeader(),
					data: $scope.LuasWilayah
				}).then(
					(response) => {
						alert('Berhasil Simpan');
					},
					(error) => {
						alert(error.message);
					}
				);
			}
		} else if (item == 'LuasWilayah') {
			if ($scope.Profile.nama == undefined) {
				$scope.Profile.nama = 'LuasWilayah';
				$scope.Profile.tahun = new Date().getFullYear();
				$http({
					method: 'post',
					url: helperServices.url + '/api/profildesa',
					Header: AuthService.getHeader(),
					data: $scope.Profile
				}).then(
					(response) => {
						alert('Berhasil Simpan');
					},
					(error) => {
						alert(error.message);
					}
				);
			}
		} else if (item == 'Pekerjaan') {
			if ($scope.Pekerjaan.nama == undefined) {
				$scope.Pekerjaan.nama = 'Pekerjaan';
				$scope.Pekerjaan.tahun = new Date().getFullYear();
				$http({
					method: 'post',
					url: helperServices.url + '/api/profildesa',
					Header: AuthService.getHeader(),
					data: $scope.Pekerjaan
				}).then(
					(response) => {
						alert('Berhasil Simpan');
					},
					(error) => {
						alert(error.message);
					}
				);
			}
		} else if (item == 'Jarak') {
			if ($scope.Jarak.nama == undefined) {
				$scope.Jarak.nama = 'Jarak';
				$scope.Jarak.tahun = new Date().getFullYear();
				$http({
					method: 'post',
					url: helperServices.url + '/api/profildesa',
					Header: AuthService.getHeader(),
					data: $scope.Jarak
				}).then(
					(response) => {
						alert('Berhasil Simpan');
					},
					(error) => {
						alert(error.message);
					}
				);
			}
		}
	};
}

function admindatakepaladesaController() { }

function admindataumumdesaController() { }

function adminJenisPermohonanController($http, $scope, helperServices, AuthService, message) {
	$scope.DatasJenisPermohonan = [];
	$scope.JenisPermohonan = {};
	$scope.JenisPermohonan.persyaratan = [];
	$scope.InputPermohonan;
	$scope.ItemPersyaratan = '';
	$scope.Persyaratan = [];
	$scope.PermohonanJenis = helperServices.source.PermohonanJenis;
	$scope.Init = function () {
		$http({
			method: 'get',
			url: helperServices.url + '/api/jenispermohonan',
			headers: AuthService.getHeader()
		}).then(
			(param) => {
				$scope.DatasJenisPermohonan = param.data;
			},
			(error) => { }
		);
	};
	$scope.addPersyaratan = function () {
		if ($scope.ItemPersyaratan !== '') {
			$scope.Persyaratan.push(angular.copy($scope.ItemPersyaratan));
			$scope.ItemPersyaratan = '';
		}
	};

	$scope.Simpan = function () {
		$scope.JenisPermohonan.persyaratan = $scope.Persyaratan;
		$http({
			method: 'post',
			url: helperServices.url + '/api/jenispermohonan',
			headers: AuthService.getHeader(),
			data: $scope.JenisPermohonan
		}).then(
			(param) => {
				$scope.JenisPermohonan.idjenispermohonan = param.data.idjenispermohonan;
				$scope.DatasJenisPermohonan.push(angular.copy($scope.JenisPermohonan));
				message.info('Berhasil Simpan');
				$scope.JenisPermohonan = {};
				$scope.ItemPersyaratan = [];
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Ubah = function () {
		$http({
			method: 'put',
			url: helperServices.url + '/api/jenispermohonan',
			Header: AuthService.getHeader(),
			data: $scope.InputPermohonan
		}).then(
			(param) => {
				alert('Berhasil Melakukan perubahan');
			},
			(error) => {
				alert(error.message);
			}
		);
	};

	$scope.Hapus = function (item) {
		$http({
			method: 'delete',
			url: helperServices.url + '/api/jenispermohonan/' + item.idjenispermohonan,
			Header: AuthService.getHeader()
		}).then(
			(param) => {
				alert('Data Berhasil Di hapus');
			},
			(error) => {
				alert(error.message);
			}
		);
	};
}

function adminsuratpengantarktpController() { }

function admindatapendudukController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	tabService,
	PendudukService
) {
	$scope.tab = tabService.createTab();
	$scope.Datas = [];
	$scope.DataInput = {};
	$scope.Penduduk = {};
	$scope.helper = helperServices.source;

	$scope.edit = false;
	$scope.view = false;

	$scope.Init = function () {
		PendudukService.get().then(penduduk=>{
			$scope.Datas=penduduk;
		})
	};
	$scope.SelectedItemPenduduk = function (item, set) {
		PendudukService.getById(item.idpenduduk, true).then((penduduk) => {
			$scope.Penduduk = penduduk;
			
		});
	};
	$scope.Simpan = function () {
		$http({
			method: 'post',
			url: helperServices.url + '/api/penduduk',
			Header: AuthService.getHeader(),
			data: $scope.Penduduk
		}).then(
			(param) => {
				m
				$scope.DataPenduduk.push(angular.copy(param.data));
				$scope.Penduduk = {};
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

function adminJabatanController($scope, $http, helperServices, AuthService) {
	$scope.DataJabatan = [];
	$scope.DataInput = {};
	$scope.Init = function () {
		$http({
			method: 'get',
			url: helperServices.url + '/jabatan',
			Header: AuthService.getHeader()
		}).then((param) => { }, (error) => { });
	};
	$scope.Simpan = function () {
		$http({
			method: 'post',
			url: helperServices.url + '/jabatan',
			Header: AuthService.getHeader(),
			data: $scope.DataInput
		}).then((param) => { }, (error) => { });
	};
	$scope.Ubah = function () {
		$http({
			method: 'put',
			url: helperServices.url + '/jabatan',
			Header: AuthService.getHeader(),
			data: $scope.DataInput
		}).then((param) => { }, (error) => { });
	};
	$scope.Hapus = function (item) {
		$http({
			method: 'delete',
			url: helperServices.url + '/jabatan/' + item.idjabatan,
			Header: AuthService.getHeader()
		}).then((param) => { }, (error) => { });
	};
}

angular
	.module('admin.surat.controller', [])
	.controller('adminsurattidakmampuController', adminsurattidakmampuController)
	.controller('adminsuratketnikahController', adminsuratketnikahController)
	.controller('adminsuratketdomisiliController', adminsuratketdomisiliController)
	.controller('adminsuratketmenikahController', adminsuratketmenikahController)
	.controller('adminsuratpenguasaantanahController', adminsuratpenguasaantanahController)
	.controller('adminsuratketusahaController', adminsuratketusahaController)
	.controller('adminsuratbelummenikahController', adminsuratbelummenikahController)
	.controller('adminsuratkelahiranController', adminsuratkelahiranController)
	.controller('adminsuratketceraiController', adminsuratketceraiController)
	.controller('adminsuratketdesaController', adminsuratketdesaController)
	.controller('adminsuratketektpController', adminsuratketektpController)
	.controller('adminsuratskckController', adminsuratskckController)
	.controller('adminsuratpindahController', adminsuratpindahController);

function adminsuratpindahController() { }

function adminsurattidakmampuController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	$state,
	$rootScope,
	tabService,
	approvedService,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	PersetujuanService,
	loaderService
) {
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.dataPejabat = [];
	$scope.ListPenduduk = [];
	$scope.Datas = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.model.data.pejabat = {};
	$scope.dataPrint = {};
	$scope.IdJenis;
	$scope.UserRole;

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		PendudukService.getById(data.idpenduduk).then((penduduk) => {
			$scope.model.idpenduduk = penduduk;
			$scope.model.idpejabat = angular.copy($scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat));
			$scope.tab.show('edit');
		});
	};
	$scope.Batal = function () {
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
		$scope.tab.show('list');
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Tidak Mampu').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = param.filter((x) => x.status != 'selesai' && x.status != 'ditolak');
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
							loaderService.setValue(false)
						});
					});
				});
			});
		});
	};
	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.model.idpenduduk = a.idpenduduk;
		$scope.model.nama = a.nama;
	};
	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				var Method;
				if ($scope.tab.tambah) {
					Method = 'post';
				} else {
					Method = 'put';
				}
				var today = new Date();
				$scope.model.tanggalpengajuan =
					today.getFullYear() +
					'-' +
					(today.getMonth() + 1) +
					'-' +
					today.getDate() +
					' ' +
					today.getHours() +
					':' +
					today.getMinutes() +
					':' +
					today.getSeconds();
				$scope.model.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk);
				$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
				$http({
					method: Method,
					url: helperServices.url + '/api/permohonan',
					headers: AuthService.getHeader(),
					data: $scope.model
				}).then(
					(param) => {
						if ($scope.tab.tambah) {
							$scope.model.SetButtonPrint = true;
							$scope.model.idpermohonan = param.idpermohonan;
							$scope.Datas.push(angular.copy($scope.model));
							$scope.tab.show('list');
							message.info('Berhasil Menyimpan');
						} else {
							message.info('Berhasil Mengubah');
							$scope.tab.show('list');
						}
						$scope.model = {};
						$scope.model.data = {};
						$scope.Init();
					},
					(error) => {
						message.errorText(error.message);
					}
				);
			},
			(error) => {
				message.errorText('Batal');
			}
		);
	};
	$scope.Selecteddata = function (id, item) {
		$http({
			method: 'get',
			url: helperServices.url + '/api/penduduk/' + item.idpenduduk,
			headers: AuthService.getHeader()
		}).then((param) => {
			item.penduduk = param.data;
			$scope.dataPrint = angular.copy(item);
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				$scope.Print(id, item);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk, true).then((param) => {
			PejabatService.getById(item.idpejabat).then((datapejabat) => {
				$scope.dataPrint = param;
				$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
				$scope.dataPrint.tampiltanggaladminsurat = getTanggalIndonesia(
					new Date(item.persetujuan[item.persetujuan.length - 1].created)
				);
				$scope.dataPrint.pejabat = datapejabat;
				setTimeout(function () {
					helperServices.print(id);
				}, 900);
			});
		});
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketnikahController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	$state,
	$rootScope,
	tabService,
	approvedService,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	PersetujuanService
) {
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.dataPejabat = [];
	$scope.ListPenduduk = [];
	$scope.Datas = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint = {};
	$scope.IdJenis;
	$scope.UserRole;
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan Nikah').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((permohonan) => {
							approvedService.approvedView(permohonan, $scope.UserRole);
							$scope.Datas = angular.copy(permohonan);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.idpenduduksuami = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpenduduksuami)
		);
		$scope.model.data.idpendudukistri = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpendudukistri)
		);
		$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.idpejabat == angular.copy(data.idpejabat));
		$scope.tab.show('edit');
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.model.idpenduduk = a.idpenduduk;
		$scope.model.nama = a.nama;
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			var today = new Date();
			$scope.model.tanggalpengajuan =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate() +
				' ' +
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
		} else {
			Method = 'put';
		}
		// $scope.model.data.pejabat = $scope.model.pejabat
		$scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
		$scope.model.data.idpenduduksuami = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
		$scope.model.data.idpendudukistri = angular.copy($scope.model.data.idpendudukistri.idpenduduk);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.model.SetButtonPrint = true;
					$scope.model.idpermohonan = param.idpermohonan;
					$scope.Datas.push(angular.copy($scope.model));
					$scope.tab.show('list');
					$scope.Init();
					message.info('Berhasil Menyimpan');
				} else {
					message.info('Berhasil Mengubah');
					$scope.Init();
					$scope.tab.show('list');
				}
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};
	$scope.Selecteddata = function (id, item) {
		$http({
			method: 'get',
			url: helperServices.url + '/api/penduduk/' + item.idpenduduk,
			headers: AuthService.getHeader()
		}).then((param) => {
			item.penduduk = param.data;
			$scope.dataPrint = angular.copy(item);
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				$scope.Print(id, item);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk, true).then((param) => {
			PejabatService.getById(item.idpejabat).then((datapejabat) => {
				$scope.dataPrint = param;
				$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
				$scope.dataPrint.tampiltanggaladminsurat = getTanggalIndonesia(
					new Date(item.persetujuan[item.persetujuan.length - 1].created)
				);
				$scope.dataPrint.pejabat = datapejabat;
				setTimeout(function () {
					helperServices.print(id);
				}, 900);
			});
		});
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketdomisiliController(
	$http,
	helperServices,
	AuthService,
	$scope,
	PejabatService,
	PendudukService,
	JenisPermohonanService,
	PermohonanService,
	approvedService,
	message,
	tabService,
	PersetujuanService,
	$rootScope,
	loaderService,
	$state
) {
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.dataPejabat = [];
	$scope.ListPenduduk = [];
	$scope.Datas = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint = {};
	$scope.IdJenis;
	$scope.UserRole;

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		PendudukService.getById(data.idpenduduk).then((penduduk) => {
			$scope.model.idpenduduk = penduduk;
			$scope.model.idpejabat = angular.copy($scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat));
			$scope.tab.show('edit');
		});
	};

	$scope.go = function (item) {
		var state = helperServices.stateEdit('Keterangan Domisili', $scope.UserRole);
		// $rootScope.permohonan = permohonan;
		if (item == "Tambah") {
			$state.go(state, {id: null});
		} else {
			$state.go(state, { id: permohonan.idpermohonan });
		}
	}

	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan Domisili').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
							loaderService.setValue(false);
						});
					});
				});
			});
		});
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.model.idpenduduk = a.idpenduduk;
		$scope.model.nama = a.nama;
	};

	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
		} else {
			Method = 'put';
		}
		var today = new Date();
		$scope.model.tanggalpengajuan =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate() +
			' ' +
			today.getHours() +
			':' +
			today.getMinutes() +
			':' +
			today.getSeconds();
		// $scope.model.data.pejabat = $scope.model.pejabat
		$scope.model.data.idpenduduk = angular.copy($scope.model.idpenduduk);
		$scope.model.nama = angular.copy($scope.model.idpenduduk.nama);
		$scope.model.nik = angular.copy($scope.model.idpenduduk.nik);
		$scope.model.nkk = angular.copy($scope.model.idpenduduk.nkk);
		// $scope.model.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk);
		$scope.model.jenis = 'Keterangan Domisili';
		$scope.model.namapejabat = angular.copy($scope.model.idpejabat.nama);
		$scope.model.nip = angular.copy($scope.model.idpejabat.nip);
		$scope.model.namajabatan = angular.copy($scope.model.idpejabat.namajabatan);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.model.SetButtonPrint = true;
					$scope.model.idpermohonan = param.idpermohonan;
					$scope.Datas.push(angular.copy($scope.model));
					$scope.tab.show('list');
					$scope.Init();
					message.info('Berhasil Menyimpan');
				} else {
					message.info('Berhasil Mengubah');
					$scope.Init();
				}
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};
	$scope.Selecteddata = function (id, item) {
		$http({
			method: 'get',
			url: helperServices.url + '/api/penduduk/' + item.idpenduduk,
			headers: AuthService.getHeader()
		}).then((param) => {
			item.penduduk = param.data;
			$scope.dataPrint = angular.copy(item);
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				$scope.Print(id);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.data.tanggallahir)));
			$scope.dataPrint.tampiltanggaladminsurat = getTanggalIndonesia(
				new Date(item.persetujuan[item.persetujuan.length - 1].created)
			);

			setTimeout(function () {
				helperServices.print(id);
			}, 1300);
		});
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketmenikahController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	PejabatService,
	PendudukService,
	JenisPermohonanService,
	PermohonanService,
	approvedService,
	$scope,
	message,
	tabService,
	$rootScope,
	PersetujuanService
) {
	$scope.JenisKelamin = helperServices.JenisKelamin;
	$scope.ListRT = [];
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.Datas = [];
	$scope.ListPenduduk = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint;
	$scope.IdJenis;
	$scope.ItemAyah = '';
	$scope.ItemIbu = '';
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					JenisPermohonanService.getByJenis('Sudah Menikah').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.tanggaladminsuratpengantar = new Date(
			angular.copy($scope.model.data.tanggaladminsuratpengantar)
		);
		$scope.model.data.idpenduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpenduduk);
		$scope.tab.show('edit');
	};

	$scope.Approved = function (data) {
		$scope.model = data;
		data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('approved');
	};

	$scope.SelectedRT = function () {
		$scope.model.data.RT = $scope.ListRT.find(
			(x) =>
				x.data.nomorrt == $scope.model.data.idpenduduk.rt && x.data.nomorrw == $scope.model.data.idpenduduk.rw
		);
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
		} else {
			Method = 'put';
		}
		var today = new Date();
		$scope.model.tanggalpengajuan =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate() +
			' ' +
			today.getHours() +
			':' +
			today.getMinutes() +
			':' +
			today.getSeconds();
		// $scope.model.data.pejabat = $scope.model.pejabat
		$scope.model.data.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk);
		$scope.model.nama = angular.copy($scope.model.idpenduduk.nama);
		$scope.model.nik = angular.copy($scope.model.idpenduduk.nik);
		$scope.model.nkk = angular.copy($scope.model.idpenduduk.nkk);
		$scope.model.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk);
		$scope.model.jenis = 'Keterangan Domisili';
		$scope.model.namapejabat = angular.copy($scope.model.idpejabat.nama);
		$scope.model.nip = angular.copy($scope.model.idpejabat.nip);
		$scope.model.namajabatan = angular.copy($scope.model.idpejabat.namajabatan);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.model.SetButtonPrint = true;
					$scope.model.idpermohonan = param.idpermohonan;
					$scope.Datas.push(angular.copy($scope.model));
					$scope.tab.show('list');
					$scope.Init();
					message.info('Berhasil Menyimpan');
				} else {
					message.info('Berhasil Mengubah');
					$scope.Init();
				}
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};
	$scope.Selecteddata = function (id, item) {
		$http({
			method: 'get',
			url: helperServices.url + '/api/penduduk/' + item.idpenduduk,
			headers: AuthService.getHeader()
		}).then((param) => {
			item.penduduk = param.data;
			$scope.dataPrint = angular.copy(item);
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				$scope.Print(id);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.data.tanggallahir)));
			$scope.dataPrint.tampiltanggaladminsurat = getTanggalIndonesia(
				new Date(item.persetujuan[item.persetujuan.length - 1].created)
			);

			setTimeout(function () {
				helperServices.print(id);
			}, 1300);
		});
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratbelummenikahController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	PejabatService,
	PendudukService,
	JenisPermohonanService,
	PermohonanService,
	approvedService,
	message,
	tabService,
	$rootScope,
	PersetujuanService
) {
	$scope.JenisKelamin = helperServices.JenisKelamin;
	$scope.ListRT = [];
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.Datas = [];
	$scope.ListPenduduk = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint;
	$scope.IdJenis;
	$scope.ItemAyah = '';
	$scope.ItemIbu = '';
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.data.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					JenisPermohonanService.getByJenis('Belum Menikah').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.tanggaladminsuratpengantar = new Date(
			angular.copy($scope.model.data.tanggaladminsuratpengantar)
		);
		$scope.model.data.idpenduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpenduduk);
		// data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('edit');
	};

	$scope.Approved = function (data) {
		$scope.model = data;
		data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('approved');
	};

	$scope.SelectedRT = function () {
		$scope.model.data.RT = $scope.ListRT.find(
			(x) =>
				x.data.nomorrt == $scope.model.data.idpenduduk.rt && x.data.nomorrw == $scope.model.data.idpenduduk.rw
		);
	};
	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			$scope.model.tanggalpengajuan = new Date();
		} else {
			Method = 'put';
			$scope.model.tanggalpengajuan = new Date($scope.model.tanggalpengajuan);
		}
		$scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);
		$scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.model.idpermohonan = param.idpermohonan;
					$scope.Datas.push(angular.copy($scope.model));
					message.info('Berhasil Menyimpan');
				} else {
					message.info('Berhasil Mengubah Data');
				}
				$scope.model = {};
				$scope.tab.show('list');
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				helperServices.print(id);
			}, 1300);
		});
	};
	$scope.SelectTanggalLahir = function () {
		var a = $scope.TanggalLahir.split('-');
		$scope.model.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
		$scope.model.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratkelahiranController(
	$http,
	helperServices,
	AuthService,
	tabService,
	PejabatService,
	PendudukService,
	JenisPermohonanService,
	PermohonanService,
	approvedService,
	$scope,
	message,
	$rootScope,
	PersetujuanService
) {
	$scope.JenisKelamin = helperServices.source.JenisKelamin;
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.Datas = [];
	$scope.ListPenduduk = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint;
	$scope.IdJenis;
	$scope.ItemAyah = '';
	$scope.ItemIbu = '';
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Kelahiran').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							$scope.Datas.forEach((item) => {
								var a = $scope.ListPenduduk.find((y) => y.idpenduduk == item.data.idpendudukibu);
								var b = $scope.ListPenduduk.find((y) => y.idpenduduk == item.data.idpendudukayah);
								item.data.namaibu = a.nama;
								item.data.namaayah = b.nama;
							});
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.tanggallahir = new Date(angular.copy($scope.model.data.tanggallahir));
		$scope.ListPenduduk.forEach((params) => {
			if (params.idpenduduk == data.data.idpendudukayah) {
				$scope.model.data.idpendudukayah = params;
			} else if (params.idpenduduk == data.data.idpendudukibu) {
				$scope.model.data.idpendudukibu = params;
			}
		});
		$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.idpejabat == $scope.model.idpejabat);
		// data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('edit');
	};

	$scope.Approved = function (data) {
		$scope.model = data;
		data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('approved');
	};

	$scope.SelectedOrtu = function (item) {
		if (item == 'Ayah') {
			var a = JSON.parse(angular.copy($scope.ItemAyah));
			$scope.model.idpenduduk = a.idpenduduk;
			$scope.model.nama = a.nama;
		} else {
			var a = JSON.parse(angular.copy($scope.ItemIbu));
			$scope.model.data.idpendudukibu = a.idpenduduk;
			$scope.model.data.namaibu = a.nama;
		}
	};
	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
		} else {
			Method = 'put';
		}

		$scope.model.tanggalpengajuan = new Date();
		$scope.model.idpenduduk = angular.copy($scope.model.data.idpendudukayah.idpenduduk);
		$scope.model.data.idpendudukayah = angular.copy($scope.model.data.idpendudukayah.idpenduduk);
		$scope.model.data.idpendudukibu = angular.copy($scope.model.data.idpendudukibu.idpenduduk);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);

		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				$scope.model.idpermohonan = param.idpermohonan;
				$scope.Datas.push(angular.copy($scope.model));
				message.info('Berhasil Menyimpan');
				$scope.model = {};
				$scope.ItemPenduduk = '';
				$scope.tab.show('list');
				$scope.Datas = [];
				$scope.Init();
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				helperServices.print(id);
			}, 1300);
		});
	};
	$scope.SelectTanggalLahir = function () {
		var a = $scope.TanggalLahir.split('-');
		$scope.model.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
		$scope.model.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketceraiController(
	$http,
	helperServices,
	AuthService,
	$scope,
	message,
	tabService,
	approvedService,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	$rootScope,
	PersetujuanService,
	$stateParams
) {
	$scope.tab = tabService.createTab();
	$scope.ItemPenduduk = '';
	$scope.dataPejabat = [];
	$scope.ListPenduduk = [];
	$scope.Datas = [];
	$scope.model = {};
	$scope.model.data = {};
	$scope.dataPrint = {};
	$scope.IdJenis;
	$scope.UserRole;
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan Cerai').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							var id = $stateParams.id;
							if (id) {
								PermohonanService.getById(id).then((data) => {
									$scope.Edit(data);
								});
							}
						});
					});
				});
			});
		});
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.idpenduduksuami = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpenduduksuami)
		);
		$scope.model.data.idpendudukistri = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpendudukistri)
		);
		$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.idpejabat == angular.copy(data.idpejabat));
		$scope.tab.show('edit');
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.model.idpenduduk = a.idpenduduk;
		$scope.model.nama = a.nama;
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			var today = new Date();
			$scope.model.tanggalpengajuan =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate() +
				' ' +
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
		} else {
			Method = 'put';
		}
		// $scope.model.data.pejabat = $scope.model.pejabat
		$scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
		$scope.model.data.idpenduduksuami = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
		$scope.model.data.idpendudukistri = angular.copy($scope.model.data.idpendudukistri.idpenduduk);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$http({
			method: Method,
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.model
		}).then(
			(param) => {
				if ($scope.tab.tambah) {
					$scope.model.SetButtonPrint = true;
					$scope.model.idpermohonan = param.idpermohonan;
					$scope.Datas.push(angular.copy($scope.model));
					$scope.tab.show('list');
					$scope.Init();
					message.info('Berhasil Menyimpan');
				} else {
					message.info('Berhasil Mengubah');
					$scope.Init();
					$scope.tab.show('list');
				}
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};
	$scope.Selecteddata = function (id, item) {
		$http({
			method: 'get',
			url: helperServices.url + '/api/penduduk/' + item.idpenduduk,
			headers: AuthService.getHeader()
		}).then((param) => {
			item.penduduk = param.data;
			$scope.dataPrint = angular.copy(item);
			var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
			$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
			setTimeout(function () {
				$scope.Print(id, item);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk, true).then((param) => {
			PejabatService.getById(item.idpejabat).then((datapejabat) => {
				$scope.dataPrint = param;
				$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
				$scope.dataPrint.tampiltanggaladminsurat = getTanggalIndonesia(
					new Date(item.persetujuan[item.persetujuan.length - 1].created)
				);
				$scope.dataPrint.pejabat = datapejabat;
				setTimeout(function () {
					helperServices.print(id);
				}, 900);
			});
		});
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketdesaController(
	$http,
	helperServices,
	AuthService,
	$scope,
	tabService,
	message,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	PejabatService,
	approvedService,
	$rootScope,
	PersetujuanService
) {
	$scope.tab = tabService.createTab();
	$scope.ListPenduduk = [];
	$scope.adminSuratKetDesa = {};
	$scope.Datas = [];
	$scope.TanggaladminSurat;
	$scope.Jam;
	$scope.model = {};
	$scope.model.data = {};
	$scope.adminSuratKetDesa.data = {};
	$scope.dataPrint = {};
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan Desa').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.idpenduduk = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpenduduk)
		);
		$scope.tab.show('edit');
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.adminSuratKetDesa.idpenduduk = a.idpenduduk;
		$scope.adminSuratKetDesa.nama = a.nama;
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			var today = new Date();
			$scope.model.tanggalpengajuan =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate() +
				' ' +
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
		} else {
			Method = 'put';
		}
		$scope.model.namapejabat = angular.copy($scope.model.idpejabat.nama);
		$scope.model.namajabatan = angular.copy($scope.model.idpejabat.namajabatan);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$scope.model.nama = angular.copy($scope.model.data.idpenduduk.nama);
		$scope.model.nik = angular.copy($scope.model.data.idpenduduk.nik);
		$scope.model.nkk = angular.copy($scope.model.data.idpenduduk.nkk);
		$scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

		$http({
			method: 'post',
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.adminSuratKetDesa
		}).then(
			(param) => {
				$scope.adminSuratKetDesa.idpermohonan = param.idpermohonan;
				$scope.DatasadminSuratKetDesa.push(angular.copy($scope.adminSuratKetDesa));
				message.info('Berhasil Menyimpan');
				$scope.adminSuratKetDesa = {};
				$scope.ItemPenduduk = '';
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Selecteddata = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
		$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
		setTimeout(function () {
			$scope.Print(id);
		}, 1300);
	};

	$scope.Print = function (id) {
		var innerContents = document.getElementById(id).innerHTML;
		var popupWinindow = window.open(
			'',
			'_blank',
			'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
		);
		popupWinindow.document.open();
		popupWinindow.document.write(
			'<html><head><title>Cetak adminSurat</title></head><body onload="window.print()"><div>' +
			innerContents +
			'</html>'
		);
		popupWinindow.document.close();
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketektpController(
	$http,
	helperServices,
	AuthService,
	$scope,
	tabService,
	message,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	PejabatService,
	approvedService,
	$rootScope,
	PersetujuanService
) {
	$scope.tab = tabService.createTab();
	$scope.ListPenduduk = [];
	$scope.adminSuratKetDesa = {};
	$scope.Datas = [];
	$scope.TanggaladminSurat;
	$scope.Jam;
	$scope.model = {};
	$scope.model.data = {};
	$scope.adminSuratKetDesa.data = {};
	$scope.dataPrint = {};
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan eKTP').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.idpenduduk = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpenduduk)
		);
		$scope.tab.show('edit');
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.adminSuratKetDesa.idpenduduk = a.idpenduduk;
		$scope.adminSuratKetDesa.nama = a.nama;
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			var today = new Date();
			$scope.model.tanggalpengajuan =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate() +
				' ' +
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
		} else {
			Method = 'put';
		}
		$scope.model.namapejabat = angular.copy($scope.model.idpejabat.nama);
		$scope.model.namajabatan = angular.copy($scope.model.idpejabat.namajabatan);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$scope.model.nama = angular.copy($scope.model.data.idpenduduk.nama);
		$scope.model.nik = angular.copy($scope.model.data.idpenduduk.nik);
		$scope.model.nkk = angular.copy($scope.model.data.idpenduduk.nkk);
		$scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

		$http({
			method: 'post',
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.adminSuratKetDesa
		}).then(
			(param) => {
				$scope.adminSuratKetDesa.idpermohonan = param.idpermohonan;
				$scope.DatasadminSuratKetDesa.push(angular.copy($scope.adminSuratKetDesa));
				message.info('Berhasil Menyimpan');
				$scope.adminSuratKetDesa = {};
				$scope.ItemPenduduk = '';
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Selecteddata = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
		$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
		setTimeout(function () {
			$scope.Print(id);
		}, 1300);
	};

	$scope.Print = function (id) {
		var innerContents = document.getElementById(id).innerHTML;
		var popupWinindow = window.open(
			'',
			'_blank',
			'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
		);
		popupWinindow.document.open();
		popupWinindow.document.write(
			'<html><head><title>Cetak adminSurat</title></head><body onload="window.print()"><div>' +
			innerContents +
			'</html>'
		);
		popupWinindow.document.close();
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

function adminsuratketusahaController() { }

function adminsuratpenguasaantanahController() { }

function adminsuratskckController(
	$http,
	helperServices,
	AuthService,
	$scope,
	tabService,
	message,
	JenisPermohonanService,
	PermohonanService,
	PendudukService,
	PejabatService,
	PejabatService,
	approvedService,
	$rootScope,
	PersetujuanService
) {
	$scope.tab = tabService.createTab();
	$scope.ListPenduduk = [];
	$scope.adminSuratKetDesa = {};
	$scope.Datas = [];
	$scope.TanggaladminSurat;
	$scope.Jam;
	$scope.model = {};
	$scope.model.data = {};
	$scope.adminSuratKetDesa.data = {};
	$scope.dataPrint = {};
	$scope.Init = function () {
		AuthService.profile().then((param) => {
			$scope.UserRole = param.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.model.idpejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
					JenisPermohonanService.getByJenis('Keterangan SKCK').then((jenis) => {
						$scope.model.idjenispermohonan = jenis.idjenispermohonan;
						PermohonanService.getByJenis(jenis.idjenispermohonan).then((param) => {
							approvedService.approvedView(param, $scope.UserRole);
							$scope.Datas = angular.copy(param);
							if ($rootScope.permohonan) {
								$scope.Edit($rootScope.permohonan);
							}
						});
					});
				});
			});
		});
	};

	$scope.Edit = function (data) {
		$scope.model = angular.copy(data);
		$rootScope.permohonan = null;
		$scope.model.data.idpenduduk = $scope.ListPenduduk.find(
			(x) => x.idpenduduk == angular.copy(data.data.idpenduduk)
		);
		$scope.tab.show('edit');
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.adminSuratKetDesa.idpenduduk = a.idpenduduk;
		$scope.adminSuratKetDesa.nama = a.nama;
	};

	$scope.Simpan = function () {
		var Method;
		if ($scope.tab.tambah) {
			Method = 'post';
			var today = new Date();
			$scope.model.tanggalpengajuan =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate() +
				' ' +
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
		} else {
			Method = 'put';
		}
		$scope.model.namapejabat = angular.copy($scope.model.idpejabat.nama);
		$scope.model.namajabatan = angular.copy($scope.model.idpejabat.namajabatan);
		$scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
		$scope.model.nama = angular.copy($scope.model.data.idpenduduk.nama);
		$scope.model.nik = angular.copy($scope.model.data.idpenduduk.nik);
		$scope.model.nkk = angular.copy($scope.model.data.idpenduduk.nkk);
		$scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

		$http({
			method: 'post',
			url: helperServices.url + '/api/permohonan',
			headers: AuthService.getHeader(),
			data: $scope.adminSuratKetDesa
		}).then(
			(param) => {
				$scope.adminSuratKetDesa.idpermohonan = param.idpermohonan;
				$scope.DatasadminSuratKetDesa.push(angular.copy($scope.adminSuratKetDesa));
				message.info('Berhasil Menyimpan');
				$scope.adminSuratKetDesa = {};
				$scope.ItemPenduduk = '';
			},
			(error) => {
				message.errorText(error.message);
			}
		);
	};

	$scope.Selecteddata = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
		$scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
		setTimeout(function () {
			$scope.Print(id);
		}, 1300);
	};

	$scope.Print = function (id) {
		var innerContents = document.getElementById(id).innerHTML;
		var popupWinindow = window.open(
			'',
			'_blank',
			'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
		);
		popupWinindow.document.open();
		popupWinindow.document.write(
			'<html><head><title>Cetak adminSurat</title></head><body onload="window.print()"><div>' +
			innerContents +
			'</html>'
		);
		popupWinindow.document.close();
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};
	$scope.Batal = function () {
		$scope.tab.show('list');
		$scope.model = {};
		$scope.model.data = {};
		$scope.Init();
	};
	$scope.Setuju = function (item) {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PersetujuanService.get(item.idpermohonan).then(
					(x) => {
						item.SetButtonApproved = false;
						message.info('Permohonan di setujui!!!');
					},
					(error) => {
						message.errorText(error.data);
					}
				);
			},
			(error) => {
				message.errorText('Persetujuan di batalkan');
			}
		);
	};
	$scope.pesanbatal = message;
	$scope.TampilPesan = function (item) {
		message.dialog('Anda Yakin menolak permohonan???', 'Ya', 'Batal').then(
			(x) => {
				$scope.model.idpermohonan = item.idpermohonan;
				$('#Pesan').modal('show');
			},
			(error) => {
				message.errorText('Proses Penolakan di batalkan!!!');
			}
		);
	};
	$scope.Tolak = function () {
		$('#TampilPesan').modal('hide');
		PersetujuanService.tolak($scope.model).then(
			(x) => {
				var item = $scope.Datas.find((x) => x.idpermohonan == $scope.model.idpermohonan);
				var index = $scope.Datas.indexOf(item);
				$scope.Datas.splice(index, 1);
				message.info('Anda berhasil menolak permohonan!!!');
			},
			(error) => {
				message.errorText('Penolakan Gagal, Sistem Error');
			}
		);
	};
}

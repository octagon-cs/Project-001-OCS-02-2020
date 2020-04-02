angular
	.module('admin.surat.param.controller', [])
	.controller('adminsuratedittidakmampuController', adminsuratedittidakmampuController)
	.controller('adminsurateditketnikahController', adminsurateditketnikahController)
	.controller('adminsurateditketdomisiliController', adminsurateditketdomisiliController)
	.controller('adminsurateditketmenikahController', adminsurateditketmenikahController)
	.controller('adminsurateditpenguasaantanahController', adminsurateditpenguasaantanahController)
	.controller('adminsurateditketusahaController', adminsurateditketusahaController)
	.controller('adminsurateditbelummenikahController', adminsurateditbelummenikahController)
	.controller('adminsurateditkelahiranController', adminsurateditkelahiranController)
	.controller('adminsurateditketceraiController', adminsurateditketceraiController)
	.controller('adminsurateditketdesaController', adminsurateditketdesaController)
	.controller('adminsurateditketektpController', adminsurateditketektpController)
	.controller('adminsurateditskckController', adminsurateditskckController)
	.controller('adminsurateditpindahController', adminsurateditpindahController);

function adminsurateditpindahController($stateParams) { }

function adminsuratedittidakmampuController(
	$stateParams,
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
	$scope.title;
	$scope.Init = function () {
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN TIDAK MAMPU";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							PendudukService.getById(data.idpenduduk).then((penduduk) => {
								data.penduduk = penduduk;
								approvedService.approvedModel(data, $scope.UserRole);
								$scope.model = data;
								loaderService.setValue(false);
							});
						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN TIDAK MAMPU";
						JenisPermohonanService.getByJenis('Tidak Mampu').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Tidak Mampu', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};
	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				$scope.model.data.idpenduduk = angular.copy($scope.model.penduduk.idpenduduk);
				$scope.model.nama = angular.copy($scope.model.penduduk.nama);
				$scope.model.nik = angular.copy($scope.model.penduduk.nik);
				$scope.model.nkk = angular.copy($scope.model.penduduk.nkk);
				$scope.model.idpenduduk = angular.copy($scope.model.penduduk.idpenduduk);
				$scope.model.jenis = 'Tidak Mampu';
				$scope.model.namapejabat = angular.copy($scope.model.pejabat.nama);
				$scope.model.nip = angular.copy($scope.model.pejabat.nip);
				$scope.model.namajabatan = angular.copy($scope.model.pejabat.namajabatan);
				$scope.model.idpejabat = angular.copy($scope.model.pejabat.idpejabat);
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Tidak Mampu', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Tidak Mampu', $scope.UserRole));
					});
				}
			},
			(error) => {
				message.errorText('Batal');
			}
		);
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

function adminsurateditketnikahController(
	$stateParams,
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
	loaderService.setValue(true);
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
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN NIKAH";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.penduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.idpenduduk);
							data.pendudukpasangan = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukistri);
							approvedService.approvedModel(data, $scope.UserRole);
							$scope.model = data;
							loaderService.setValue(false);

						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN NIKAH";
						JenisPermohonanService.getByJenis('Keterangan Nikah').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Keterangan Nikah', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.SelectedPenduduk = function () {
		var a = JSON.parse(angular.copy($scope.ItemPenduduk));
		$scope.model.idpenduduk = a.idpenduduk;
		$scope.model.nama = a.nama;
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Keterangan Nikah', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Keterangan Nikah', $scope.UserRole));
					});
				}
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
				$scope.dataPrint.tampiltanggaladminsuratedit = getTanggalIndonesia(
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

function adminsurateditketdomisiliController(
	$stateParams,
	$http,
	helperServices,
	AuthService,
	$scope,
	PejabatService,
	PendudukService,
	JenisPermohonanService,
	approvedService,
	PermohonanService,
	loaderService,
	message,
	tabService,
	PersetujuanService,
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

	$scope.Init = function () {
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					if ($stateParams.id) {
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							PendudukService.getById(data.idpenduduk).then((penduduk) => {
								data.penduduk = penduduk;
								approvedService.approvedModel(data, $scope.UserRole);
								$scope.model = data;
								loaderService.setValue(false);
							});
						});
					} else {
						JenisPermohonanService.getByJenis('Keterangan Domisili').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.files;

	$scope.Upload = function(){
		console.log($scope.files);
	}

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Keterangan Domisili', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				$scope.model.data.idpenduduk = angular.copy($scope.model.penduduk.idpenduduk);
				$scope.model.nama = angular.copy($scope.model.penduduk.nama);
				$scope.model.nik = angular.copy($scope.model.penduduk.nik);
				$scope.model.nkk = angular.copy($scope.model.penduduk.nkk);
				$scope.model.idpenduduk = angular.copy($scope.model.penduduk.idpenduduk);
				$scope.model.jenis = 'Keterangan Domisili';
				$scope.model.namapejabat = angular.copy($scope.model.pejabat.nama);
				$scope.model.nip = angular.copy($scope.model.pejabat.nip);
				$scope.model.namajabatan = angular.copy($scope.model.pejabat.namajabatan);
				$scope.model.idpejabat = angular.copy($scope.model.pejabat.idpejabat);
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Keterangan Domisili', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Keterangan Domisili', $scope.UserRole));
					});
				}
			},
			(error) => {
				message.errorText('Batal');
			}
		);

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

function adminsurateditketmenikahController(
	$stateParams,
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
	PersetujuanService,
	$state,
	loaderService
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
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN SUDAH MENIKAH";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.penduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.idpenduduk);
							data.pendudukpasangan = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukistri);
							approvedService.approvedModel(data, $scope.UserRole);
							data.data.tanggalsuratpengantar = new Date(data.data.tanggalsuratpengantar);
							$scope.model = data;
							loaderService.setValue(false);

						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN SUDAH MENIKAH";
						JenisPermohonanService.getByJenis('Sudah Menikah').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Approved = function (data) {
		$scope.model = data;
		data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('approved');
	};

	$scope.SelectedRT = function () {
		$scope.model.data.RT = $scope.ListRT.find(
			(x) =>
				x.data.nomorrt == $scope.model.penduduk.rt && x.data.nomorrw == $scope.model.penduduk.rw
		);
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Sudah Menikah', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Sudah Menikah', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Sudah Menikah', $scope.UserRole));
					});
				}
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
				$scope.Print(id);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.data.tanggallahir)));
			$scope.dataPrint.tampiltanggaladminsuratedit = getTanggalIndonesia(
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

function adminsurateditbelummenikahController(
	$stateParams,
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
	$window,
	PersetujuanService,
	$state,
	loaderService
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
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN SUDAH MENIKAH";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.penduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.idpenduduk);
							data.pendudukpasangan = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukistri);
							approvedService.approvedModel(data, $scope.UserRole);
							data.data.tanggalsuratpengantar = new Date(data.data.tanggalsuratpengantar);
							$scope.model = data;
							loaderService.setValue(false);

						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN SUDAH MENIKAH";
						JenisPermohonanService.getByJenis('Belum Menikah').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Approved = function (data) {
		$scope.model = data;
		data.data.tanggallahir = new Date(data.data.tanggallahir);
		$scope.tab.show('approved');
	};

	$scope.SelectedRT = function () {
		$scope.model.data.RT = $scope.ListRT.find(
			(x) =>
				x.data.nomorrt == $scope.model.penduduk.rt && x.data.nomorrw == $scope.model.penduduk.rw
		);
	};
	$scope.pad = (number) => {
		return helperServices.pad(number);
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Belum Menikah', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Belum Menikah', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Belum Menikah', $scope.UserRole));
					});
				}
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
				$scope.Print(id);
			}, 1300);
		});
	};
	$scope.Print = function (id, item) {
		$scope.dataPrint = angular.copy(item);
		PendudukService.getById(item.idpenduduk).then((param) => {
			$scope.dataPrint.penduduk = param.data;
			$scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.data.tanggallahir)));
			$scope.dataPrint.tampiltanggaladminsuratedit = getTanggalIndonesia(
				new Date(item.persetujuan[item.persetujuan.length - 1].created)
			);

			setTimeout(function () {
				helperServices.print(id);
			}, 1300);
		});
	};
	$scope.Setuju = function () {
		message.dialog('Anda yakin menyetujui permohonan???', 'Setuju', 'Batal').then(
			(x) => {
				PermohonanService.approved($scope.model.idpermohonan).then(
					(x) => {
						message.info('Permohonan di setujui!!!');
						$window.history.back();
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

function adminsurateditkelahiranController(
	$stateParams,
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
	PersetujuanService,
	loaderService,
	$state
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
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get(true).then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN KELAHIRAN";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.ayah = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukayah);
							data.ibu = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukibu);
							data.data.tanggallahir = new Date(data.data.tanggallahir);
							approvedService.approvedModel(data, $scope.UserRole);
							data.data.tanggalsuratpengantar = new Date(data.data.tanggalsuratpengantar);
							$scope.model = data;
							loaderService.setValue(false);

						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN KELAHIRAN";
						JenisPermohonanService.getByJenis('Kelahiran').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Kelahiran', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Kelahiran', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Kelahiran', $scope.UserRole));
					});
				}
			},
			(error) => {
				message.errorText('Batal');
			}
		);
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

function adminsurateditketceraiController(
	$stateParams,
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
	PersetujuanService,
	$stateParams,
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
	$scope.Init = function () {
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN CERAI";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.pemohon1 = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpenduduksuami);
							data.pemohon2 = $scope.ListPenduduk.find((x) => x.idpenduduk == data.data.idpendudukistri);
							if (data.idpenduduk == data.data.idpenduduksuami) {
								data.p1 = true;
								data.p2 = false;
							} else {
								data.p1 = false;
								data.p2 = true;
							}
							approvedService.approvedModel(data, $scope.UserRole);
							$scope.model = data;
							loaderService.setValue(false);

						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN CERAI";
						JenisPermohonanService.getByJenis('Keterangan Cerai').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})

					}
				});
			});
		});
	};

	$scope.Pemohon = function (item) {
		if (item == 'penduduk1') {
			if ($scope.model.p1) {
				if ($scope.model.pemohon1) {
					$scope.model.idpenduduk = $scope.model.pemohon1.idpenduduk;
				}
			} else {
				$scope.model.idpenduduk = null;
			}
		} else if (item == 'penduduk2') {
			if ($scope.model.p2) {
				if ($scope.model.pemohon2) {
					$scope.model.idpenduduk = $scope.model.pemohon2.idpenduduk;
				}
			} else {
				$scope.model.idpenduduk = null;
			}
		} else if (item == 'pemohon1') {
			if ($scope.model.p1) {
				if ($scope.model.pemohon1) {
					$scope.model.idpenduduk = $scope.model.pemohon1.idpenduduk;
				}
			} else if ($scope.model.p2) {
				if ($scope.model.pemohon2) {
					$scope.model.idpenduduk = $scope.model.pemohon2.idpenduduk;
				}
			}
		} else if (item == 'pemohon2') {
			if ($scope.model.p2) {
				if ($scope.model.pemohon2) {
					$scope.model.idpenduduk = $scope.model.pemohon2.idpenduduk;
				}
			} else if ($scope.model.p1) {
				if ($scope.model.pemohon1) {
					$scope.model.idpenduduk = $scope.model.pemohon1.idpenduduk;
				}
			}
		}
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Keterangan Cerai', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$state.go(helperServices.state('Keterangan Cerai', $scope.UserRole));
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Keterangan Cerai', $scope.UserRole));
					});
				}
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
				$scope.dataPrint.tampiltanggaladminsuratedit = getTanggalIndonesia(
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

function adminsurateditketdesaController(
	$stateParams,
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
	$scope.adminSurateditKetDesa = {};
	$scope.Datas = [];
	$scope.TanggaladminSuratedit;
	$scope.Jam;
	$scope.model = {};
	$scope.model.data = {};
	$scope.adminSurateditKetDesa.data = {};
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
		$scope.adminSurateditKetDesa.idpenduduk = a.idpenduduk;
		$scope.adminSurateditKetDesa.nama = a.nama;
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
			data: $scope.adminSurateditKetDesa
		}).then(
			(param) => {
				$scope.adminSurateditKetDesa.idpermohonan = param.idpermohonan;
				$scope.DatasadminSurateditKetDesa.push(angular.copy($scope.adminSurateditKetDesa));
				message.info('Berhasil Menyimpan');
				$scope.adminSurateditKetDesa = {};
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
			'<html><head><title>Cetak adminSuratedit</title></head><body onload="window.print()"><div>' +
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

function adminsurateditketektpController(
	$stateParams,
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
	PersetujuanService,
	loaderService,
	$state,
	$window
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
		AuthService.profile().then((profile) => {
			$scope.UserRole = profile.rolename;
			PendudukService.get().then((penduduk) => {
				$scope.ListPenduduk = penduduk;
				PejabatService.get().then((pejabat) => {
					$scope.dataPejabat = pejabat.filter((x) => x.status == 1);
					$scope.ListRT = pejabat.filter((x) => x.status == 1 && x.namajabatan == 'RT');
					if ($stateParams.id) {
						$scope.title = "UBAH SURAT KETERANGAN SUDAH MENIKAH E-KTP";
						PermohonanService.getById($stateParams.id).then((data) => {
							data.pejabat = $scope.dataPejabat.find((x) => x.idpejabat == data.idpejabat);
							data.penduduk = $scope.ListPenduduk.find((x) => x.idpenduduk == data.idpenduduk);
							approvedService.approvedModel(data, $scope.UserRole);
							data.data.tanggalsuratpengantar = new Date(data.data.tanggalsuratpengantar);
							$scope.model = data;
							loaderService.setValue(false);
	
						});
					} else {
						$scope.title = "TAMBAH SURAT KETERANGAN E-KTP";
						JenisPermohonanService.getByJenis('Keterangan eKTP').then((jenis) => {
							$scope.model.idjenispermohonan = jenis.idjenispermohonan;
							$scope.model.pejabat = $scope.dataPejabat.find((x) => x.namajabatan == 'Lurah');
							$scope.model.idpejabat = $scope.model.pejabat.idpejabat;
							loaderService.setValue(false);
						})
	
					}
				});
			});
		});
	}

	$scope.setHari = function (item) {
		$scope.model.data.hari = item.getDay();
	};

	$scope.Batal = function (item) {
		if (item == 'batal') {
			$state.go(helperServices.state('Keterangan eKTP', $scope.UserRole));
		} else {
			$state.go(helperServices.state('Surat All', $scope.UserRole));
		}
	};

	$scope.Simpan = function () {
		message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
			(x) => {
				if ($stateParams.id) {
					PermohonanService.put($scope.model).then((permohonan) => {
						message.info('Berhasil Mengubah');
						$window.history.back();
					});
				} else {
					PermohonanService.post($scope.model).then((permohonan) => {
						message.info('Berhasil Menyimpan');
						$state.go(helperServices.state('Keterangan eKTP', $scope.UserRole));
					});
				}
			},
			(error) => {
				message.errorText('Batal');
			}
		);
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

function adminsurateditketusahaController($stateParams) { }

function adminsurateditpenguasaantanahController($stateParams) { }

function adminsurateditskckController(
	$stateParams,
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
	$scope.adminSurateditKetDesa = {};
	$scope.Datas = [];
	$scope.TanggaladminSuratedit;
	$scope.Jam;
	$scope.model = {};
	$scope.model.data = {};
	$scope.adminSurateditKetDesa.data = {};
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
		$scope.adminSurateditKetDesa.idpenduduk = a.idpenduduk;
		$scope.adminSurateditKetDesa.nama = a.nama;
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
			data: $scope.adminSurateditKetDesa
		}).then(
			(param) => {
				$scope.adminSurateditKetDesa.idpermohonan = param.idpermohonan;
				$scope.DatasadminSurateditKetDesa.push(angular.copy($scope.adminSurateditKetDesa));
				message.info('Berhasil Menyimpan');
				$scope.adminSurateditKetDesa = {};
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
			'<html><head><title>Cetak adminSuratedit</title></head><body onload="window.print()"><div>' +
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

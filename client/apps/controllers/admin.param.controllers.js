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
	$stateParams,
	$window
) {
	$scope.tab = tabService.createTab();
	$scope.Datas = [];
	$scope.DataInput = {};
	$scope.Penduduk = {};
	$scope.RW = [];
	$scope.helper = helperServices.source;
	$scope.model = {};
	$scope.edit = true;
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
					$scope.title = "Detail Penduduk";
					PendudukService.getById($stateParams.id, true).then((itempenduduk) => {
						itempenduduk.tanggallahir = new Date(itempenduduk.tanggallahir);
						$scope.model = itempenduduk;
						PendudukService.getDocById($stateParams.id).then((berkas) => {
							var a = berkas.find(x => x.idpersyaratan == 3);
							$scope.model.photo = a;
							$scope.model.persyaratan = berkas.filter((dx) => dx.status > 0);
							$scope.edit = true;
						})
					})
				} else {
					$scope.title = "Tambah Penduduk";
					$scope.edit = false;
				}
				loaderService.setValue(false);
			});
		})
		$(document).ready(function () {
			$.validator.setDefaults({
				submitHandler: function () {
					$scope.Simpan();
				}
			});
			$('#quickForm').validate({
				rules: {
					email: {
						required: true,
						email: true,
					},
					password: {
						required: true,
						minlength: 5
					},
					terms: {
						required: true
					},
				},
				messages: {
					email: {
						required: "Please enter a email address",
						email: "Please enter a vaild email address"
					},
					password: {
						required: "Please provide a password",
						minlength: "Your password must be at least 5 characters long"
					},
					terms: "Please accept our terms"
				},
				errorElement: 'span',
				errorPlacement: function (error, element) {
					error.addClass('invalid-feedback');
					element.closest('.form-group').append(error);
				},
				highlight: function (element, errorClass, validClass) {
					$(element).addClass('is-invalid');
				},
				unhighlight: function (element, errorClass, validClass) {
					$(element).removeClass('is-invalid');
				}
			});
		});
	};
	$scope.Batal = function () {
		$window.history.back();
	};
	$scope.stringnumber = (number) => {
		return helperServices.stringnumber(number);
	};
	$scope.Simpan = function () {
		message.dialog("Anda Yakin???", "Yes", "Batal").then((value) => {
			var today = new Date($scope.model.tanggallahir);
			$scope.model.tanggallahir = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			if ($stateParams.id) {
				PendudukService.put($scope.model).then(status => {
					message.info("Berhasil");
					$window.history.back();
				})
			} else {
				PendudukService.post($scope.model).then(status => {
					message.info("Berhasil");
					$window.history.back();
				})
			}
		}, error => {
			// message.info("Bata");
		})
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

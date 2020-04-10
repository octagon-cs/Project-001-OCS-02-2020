angular.module('uploadDoc.component', [])
.component('uploaddocument', {
	bindings: {
		value: '='
	},
	controller: ($scope, message, PendudukService, fileToBase64, helperServices, approvedService, AuthService) => {
		AuthService.profile().then((x) => {
			$scope.profile = x;
		});
		$scope.File = '';
		$scope.openFile = function(item) {
			document.getElementById('documentinput' + item.idpersyaratan).click();
		};

		$scope.download = (item) => {
			$scope.File = '';
			$scope.File = helperServices.url + '/document/' + item.file;
			$('#ViewDocument').modal('show');
		};

		$scope.Upload = (syarat, model) => {
			var item = syarat.files;
			var b = item[0].filename.split('.');
			var a = {
				idpenduduk: model.idpenduduk,
				idpersyaratan: syarat.idpersyaratan,
				typefile: item[0].filetype,
				data: item[0].base64,
				extention: b[1],
				status: syarat.status
			};
			a.idpermohonan = a.status > 0 ? null : model.idpermohonan;
			message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
				(x) => {
					PendudukService.upload(a).then((file) => {
						message.info('Berhasil Upload');
						syarat.idpermohonan = file.idpermohonan;
						syarat.file = file.file;
						syarat.iddokumenpenduduk = file.iddokumenpenduduk;
						syarat.idpenduduk = file.idpenduduk;
						syarat.typefile = file.typefile;
						syarat.upload = false;
						approvedService.approvedModel(model, $scope.profile.rolename);
					});
				},
				(err) => {
					message.errorText('Batal');
					$scope.files = {};
				}
			);
		};
	},
	templateUrl: 'apps/components/templates/uploadDocument.html'
})
.component("uploadfoto", {
	bindings: {
		value: '='
	},
	controller: ($scope, message, PendudukService, fileToBase64, helperServices, approvedService, AuthService) => {
		$scope.File;
		AuthService.profile().then((x) => {
			$scope.profile = x;
		});
		$scope.File = '';
		$scope.openFile = function(item) {
			document.getElementById('photoProfile').click();
		};


		$scope.Upload = (model) => {
			var item = model.photo.files;
			var b = item[0].filename.split('.');
			var a = {
				idpenduduk: model.idpenduduk,
				idpersyaratan: model.photo.idpersyaratan,
				typefile: item[0].filetype,
				data: item[0].base64,
				extention: b[1],
				status: model.photo.status
			};
			a.idpermohonan = a.status > 0 ? null : model.idpermohonan;
			message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
				(x) => {
					PendudukService.upload(a).then((file) => {
						message.info('Berhasil Upload');
						model.photo.idpermohonan = file.idpermohonan;
						model.photo.file = file.file;
						model.photo.iddokumenpenduduk = file.iddokumenpenduduk;
						model.photo.idpenduduk = file.idpenduduk;
						model.photo.typefile = file.typefile;
						model.photo.upload = false;
						// approvedService.approvedModel(model, $scope.profile.rolename);
					});
				},
				(err) => {
					message.errorText('Batal');
					$scope.files = {};
				}
			);
		};
	},
	templateUrl: 'apps/components/templates/uploadFoto.html'
})
;

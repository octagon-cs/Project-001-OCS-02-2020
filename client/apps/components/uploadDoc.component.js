angular.module('uploadDoc.component', []).component('uploaddocument', {
	bindings: {
		value: '='
	},
	controller: ($scope, message, PendudukService) => {
		$scope.openFile = function(item) {
			document.getElementById('documentinput' + item).click();
		};

		$scope.Upload = (syarat, model) => {
			var item = syarat.files;
			var b = item[0].filename.split('.');
			var a = {
				idpenduduk: model.idpenduduk,
				idpersyaratan: syarat.idpersyaratan,
				typefile: item[0].filetype,
				data: item[0].base64,
				extention: b[1]
			};
			message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(
				(x) => {
					PendudukService.upload(a).then((file) => {
						message.info('Berhasil Upload');
						syarat.idpermohonan = file.idpermohonan;
						syarat.file = file.file;
						syarat.iddokumenpenduduk = file.iddokumenpenduduk;
						syarat.idpenduduk = file.idpenduduk;
						syarat.typefile = file.typefile;
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
});

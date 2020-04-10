angular
	.module('app.controllers', [
		'account.controller',
		'admin.controller',
		'admin.param.controller',
		'admin.surat.controller',
		'seklur.controller',
		'lurah.controller',
		'approved.controller',
		'grafik.controller',
		'admin.surat.param.controller'
	])
	.controller('LoaderController', LoaderController);

function LoaderController($scope, loaderService, $state) {
	loaderService.setValue(true);
	setTimeout((x) => {
		$state.go('login');
	}, 3000);
}

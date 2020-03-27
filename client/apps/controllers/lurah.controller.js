angular
	.module('lurah.controller', [])
	.controller('lurahController', lurahController)
	.controller('lurahHomeController', lurahHomeController)
	.controller('datalurahController', datalurahController);

function lurahController(AuthService, loaderService) {
	AuthService.Init([ 'lurah' ]);
	loaderService.setValue(false);
}

function lurahHomeController() {}

function datalurahController() {}

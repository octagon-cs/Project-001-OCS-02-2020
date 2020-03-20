angular
	.module('seklur.controller', [])
	.controller('seklurController', seklurController)
	.controller('seklurHomeController', seklurHomeController)
	.controller('dataseklurController', dataseklurController)
	.controller('datartController', datartController)
	.controller('datarwController', datarwController);

function seklurController(AuthService) {
	AuthService.Init([ 'seklur' ]);
}

function seklurHomeController() {}

function dataseklurController() {}

function datartController() {}

function datarwController() {}

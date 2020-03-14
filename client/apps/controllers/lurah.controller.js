angular.module('lurah.controller', [])
    .controller('lurahController', lurahController)
    .controller('lurahHomeController', lurahHomeController)
    .controller('datalurahController', datalurahController);


function lurahController(AuthService) {
    AuthService.Init(["lurah"]);
}

function lurahHomeController() {

}

function datalurahController() {

}
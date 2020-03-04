angular.module('lurah.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('lurah', {
            url: '/lurah',
            controller: 'lurahHomeController',
            templateUrl: '../client/apps/views/lurah/index.html'
        }).state('lurah-datalurah', {
            url: '/datalurah',
            parent: 'lurah',
            controller: 'datalurahController',
            templateUrl: '../client/apps/views/lurah/datalurah.html'
        });

});
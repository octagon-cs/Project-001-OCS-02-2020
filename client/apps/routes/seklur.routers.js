angular.module('seklur.router', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('seklur', {
            url: '/seklur',
            controller: 'seklurHomeController',
            templateUrl: '../client/apps/views/seklur/index.html'
        }).state('seklur-dataseklur', {
            url: '/dataseklur',
            parent: 'seklur',
            controller: 'dataseklurController',
            templateUrl: '../client/apps/views/seklur/dataseklur.html'
        }).state('seklur-datakepalalurah', {
            url: '/datakepalalurah',
            parent: 'seklur',
            controller: 'datakepalalurahController',
            templateUrl: '../client/apps/views/seklur/datakepalalurah.html'
        }).state('seklur-datart', {
            url: '/datart',
            parent: 'seklur',
            controller: 'datartController',
            templateUrl: '../client/apps/views/seklur/datart.html'
        }).state('seklur-datarw', {
            url: '/datarw',
            parent: 'seklur',
            controller: 'datarwController',
            templateUrl: '../client/apps/views/seklur/datarw.html'
        });

});
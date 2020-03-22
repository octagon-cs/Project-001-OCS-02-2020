angular
    .module('spinner.component', [])
    .component('spinner', {
        bindings: {
            value: '<',
        },
        controller: function () {

        },
        templateUrl: 'apps/components/templates/spinner.html'
    })
    .component('loader', {
        bindings: {
            value: '<',
        },
        controller: function () {

        },
        templateUrl: 'apps/components/templates/loader.html'
    });
    
    
    ;


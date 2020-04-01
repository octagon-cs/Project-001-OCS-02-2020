angular.module('uploadDoc.component', [])
.component('uploaddocument', {
    bindings: {
        value:'='
    },
    controller: function(){
        var a = this.$ctrl.value;
    },
    templateUrl: 'apps/components/templates/uploadDocument.html'
})
"use strict";
(function () {
    angular.module("SS.pages")
    .directive("fileModel", fileModel);
    /** @ngInject */
    function fileModel($parse, $q) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel),
                    modelSetter = model.assign;
                element.bind("change", function () {
                    scope.$apply(function () {
                        var file = element[0].files[0];
                        getFileBuffer(file).then(function (resp) {
                            modelSetter(scope, resp);
                        });
                    });
                });
            }
        };
        function getFileBuffer(file) {
            var deferred = new $q.defer();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        }
    }
})();
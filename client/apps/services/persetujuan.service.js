angular.module("PersetujuanService", [])
    .factory("PersetujuanService", PersetujuanService);

function PersetujuanService($http, $q, helperServices, AuthService) {
    var controller= '/api/permohonan';
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get,
        tolak: tolak
    }

    function get(id) {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + controller + "/approve/" + id,
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject(err);
                    message.error(err);
                }
            );
        }
        return def.promise;
    }

    function tolak(item) {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'post',
                url: helperServices.url + controller + "/reject/" + item.idpermohonan,
                data: item,
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject(err);
                    message.error(err);
                }
            );
        }
        return def.promise;
    }
}
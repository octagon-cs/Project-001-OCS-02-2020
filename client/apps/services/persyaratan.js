angular.module("PersetujuanService", [])
    .factory("PersetujuanService", PersetujuanService);

function PersetujuanService($http, $q, helperServices, AuthService) {
    var controller= '/api/permohonan';
    var service = {};
    service.data = [];
    return {
        get: get,
        tolak: tolak,
        kembalikan:kembalikan
    }

    function get(id) {
        var def = $q.defer();
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
        return def.promise;
    }

    function tolak(item) {
        var def = $q.defer();
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
        return def.promise;
    }

    function kembalikan(item) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url + controller + "/back",
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
        return def.promise;
    }
}
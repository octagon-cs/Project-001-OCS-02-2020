angular.module("PendudukService", [])
    .factory("PendudukService", PendudukServices);

function PendudukServices($http, $q, helperServices, AuthService) {
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get
    }

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/penduduk',
                headers: AuthService.getHeader()
            }).then(

                (res) => {
                    service.instance = true;
                    service.data = res.data;
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
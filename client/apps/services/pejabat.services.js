angular.module("PejabatService", [])
    .factory("PejabatService", PejabatServices);

function PejabatServices($http, $q, helperServices, AuthService) {
    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get,
        getByJabatanName: getByJabatanName
    }

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/pejabat',
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

    function getByJabatanName(jabatanName, status) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.namajabatan == jabatanName && x.status == status)
            def.resolve(data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/pejabat',
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    var data = service.data.find(x => x.namajabatan == jabatanName && x.status == status)
                    def.resolve(data);
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
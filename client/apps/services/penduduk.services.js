angular.module("PendudukService", [])
    .factory("PendudukService", PendudukServices);

function PendudukServices($http, $q, helperServices, AuthService) {
    var controller = "/api/penduduk";

    var service = {};
    service.data = [];
    service.instance = false;
    return {
        get: get,
        post: post,
        put: put,
        getById: getById,
        getByNIK: getByNIK,
        getByNKK: getByNKK,
    }

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + controller,
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

    function post(data) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url + controller,
            headers: AuthService.getHeader(), 
             data:data
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;
    }

    function put(data) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: helperServices.url + controller,
            headers: AuthService.getHeader(), 
             data:data
        }).then(
            (res) => {
               var item = services.data.find(x=>x.idpenduduk=data.idpenduduk);
               if(item){
                    item.nama = data.nama;
                    item.nik=data.nik;
                    item.nkk = data.nkk;
                    item.data=data.data;
               }
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );
        return def.promise;

    }



    function getById(id) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.idpenduduk == id);
            if (data) {
                def.resolve(data);
            }
        }else{
            $http({
                method: 'get',
                url: helperServices.url + controller + "/" + id,
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.data.push(res.data);
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

    function getByNIK(nik) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.find(x => x.nik == nik);
            if (data) {
                def.resolve(data);
                return;
            }
        }

        $http({
            method: 'get',
            url: helperServices.url + controller + "/bynik/" + nik,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
                def.resolve(res.data);
            },
            (err) => {
                def.reject(err);
                message.error(err);
            }
        );

        return def.promise;
    }

    function getByNKK(nkk) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.find(x => x.nkk == nkk);
            if (data) {
                def.resolve(data);
                return;
            }
        }

        $http({
            method: 'get',
            url: helperServices.url + controller + "/bynkk/" + nkk,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                service.data.push(res.data);
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
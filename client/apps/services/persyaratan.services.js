angular.module("persyaratan.services", [])
    .factory("PersyaratanService", PersyaratanService);

function PersyaratanService($http, $q, helperServices, AuthService) {
    var controller= '/api/persyaratan';
    var service = {};
    service.data = [];
    return {
        get: get,
        post: post,
        put:put
    }

    function get() {
        var def = $q.defer();
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
        return def.promise;
    }

    function post(item) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url + controller,
            data: item,
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

    function put(data) {
        var def = $q.defer();
        $http({
            method: 'put',
            url: helperServices.url + controller,
            data: data,
            headers: AuthService.getHeader()
        }).then(
            (res) => {
                var item = service.data.find((x) => (x.idpersyaratan == data.idpersyaratan));
				if (item) {
					item.nama = data.nama;
					item.deskripsi = data.deskripsi;
					item.status = data.status;
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
}
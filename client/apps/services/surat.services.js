angular.module("SuratService", [])
    .factory("PermohonanService", PermohonanService)
    .factory("JenisPermohonanService", JanisPermohonanService);



function JanisPermohonanService($http, $q, helperServices, AuthService, message) {
    var service = {};
    service.data = [];
    service.instance = false;


    return {
        get: get,
        getById: getById,
        getByJenis: getByJenis
    }

    function get() {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/jenispermohonan',
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


    function getById(id) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.idjenispermohonan == id);
            def.resolve(data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/jenispermohonan/byid/' + id,
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


    function getByJenis(jenis) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.jenis == jenis);
            def.resolve(data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/jenispermohonan/jenis/' + jenis,
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



function PermohonanService($http, $q, helperServices, AuthService, message) {
    var controller = "/api/permohonan";
    var service = {};
    service.data = [];
    service.instance = false;

    return {
        get: get,
        getById: getById,
        getByJenis: getByJenis
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


    function getById(id) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.idjenispermohonan == id);
            def.resolve(data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + controller + '/byid/' + id,
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


    function getByJenis(id) {
        var def = $q.defer();
        if (service.instance) {
            var data = service.data.find(x => x.jenis == jenis);
            def.resolve(data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + controller + '/byjenis/' + id,
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
angular.module("notification.service", [])
    .factory('socket', function ($rootScope, AuthService, helperServices) {
        socket = {};
        _socket = null;
        socket.isStart = false;
        if (AuthService.userIsLogin()) {
            start();
        } else {
            //var token = AuthService.getToken();
        }

        socket.on = function (eventName, callback) {
            if (_socket)
                _socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
        };

        socket.emit = function (eventName, data, callback) {
            if (_socket)
                _socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
        };


        function start() {
            _socket = io.connect(helperServices.url, {
                query: 'auth_token=' + AuthService.getToken()
            });

        }

        return {
            start: start,
            on: socket.on,
            emit: socket.emit
        };
    })


    .factory('InboxService', InboxService);




function InboxService($http, $q, AuthService, message, helperServices) {
    var service = {};
    service.data = [];
    service.unread = 0;
    service.instance = false;

    get = () => {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'get',
                url: helperServices.url + '/api/inbox',
                headers: AuthService.getHeader()
            }).then(
                (res) => {
                    service.instance = true;
                    service.data = res.data;
                    unreadMessage();
                    def.resolve(service.data);
                },
                (err) => {
                    def.reject();
                    message.error(err);
                }
            );
        }
        return def.promise;
    }


    getById = () => {

    }


    deleteItem = (datas) => {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'delete',
                url: helperServices.url + '/api/inbox',
                headers: AuthService.getHeader(),
                data: datas
            }).then(
                (res) => {
                    if (res.data) {
                        datas.forEach(element => {
                            var index = service.data.indexOf(element);
                            service.data.splice(index, 1);
                        });
                    }
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject();
                    message.error(err);
                }
            );
        }
        return def.promise;
    }


    subscribe = (data) => {
        service.data.push(data);
    }

    read = (data) => {
        var def = $q.defer();
        if (service.instance) {
            def.resolve(service.data);
        } else {
            $http({
                method: 'put',
                url: helperServices.url + '/api/inbox',
                headers: AuthService.getHeader(),
                data: data
            }).then(
                (res) => {
                    data.readed = 1;
                    def.resolve(res.data);
                },
                (err) => {
                    def.reject();
                    message.error(err);
                }
            );
        }
        return def.promise;
    }

    unreadMessage = () => {
        if (service.data) {
            var unreads = service.data.filter(x => !x.readed);
            service.unread = unreads.length;
        }

        return service.unread;
    }

    all = () => {
        return service.data.length
    }


    return {
        get: get,
        getById: getById,
        delete: deleteItem,
        subscribe: subscribe,
        unread: unreadMessage,
        all: all,
        read: read
    }



}
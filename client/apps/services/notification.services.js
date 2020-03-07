angular.module("notification.service", [])
    .factory('socket', function ($rootScope, AuthService, helperServices) {
        socket = {};
        _socket = null;
        socket.isStart = false;
        if (AuthService.userIsLogin()) {
            start();
        } else {
            var tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjI1OTIwMDB9.NsRXlw7lAWEymKOBm5sBaHm-kvsRwU4x2ef5xilrxDo";
            var token = AuthService.getToken();
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
            _socket = io(helperServices.url, {
                query: 'auth_token=' + AuthService.getToken()
            });

        }

        return {
            start: start,
            on: socket.on,
            emit: socket.emit
        };
    });
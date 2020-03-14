angular.module("notification.service", [])
    .factory('FcmService', FcmService)
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

function FcmService($rootScope, $http, AuthService, helperServices) {

    var isStart=false;
    var firebaseConfig = {
        apiKey: "AIzaSyCpGwuzBHu4om7UTZI220G0ORRNAdo38mo",
        authDomain: "project-001-ocs-03-2020.firebaseapp.com",
        databaseURL: "https://project-001-ocs-03-2020.firebaseio.com",
        projectId: "project-001-ocs-03-2020",
        storageBucket: "project-001-ocs-03-2020.appspot.com",
        messagingSenderId: "540001517976",
        appId: "1:540001517976:web:a7b3a70acb7aba42b76bed",
        measurementId: "G-W00V0GZRHL"
    };
    firebase.initializeApp(firebaseConfig);


    function start() {
        if(!isStart){
            isStart=true;
            messaging = firebase.messaging();
            messaging.usePublicVapidKey("BNTGO94aYDQrrXjedOq4PeMrq6TULEEtckhEhTh8euxCInhn7jlu5xJ3tygBRKxNm5SmV3u6wHLtSWkVaPK7gAc");
            messaging.requestPermission().then(() => {
                return messaging.getToken();
            }).then((token) => {
                $http({
                    method: 'Post',
                    url: helperServices.url + '/api/auth/devicetoken',
                    headers: AuthService.getHeader(),
                    data: {
                        token: token
                    }
                }).then(
                    (res) => {
                        console.log("Success Send Token");
                    },
                    (err) => {
                        console.log("Error Send Token");
                    }
                );
            }).catch((err) => {
                console.log(err);
            })
    
            messaging.onMessage((payload) => {
                $rootScope.$emit("reciveMessage", payload);
                console.log(payload);
            })
        }
    }

    return {
        start: start
    };
}
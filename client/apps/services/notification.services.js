angular.module("notification.service", [])
    .factory("pushNotification", PushNotification);

function PushNotification(AuthService) {
    var socket = {};

    socket.on('error', function (err) {
        console.log(err);
    });
    // Connection succeeded
    socket.on('success', function (data) {
        console.log(data.message);
        console.log('user info: ' + data.user);
        console.log('logged in: ' + data.user.logged_in)
    })


    function start() {

        var tkn = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1ODMxNDUzNzksImV4cCI6MTYxNDY4MTM3OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.kN4iYRFCFz_z5t6vIkDdz-nbnflTqc85C3-wx-TqKvw";
        var token = AuthService.getToken();
        socket = io('http://localhost:3000', {
            query: 'auth_token=${tkn}'
        });
    }

    return {
        start: start
    }


}
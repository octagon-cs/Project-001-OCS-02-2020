module.exports = function (http) {
    const config = require('../auth/config');
    this.socket = {};
    socket.io = require("socket.io")(http);
    socket.connectedUsers = [];
    var jwtAuth = require('socketio-jwt-auth');

    socket.io.use(jwtAuth.authenticate({
        secret: config.secret
    }, function (payload, done) {
        // done is a callback, you can use it as follows
        //cek on db
        return done(null, payload);
    }, err => {

    }));


    socket.io.on("connection", function (_socket) {
        socket.connectedUsers[_socket.request.user.username] = _socket;
    });

    socket.io.on("disconnect", function (_socket) {

        var user = socket.connectedUsers.find(x => x.username == _socket.request.user.username);
        var index = socket.connectedUsers.indexOf(user);
        socket.connectedUsers.splice(index, 1);

    });

    socket.CreatePermohonan = function (username, message) {
        setTimeout(x => {
            socket.connectedUsers[username].emit("permohonan", message);
        }, 1000);
    }

    return socket;

}
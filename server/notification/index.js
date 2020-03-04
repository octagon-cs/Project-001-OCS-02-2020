module.exports = function (http) {
    const config = require('../auth/config');
    var io = require("socket.io")(http);
    var jwtAuth = require('socketio-jwt-auth');
    var connectedUsers = [];

    io.use(jwtAuth.authenticate({
        secret: config.secret
    }, function (payload, done) {
        // done is a callback, you can use it as follows
        //cek on db
        var user = payload.Email;
        return done(null, user);
    }));


    io.on("connection", function (socket) {
        io.emit('chat', {
            message: "test",
            data: "1"
        });
        io.emit('chat', {
            message: "test",
            data: "2"
        });
        io.emit('chat', {
            message: "test",
            data: "3"
        });
        io.emit('chat', {
            message: "test",
            data: "4"
        });
        console.log("on connected " + socket.request.user);
    });
    return io;

}
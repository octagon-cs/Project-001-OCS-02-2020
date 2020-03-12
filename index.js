var express = require('express');
var app = express();
var http = require('http').createServer(app);

var path = require('path');
const bodyParser = require('body-parser');
const socket = require("./server/notification");

app.use(bodyParser.json({
    limit: '50mb'
}));


if (app.get('env') == "maintenance") {
    app.use('/', express.static('./maintenance/'));
} else {
    require('./server/routers')(app, socket);
    app.use('/', express.static('./client/'));
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './index.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Listening on ' + PORT));
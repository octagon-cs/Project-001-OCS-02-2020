var express = require('express');
var app = express();
var http = require('http').createServer(app);

const bodyParser = require('body-parser');
const socket = require("./server/notification")(http);

app.use(bodyParser.json({
    limit: '50mb'
}));

var path = require('path');

if (app.get('env') == "maintenance") {
    app.use('/', express.static('./maintenance/'));
} else {
    require('./server/routers')(app, socket);
    app.use('/', express.static('./client/'));
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Listening on ' + PORT));
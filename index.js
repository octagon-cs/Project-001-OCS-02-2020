var express = require('express');
var app = express();
var http = require('http').createServer(app);

const bodyParser = require('body-parser');
const socket = require("./server/notification")(http);

app.use(bodyParser.json({
    limit: '50mb'
}));

require('./server/routers')(app, socket);

var path = require('path');
app.use('/', express.static('./client/'));


const maintenance = false;
app.get('/', function (req, res) {
    if (!maintenance)
        res.sendFile(path.join(__dirname + 'index.html'));
    else
        res.sendFile(path.join(__dirname + '/maintenance.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Listening on ' + PORT));
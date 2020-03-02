var express = require('express');
var app = express();
var http = require('http').createServer(app);

const bodyParser = require('body-parser');
require("./server/notification")(http);

app.use(bodyParser.json({
    limit: '50mb'
}));

require('./server/routers')(app);

var path = require('path');
app.use('/', express.static('./'));


const maintenance = true;
app.get('/', function (req, res) {
    if (!maintenance)
        res.sendFile(path.join(__dirname + '/client/index.html'));
    else
        res.sendFile(path.join(__dirname + '/maintenance.html'));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Listening on ' + PORT));
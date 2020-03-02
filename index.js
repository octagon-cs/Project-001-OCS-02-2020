var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '50mb'
}));

const maintenance = true;
require('./server/routers')(app);

var path = require('path');
app.use('/', express.static('./'));
app.get('/', function (req, res) {
    if (!maintenance)
        res.sendFile(path.join(__dirname + '/client/index.html'));
    else
        res.sendFile(path.join(__dirname + '/maintenance.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on ' + PORT));
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var courseController = require('./api/controllers/course');
//Course controller
app.get('/ping', function (req, res) {
    res.send('pong');
});

app.post('/course/list', courseController.list);
app.post('/course/create', courseController.create);
app.post('/course/update', courseController.update);
app.post('/course/destroy', courseController.destroy);

app.use(function(err, req, res, next) {
    return res.status(500).send('Ooops');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
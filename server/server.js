
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var UUID = require('node-uuid');
var path = require('path');

server.listen(4004);

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.get('/*', function(req, res, next) {
    var file = req.params[0];

    console.log('\t :: Express :: file requested : ' + file);

    res.sendFile(path.resolve(__dirname + '/../client/' + file));
});

io.on('connection', function (socket) {
    console.log('New connection:');

    socket.userid = UUID();

    socket.emit('onconnected', { id: socket.userid } );

    console.log('\t socket.io :: player ' + socket.userid + ' connected');

    socket.on('disconnect', function () {
        console.log('\t socket.io :: client disconnected ' + socket.userid);
    });
});
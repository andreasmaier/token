var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var UUID = require('node-uuid');
var path = require('path');
var _= require('lodash');
var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');

server.listen(4004);

var users = [];
var jwtSecret = 'super_secret_key';

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../www/index.html'));
});

app.post('/login', function (req, res) {
    console.log('User is logging in', req.query);

    if(req.query.username === 'peter' && req.query.password === 'pass'){
        var profile = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            id: 123
        };

        var token = jwt.sign(profile, jwtSecret, { expiresIn: 60*60*5 });

        res.json({token: token});
    }
    else {
        res.status(401).send('user is not authorized');
    }
});

//io.on('connection', function (socket) {
//    socket.emit('news', { hello: 'world' });
//    socket.on('my other event', function (data) {
//        console.log(data);
//    });
//});

app.get('/*', function(req, res, next) {
    var file = req.params[0];

    console.log('\t :: Express :: file requested : ' + file);

    res.sendFile(path.resolve(__dirname + '/../../www/' + file));
});

io.set('authorization', socketioJwt.authorize({
    secret: jwtSecret,
    handshake: true
}));

io.on('connection', function (socket) {
    console.log('New connection:');

    socket.userid = UUID();

    socket.emit('onconnected', { id: socket.userid } );

    console.log('\t socket.io :: player ' + socket.userid + ' connected');

    socket.on('disconnect', function () {
        console.log('\t socket.io :: client disconnected ' + socket.userid);
    });
});
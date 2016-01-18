var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var UUID = require('node-uuid');
var path = require('path');
var _= require('lodash');
var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var users = require('./users');

server.listen(4004);

var jwtSecret = 'super_secret_key';
var loggedinUsers = [];

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../www/index.html'));
});

app.post('/login', function (req, res) {
    console.log('User is logging in', req.query);

    if(users[req.query.username] && users[req.query.username].password === req.query.password){
        var user = users[req.query.username];

        var profile = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            id: user.id
        };

        var token = jwt.sign(profile, jwtSecret, { expiresIn: 60*60*5 });

        if(loggedinUsers.indexOf(req.query.username) < 0) {
            loggedinUsers.push(req.query.username);
        }
        else {
            console.log('user was already logged in');
        }

        res.json({token: token});
    }
    else {
        res.status(401).send('user is not authorized');
    }
});

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
    socket.emit('users', _.map(loggedinUsers, function (user) {
        return { firstName: users[user].firstName, lastName: users[user].lastName };
    }));

    console.log('\t socket.io :: player ' + socket.userid + ' connected');

    socket.on('disconnect', function () {
        console.log('\t socket.io :: client disconnected ' + socket.userid);
    });
});
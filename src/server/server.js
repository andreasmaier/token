var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var UUID = require('node-uuid');
var path = require('path');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var users = require('./users');
var gameFactory = require('./game/gameFactory');
var log = require('winston');

log.level = 'info';

server.listen(4004);

var jwtSecret = 'super_secret_key';
var loggedinUsers = [];

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../www/index.html'));
});

app.post('/login', function (req, res) {
    log.debug('User is logging in', req.query);

    if (users[req.query.username] && users[req.query.username].password === req.query.password) {
        var user = users[req.query.username];

        var profile = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            id: user.id
        };

        var token = jwt.sign(profile, jwtSecret, {expiresIn: 60 * 60 * 5});

        if (loggedinUsers.indexOf(req.query.username) < 0) {
            loggedinUsers.push(req.query.username);
        }
        else {
            log.info('user was already logged in');
        }

        res.json({
            token: token,
            userId: profile.id
        });
    }
    else {
        res.status(401).send('user is not authorized');
    }
});

app.get('/*', function (req, res, next) {
    var file = req.params[0];

    log.verbose('\t :: Express :: file requested : ' + file);

    res.sendFile(path.resolve(__dirname + '/../../www/' + file));
});

io.set('authorization', socketioJwt.authorize({
    secret: jwtSecret,
    handshake: true
}));

io.on('connection', function (socket) {
    log.debug('New connection:');

    socket.userid = UUID();

    socket.emit('onconnected', {id: socket.userid});

    io.emit('users', _.map(loggedinUsers, function (user) {
        return {firstName: users[user].firstName, lastName: users[user].lastName};
    }));

    log.info('\t socket.io :: player ' + socket.userid + ' connected');

    socket.on('disconnect', function () {
        io.emit('users', _.map(loggedinUsers, function (user) {
            return {firstName: users[user].firstName, lastName: users[user].lastName};
        }));

        log.info('\t socket.io :: client disconnected ' + socket.userid);
    });

    socket.on('requestCreateGame', function (data) {
        log.info('game creation requested', data);

        _.filter(users, function (user) {
            return user.id === data.userId;
        });

        game = gameFactory.create({
            id: 123
        });

        io.emit('lobby', {
            eventType: 'GAME_CREATED',
            data: {
                game: game
            }
        });
    });
});


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var UUID = require('node-uuid');
var path = require('path');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var users = require('./users');
var log = require('winston');

var GameActionHandler = require('./game/gameActionHandler');
var ConnectionHandler = require('./connection/connectionHandler');
var LoggedInUsers = require('./connection/userSTore');

log.level = 'info';

server.listen(4004);

var jwtSecret = 'super_secret_key';

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../www/index.html'));
});

app.post('/login', function (req, res) {
    log.debug('\t User is logging in', req.query);

    if (users[req.query.username] && users[req.query.username].password === req.query.password) {
        var user = users[req.query.username];

        var profile = {
            username: req.query.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id
        };

        var token = jwt.sign(profile, jwtSecret, {expiresIn: 60 * 60 * 5});

        LoggedInUsers.addUser(req.query.username);

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

io.use(socketioJwt.authorize({
    secret: jwtSecret,
    handshake: true
}));

io.on('connection', function (socket) {
    log.debug('New connection:', socket.decoded_token);

    socket.internalId = UUID();
    socket.emit('onconnected', {id: socket.internalId});

    io.emit('users', _.map(LoggedInUsers.getLoggedInUsers(), function (user) {
        return {firstName: users[user].firstName, lastName: users[user].lastName};
    }));

    log.info('\t socket.io :: player ' + socket.userid + ' connected');

    ConnectionHandler.onDisconnect(socket, io);
    GameActionHandler.onCreate(socket, io);
    GameActionHandler.onJoin(socket, io);
    GameActionHandler.onIndex(socket);
});


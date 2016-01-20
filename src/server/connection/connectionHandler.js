var log = require('winston');
var LoggedInUsers = require('../connection/userStore');
var _ = require('lodash');
var users = require('../users.js');

module.exports = {
    onDisconnect: function (socket, io) {
        socket.on('disconnect', function () {
            LoggedInUsers.removeUser(socket.decoded_token.username);

            // Todo: delete games created by that user (or assign them to the users still in the game)

            io.emit('users', _.map(LoggedInUsers.getLoggedInUsers(), function (user) {
                return {firstName: users[user].firstName, lastName: users[user].lastName};
            }));

            log.info('\t socket.io :: client ' + socket.decoded_token.username + 'disconnected [socket ' + socket.internalId + ']');
        });
    }
};
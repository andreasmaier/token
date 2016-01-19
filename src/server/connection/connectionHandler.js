var log = require('winston');
var LoggedInUsers = require('../connection/userStore');
var _ = require('lodash');

module.exports = {
    onDisconnect: function (socket, io) {
        socket.on('disconnect', function () {
            LoggedInUsers.removeUser(socket.decoded_token.username);

            io.emit('users', _.map(LoggedInUsers.getLoggedInUsers(), function (user) {
                return {firstName: users[user].firstName, lastName: users[user].lastName};
            }));

            log.info('\t socket.io :: client disconnected ' + socket.internalId);
        });
    }
};
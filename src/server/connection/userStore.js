var loggedInUsers = [];
var log = require('winston');
var _ = require('lodash');

module.exports = {
    getLoggedInUsers: function () {
        return loggedInUsers;
    },

    addUser: function (username) {
        if (loggedInUsers.indexOf(username) < 0) {
            loggedInUsers.push(username);
        }
        else {
            log.info('\t user "' + username + '" was already logged in');
        }
    },

    removeUser: function (username) {
        loggedInUsers = _.filter(LoggedinUsers.getLoggedInUsers(), function (user) {
            return user !== username;
        });
    }
};
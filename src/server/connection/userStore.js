var log = require('winston');
var _ = require('lodash');
var users = require('../users');

var loggedInUsers = [];

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

    getUser: function (username) {
        return users[username];
    },

    removeUser: function (username) {
        loggedInUsers = _.filter(loggedInUsers, function (user) {
            return user !== username;
        });
    }
};
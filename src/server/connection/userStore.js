var log = require('winston');
var _ = require('lodash');
var users = require('../users');

var UserStore = function () {
    var loggedInUsers = [];

    this.getLoggedInUsers = function () {
        return loggedInUsers;
    };

    this.addUser = function (username) {
        if (loggedInUsers.indexOf(username) < 0) {
            loggedInUsers.push(username);
        }
        else {
            log.info('\t user "' + username + '" was already logged in');
        }
    };

    this.getUser = function (username) {
        return users[username];
    };

    this.removeUser = function (username) {
        loggedInUsers = _.filter(loggedInUsers, function (user) {
            return user !== username;
        });
    };
};

UserStore.instance = null;

UserStore.getInstance = function () {
    if (this.instance === null) {
        this.instance = new UserStore();
    }
    return this.instance;
};

module.exports = UserStore.getInstance();
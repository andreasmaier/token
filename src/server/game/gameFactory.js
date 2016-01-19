var _ = require('lodash');
var UUID = require('node-uuid');
var GameStore = require('./gameStore');

module.exports = {
    create: function (createdBy) {
        // check that user does not have another game

        var game = {
            id: UUID(),
            players: [createdBy]
        };

        GameStore.addGame(game);

        return game;
    }
};
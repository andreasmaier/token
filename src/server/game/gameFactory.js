var _ = require('lodash');
var UUID = require('node-uuid');

module.exports = {
    games: [],

    create: function (createdBy) {
        // check that user does not have another game

        var game = {
            id: UUID(),
            players: [createdBy]
        };

        this.games.push(game);

        return game;
    }
};
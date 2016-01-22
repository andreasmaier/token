var _ = require('lodash');
var UUID = require('node-uuid');
var GameStore = require('./gameStore');

module.exports = {
    create: function (createdBy) {
        // TODO: check that user does not have another game
        var P1 = 0;
        var P2 = 1;

        var game = {
            id: UUID(),
            players: [createdBy],
            gameState: 'created',
            priority: -1,

            start: function () {
                this.gameState = 'started';
                this.priority = Math.floor(Math.random() * 2) === 0 ? P1 : P2;
            }
        };

        GameStore.addGame(game);

        return game;
    }
};
var _ = require('lodash');

var activeGames = [];

module.exports = {
    getActiveGames: function () {
        return activeGames;
    },

    getGame: function (id) {
        return _.find(activeGames, function (game) {
            return game.id === id;
        });
    },

    addGame: function (game) {
        activeGames.push(game);
    },

    addPlayer: function (game, player) {
        if(game.players.length < 2) {
            game.players.push(player);
        }
    }
};
var gameFactory = require('./gameFactory');
var log = require('winston');
var GameStore = require('./gameStore');
var UserStore = require('../connection/userStore');

module.exports = {
    onIndex: function (socket) {
        socket.on('requestGetGames', function () {
            log.info('\t game index requested');

            socket.emit('lobby', {
                eventType: 'GAME_INDEX',
                data: {
                    games: GameStore.getActiveGames()
                }
            });
        });
    },

    onCreate: function (socket, io) {
        socket.on('requestCreateGame', function () {
            log.info('\t game creation requested by ', socket.decoded_token.username);

            var game = gameFactory.create({
                id: socket.decoded_token.id,
                username: socket.decoded_token.username
            });

            io.emit('lobby', {
                eventType: 'GAME_CREATED',
                data: {
                    game: game
                }
            });
        });
    },

    onJoin: function (socket, io) {
        socket.on('requestJoinGame', function (data) {
            log.info('\t join of game', data.gameId ,' requested by', data.username);

            var game = GameStore.getGame(data.gameId);
            var user = UserStore.getUser(data.username);

            GameStore.addPlayer(game, user);

            io.emit('lobby', {
                eventType: 'GAME_PLAYER_JOINED',
                data: {
                    game: game
                }
            });
        });
    }
};
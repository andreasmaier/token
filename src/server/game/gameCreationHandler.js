var gameFactory = require('./gameFactory');
var log = require('winston');

module.exports = {
    create: function (socket, io) {
        socket.on('requestCreateGame', function (data) {
            log.info('\t game creation requested', data);

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
    }
};
angular.module('token.connection', []).factory('SocketService', function (socketFactory, TokenService) {
    var tokenSocket;

    return {
        connect: function () {
            var _socket = io.connect('http://localhost:4004', {
                query: 'token=' + TokenService.getToken()
            });

            _socket.on('connect', function () {
                console.log('websocket connected');
            });
            _socket.on('disconnect', function () {
                console.log('disconnected')
            });

            var tokenSocket = socketFactory({
                ioSocket: _socket
            });

            tokenSocket.forward('lobby');
            tokenSocket.forward('connect');
            tokenSocket.forward('disconnect');
            tokenSocket.forward('onconnected');
            tokenSocket.forward('users');
            tokenSocket.forward('lobby');

            return tokenSocket;
        },

        getSocket: function () {
            return tokenSocket;
        }
    }
});
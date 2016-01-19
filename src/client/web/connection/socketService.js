angular.module('token.connection', []).factory('SocketService', function (socketFactory, TokenService) {
    var tokenSocket;
    var socketId;

    return {
        connect: function () {
            var _socket = io.connect('http://localhost:4004', {
                query: 'token=' + TokenService.getToken()
            });

            _socket
                .on('connect', function () {
                    console.log('websocket connected');
                })
                .on('disconnect', function () {
                    console.log('disconnected')
                })
                .on('onconnected', function (data) {
                    console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);

                    socketId = data.id;
                });

            tokenSocket = socketFactory({
                ioSocket: _socket
            });

            tokenSocket.forward('lobby');
            tokenSocket.forward('users');

            return tokenSocket;
        },

        getSocket: function () {
            return tokenSocket;
        },

        getSocketId: function () {
            return socketId;
        }
    }
});
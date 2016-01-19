angular.module('token').controller('LobbyController', function ($log, $scope, $rootScope, SocketService) {
    $scope.hello = 'Hey wazzup';
    $scope.connectedUsers = [];
    $scope.activeGames = [];

    $scope.createGame = function () {
        $log.debug('create game clicked');

        SocketService.getSocket().emit('requestCreateGame');
    };

    $scope.$on('socket:users', function (ev, data) {
        $log.debug('received live users in lobby:', data);

        $scope.connectedUsers = data;
    });

    $scope.$on('socket:lobby', function (ev, data) {
        $log.debug('event received in lobby ctrl:', data);

        if(data.eventType === 'GAME_CREATED') {
            $log.debug('adding game:', data.data.game);
            $scope.activeGames.push(data.data.game);
        }
    });
});
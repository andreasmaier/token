angular.module('token').controller('LobbyController', function ($scope, $rootScope, SocketService) {
    $scope.hello = 'Hey wazzup';
    $scope.connectedUsers = [];
    $scope.activeGames = [];

    $scope.createGame = function () {
        console.log('create game clicked');

        SocketService.getSocket().emit('requestCreateGame', {user: $rootScope.userId});
    };

    $scope.$on('socket:users', function (ev, data) {
        console.log('received live users in lobby:', data);

        $scope.connectedUsers = data;
    });

    $scope.$on('socket:lobby', function (ev, data) {
        console.log('event received in lobby ctrl:', data);

        if(data.eventType === 'GAME_CREATED') {
            console.log('adding game:', data.data.game);
            $scope.activeGames.push(data.data.game);
        }
    });
});
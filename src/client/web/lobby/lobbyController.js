angular.module('token').controller('LobbyController', function ($log, $scope, $rootScope, SocketService, UserService) {
    $scope.hello = 'Hey wazzup';
    $scope.connectedUsers = [];
    $scope.activeGames = [];
    $scope.user = UserService.getUser();

    $scope.createGame = function () {
        $log.debug('create game clicked');

        SocketService.getSocket().emit('requestCreateGame');
    };

    $scope.joinGame = function (game) {
        $log.debug('join game clicked');

        SocketService.getSocket().emit('requestJoinGame', { gameId: game.id, username: UserService.getUser().username });
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
        else if(data.eventType === 'GAME_INDEX') {
            $log.debug('games index received:', data.data.games);

            $scope.activeGames = data.data.games;
        }
        else if(data.eventType === 'GAME_PLAYER_JOINED') {
            $log.debug('player ', data.data.game.players[1], ' joined game', data.data.game.id);

            var the_game = _.find($scope.activeGames, function (game) {
                return game.id === data.data.game.id;
            });

            the_game.players = data.data.game.players;
        }
        else{
            $log.error('Unrecognized event:', data.eventType);
        }
    });

    SocketService.getSocket().emit('requestGetGames');
});
angular.module('token').controller('LobbyController',
    function ($log, $rootScope, $scope, $state, SocketService, UserService) {

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

        // Todo: No need to send the username, this info will be in the jwt
        SocketService.getSocket().emit('requestJoinGame', {gameId: game.id, username: UserService.getUser().username});
    };

    $scope.startGame = function (game) {
        $log.debug('start game clicked');

        SocketService.getSocket().emit('requestStartGame', {gameId: game.id});
    };

    $scope.showJoinButton = function (game) {
        var playerIsNotInGame = _.map(game.players, 'username').indexOf($scope.user.username) < 0;

        return game.players.length < 2 && playerIsNotInGame;
    };

    $scope.$on('socket:users', function (ev, data) {
        $log.debug('received live users in lobby:', data);

        $scope.connectedUsers = data;
    });

    $scope.$on('socket:lobby', function (ev, data) {
        $log.debug('event received in lobby ctrl:', data);

        if (data.eventType === 'GAME_CREATED') {
            $log.debug('game added:', data.data.game);
            $scope.activeGames.push(data.data.game);
        }
        else if (data.eventType === 'GAME_STARTED') {
            $log.debug('game startet:', data.data.game);

            $state.go('game', {
                game: data.data.game
            });
        }
        else if (data.eventType === 'GAME_INDEX') {
            $log.debug('games index received:', data.data.games);

            $scope.activeGames = data.data.games;
        }
        else if (data.eventType === 'GAME_PLAYER_JOINED') {
            $log.debug('player ', data.data.game.players[1], ' joined game', data.data.game.id);

            var the_game = _.find($scope.activeGames, function (game) {
                return game.id === data.data.game.id;
            });

            the_game.players = data.data.game.players;
        }
        else {
            $log.error('Unrecognized event:', data.eventType);
        }
    });

    SocketService.getSocket().emit('requestGetGames');
});
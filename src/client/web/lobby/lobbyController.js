angular.module('token').controller('LobbyController', function ($scope, $rootScope) {
    $scope.hello = 'Hey wazzup';
    $scope.connectedUsers = [];

    $scope.createGame = function () {
        console.log('create game clicked');

        $scope.socket.emit('requestCreateGame', {user: $rootScope.userId});
    };

    $scope.$on('socket:users', function (ev, data) {
        console.log('received live users in lobby:', data);

        $scope.connectedUsers = data;
        $scope.$apply($scope.connectedUsers);
    });

    $scope.$on('socket:lobby', function (ev, data) {
        console.log('event received:', data);
    });
});
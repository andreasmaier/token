angular.module('token.game').controller('GameController', function ($scope, $stateParams) {
    $scope.game = $stateParams.game;
});
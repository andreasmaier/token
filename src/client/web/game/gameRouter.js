angular.module('token.game', []).config(function ($stateProvider) {
    $stateProvider.state('game', {
        url: "/game",
        templateUrl: "game/game.html",
        params: {
            game: null
        }
    });
});
angular.module('token.lobby', []).config(function ($stateProvider) {
    //return {
    //    restrict: 'E',
    //    templateUrl: 'home/lobby.html',
    //    controller: 'HomeController'
    //}
    $stateProvider.state('lobby', {
        url: "/lobby",
        templateUrl: "lobby/lobby.html"
    });
});
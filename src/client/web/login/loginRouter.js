angular.module('token.login', []).config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "login/login.html"
    });
});
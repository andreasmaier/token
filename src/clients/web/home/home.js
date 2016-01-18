angular.module('token').directive('home', function () {
    return {
        restrict: 'E',
        templateUrl: 'home/home.html',
        controller: 'HomeController'
    }
});
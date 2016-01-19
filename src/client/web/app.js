angular.module('token', [
    'angular-jwt',
    'btford.socket-io',
    'ngResource',
    'toastr',
    'ui.router',
    'token.connection', 'token.lobby', 'token.login'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
})
.run(function () {
    console.log('running token app');
});
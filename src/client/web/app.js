angular.module('token', [
    'ngResource', 'btford.socket-io', 'ui.router',
    'token.connection', 'token.lobby', 'token.login'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
})
.run(function () {
    console.log('running token app');
});
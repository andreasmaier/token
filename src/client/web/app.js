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
.run(function ($log, $rootScope, $location, $state, TokenService) {
    $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        var isLogin = toState.name === "login";
        if(isLogin){
            return; // no need to redirect
        }

        // now, redirect only not authenticated

        if(!TokenService.getToken()) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    });

    $log.info('running token app');
});
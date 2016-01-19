angular.module('token.login').controller('LoginController',
    function ($scope, $resource, $rootScope, $state, SocketService, toastr, TokenService, UserService) {
        $scope.user = {};

        $scope.connect = function (user, password) {
            console.log('connect called');

            var login = $resource('http://localhost:4004/login', {
                username: user,
                password: password
            });

            login.save().$promise
                .then(function (response) {
                    console.log('Successful login', response);
                    TokenService.setToken(response.token);
                    UserService.setUser(TokenService.getToken());

                    SocketService.connect();

                    toastr.success('Hey ' + UserService.getUser().firstName + '! Login successful');

                    $state.go('lobby');
                })
                .catch(function (error) {
                    console.log('Error during login', error);

                    toastr.error('Error during login!');
                });
        };
    });
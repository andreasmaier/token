angular.module('token.login').controller('LoginController',
    function ($scope, $resource, $rootScope, $state, SocketService, TokenService) {
        $scope.user = {};

        $scope.connect = function (user, password) {
            console.log('connect called');

            var login = $resource('http://localhost:4004/login', {
                username: user,
                password: password
            });

            login.save().$promise.then(function (response) {
                console.log('successful login', response);
                $rootScope.userId = response.userId;

                TokenService.setToken(response.token);

                SocketService.connect();

                $scope.$on('socket:onconnected', function (ev, data) {
                    console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);

                    $rootScope.socketId = data.id;
                    $scope.connected = true;
                });

                $state.go('lobby');

            }).catch(function (error) {
                console.log('error during login', error);
            });
        };
    });
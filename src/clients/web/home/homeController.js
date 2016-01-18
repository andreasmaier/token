angular.module('token').controller('HomeController', function ($scope, $resource) {
    $scope.hello = 'Hey wazzup';
    $scope.user = {};
    $scope.connectedUsers = [];

    $scope.connect = function(user, password) {
        console.log('connect called');

        var login = $resource('http://localhost:4004/login', {
            username: user,
            password: password
        });

        login.save().$promise.then(function (response) {
            console.log('successful login', response);

            var socket = io.connect('http://localhost:4004', {
                query: 'token=' + response.token
            });
            socket.on('connect', function () {
                console.log('authenticated');
            }).on('disconnect', function () {
                console.log('disconnected');
            });

            socket.on('onconnected', function (data) {
                console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);
            });
            socket.on('users', function (data) {
                console.log('received live users:', data);

                $scope.connectedUsers = data;

                $scope.$apply($scope.connectedUsers);
            });
        }).catch(function (error) {
            console.log('error during login', error);
        });
    };
});
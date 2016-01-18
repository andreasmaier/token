angular.module('token').controller('HomeController', function ($scope, $resource) {
    $scope.hello = 'Hey wazzup';
    $scope.user = {};

    $scope.connect = function(user) {
        console.log('connect called');

        var login = $resource('http://localhost:4004/login', {
            username: 'peter',
            password: '1234qwer'
        });

        var token = '';

        login.save().$promise.then(function (response) {
            console.log('successful login', response);
            token = response.token;

            var socket = io.connect('http://localhost:4004', {
                query: 'token=' + token
            });
            socket.on('connect', function () {
                console.log('authenticated');
            }).on('disconnect', function () {
                console.log('disconnected');
            });

            socket.on('onconnected', function (data) {
                console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);
            });
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', {my: 'data'});
            });
        }).catch(function (error) {
            console.log('error during login', error);
        });
    };
});
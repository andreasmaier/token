angular.module('token.connection').factory('TokenService', function () {
    var token = '';

    return {
        getToken: function () {
            return this.token;
        },

        setToken: function (token) {
            this.token = token;
        }
    }
});
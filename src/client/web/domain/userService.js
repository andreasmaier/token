angular.module('token').factory('UserService', function (jwtHelper) {
    var user = {};

    return {
        setUser: function (jwt) {
            var profile = jwtHelper.decodeToken(jwt);

            user = {
                username: profile.username,
                firstName: profile.firstName,
                lastName: profile.lastName,
                id: profile.id,
                email: profile.email
            }
        },

        getUser: function () {
            return user;
        }
    }
});
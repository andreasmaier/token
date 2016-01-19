angular.module('token').factory('UserService', function (jwtHelper) {
    var user = {};

    return {
        setUser: function (jwt) {
            var profile = jwtHelper.decodeToken(jwt);

            user = {
                firstName: profile.first_name,
                lastName: profile.last_name,
                id: profile.id,
                email: profile.email
            }
        },

        getUser: function () {
            return user;
        }
    }
});
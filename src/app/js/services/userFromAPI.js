angular.module('yarn').factory('userFromAPI', userFromAPI);

function userFromAPI($http, $window) {

    function loadUserFromAPI () {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: '/auth/account/json'
        };

        function then(res) {
            var user = {};
            if (res.data.username) {
                console.log("USER: FOUND: ", res.data.username);
                console.log("USER DATA: ", res.data);
                user = res.data;
            } else {
                console.log("USER: NOT FOUND: Redirecting to twitter auth gateway");
                // User is not logged in... redirect.
                //$window.location.href = "/auth/twitter";
                $window.location.href = "/login";
            }
            return user;
        }

        return $http(config).then(then);
    }

    return loadUserFromAPI;
}


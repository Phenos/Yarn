yarn.factory('userFromAPI', userFromAPI);

function userFromAPI($http) {

    function loadUserFromAPI () {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: '/auth/account/json'
        };

        function then(res) {
            var user = {};
            if (res.data.username) {
                console.log("Authenticated user found: ", res.data.username);
                console.log("User profile data: ", res.data);
                user = res.data;
            } else {
                console.log("No authenticated user found.");
            }
            return user;
        }

        return $http(config).then(then);
    }

    return loadUserFromAPI;
}


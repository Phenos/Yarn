yarn.factory('userFromAPI', userFromAPI);

function userFromAPI($http, Rollbar) {

    function loadUserFromAPI() {

        var config = {
            method: 'GET',
            url: '/auth/account/json'
        };

        function then(res) {
            var user = {};
            if (res.data.username) {
                console.log("Authenticated user found: ", res.data.username);
                console.log("User profile data: ", [res.data]);
                user = res.data;

                Rollbar.configure({
                    payload: {
                        person: {
                            username: user.username
                        }
                    }
                });

            } else {

                Rollbar.configure({
                    payload: {
                        person: {
                            username: null
                        }
                    }
                });

                console.log("No authenticated user found. Running as guest.");
            }
            return user;
        }

        return $http(config).then(then);
    }

    return loadUserFromAPI;
}


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

                var rollbarOptions = {
                    payload: {
                        person: {
                            id: user.id,
                            email: user.email
                        }
                    }
                };

            } else {

                rollbarOptions = {
                    payload: {
                        person: {
                            id: "guest",
                            email: "guest"
                        }
                    }
                };

                console.log("No authenticated user found. Running as guest.");
            }

            //console.log("rollbarOptions", rollbarOptions);
            // todo: The Rollbar.configure from the service is broken
            // Bypassing to global api for now
            //Rollbar.configure(rollbarOptions);
            window.Rollbar.configure(rollbarOptions);

            return user;
        }

        return $http(config).then(then);
    }

    return loadUserFromAPI;
}


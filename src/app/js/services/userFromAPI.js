yarn.service('userFromAPI', function userFromAPI($http, Rollbar) {

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

            // Provide the user context to the error reporting service
            window.Rollbar.configure(rollbarOptions);

            return user;
        }

        return $http(config).then(then);
    }

    return loadUserFromAPI;
});



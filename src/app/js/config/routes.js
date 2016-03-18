yarn.service("firebaseConnection", function(Firebase) {
    return new Firebase("https://yarnstudiodev.firebaseio.com");
});


yarn.service("apiClient", function($window) {
    var apiClient = null;
    if ($window.ActionheroClient) {
        apiClient = new ActionheroClient();
    }
    console.log("apiClient", [apiClient]);
    return apiClient;
});


yarn.service("auth", function(firebaseConnection, $firebaseAuth) {
    return $firebaseAuth(firebaseConnection)
});

yarn.service("authUser", function (auth, authData2user) {
    return auth.$waitForAuth().then(function () {
        var user = null;
        var authData = auth.$getAuth();
        //console.log("auth", auth);
        console.log("authUser authData", authData);
        if (authData) user = authData2user(authData);
        return user;
    });

});

yarn.service("authData2user", function authData2user() {
    return function (authData) {
        var profile = authData[authData.provider];
        return {
            username: authData.provider + "." + authData[authData.provider].username,
            profileImageURL: profile.profileImageURL,
            displayName: profile.displayName,
            token: authData.token,
            rawAuthData: authData
        };
    }

});

yarn.service("login", function (auth) {
    return function login() {
        return auth.$authWithOAuthRedirect("twitter").then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    };
 });


yarn.config(function ($stateProvider,
                      $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
        url: '/',
        resolve: {
            "user": function (authUser, session) {
                return authUser.then(function (user) {
                    if (user) session.open(user);
                    return user;
                });
            }
        },
        controllerAs: 'root',
        bindToController: {},
        templateUrl: './html/root.html',
        controller: 'root'
    });

});

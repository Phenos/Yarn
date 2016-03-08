yarn.config(function ($stateProvider,
                      $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('editorMode', {
        url: '/editor',
        resolve: {
            "user": function (userFromAPI, session) {
                return userFromAPI().then(function (user) {
                    console.log("USER PUT IN SESSION", user);
                    session.user = user;
                    return user;
                });
            }
        },
        controllerAs: 'editorMode',
        bindToController: {},
        templateUrl: './html/editorMode.html',
        controller: 'editorMode'
    });

    $stateProvider.state('playerMode', {
        url: '/',
        resolve: {
            "user": function (userFromAPI, session) {
                return userFromAPI().then(function (user) {
                    session.user = user;
                    return user;
                });
            }
        },
        controllerAs: 'playerMode',
        bindToController: {},
        templateUrl: './html/playerMode.html',
        controller: 'playerMode'
    });

});

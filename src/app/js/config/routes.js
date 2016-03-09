yarn.config(function ($stateProvider,
                      $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
        url: '/',
        resolve: {
            "user": function (userFromAPI, session) {
                return userFromAPI().then(function (user) {
                    session.user = user;
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

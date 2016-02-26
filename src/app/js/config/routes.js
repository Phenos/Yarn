(function () {
    'use strict';

    yarn.config(config);

    // todo: Put config in separate file
    function config($stateProvider,
                    $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('editorMode', {
            url: '/editor',
            resolve: {
                "user": function (userFromAPI) {
                    return userFromAPI().then(function (user) {
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
                "user": function (userFromAPI) {
                    return userFromAPI().then(function (user) {
                        return user;
                    });
                }
            },
            controllerAs: 'playerMode',
            bindToController: {},
            templateUrl: './html/playerMode.html',
            controller: 'playerMode'
        });

    }
})();


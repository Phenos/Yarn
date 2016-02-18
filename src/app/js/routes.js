(function () {
    'use strict';


    angular.module('yarn').config(config);

    angular.module('yarn').run(function ($rootScope) {
        $rootScope.breakpoints = {
            0: 'isMobileWidth',
            480: 'isMobileLandscapeWidth',
            641: 'isTabletWidth',
            1025: 'isDesktopWidth',
            1281: 'isWidescreenLayout'
        };
    });

    // todo: Put config in separate file
    function config($stateProvider,
                    $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('editorMode', {
            url: '/editor',
            resolve: {
                "metadata": function (loadMetadata) {
                    return loadMetadata().then(function (metadata) {
                        return metadata;
                    });
                },
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
                "metadata": function (loadMetadata) {
                    return loadMetadata().then(function (metadata) {
                        return metadata;
                    });
                },
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


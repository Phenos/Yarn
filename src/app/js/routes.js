(function () {
    'use strict';

    angular.module('yarn').config(config);

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


(function () {
    'use strict';


    angular.module('mindgame').config(config);

    angular.module('mindgame').run(function ($rootScope) {
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
                    $urlRouterProvider,
                    localStorageServiceProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            resolve: {
                "metadata": function (loadMetadata) {
                    return loadMetadata().then(function (metadata) {
                        return metadata;
                    });
                }
            },
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

        // Setup local storage api
        localStorageServiceProvider.setPrefix('yarn');
        localStorageServiceProvider.setStorageType('localStorage');

    }
})();


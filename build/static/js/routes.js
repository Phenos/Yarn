(function () {
    'use strict';


    angular.module('mindgame').config(app);

    angular.module('mindgame').run(function($rootScope) {
        $rootScope.breakpoints = {
            0: 'isMobileWidth',
            480: 'isMobileLandscapeWidth',
            641: 'isTabletWidth',
            1025: 'isDesktopWidth',
            1281: 'isWidescreenLayout'
            };
        });

    function app($stateProvider,
                 $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            resolve: {
                "metadata": function (loadMetadata) {
                    console.log("resolving metadata");
                    return loadMetadata().then(function (metadata) {
                        console.log("loaded metadata", metadata);
                        return metadata;
                    });
                }
            },
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

    }
})();


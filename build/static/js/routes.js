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
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

    }
})();


(function () {
    'use strict';

    angular.module('mindgame').config(app);

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


var mindgame = angular.module('mindgame', [
    'ui.router',
    'luegg.directives',
    'cfp.hotkeys'
]);

(function () {
    'use strict';

    angular.module('mindgame').config(function ($stateProvider,
                                                $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controller: gameController,
            controllerAs: 'game',
            // todo: bind to controller
            //bindToController: {},
            templateUrl: './html/app.html'
        });

        function gameController(loadGameScripts) {
            loadGameScripts();
            console.log("Game started!");
        }

    })

})();


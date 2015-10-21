var mindgame = angular.module('mindgame', [
    'ui.router'
]);

(function () {

    'use strict';

    angular.module('mindgame').config(function ($stateProvider, $urlRouterProvider) {
        console.log('config');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controller: gameController,
            controllerAs: 'game',
            //bindToController: {},
            template: '<div><user-input on-submit="game.log(text)"></user-input><story-log ready="game.registerLog(storyLog)"></story-log></div>'
        });

        function gameController($scope, $element) {

            this.registerLog = function (controller) {
                //console.log("registerLog", controller);
                this.storyLog = controller;
            };

            this.log = function (text) {
                console.log('$scope.log', text);
                this.storyLog.log(text);
            };

            //console.log('ALLO!');
        }
    })

})();


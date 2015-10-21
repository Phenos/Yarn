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
                console.log("registerLog", controller);
                this.storyLog = controller;
                this.ready();
            };

            this.log = function (text) {
                console.log('$scope.log', text);
                this.storyLog.log(text);
            };

            //console.log('ALLO!');

            this.start = function () {

                var theHouse = new MindGame();

                var m = theHouse.bigMess;

                var storyText = document.getElementById("TheHouse").innerText;

                theHouse.parse(storyText);

                this.log("Welcome to the BegMess demo story!");
                //var room = m.t("player").a("isIn");
                //this.log("You are in " + room.a("isNamed").text());
                //this.log("You look around: ");
                //this.log(room.a("isDescribedAs").text());

            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


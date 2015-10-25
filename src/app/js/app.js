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
                this.storyLog.log(text);
            };

            this.command = function (text) {
                if (text === "state") {
                    this.storyLog.log($scope.game.bigMess.state.html());
                } else {
                    this.storyLog.log("Sorry... unknown command : "+ text);
                }
            };

            //console.log('ALLO!');

            this.start = function () {

                var game = new MindGame();

                $scope.game = game;

                var storyText = document.getElementById("TheHouse").innerText;

                game.load(storyText);

                // Output the tree and pointer in html

                //$element.append(theHouse.bigMess.script.ast.html());
                //$element.append(theHouse.bigMess.script.pointer.html());

                game.bigMess.runScript();

                $element.prepend(game.bigMess.state.html());

                this.log("Welcome to the BigMess demo story!");

                var state = game.bigMess.state;
                var isIn = state.predicate("is in");
                var isDescribedAs = state.predicate("described as");
                var isCalled = state.predicate("is called");
                var room = state.thing("you").getAssertion(isIn);
                if (room.length) {
                    // Todo, create helper for getting a predicate value or it' id as a fallback
                    var label = room[0].object.getAssertion(isCalled)[0].object;
                    this.log("You are in " + label);
                } else {
                    this.log("You are nowhere to be found! Place your hero somewhere");
                }

                //this.log("You look around: ");
                //this.log(room.a("isDescribedAs").text());

            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


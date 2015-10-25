var mindgame = angular.module('mindgame', [
    'ui.router'
]);

(function () {

    'use strict';

    angular.module('mindgame').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controller: gameController,
            controllerAs: 'game',
            //bindToController: {},
            template: '<div><user-input on-submit="game.command(text)"></user-input><story-log ready="game.registerLog(storyLog)"></story-log></div>'
        });

        function gameController($scope, $element, $compile) {

            this.registerLog = function (controller) {
                //console.log("registerLog", controller);
                this.storyLog = controller;
                this.ready();
            };

            this.log = function (text) {
                this.storyLog.log(text);
            };

            this.command = function (text) {
                if (text === "state") {
                    // todo: Dictionnary of game commands
                    var html = this.game.bigMess.state.html();
                    this.storyLog.log(html);
                } else {
                    // todo: Styled output for unknown commands
                    // todo: Scroll to bottom after output
                    this.storyLog.log("Sorry... unknown command : "+ text);
                }
            };

            //console.log('ALLO!');

            this.start = function () {

                var game = new MindGame();

                this.game = game;

                var storyText = document.getElementById("TheHouse").innerText;

                game.load(storyText);

                // Output the tree and pointer in html

                //$element.append(theHouse.bigMess.script.ast.html());
                //$element.append(theHouse.bigMess.script.pointer.html());

                game.bigMess.runScript();

                $element.prepend(game.bigMess.state.html());

                var state = game.bigMess.state;


                var isIn = state.predicate("is in");
                var isDescribedAs = state.predicate("is described as");
                var isCalled = state.predicate("is called");


                // Story welcome message and introduction

                // todo: Output specially styled titles for story and chapters
                var story = state.thing("story");
                var storyTitle = story.getAssertion(isCalled)[0].object;
                if (storyTitle) this.log(storyTitle);
                var storyDescription = story.getAssertion(isDescribedAs)[0].object;
                if (storyDescription) this.log(storyDescription);
                // todo: Output specially styled separators
                this.log("---------");

                // Describe where you are at the beginning

                var room = state.thing("you").getAssertion(isIn);
                if (room.length) {
                    // Todo, create helper for getting a predicate value or it' id as a fallback
                    var label = room[0].object.getAssertion(isCalled)[0].object;
                    this.log("You are in " + label);
                } else {
                    this.log("You are nowhere to be found! Place your hero somewhere");
                }

            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


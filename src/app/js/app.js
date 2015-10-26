var mindgame = angular.module('mindgame', [
    'ui.router',
    'luegg.directives'
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
            // todo: this object should not be called "game"
            var main = this;

            this.registerLog = function (controller) {
                //console.log("registerLog", controller);
                this.storyLog = controller;
                this.ready();
            };

            this.log = function (text) {
                this.storyLog.log(text);
            };

            this.command = function (text) {
                var command = commands[text];
                if (command) {
                    command(this);
                } else {
                    // todo: Styled output for unknown commands
                    // todo: Scroll to bottom after output
                    this.storyLog.log("Sorry... unknown command : "+ text);
                }
            };

            var commands = {
                state: stateCommand,
                tree: treeCommand,
                tokens: tokensCommand
            };

            function stateCommand (main) {
                var html = main.game.bigMess.state.html();
                main.storyLog.debug("Outputing current game state:");
                main.storyLog.debug(html);
            }

            function treeCommand (main) {
                var html = main.game.bigMess.script.ast.html();
                main.storyLog.debug("Outputing execution tree:");
                main.storyLog.debug(html);
            }

            function tokensCommand (main) {
                var html = main.game.bigMess.script.pointer.html();
                main.storyLog.debug("Outputing script parsing:");
                main.storyLog.debug(html);
            }

            //console.log('ALLO!');

            this.start = function () {

                var game = new MindGame();

                this.game = game;

                // todo: Make this a service
                var storyText = document.getElementById("TheHouse").innerText;

                game.load(storyText);
                game.bigMess.runScript();
                var state = game.bigMess.state;

                // todo: Put these 3 commands on keystrokes
                this.command("tree");
                this.command("tokens");
                this.command("state");



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


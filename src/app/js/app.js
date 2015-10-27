var mindgame = angular.module('mindgame', [
    'ui.router',
    'luegg.directives',
    'cfp.hotkeys'
]);

(function () {

    'use strict';

    angular.module('mindgame').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controller: gameController,
            controllerAs: 'game',
            //bindToController: {}, // todo: bind to controller
            templateUrl: './html/app.html'
        });

        function gameController($scope, $element, $compile, hotkeys) {
            // todo: this object should not be called "game"
            var main = this;

            console.log("Game started!");

            this.registerLog = function (controller) {
                //console.log("registerLog", controller);
                this.storyLog = controller;
                this.ready();
            };

            this.command = function (text) {
                var command = commands[text];
                if (command) {
                    command(this);
                } else {
                    this.storyLog.error("Sorry... unknown command : " + text);
                }
            };

            var commands = {
                state: stateCommand,
                tree: treeCommand,
                tokens: tokensCommand
            };

            function stateCommand(main) {
                var html = main.game.bigMess.state.html();
                main.storyLog.debug("Outputing current game state:");
                main.storyLog.debug(html);
            }

            function treeCommand(main) {
                var html = main.game.bigMess.script.ast.html();
                main.storyLog.debug("Outputing execution tree:");
                main.storyLog.debug(html);
            }

            function tokensCommand(main) {
                var html = main.game.bigMess.script.pointer.html();
                main.storyLog.debug("Outputing script parsing:");
                main.storyLog.debug(html);
            }


            hotkeys
                .bindTo($scope)
                .add({
                    combo: 'ctrl+1',
                    description: 'Output the current state',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    callback: function () {
                        main.command("state");
                    }
                })
                .add({
                    combo: 'ctrl+2',
                    description: 'Output the execution tree',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    callback: function () {
                        main.command("tree");
                    }
                })
                .add({
                    combo: 'ctrl+3',
                    description: 'Outputing script parsing',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    callback: function () {
                        main.command("tokens");
                    }
                });

            //console.log('ALLO!');

            this.start = function () {

                var game = new MindGame();

                this.game = game;

                // todo: Make this a service
                var storyText = document.getElementById("TheHouse").innerText;

                game.load(storyText);
                game.bigMess.runScript();
                var state = game.bigMess.state;


                var isIn = state.predicate("is in");
                var isDescribedAs = state.predicate("is described as");
                var isCalled = state.predicate("is called");


                // Story welcome message and introduction

                // todo: Output specially styled titles for story and chapters
                var story = state.thing("story");
                var storyTitle = story.getAssertion(isCalled)[0].object;
                if (storyTitle) this.storyLog.heading(storyTitle);
                var storyDescription = story.getAssertion(isDescribedAs)[0].object;
                if (storyDescription) this.storyLog.subHeading(storyDescription);
                // todo: Output specially styled separators
                this.storyLog.divider("—&nbsp;&nbsp;&nbsp;⟡&nbsp;&nbsp;&nbsp;—");

                // Describe where you are at the beginning

                var room = state.thing("you").getAssertion(isIn);
                if (room.length) {
                    // Todo, create helper for getting a predicate value or it' id as a fallback
                    var label = room[0].object.getAssertion(isCalled)[0].object;
                    this.storyLog.log("You are in " + label);
                    var description = room[0].object.getAssertion(isDescribedAs)[0].object;
                    if (description) this.storyLog.log(description);
                } else {
                    this.storyLog.log("You are nowhere to be found! Place your hero somewhere");
                }

                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                main.question = "Where do you want to go?";
                main.choices = [
                    {value: "move up", label: "Up!"},
                    {value: "move down", label: "Down!"}
                ];
                main.choose = function (value) {
                    main.command(value);
                }


            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


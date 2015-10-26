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
            //bindToController: {},
            //todo: Externalise template in html file
            template: '<div class="main-ui"><user-input on-submit="game.command(text)"></user-input><story-log ready="game.registerLog(storyLog)"></story-log> <div class="ellipsis"><span class="one">▸</span><span class="two">▸</span><span class="three">▸</span>​</div></div>'
        });

        function gameController($scope, $element, $compile, hotkeys) {
            // todo: this object should not be called "game"
            var main = this;

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
                } else {
                    this.storyLog.log("You are nowhere to be found! Place your hero somewhere");
                }

            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


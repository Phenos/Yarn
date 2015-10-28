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



                function PromptLoop() {
                    this.contexts = [];
                    this.contextsRef = [];
                }

                PromptLoop.prototype.getPromptFromContext = function (state) {
                    var prompt;
                    var context = this.contexts.find(findContext);

                    function findContext(context) {
                        var found;
                        if (context.when(state)) found = context;
                        return found;
                    }

                    // Setup the prompt if a context was found
                    if (context) {
                        prompt = new Prompt();
                        context.question(prompt);
                    }

                    prompt.answer = function (value) {
                        var option = prompt.optionsRef[value];
                        context.answer(option);
                    };

                    return prompt;
                };

                PromptLoop.prototype.addContext = function (id, config) {
                    var context = new Context(id);
                    config(context);
                    this.contexts.push(context);
                    this.contextsRef[id] = context;
                };

                function Context(id) {
                    this.id = id;
                    this.question = null;
                    this.when = null;
                    this.answer = null;
                }

                function Prompt() {
                    this.question = "";
                    this.options = [];
                    this.optionsRef = {};
                }

                Prompt.prototype.option = function (label, value) {
                    var option = new Option(label, value);
                    this.options.push(option);
                    this.optionsRef[value] = option;
                };

                function Option(label, value) {
                    this.label = label;
                    this.value = value;
                }


                // Create an instant of the promptLoop

                var promptLoop = new PromptLoop;
                promptLoop.addContext("YourInARoom", YourInARoom);
                function YourInARoom(context) {
                    context.when = function (state) {
                        // Test with the player is currently in a room
                        return true;
                    };
                    context.question = function (prompt) {
                        prompt.question = "Where do you want to go ?";
                        prompt.option("Up!", "move up");
                        prompt.option("Down!", "move down");
                    };
                    context.answer = function answer(option) {
                        // todo: this should be injected instead of taken from parent scope
                        main.command(option.value);
                    };
                }

                // Load the appropriate prompt and setup the ui with the prompt

                var prompt = promptLoop.getPromptFromContext();
                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                main.question = prompt.question;
                main.options = prompt.options;
                main.choose = function (value) {
                    prompt.answer(value);
                };



            };

            this.ready = function () {
                this.start();
            };

        }

    })

})();


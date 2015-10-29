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
            //bindToController: {}, // todo: bind to controller
            templateUrl: './html/app.html'
        });

        function gameController($scope, hotkeys, loadPageScripts) {
            // todo: this object should not be called "game"
            console.log("Game started!");
            var main = this;
            this.game = new MindGame();
            var game = this.game;
            var state = game.bigMess.state;

            SetupKeystrokes();
            SetupCommands(state);

            // todo: Inject an (async?) service instead of registering with parent
            this.registerLog = function (controller) {
                //console.log("registerLog", controller);
                this.storyLog = controller;
                this.ready();
            };

            this.ready = function () {
                // Load all game scipts
                loadPageScripts('BigMess', function (source) {
                    game.load(source);
                    game.bigMess.runScript();
                }).then(function () {
                    main.start()
                });

            };

            this.start = function () {
                LogStoryIntroduction();
                DescribeWhereYouAre();
                this.promptLoop = SetupPromptLoop(updatePromptUI);
            };

            function SetupCommands(state) {

                // todo: Move commands into a separate directive
                main.command = function (text) {
                    var command = commands[text];
                    if (command) {
                        command(this);
                    } else {
                        main.storyLog.error("Sorry... unknown command : " + text);
                    }
                };

                var commands = {
                    move: moveCommand,
                    look: lookCommand,
                    state: stateCommand,
                    tree: treeCommand,
                    tokens: tokensCommand
                };

                //todo: Create a class for commands

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

                function moveCommand(main) {
                    var isAboutTo = state.predicate("isAboutTo");
                    state.thing("You").setAssertion(isAboutTo, "move");
                }

                function lookCommand(main) {
                    var isAboutTo = state.predicate("isAboutTo");
                    state.thing("You").setAssertion(isAboutTo, "look");
                }
            }
            function SetupKeystrokes () {
                // todo: Move hotkey into a separate directive
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
            }

            // Story welcome message and introduction
            // todo: Output specially styled titles for story and chapters
            function LogStoryIntroduction() {
                var story = state.thing("story");
                var storyTitle = state.resolveValue("story.isNamed");

                if (storyTitle) main.storyLog.heading(storyTitle);

                var storyDescription = state.resolveValue("story.isDescribedAs");
                if (storyDescription) main.storyLog.subHeading(storyDescription);
                // todo: Output specially styled separators
                main.storyLog.divider();
            }

            function SetupPromptLoop() {
                // Create an instant of the promptLoop
                var promptLoop = new PromptLoop(state, updatePromptUI);

                promptLoop.addContext("WhereToDo", WhereToDo);
                function WhereToDo(context) {
                    context.when = function (state) {
                        var isAboutTo = state.resolveValue("You.isAboutTo");
                        return isAboutTo === "move";
                    };
                    context.question = function (promptLoop, prompt) {
                        prompt.question = "Where do you want to go ?";
                        var rooms = state.resolve("you.isIn.linksTo");
                        console.log('rooms', rooms);
                        rooms.forEach(function (room) {
                            var label = room.resolveValue("isNamed");
                            prompt.option(label, room.id);
                        });
                    };
                    context.answer = function answer(promptLoop, option) {
                        console.trace(".answer for WhereToDo");
                        // todo: this should be injected instead of taken from parent scope
                        var isAboutTo = state.predicate("isAboutTo");
                        state.thing("You").removeAssertions(isAboutTo);
                        var room = state.thing(option.value);
                        var isIn = state.predicate("isIn");
                        if (room) {
                            state.thing("You")
                                .removeAssertions(isIn)
                                .setAssertion(isIn, room);
                        } else {
                            main.storyLog.error("Failed to find this room [%s]", option.value);
                        }
                        DescribeWhereYouAre(true);
                    };
                    return promptLoop;
                }

                promptLoop.addContext("WhatToLookAt", WhatToLookAt);
                function WhatToLookAt(context) {
                    context.when = function (state) {
                        var isAboutTo = state.resolveValue("You.isAboutTo");
                        return isAboutTo === "look";
                    };
                    context.question = function (promptLoop, prompt) {
                        prompt.question = "What do you want to look at ?";
                        var thingsInRoom = state.resolve("You.isIn.hasInIt");
                        console.log('thingsInRoom', thingsInRoom);
                        if (thingsInRoom.length) {
                            thingsInRoom.forEach(function (thing) {
                                var label = thing.resolveValue("isNamed");
                                prompt.option(label, thing.id);
                            });
                        } else {
                            main.storyLog.error("Nothing to look at here!");
                            // todo: this is clunky.... force an empty answer
                            //context.answer(promptLoop, null);
                            // todo: Instread of a "showPrompt", it should be a return value
                        }
                    };
                    context.answer = function answer(promptLoop, option) {
                        console.trace(".answer for WhatToLookAt");
                        var isAboutTo = state.predicate("isAboutTo");
                        state.thing("You").removeAssertions(isAboutTo);

                        var thing = state.thing(option.value);
                        DescribeThing(thing);

                    };
                }

                promptLoop.addContext("WhatToDo", WhatToDo);
                function WhatToDo(context) {
                    context.when = function (state) {
                        return true;
                    };
                    context.question = function (promptLoop, prompt) {
                        prompt.question = "What do you want to do ?";
                        prompt.option("Move", "move");
                        prompt.option("Look", "look");
                    };
                    context.answer = function answer(promptLoop, option) {
                        console.trace(".answer for WhatToDo");
                        // todo: this should be injected instead of taken from parent scope
                        main.command(option.value);
                    };
                }

                promptLoop.update();
                return promptLoop;
            }

            // Load the appropriate prompt and setup the ui with the prompt
            function updatePromptUI(promptLoop) {
                var prompt = promptLoop.currentPrompt;
                if (prompt) {
                    console.trace("prompt found", prompt);

                    // Prompt the user with a question
                    // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                    main.question = prompt.question;
                    main.options = prompt.options;
                    main.choose = function (value) {
                        prompt.answer(promptLoop, value);
                        promptLoop.update();
                    };
                } else {
                    main.storyLog.error("OUPS!!!... no prompt were found!!!");
                }
            }

            // Describe where you are at the beginning
            function DescribeWhereYouAre(justMoved) {
                var room = state.resolveValue("you.isIn");
                console.log("Your in room ", room);
                if (room) {
                    var label = room.resolveValue("isNamed");
                    if (justMoved) {
                        main.storyLog.log("You moved to " + label);
                    } else {
                        main.storyLog.log("You are in " + label);
                    }
                    var description = room.resolveValue("isDescribedAs");
                    if (description) main.storyLog.log(description);
                } else {
                    main.storyLog.log("You are nowhere to be found! Place your hero somewhere");
                }
            }

            // Describe where you are at the beginning
            function DescribeThing(thing) {
                if (thing) {
                    var label = thing.resolveValue("isNamed");
                    var description = thing.resolveValue("isDescribedAs");
                    if (label) main.storyLog.log("You look at the " + label);
                    if (description) main.storyLog.log(description);
                }
            }


        }

    })

})();



function PromptLoop(state, updatePromptUI) {
    this.state = state;
    this.contexts = [];
    this.contextsRef = [];
    this.currentPrompt = null;
    this.updatePromptUI = updatePromptUI;
    this.update();
}

PromptLoop.prototype.update = function (dontUpdateUI) {
    var prompt;
    var self = this;
    var context = this.contexts.find(findContext);

    function findContext(context) {
        var found;
        if (context.when(self.state)) found = context;
        return found;
    }

    // Setup the prompt if a context was found
    if (context) {
        prompt = new Prompt();
        this.currentPrompt = prompt;
        context.question(this, prompt);
        if (prompt.options.length) {
            prompt.answer = function (promptLoop, value) {
                var option = prompt.optionsRef[value];
                context.answer(self, option);
                self.update();
            };
        } else {
            // No choices available... simply process a null answer
            // And update the state afterward
            context.answer(self, null);
            //self.updatePromptUI(self);
        }
        if (!dontUpdateUI) this.updatePromptUI(this);
    } else {
        console.log("No context found!");
    }
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




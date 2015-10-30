angular.module('mindgame').factory('promptLoop', promptLoop);

function promptLoop(storyLogService,
                    commands,
                    game,
                    writers) {

    var storyLog = storyLogService;

    var state = game.state;

    function WhereToDo(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "move";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";
            var rooms = state.resolve("you.isIn.linksTo");
            //console.log('rooms', rooms);
            rooms.forEach(function (room) {
                var label = room.resolveValue("isNamed");
                prompt.option(label, room.id);
            });
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhereToDo");
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
                storyLog.error("Failed to find this room [%s]", option.value);
            }
            writers.DescribeWhereYouAre(true);
        };
        return promptLoop;
    }

    function WhatToLookAt(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "look";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            //console.log('thingsInRoom', thingsInRoom);
            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);
            if (option) {
                var thing = state.thing(option.value);
                writers.DescribeThing(thing);
            } else {
                storyLog.error("Nothing to look at here!");
            }
        };
    }

    function WhatToTake(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "take";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            var thingsThatAreInventory = [];
            console.trace("thingsInRoom", thingsInRoom);

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                console.trace("thing", thing.id);
                // Check if item is an InventoryItem
                var isInventoryItem = false;
                var thingsThatAre = thing.resolve("isA");
                thingsThatAre.forEach(function (thing) {
                    console.trace("is a", thing.id);
                    if (thing === state.thing("InventoryItem")) isInventoryItem = true;
                });
                if (isInventoryItem) thingsThatAreInventory.push(thing);
            });


            //console.log('thingsInRoom', thingsInRoom);
            if (thingsThatAreInventory.length) {
                thingsThatAreInventory.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);

            if (option) {
                // todo: Find sexier api for removing an assertion
                // todo: Implement "unique" assertions... such as when someone is
                var thing = state.thing(option.value);
                var hasInInventory = state.predicate("hasInInventory");
                state.thing("You").setAssertion(hasInInventory, thing);
                writers.DescribeThingTakenInInventory(thing);
            } else {
                storyLog.error("Sorry, nothing to take here!");
            }

        };
    }

    function WhatToDo(context) {
        context.when = function (state) {
            return true;
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do ?";
            prompt.option("Move", "move");
            prompt.option("Look", "look");
            prompt.option("Take", "take");
            prompt.option("Inventory", "inventory");
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            commands.command(option.value);
        };
    }

    function getPromptLoop(updatePromptUI) {
        // Create an instant of the promptLoop
        var promptLoop = new PromptLoop(state, updatePromptUI);

        promptLoop.addContext("WhereToDo", WhereToDo);
        promptLoop.addContext("WhatToLookAt", WhatToLookAt);
        promptLoop.addContext("WhatToTake", WhatToTake);
        promptLoop.addContext("WhatToDo", WhatToDo);
        promptLoop.update();
        return promptLoop;
    }

    return getPromptLoop;
}




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




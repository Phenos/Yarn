yarn.factory('promptLoop', promptLoop);

function promptLoop(coverpagePrompt,
                    movePrompt,
                    usePrompt,
                    takePrompt,
                    lookPrompt,
                    defaultPrompt) {

    // Create an instant of the promptLoop
    var promptLoop = new PromptLoop();

    // NOTE: The order is important here. The "WhatToDo" must be after other options
    promptLoop.addContext("WhatToUse", usePrompt);
    promptLoop.addContext("WhereToDo", movePrompt);
    promptLoop.addContext("WhatToLookAt", lookPrompt);
    promptLoop.addContext("WhatToTake", takePrompt);
    promptLoop.addContext("WhatToDo", defaultPrompt);
    promptLoop.addContext("Coverpage", coverpagePrompt);
    //promptLoop.update();

    //console.log("Created a new prompt loop", promptLoop);

    return promptLoop;
}


function PromptLoop() {
    this.contexts = [];
    this.contextsRef = [];
    this.currentPrompt = null;
    this.updatePromptUI = function () {
        //console.warn("Oups, UI prompted before ayone is listening!")
    };
}

PromptLoop.prototype.onUpdate = function (onUpdatePrompt) {
    this.updatePromptUI = onUpdatePrompt;
};

PromptLoop.prototype.update = function (dontUpdateUI) {
    var prompt;
    var self = this;
    var context = this.contexts.find(findContext);

    function findContext(context) {
        var found;
        if (context.when()) found = context;
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
    return option;
};

function Option(label, value) {
    this.label = label;
    this.value = value;
    this.iconId = "";
    this.iconOnly = false;
}




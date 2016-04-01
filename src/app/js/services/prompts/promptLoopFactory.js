yarn.service('PromptLoop', function (Prompt) {

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

    PromptLoop.prototype.useThing = function (thing) {
        var context = this.findContext();
        if (context.use) {
            context.use(thing);
        }
    };

    PromptLoop.prototype.findContext = function () {
        return this.contexts.find(function (context) {
            return context.when();
        });
    };

    PromptLoop.prototype.update = function (dontUpdateUI) {
        var prompt;
        var self = this;
        var context = this.findContext();

        // Setup the prompt if a context was found
        if (context) {
            prompt = new Prompt();
            this.currentPrompt = prompt;
            context.question(this, prompt);
            // Update each options (to store icon types among other thigns)
            angular.forEach(prompt.options, function (option) {
                option.update();
            });
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

    return PromptLoop;
});
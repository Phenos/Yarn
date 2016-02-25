yarn.factory('PromptLoop', function (Prompt) {

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

    return PromptLoop;
});
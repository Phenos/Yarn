yarn.service("inventoryPrompt", function (logic,
                                          writers,
                                          commands,
                                          state,
                                          assert,
                                          stateHelpers,
                                          transcript,
                                          setDefaultOptionsHelper) {

    function takePrompt(context) {

        context.when = function () {
            return "inventory" === state.resolveValue(assert("Player", "has", "Intention"));
        };

        context.question = function (promptLoop, prompt) {

            var inventoryItems = state.resolveAll(assert(undefined, "is in", "Your Inventory"));
            if (inventoryItems.length) {
                prompt.question = "Take anything or look at what you have ?";
                //inventoryItems.forEach(function (thing) {
                //    var name = state.resolveValue(assert(thing, "has", "Name"));
                //    name = name || thing.id;
                //    prompt.option(name, "look " + thing.id);
                //});
            } else {
                prompt.question = "You have nothing in inventory!";
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);
        };
        context.use = function(thing) {
            commands.run("take " + thing.id);
        };
        context.answer = function answer(promptLoop, option) {
            if (option) {
                if (option.value !== "back") {
                    commands.run(option.value);
                }
            }

        };

    }

    return takePrompt;
});
yarn.service("inventoryPrompt", function (logic,
                                     writers,
                                     commands,
                                     state,
                                     assert,
                                     stateHelpers,
                                     storyLog,
                                     setDefaultOptionsHelper) {

    function takePrompt(context) {

        context.when = function () {
            return "inventory" === state.resolveValue(assert("You", "has", "Intention"));
        };

        context.question = function (promptLoop, prompt) {

            var inventoryItems = state.resolveAll(assert("You", "has in inventory"));

            // TODO: NERFED FOR NOW... SHOULDBE REMOVED
            //
            //if (inventoryItems.length) {
            //    prompt.question = "Your inventory";
            //    inventoryItems.forEach(function (thing) {
            //        var name = state.resolveValue(assert(thing, "has", "Name"));
            //        name = name || thing.id;
            //        prompt.option(name, "look " + thing.id);
            //    });
            //} else {
            //    prompt.question = "You have nothing in inventory!";
            //}

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);
        };

        context.answer = function answer(promptLoop, option) {
            if (option) {
                if (option.value !== "back") {
                    commands.command(option.value);
                }
            }

        };

    }

    return takePrompt;
});
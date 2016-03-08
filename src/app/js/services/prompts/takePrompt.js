yarn.service("takePrompt", function (logic,
                                     writers,
                                     commands,
                                     state,
                                     assert,
                                     stateHelpers,
                                     storyLog,
                                     setDefaultOptionsHelper) {

    function takePrompt(context) {

        context.when = function () {
            return "take" === state.resolveValue(assert("You", "has", "Intention"));
        };

        context.question = function (promptLoop, prompt) {

            var room = state.resolveOne(assert("You", "is in"));
            var thingsToTake = stateHelpers.inventoryInRoom(room);

            if (thingsToTake.length) {
                prompt.question = "What do you want to take ?";
                thingsToTake.forEach(function (thing) {
                    var name = state.resolveValue(assert(thing, "has", "Name"));
                    prompt.option(name, "take " + thing.id);
                });
            } else {
                prompt.question = "There is nothing to take here!";
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);
        };

        context.answer = function answer(promptLoop, option) {
            logic.routines.aboutTo("");
            if (option) {
                if (option.value !== "back") {
                    commands.command(option.value);
                }
            } else {
                storyLog.error("Sorry, nothing to take here!");
            }

        };

    }

    return takePrompt;
});
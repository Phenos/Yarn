yarn.service("takePrompt", function (logic,
                                     writers,
                                     commands,
                                     state,
                                     stateHelpers) {

    function takePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo && isAboutTo.id === "take";
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";

            var room = state.resolve("You.isIn");
            var thingsToTake = stateHelpers.inventoryInRoom(room[0]);

            //console.log('thingsInRoom', thingsInRoom);
            if (thingsToTake.length) {
                thingsToTake.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, "take " + thing.id);
                });
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

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
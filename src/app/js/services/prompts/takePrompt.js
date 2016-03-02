yarn.service("takePrompt", function (logic,
                                     writers,
                                     commands,
                                     state,
                                     stateHelpers,
                                     storyLog) {

    function takePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveOne({
                subject: "you",
                predicate: "isAboutTo"
            });

            return isAboutTo === "take";
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";

            var room = state.resolveOne({
                subject: "you",
                predicate: "isIn"
            });

            var thingsToTake = stateHelpers.inventoryInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);
            if (thingsToTake.length) {
                thingsToTake.forEach(function (thing) {
                    var label = state.resolveOne({
                        subject: thing.id,
                        predicate: "isNamed"
                    });
                    console.log(">>>>>", label, thing);
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
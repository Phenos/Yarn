yarn.service("takePrompt", function (logic,
                                     writers,
                                     commands,
                                     state,
                                     stateHelpers,
                                     storyLog,
                                     setDefaultOptionsHelper) {

    function takePrompt(context) {

        context.when = function () {
            return "take" === state.resolveValue({
                    subject: "you",
                    predicate: "has",
                    object: "intention"
                });
        };

        context.question = function (promptLoop, prompt) {

            var room = state.resolveOne({
                subject: "you",
                predicate: "isIn"
            });

            var thingsToTake = stateHelpers.inventoryInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);
            if (thingsToTake.length) {
                prompt.question = "What do you want to take ?";
                thingsToTake.forEach(function (thing) {
                    var label = state.resolveValue({
                        subject: thing.id,
                        predicate: "has",
                        object: "Name"
                    });
                    //console.log(">>>>>", label, thing);
                    prompt.option(label, "take " + thing.id);
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
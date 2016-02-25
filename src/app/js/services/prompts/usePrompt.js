yarn.service("usePrompt", function (logic,
                                    storyLog,
                                    commands,
                                    state) {

    function usePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo && isAboutTo.id === "use";
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to use ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            //console.log('thingsInRoom', thingsInRoom);
            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;
        };

        context.answer = function answer(promptLoop, option) {
            if (option) {
                if (option.value === "back") {
                    logic.routines.aboutTo("");
                } else {
                    logic.routines.aboutTo("");
                    commands.command("use " + option.value);
                }
            } else {
                storyLog.error("Nothing to user here!");
            }
        };

    }

    return usePrompt;
});
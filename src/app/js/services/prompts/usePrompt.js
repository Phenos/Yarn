yarn.service("usePrompt", function (stateHelpers,
                                    logic,
                                    storyLog,
                                    commands,
                                    state) {

    function usePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveOne({
                subject: "you",
                predicate: "isAboutTo"
            });
            return isAboutTo === "use";
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to use ?";

            var room = state.resolveOne({
                subject: "you",
                predicate: "isIn"
            });

            var thingsInRoom = stateHelpers.usableItemInRoom(room);

            console.log('thingsInRoom', thingsInRoom);

            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = state.resolveOne({
                        subject: thing.id,
                        predicate: "isNamed"
                    });
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
                storyLog.error("Nothing to use here!");
            }
        };

    }

    return usePrompt;
});
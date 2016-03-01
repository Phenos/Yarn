yarn.service("usePrompt", function (logic,
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
                subject: state.thing("you"),
                predicate: state.predicate("inIn")
            });
            var thingsInRoom = state.resolveAll({
                predicate: state.predicate("inIn"),
                object: room
            });
            //console.log('thingsInRoom', thingsInRoom);
            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = state.resolveOne({
                        subject: thing.id,
                        predicate: state.predicate("isNamed")
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
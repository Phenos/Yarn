yarn.service("lookPrompt", function (writers,
                                     logic,
                                     commands,
                                     state,
                                     stateHelpers,
                                     setDefaultOptionsHelper) {

    function lookPrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveOne({
                subject: "you",
                predicate: "isAboutTo"
            });
            return isAboutTo === "look";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";

            var room = state.resolveOne({
                subject: "You",
                predicate: "isIn"
            });

            var thingsInRoom = stateHelpers.thingsInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);

            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = state.resolveOne({
                        subject: thing.id,
                        predicate: "isNamed"
                    });
                    prompt.option(label, "look " + thing.id);
                });
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);

        };
        context.answer = function answer(promptLoop, option) {
            if (option) {
                if (option.value === "back") {
                    logic.routines.aboutTo("");
                } else {
                    commands.command(option.value);
                }
            }
        };

    }

    return lookPrompt;
});
yarn.service("usePrompt", function (stateHelpers,
                                    logic,
                                    storyLog,
                                    commands,
                                    state,
                                    setDefaultOptionsHelper) {

    function usePrompt(context) {

        context.when = function () {
            return "use" === state.resolveValue({
                    subject: "you",
                    predicate: "has",
                    object: "intention"
                });
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to use ?";

            var room = state.resolveOne({
                subject: "you",
                predicate: "isIn"
            });

            var thingsInRoom = stateHelpers.usableItemInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);

            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = state.resolveValue({
                        subject: thing.id,
                        predicate: "has",
                        object: "Name"
                    });
                    prompt.option(label, "use " + thing.id);
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
            } else {
                storyLog.error("Nothing to use here!");
            }
        };

    }

    return usePrompt;
});
yarn.service("movePrompt", function (logic,
                                     commands,
                                     state,
                                     setDefaultOptionsHelper) {

    function movePrompt(context) {

        context.when = function () {
            return "move" === state.resolveValue({
                    subject: "you",
                    predicate: "has",
                    object: "intention"
                });
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";

            var room = state.resolveOne({
                subject: "you",
                predicate: "isIn"
            });

            var linkedRooms = state.resolveAll({
                subject: room.id,
                predicate: "linksTo"
            });

            linkedRooms.forEach(function (room) {
                var label = state.resolveValue({
                    subject: room.id,
                    predicate: "has",
                    object: "Name"
                });
                prompt.option(label, "move " + room.id);
            });

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);
        };
        context.answer = function answer(promptLoop, option) {
            // todo: this should be injected instead of taken from parent scope
            if (option.value === "back") {
                logic.routines.aboutTo("");
            } else {
                commands.command(option.value);
            }
        };

    }

    return movePrompt;
});
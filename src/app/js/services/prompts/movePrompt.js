yarn.service("movePrompt", function (logic,
                                     commands,
                                     state) {

    function movePrompt(context) {

        context.when = function () {
            var isAboutToObj = state.resolveOne({
                subject: "you",
                predicate: "isAboutTo"
            });
            return isAboutToObj && isAboutToObj.id === "move";
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
                var label = state.resolveOne({
                    subject: room.id,
                    predicate: "isNamed"
                });
                prompt.option(label, room.id);
            });

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

        };
        context.answer = function answer(promptLoop, option) {
            // todo: this should be injected instead of taken from parent scope
            logic.routines.aboutTo("");
            if (option.value !== "back") {
                commands.command("move " + option.value);
            }
        };

    }

    return movePrompt;
});
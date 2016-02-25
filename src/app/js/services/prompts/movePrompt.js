yarn.service("movePrompt", function (logic,
                                     commands,
                                     state) {

    function movePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            //console.log("isAboutTo =====>", isAboutTo);
            return isAboutTo && isAboutTo.id === "move";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";

            var rooms = state.resolve("you.isIn.linksTo");
            //console.log('rooms', rooms);
            rooms.forEach(function (room) {
                var label = room.resolveValue("isNamed");
                prompt.option(label, room.id);
            });

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhereToDo");
            // todo: this should be injected instead of taken from parent scope
            logic.routines.aboutTo("");
            if (option.value !== "back") {
                commands.command("move " + option.value);
            }
        };

    }

    return movePrompt;
});
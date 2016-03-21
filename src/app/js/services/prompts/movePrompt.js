yarn.service("movePrompt", function (logic,
                                     commands,
                                     state,
                                     assert,
                                     setDefaultOptionsHelper) {

    function movePrompt(context) {

        context.when = function () {
            return "move" === state.resolveValue(assert("You", "has", "Intention"));
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";

            //var room = state.resolveOne(assert("You", "is in"));
            //
            //var linkedRooms = state.resolveAll(assert(room, "linksTo"));
            //
            //linkedRooms.forEach(function (room) {
            //    var name = state.resolveValue(assert(room, "has", "Name"));
            //    prompt.option(name, "move " + room.id);
            //});

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);
        };
        context.use = function(thing) {
            commands.run("move " + thing.id);
        };
        context.answer = function answer(promptLoop, option) {
            if (option.value === "back") {
                logic.routines.aboutTo("");
            } else {
                commands.run(option.value);
            }
        };

    }

    return movePrompt;
});
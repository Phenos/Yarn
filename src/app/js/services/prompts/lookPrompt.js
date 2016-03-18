yarn.service("lookPrompt", function (writers,
                                     logic,
                                     assert,
                                     commands,
                                     state,
                                     stateHelpers,
                                     setDefaultOptionsHelper) {

    function lookPrompt(context) {

        context.when = function () {
            return "look" === state.resolveValue(assert("You", "has", "Intention"));
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";

            var room = state.resolveOne(assert("You", "is in"));

            // Add the room to the list of objects to inspect
            var roomName = state.resolveValue(assert(room, "has", "Name"));

            // TODO: NERFED FOR NOW... SHOULDBE REMOVED
            //prompt.option(roomName, "look " + room.id);

            //var thingsInRoom = stateHelpers.thingsInRoom(room);

            //if (thingsInRoom.length) {
            //    thingsInRoom.forEach(function (thing) {
            //        var name = state.resolveValue(assert(thing, "has", "Name"));
            //        name = name || thing.id;
            //        var Noticed = state.resolveValue(assert(thing, "is", "Noticed"));
            //        if (Noticed !== false) {
            //            prompt.option(name, "look " + thing.id);
            //        }
            //    });
            //}

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

            setDefaultOptionsHelper(prompt, true);

        };
        context.use = function(thing) {
            commands.run("look " + thing.id);
        };
        context.answer = function answer(promptLoop, option) {
            if (option) {
                if (option.value === "back") {
                    logic.routines.aboutTo("");
                } else {
                    commands.run(option.value);
                }
            }
        };

    }

    return lookPrompt;
});
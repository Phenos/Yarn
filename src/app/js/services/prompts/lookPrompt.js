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
            prompt.option(roomName, "look " + room.id);

            var thingsInRoom = stateHelpers.thingsInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);

            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var name = state.resolveValue(assert(thing, "has", "Name"));
                    var Noticed = state.resolveValue(assert(thing, "is", "Noticed"));
                    if (Noticed !== false) {
                        prompt.option(name, "look " + thing.id);
                    }
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
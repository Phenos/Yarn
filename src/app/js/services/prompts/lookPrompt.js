yarn.service("lookPrompt", function (writers,
                                     logic,
                                     commands,
                                     state,
                                     stateHelpers,
                                     setDefaultOptionsHelper) {

    function lookPrompt(context) {

        context.when = function () {
            return "look" === state.resolveValue({
                    subject: "you",
                    predicate: "has",
                    object: "intention"
                });
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";

            var room = state.resolveOne({
                subject: "You",
                predicate: "isIn"
            });

            // Add the room to the list of objects to inspect
            var roomName = state.resolveValue({
                subject: room.id,
                predicate: "has",
                object: "Name"
            });
            prompt.option(roomName, "look " + room.id);

            var thingsInRoom = stateHelpers.thingsInRoom(room);

            //console.log('thingsInRoom', thingsInRoom);

            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = state.resolveValue({
                        subject: thing.id,
                        predicate: "has",
                        object: "Name"
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
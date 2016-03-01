yarn.service("defaultPrompt", function (commands,
                                        state,
                                        stateHelpers) {

    function defaultPrompt(context) {

        context.when = function () {
            return state.step() > 0;
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do ?";

            var room = state.resolveOne({
                subject: "You",
                predicate: "isIn"
            });

            var linkedRooms = state.resolveAll({
                subject: room.id,
                predicate: "linksTo"
            });

            //console.log("linksToCurrentRoom", linksToCurrentRoom);
            if (linkedRooms.length) {
                prompt.option("Move", "aboutTo move");
            }

            // Enable the look action for if the room contains Things
            var thingsInRoom = stateHelpers.thingsInRoom(room);

            console.log("thingsInRoom", thingsInRoom);

            // Filter out things that dont have a label
            var thingsInRoomWithDescriptions = thingsInRoom.filter(function (thing) {
                var description = state.resolveOne({
                    subject: thing,
                    predicate: "isDescribedAs"
                });
                console.log("-", thing, description);
                return typeof(description) === "string";
            });
            console.log("thingsInRoomWithDescriptions", thingsInRoomWithDescriptions);

            if (thingsInRoomWithDescriptions.length) {
                prompt.option("Look", "aboutTo look");
            }

            // Enable the "take" option if there are inventory items
            // in the current room
            var inventoryInRoom = stateHelpers.inventoryInRoom(room);
            if (inventoryInRoom.length) {
                prompt.option("Take", "aboutTo take");
            }

            /*

            // Enable the "use" option if there are inventory items
            // in the current room
            var roomContents = state.resolve("You.isIn.hasInIt");
            var usableItemInCurrentRoom = state.predicate("can be used").filterThings(roomContents);
            if (usableItemInCurrentRoom.length) {
                prompt.option("Use", "aboutTo use");
            }

            // Enable the "inventory" action if the user has inventory
            var inventoryItems = state.resolve("You.hasInInventory");
            if (inventoryItems.length) {
                prompt.option("Inventory", "playerInventory");
            }
*/
        };

        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            if (option && option.value) {
                commands.command(option.value);
            }
            console.log("defaultPrompt Answer: ", option.value);
        };

    }

    return defaultPrompt;
});


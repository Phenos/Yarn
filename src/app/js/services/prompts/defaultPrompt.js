yarn.service("defaultPrompt", function (commands,
                                        state,
                                        stateHelpers) {

    function defaultPrompt(context) {

        context.when = function () {
            return state.step() > 0;
        };

        context.question = function (promptLoop, prompt) {
            var option;

            prompt.question = "What do you want to do ?";

            var room = state.resolveOne({
                subject: "You",
                predicate: "isIn"
            });

            if (room) {
                var linkedRooms = state.resolveAll({
                    subject: room.id,
                    predicate: "linksTo"
                });

                //console.log("linksToCurrentRoom", linksToCurrentRoom);
                if (linkedRooms.length) {
                    option = prompt.option("Move", "aboutTo move");
                    option.iconId = "move";
                    option.iconSize = "large";
                    option.iconOnly = true;
                }

                // Enable the look action for if the room contains Things
                var thingsInRoom = stateHelpers.thingsInRoom(room);

                // Filter out things that dont have a label
                var thingsInRoomWithDescriptions = thingsInRoom.filter(function (thing) {
                    var description = state.resolveOne({
                        subject: thing.id,
                        predicate: "isDescribedAs"
                    });
                    return typeof(description) === "string";
                });

                if (thingsInRoomWithDescriptions.length) {
                    option = prompt.option("Look", "aboutTo look");
                    option.iconId = "look";
                    option.iconSize = "large";
                    option.iconOnly = true;
                }

                // Enable the "take" option if there are inventory items
                // in the current room
                var inventoryInRoom = stateHelpers.inventoryInRoom(room);
                if (inventoryInRoom.length) {
                    option = prompt.option("Take", "aboutTo take");
                    option.iconId = "take";
                    option.iconSize = "large";
                    option.iconOnly = true;
                }

                // Enable the "use" option if there are inventory items
                // in the current room
                var usableItemInCurrentRoom = stateHelpers.usableItemInRoom(room);
                if (usableItemInCurrentRoom.length) {
                    option = prompt.option("Use", "aboutTo use");
                    option.iconId = "use";
                    option.iconSize = "large";
                    option.iconOnly = true;
                }
            }

            /*
            // Enable the "inventory" action if the user has inventory
            var inventoryItems = state.resolveAll({
                subject: "you",
                predicate: "hasInInventory"
            });

            if (inventoryItems.length) {
                prompt.option("Inventory", "playerInventory");
            }
            */
        };

        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            if (option && option.value === "aboutTo take") {
                commands.command("playerInventory");
            }
            if (option && option.value) {
                commands.command(option.value);
            }
            //console.log("defaultPrompt Answer: ", option.value);
        };

    }

    return defaultPrompt;
});


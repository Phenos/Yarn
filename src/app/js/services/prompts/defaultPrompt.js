yarn.service("defaultPrompt", function (commands,
                                        state) {

    function defaultPrompt(context) {

        context.when = function () {
            return state.step() > 0;
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do ?";

            // Enable the move action if there are places to move to
            var linksToCurrentRoom = state.resolve("You.isIn.linksTo");
            //console.log("linksToCurrentRoom", linksToCurrentRoom);
            if (linksToCurrentRoom.length) {
                prompt.option("Move", "aboutTo move");
            }

            // Enable the look action for if the room contains objects
            // with descriptions
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            //console.log("thingsInRoom", thingsInRoom);
            var thingsInRoomWithDescriptions = state.predicate("isDescribedAs").filterThings(thingsInRoom);
            if (thingsInRoomWithDescriptions.length) {
                prompt.option("Look", "aboutTo look");
            }

            // Fetch room contents for Look and Use
            var roomContents = state.resolve("You.isIn.hasInIt");

            // Enable the "take" option if there are inventory items
            // in the current room
            var inventoryInCurrentRoom = state.predicate("isA").filterThings(roomContents, state.thing("InventoryItem"));
            if (inventoryInCurrentRoom.length) {
                prompt.option("Take", "aboutTo take");
            }

            // Enable the "use" option if there are inventory items
            // in the current room
            var usableItemInCurrentRoom = state.predicate("can be used").filterThings(roomContents);
            if (usableItemInCurrentRoom.length) {
                prompt.option("Use", "aboutTo use");
            }

            // Enable the "inventory" action if the user has inventory
            var inventoryItems = state.resolve("You.hasInInventory");
            if (inventoryItems.length) {
                prompt.option("Inventory", "playerInventory");
            }
        };

        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            if (option && option.value) {
                commands.command(option.value);
            }
        };

    }

    return defaultPrompt;
});


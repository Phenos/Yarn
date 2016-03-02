yarn.service("setDefaultOptionsHelper", function (state,
                                                  stateHelpers) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "large";
        if (isSmall) size = "";

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
                option.iconSize = size;
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
                option.iconSize = size;
                option.iconOnly = true;
            }

            // Enable the "take" option if there are inventory items
            // in the current room
            var inventoryInRoom = stateHelpers.inventoryInRoom(room);
            // Enable the "inventory" action if the user has inventory
            var inventoryItems = state.resolveAll({
                subject: "you",
                predicate: "hasInInventory"
            });

            if (inventoryItems.length || inventoryInRoom.length) {
                option = prompt.option("Take", "aboutTo take");
                option.iconId = "take";
                option.iconSize = size;
                option.iconOnly = true;
            }

            // Enable the "use" option if there are inventory items
            // in the current room
            var usableItemInCurrentRoom = stateHelpers.usableItemInRoom(room);
            if (usableItemInCurrentRoom.length) {
                option = prompt.option("Use", "aboutTo use");
                option.iconId = "use";
                option.iconSize = size;
                option.iconOnly = true;
            }



        }

    }

});
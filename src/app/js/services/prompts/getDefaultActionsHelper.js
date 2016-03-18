yarn.service("setDefaultOptionsHelper", function (state,
                                                  assert,
                                                  stateHelpers) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "large";
        if (isSmall) size = "";

        var room = state.resolveOne(assert("You", "is in"));

        if (room) {
            var linkedRooms = state.resolveAll(assert(room, "links to"));

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
                var description = state.resolveValue(assert(thing, "has", "Description"));
                return typeof(description) === "string";
            });


            var roomName = state.resolveValue(assert(room, "has", "Name"));
            if (thingsInRoomWithDescriptions.length || roomName) {
                option = prompt.option("Look", "aboutTo look");
                option.iconId = "look";
                option.iconSize = size;
                option.iconOnly = true;
            }

            // Enable the "take" option if there are inventory items
            // in the current room
            var inventoryInRoom = stateHelpers.inventoryInRoom(room);
            // Enable the "inventory" action if the user has inventory
            var inventoryItems = state.resolveAll(assert(undefined, "is in", "YourInventory"));

            if (inventoryItems.length || inventoryInRoom.length) {
                option = prompt.option("Inventory", "aboutTo inventory");
                option.iconId = "inventory";
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

            option = prompt.option("Hint?", "hint");
            option.iconId = "question-mark";
            option.iconSize = "mini";
            option.iconOnly = true;

        }

    }

});
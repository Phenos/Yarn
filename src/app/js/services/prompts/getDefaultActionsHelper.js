yarn.service("setDefaultOptionsHelper", function (state,
                                                  assert,
                                                  stateHelpers) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "large";
        if (isSmall) size = "";
        var allowedActions = {};

        var room = state.one("You is in *");
        var roomIsRestricted = state.value("Room is Restricted", {Room: room});

        if (roomIsRestricted) {
            allowedActions = {
                "move": state.value("Room allows Move", {Room: room}),
                "look": state.value("Room allows Look", {Room: room}),
                "inventory": state.value("Room allows Inventory", {Room: room}),
                "use": state.value("Room allows Use", {Room: room}),
                "hint": state.value("Room allows Hint", {Room: room})
            }

        }

        if (room) {
            var doorsInRoom = stateHelpers.doorsInRoom(room);

            if (!(roomIsRestricted && !allowedActions.move)) {
                //console.log("linksToCurrentRoom", linksToCurrentRoom);
                if (doorsInRoom.length) {
                    option = prompt.option("Move", "aboutTo move");
                    option.iconId = "move";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            if (!(roomIsRestricted && !allowedActions.look)) {
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
            }

            // Enable the "take" option if there are inventory items
            // in the current room
            if (!(roomIsRestricted && !allowedActions.inventory)) {
                var inventoryInRoom = stateHelpers.inventoryInRoom(room);
                // Enable the "inventory" action if the user has inventory
                var inventoryItems = state.resolveAll(assert(undefined, "is in", "YourInventory"));

                if (inventoryItems.length || inventoryInRoom.length) {
                    option = prompt.option("Inventory", "aboutTo inventory");
                    option.iconId = "inventory";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            // Enable the "use" option if there are inventory items
            // in the current room
            if (!(roomIsRestricted && !allowedActions.use)) {
                var usableItemInCurrentRoom = stateHelpers.usableItemInRoom(room);
                var usableItemInInventory = stateHelpers.usableItemInRoom("YourInventory");
                if (usableItemInCurrentRoom.length || usableItemInInventory.length) {
                    option = prompt.option("Use", "aboutTo use");
                    option.iconId = "use";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            if (!(roomIsRestricted && !allowedActions.hint)) {
                option = prompt.option("Hint?", "hint");
                option.iconId = "question-mark";
                option.iconSize = "mini";
                option.iconOnly = true;
            }

        }

    }

});
yarn.service("setDefaultOptionsHelper", function (state,
                                                  assert,
                                                  stateHelpers) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "large";
        if (isSmall) size = "";
        var allowedActions = {};

        var space = state.one("You is in *");
        var spaceIsRestricted = state.value("Space is Restricted", {Space: space});

        if (spaceIsRestricted) {
            allowedActions = {
                "move": state.value("Space allows Move", {Space: space}),
                "look": state.value("Space allows Look", {Space: space}),
                "inventory": state.value("Space allows Inventory", {Space: space}),
                "use": state.value("Space allows Use", {Space: space}),
                "hint": state.value("Space allows Hint", {Space: space})
            }

        }

        if (space) {
            var doorsInSpace = stateHelpers.doorsInRoom(space);

            if (!(spaceIsRestricted && !allowedActions.move)) {
                //console.log("linksToCurrentRoom", linksToCurrentRoom);
                if (doorsInSpace.length) {
                    option = prompt.option("Move", "aboutTo move");
                    option.iconId = "move";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            if (!(spaceIsRestricted && !allowedActions.look)) {
                // Enable the look action for if the room contains Things
                var thingsInSpace = stateHelpers.thingsInRoom(space);
                // Filter out things that dont have a label
                var thingsInSpaceWithDescriptions = thingsInSpace.filter(function (thing) {
                    var description = state.resolveValue(assert(thing, "has", "Description"));
                    return typeof(description) === "string";
                });

                var spaceName = state.resolveValue(assert(space, "has", "Name"));
                if (thingsInSpaceWithDescriptions.length || spaceName) {
                    option = prompt.option("Look", "aboutTo look");
                    option.iconId = "look";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            // Enable the "take" option if there are inventory items
            // in the current room
            if (!(spaceIsRestricted && !allowedActions.inventory)) {
                var inventoryInSpace = stateHelpers.inventoryInRoom(space);
                // Enable the "inventory" action if the user has inventory
                var inventoryItems = state.resolveAll(assert(undefined, "is in", "YourInventory"));

                if (inventoryItems.length || inventoryInSpace.length) {
                    option = prompt.option("Inventory", "aboutTo inventory");
                    option.iconId = "inventory";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            // Enable the "use" option if there are inventory items
            // in the current room
            if (!(spaceIsRestricted && !allowedActions.use)) {
                var usableItemInCurrentSpace = stateHelpers.usableItemInRoom(space);
                var usableItemInInventory = stateHelpers.usableItemInRoom("YourInventory");
                if (usableItemInCurrentSpace.length || usableItemInInventory.length) {
                    option = prompt.option("Use", "aboutTo use");
                    option.iconId = "use";
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            }

            if (!(spaceIsRestricted && !allowedActions.hint)) {
                option = prompt.option("Hint?", "hint");
                option.iconId = "question-mark";
                option.iconSize = "mini";
                option.iconOnly = true;
            }

        }

    }

});
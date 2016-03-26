yarn.service("setDefaultOptionsHelper", function (state,
                                                  assert,
                                                  stateHelpers) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "large";
        if (isSmall) size = "";
        var allowedActions = {};

        var space = state.one("You is in *");

        var scope = {
            Space: space
        };

        // If the space is restricted, build a list of allowed actions
        var spaceIsRestricted = state.value("Space is Restricted", scope);
        if (spaceIsRestricted) {
            var allowedActionsObjs = state.many("Space allows *", scope);

            angular.forEach(allowedActionsObjs, function (obj) {
                allowedActions[obj.id] = obj;
            });
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


            // Add custom actions
            var customActions = state.many("* is an Action");
            angular.forEach(customActions, function (action) {
                if (!(spaceIsRestricted && !allowedActions[action.id])) {

                    var icon = state.value("Action has Icon", { Action: action });
                    var name = state.value("Action has Name", { Action: action });
                    option = prompt.option(name, "do " + action.id);
                    option.iconId = icon;
                    option.iconSize = size;
                    option.iconOnly = true;
                }
            });



            if (!(spaceIsRestricted && !allowedActions.hint)) {
                option = prompt.option("Hint?", "hint");
                option.iconId = "question-mark";
                option.iconSize = "mini";
                option.iconOnly = true;
            }

        }

    }

});
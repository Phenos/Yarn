yarn.service("lookAtUsablesRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            stateHelpers,
                                            stepRoutine) {

    return function lookAtUsablesRoutine() {
        var phrase = [];

        storyLog.action("You look at what you can use...");

        var defaultText = state.resolveValue(assert("Default", "for", "NothingToUse"));
        defaultText = defaultText || "You dont see anything that can be used.";

        var room = state.resolveOne(assert("Player", "is in"));

        var usableItemsInCurrentRoom = stateHelpers.usableItemInRoom(room);
        var usableItemsInInventory = stateHelpers.usableItemInRoom("YourInventory");

        if (room) {
            if (usableItemsInCurrentRoom.length) {
                phrase.push("Around you can use the ");
                angular.forEach(usableItemsInCurrentRoom, function (thing, index) {
                    var doorName = state.resolveValue(assert(thing, "has", "Name"));
                    doorName = doorName || thing.id;
                    var replacement = "[" + doorName + "::" + thing.id + "]";
                    phrase.push(replacement);
                    if (index === usableItemsInCurrentRoom.length - 1) {
                        phrase.push(".")
                    } else if (index === usableItemsInCurrentRoom.length - 2) {
                        phrase.push(" and the ");
                    } else {
                        phrase.push(", ")
                    }
                });
            }
            if (usableItemsInInventory.length) {
                phrase.push("In your inventory you can use the ");
                angular.forEach(usableItemsInInventory, function (thing, index) {
                    var doorName = state.resolveValue(assert(thing, "has", "Name"));
                    doorName = doorName || thing.id;
                    var replacement = "[" + doorName + "::" + thing.id + "]";
                    phrase.push(replacement);
                    if (index === usableItemsInInventory.length - 1) {
                        phrase.push(".")
                    } else if (index === usableItemsInInventory.length - 2) {
                        phrase.push(" and the ");
                    } else {
                        phrase.push(", ")
                    }
                });
            }


            if (usableItemsInCurrentRoom.length === 0 && usableItemsInInventory.length === 0) {
                phrase.push(defaultText);
            }

            storyLog.log(phrase.join(""));

        } else {

            storyLog.log(defaultText);

        }

        events.trigger(assert("Player", "have looked at", "Doors"));

        return true;
    };

});



yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      things,
                                      storyLog,
                                      stepRoutine) {

    function moveRoutine(door) {
        // Get the current room
        var previousRoom = state.resolveOne(assert("You", "is in"));

        if (door) {
            var linkedRoom = state.resolveOne(assert(door, "links to"));
            var triggeredObjects = state.resolveAll(assert(door, "triggers"));


            angular.forEach(triggeredObjects, function (object) {
                events.triggerNow(object)
            });

            if (linkedRoom) {
                // If a triggered event already moved the player elsewhere
                // the default move doesnt occur
                // Get the current room
                var currentRoom = state.resolveOne(assert("You", "is in"));
                if (previousRoom === currentRoom) {
                    // Remove player from current possition
                    state.negate(assert("you", "is in"));
                    // Place the player in the new room
                    state.createAssertion(things.get("You"), predicates("isIn"), linkedRoom, {
                        layer: state.currentLayer
                    });

                    var roomName = state.resolveValue(assert(currentRoom, "has", "Name"));
                    storyLog.action("You move thoward the " + roomName);
                    events.trigger(assert("You", "entered", currentRoom));
                }
            }

            events.trigger(assert("You", "exited", previousRoom));

            stepRoutine();
        }

        return true;
    }

    return moveRoutine;

});


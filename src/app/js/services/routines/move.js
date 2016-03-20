yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      things,
                                      storyLog,
                                      stepRoutine) {

    function moveRoutine(fromRoom, door) {
        if (fromRoom && door) {
            var linkedRoom = state.resolveOne(assert(door, "links to"));
            var triggeredObjects = state.resolveAll(assert(door, "triggers"));


            angular.forEach(triggeredObjects, function (object) {
                events.triggerNow(object)
            });

            if (linkedRoom) {
                // Get the current room
                var previousRoom = state.resolveOne(assert("You", "is in"));
                // If a triggered event already moved the player elsewhere
                // the default move doesnt occur
                if (previousRoom === fromRoom) {
                    // Remove player from current possition
                    state.negate(assert("you", "is in"));
                    // Place the player in the new room
                    state.createAssertion(things.get("You"), predicates("isIn"), linkedRoom, {
                        layer: state.currentLayer
                    });

                    var roomName = state.resolveValue(assert(room, "has", "Name"));
                    storyLog.action("You move thoward the " + roomName);
                    events.trigger(assert("You", "entered", room));
                }
            }

            events.trigger(assert("You", "exited", fromRoom));

            stepRoutine();
        }

        return true;
    }

    return moveRoutine;

});


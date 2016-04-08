yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      things,
                                      storyLog,
                                      stepRoutine) {

    // Process movement triggered by creating an assertion
    events.on("Player move to *", "move", function () {
        var MoveTo = state.many("Player move to *");
        state.negate(assert("Player", "move to"));
        //console.log("MoveTo", MoveTo);
        if (MoveTo) {
            MoveTo = MoveTo[MoveTo.length - 1];
            moveRoutine(MoveTo);
        }
    });


    function moveRoutine(doorOrSpace) {
        // Get the current room
        var door = doorOrSpace;
        var linkedSpace = doorOrSpace;
        var previousRoom = state.resolveOne(assert("Player", "is in"));

        if (doorOrSpace) {

            var isExit = state.value("Object is Exit", {Object: doorOrSpace});

            if (isExit) {
                linkedSpace = state.resolveOne(assert(door, "links to"));
                var triggeredObjects = state.resolveAll(assert(door, "triggers"));
                angular.forEach(triggeredObjects, function (object) {
                    //todo: figure out if this should REALLY be triggered now...
                    events.triggerNow(object)
                });
            }

            // TODO: Should verify is the linkedSpace object is indeed a space a raise error if not

            if (linkedSpace) {
                // If a triggered event already moved the player elsewhere
                // the default move doesnt occur
                // Get the current space
                var currentSpace = state.resolveOne(assert("Player", "is in"));
                if (previousRoom === currentSpace) {
                    // Remove player from current possition
                    state.negate(assert("Player", "is in"));
                    // Place the player in the new space
                    state.createAssertion(things.get("Player"), predicates("isIn"), linkedSpace, {
                        layer: state.currentLayer
                    });

                    var spaceName = state.resolveValue(assert(linkedSpace, "has", "Name"));
                    storyLog.action("You move thoward the " + spaceName);
                    events.trigger(assert("Player", "entered", linkedSpace));
                    events.trigger(assert("Player", "did", "LookAround"));
                }
            }

            events.trigger(assert("Player", "exited", previousRoom));
        }

        return true;
    }

    return moveRoutine;

});


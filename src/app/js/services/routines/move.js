yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      things,
                                      stepRoutine) {

    function moveRoutine(room) {
        if (room) {
            // Get the current room
            var previousRoom = state.resolveOne(assert("You", "is in"));
            // Remove player from current possition
            state.negate(assert("you", "is in"));
            // Place the player in the new room
            state.createAssertion(things("You"), predicates("isIn"), room, {
                layer: state.currentLayer
            });
        }

        events.trigger(assert("You", "entered", room));
        events.trigger(assert("You", "exited", previousRoom));

        stepRoutine();

        return true;
    }

    return moveRoutine;

});


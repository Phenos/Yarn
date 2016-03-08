yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      things,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = predicates("isIn");
        var you = things("You");
        if (room) {

            // Remove player from current possition

            state.negate(assert("you", "is in"));

            //state.negate("You is in");

            state.createAssertion(you, isIn, room, {
                layer: state.currentLayer
            });

            //state.createAssertion("You is in " + room.id, {
            //    layer: state.currentLayer
            //});
        }

        events.trigger(assert("You", "move to", room));

        stepRoutine();

        return true;
    }

    return moveRoutine;

});


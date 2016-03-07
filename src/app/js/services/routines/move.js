yarn.service("moveRoutine", function (state,
                                      events,
                                      assert,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = state.predicate("isIn");
        var you = state.thing("You");
        if (room) {

            // Remove player from current possition

            state.negate({
                subject: "You",
                predicate: "isIn"
            });

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


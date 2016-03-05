yarn.service("moveRoutine", function (state,
                                      events,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = state.predicate("isIn");
        var you = state.thing("You");
        if (room) {

            // Remove player from current possition
            state.negate2({
                subject: "You",
                predicate: "isIn"
            });

            state.createAssertion(you, isIn, room, {
                layer: state.currentLayer
            });
        }

        var movesTo = state.predicate("movesTo");
        events.trigger(you, movesTo, room);

        stepRoutine();

        return true;
    }

    return moveRoutine;

});


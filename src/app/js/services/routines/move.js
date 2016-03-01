yarn.service("moveRoutine", function (state,
                                      events,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = state.predicate("isIn");
        var you = state.thing("You");
        if (room) {
            // Remove current position



            //var currentIsIn = state.assertions.find({
            //    subject: you,
            //    predicate: isIn,
            //    layer: state.currentLayer,
            //    parent: null
            //});
            //state.assertions.remove(currentIsIn);

            console.log("room-----", room);
            state.createAssertion(you, isIn, room, {
                layer: state.currentLayer
            });
        }
        // TODO : Trigger movesFrom
        var movesTo = state.predicate("movesTo");
        events.trigger(you, movesTo, room);
        stepRoutine();

        return true;
    }

    return moveRoutine;

});


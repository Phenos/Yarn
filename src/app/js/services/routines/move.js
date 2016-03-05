yarn.service("moveRoutine", function (state,
                                      events,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = state.predicate("isIn");
        var you = state.thing("You");
        if (room) {

            // Remove current position
            var currentIsIn = state.assertions.find({
                subject: "You",
                predicate: "isIn",
                layer: state.currentLayer,
                parent: null
            });
            console.log("REMVOVING: currentIsIn : ", currentIsIn);
            state.assertions.remove(currentIsIn);

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


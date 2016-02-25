yarn.service("moveRoutine", function (state,
                                      events,
                                      stepRoutine) {

    function moveRoutine(room) {
        var isIn = state.predicate("isIn");
        var you = state.thing("You");
        if (room) {
            you.removeAssertions(isIn);
            you.setAssertion(isIn, room);
        }
        // TODO : Trigger movesFrom
        var movesTo = state.predicate("movesTo");
        events.trigger(you, movesTo, room);
        stepRoutine();

        return true;
    }

    return moveRoutine;

});


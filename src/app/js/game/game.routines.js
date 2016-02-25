yarn.service('gameRoutines', function (state,
                                       logic,
                                       events) {

    return function () {

        // todo: TAKE and LOOK should be here also ?

        // Move the player to another room
        logic.register("move", move);
        function move(room) {
            var isIn = state.predicate("isIn");
            var you = state.thing("You");
            if (room) {
                you.removeAssertions(isIn);
                you.setAssertion(isIn, room);
            }
            // TODO : Trigger movesFrom
            var movesTo = state.predicate("movesTo");
            events.trigger(you, movesTo, room);
            step();

            return true;
        }

        logic.register("use", function use(object) {
            // todo: first test if the object is usable
            var subject = state.thing("You");
            var use = state.predicate("use");
            events.trigger(subject, use, object);
            step();

            return true;
        });


    }

});

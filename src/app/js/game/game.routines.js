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


        // Set what action the player is "about to do"
        logic.register("aboutTo", aboutTo);
        function aboutTo(aboutToId) {
            var isAboutTo = state.predicate("isAboutTo");
            if (aboutToId) {
                state.thing("You").setAssertion(isAboutTo, state.thing(aboutToId));
                //console.log("ABOUT TO >> ", aboutTo);
            } else {
                state.negate(
                    state.thing("You").getAssertion(isAboutTo)
                );
                //console.log("CLEARED ABOUT TO !!! ");
            }
            return true;
        }

        /**
         * Increment the game session step counter
         */
            // todo: get rid of the register and instead use dependency injection
        logic.register("step", step);
        function step() {
            state.step(1);
            events.process();
            return true;
        }

    }

});

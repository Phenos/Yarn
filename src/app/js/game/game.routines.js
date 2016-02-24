"use strict";
yarn.factory('gameRoutines', function (logic,
                                       events) {

    return function gameRoutines(game) {
        var state = game.state;

        // Move the player to another room
        logic.register("move", move);
        function move(roomId) {
            var room = state.thing(roomId);
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
            return room;
        }

        // Set what action the player is "about to do"
        logic.register("aboutTo", aboutTo);
        function aboutTo(aboutToId) {
            var isAboutTo = state.predicate("isAboutTo");
            if (aboutToId) {
                state.thing("You").setAssertion(isAboutTo, aboutToId);
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
        logic.register("step", step);
        function step() {
            var story = game.state.thing("story");
            var count = game.step(1);
            var hasStepped = game.state.predicate("hasStepped");
            events.trigger(story, hasStepped, count);
            return true;
        }

    }

});

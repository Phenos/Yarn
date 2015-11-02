"use strict";
angular.module('mindgame').factory('gameRoutines', function() {
    return gameRoutines;
});

function gameRoutines(game) {

    // Move the player to another room
    game.logic.register("move", move);
    function move(roomId) {
        var room = game.state.thing(roomId);
        var isIn = game.state.predicate("isIn");
        var you = game.state.thing("You");
        if (room) {
            you
                .removeAssertions(isIn)
                .setAssertion(isIn, room);
        }
        // TODO : Trigger movesFrom
        game.logic.trigger(you, "movesTo", room);
        return room;
    }

    // Set what action the player is "about to do"
    game.logic.register("aboutTo", aboutTo);
    function aboutTo(aboutToId) {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").removeAssertions(isAboutTo);
        if (aboutToId) {
            game.state.thing("You").setAssertion(isAboutTo, aboutToId);
        }
        return true;
    }

}

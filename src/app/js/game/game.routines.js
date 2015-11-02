"use strict";
angular.module('mindgame').factory('gameRoutines', function() {
    return gameRoutines;
});

function gameRoutines(game) {

    // Move the player to another room
    game.logic.register("move", move);
    function move(roomId) {
        var room = this.state.thing(roomId);
        var isIn = this.state.predicate("isIn");
        if (room) {
            this.state.thing("You")
                .removeAssertions(isIn)
                .setAssertion(isIn, room);
        }
        return room;
    }

    // Set what action the player is "about to do"
    game.logic.register("aboutTo", aboutTo);
    function aboutTo(aboutToId) {
        var isAboutTo = this.state.predicate("isAboutTo");
        this.state.thing("You").removeAssertions(isAboutTo);
        if (aboutToId) {
            this.state.thing("You").setAssertion(isAboutTo, aboutToId);
        }
        return true;
    }

}

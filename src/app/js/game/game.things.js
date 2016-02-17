"use strict";
angular.module('yarn').factory('gameThings', function() {
    return gameThings;
});

function gameThings(game) {
    // Player
    game.state
        .thing("player");

    // Persons
    game.state
        .thing("person");

    // Places
    game.state
        .thing("room");

    // Objects (as in "object" in the game)
    game.state
        .thing("object");
}

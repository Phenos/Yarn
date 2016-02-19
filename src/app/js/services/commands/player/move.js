angular.module('yarn').factory('movePlayerCommand', movePlayerCommand);

function movePlayerCommand(game) {

    return function moveCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("move"));
    }

}
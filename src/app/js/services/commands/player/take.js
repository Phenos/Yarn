angular.module('yarn').factory('takePlayerCommand', takePlayerCommand);

function takePlayerCommand(game) {

    return function takeCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("take"));
    }

}
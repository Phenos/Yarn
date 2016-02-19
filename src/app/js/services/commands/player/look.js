angular.module('yarn').factory('lookPlayerCommand', lookPlayerCommand);

function lookPlayerCommand(game) {

    return function () {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("look"));
    }

}
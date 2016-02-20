angular.module('yarn').factory('movePlayerCommand', movePlayerCommand);

function movePlayerCommand(game) {

    function handler() {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("move"));
    }

    return {
        name: "playerMove",
        shortDescription: "Trigger the player's <strong>move</strong> command",
        longDescription:
        "Trigger the player's <strong>move</strong> command. Same as if the player had" +
        "click the <strong>move</strong> button.<br/>",
        handler: handler
    };

}
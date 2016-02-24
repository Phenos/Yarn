yarn.factory('takePlayerCommand', takePlayerCommand);

function takePlayerCommand(game,
                           promptLoop) {

    function handler() {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("take"));
        promptLoop.update();
    }

    return {
        name: "playerTake",
        shortDescription: "Trigger the player's <strong>take</strong> command",
        longDescription:
        "Trigger the player's <strong>take</strong> command. Same as if the player had" +
        "click the <strong>take</strong> button.<br/>",
        handler: handler
    };

}
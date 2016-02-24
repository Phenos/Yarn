yarn.factory('lookPlayerCommand', lookPlayerCommand);

function lookPlayerCommand(game,
                           promptLoop) {

    function handler() {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").setAssertion(isAboutTo, game.state.thing("look"));
        promptLoop.update();
    }

    return {
        name: "playerLook",
        shortDescription: "Trigger the player's <strong>look</strong> command",
        longDescription:
        "Trigger the player's <strong>look</strong> command. Same as if the player had" +
        "click the <strong>look</strong> button.<br/>",
        handler: handler
    };

}
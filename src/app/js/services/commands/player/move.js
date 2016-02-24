yarn.factory('movePlayerCommand', movePlayerCommand);

function movePlayerCommand(state,
                           promptLoop) {

    function handler() {
        var isAboutTo = state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, state.thing("move"));
        promptLoop.update();
    }

    return {
        name: "playerMove",
        shortDescription: "Trigger the player's <strong>move</strong> command",
        longDescription: "Trigger the player's <strong>move</strong> command. Same as if the player had" +
        "click the <strong>move</strong> button.<br/>",
        handler: handler
    };

}
angular.module('yarn').factory('stateCommand', stateCommand);

function stateCommand(yConsole,
                      game) {

    function handler() {
        var html = game.state.html();
        yConsole.debug("Outputing current game state:");
        yConsole.debug(html);
    }

    return {
        name: "state",
        shortDescription: "Show the current game state as a list of assertions",
        longDescription: "Show the current game state as a list of assertions",
        handler: handler
    };

}
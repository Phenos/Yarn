angular.module('yarn').factory('stateCommand', stateCommand);

function stateCommand(yConsole,
                      game) {

    return function stateCommand() {
        var html = game.state.html();
        yConsole.debug("Outputing current game state:");
        yConsole.debug(html);
    }

}
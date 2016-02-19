angular.module('yarn').factory('tokensCommand', tokensCommand);

function tokensCommand(yConsole,
                       game) {

    return function tokensCommand() {
        var html = game.scripts[0].pointer.html();
        yConsole.debug("Outputing script parsing:");
        yConsole.debug(html);
    }

}
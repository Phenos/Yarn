angular.module('yarn').factory('treeCommand', treeCommand);

function treeCommand(yConsole,
                     game) {

    return function treeCommand() {
        var html = game.scripts[0].ast.html();
        yConsole.debug("Outputing execution tree:");
        yConsole.debug(html);
    }

}
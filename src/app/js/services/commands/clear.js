angular.module('yarn').factory('clearCommand', clearCommand);

function clearCommand(yConsole,
                      game) {

    function handler(command, args) {
        yConsole.log("Clearing...");
        console.log(game.state);
    }

    return {
        name: "clear",
        shortDescription: "Clear game state, save games or other such data.",
        longDescription: "By using the clear command you can clear various types of data which has been sored.<br/>" +
        "by either the compiler, the game events or the player.<br/>" +
        "Ex.: <strong>clear session</strong> (will clear the current game session)",
        handler: handler
    };

}
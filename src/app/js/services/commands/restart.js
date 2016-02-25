yarn.factory('restartCommand', restartCommand);

function restartCommand(yConsole,
                        state,
                        player) {

    function handler() {
        state.removeAssertionsLayer('session');
        player.update();
        yConsole.success("Story restarted");
    }

    return {
        name: "restart",
        shortDescription: "Clear the game session and restart the story.",
        longDescription: "Clear the game session and restart the story.",
        handler: handler
    };

}

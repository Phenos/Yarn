yarn.factory('restartCommand', restartCommand);

function restartCommand(commands,
                        yConsole,
                        state,
                        player) {

    function handler() {
        commands.command("clear session");
        commands.command("clear localstorage");
        state.assertions.removeLayer('session');
        player.refresh();
        yConsole.success("Story restarted");
    }

    return {
        name: "restart",
        shortDescription: "Clear the game session and restart the story.",
        longDescription: "Clear the game session and restart the story.",
        handler: handler
    };

}

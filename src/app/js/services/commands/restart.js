yarn.factory('restartCommand', restartCommand);

function restartCommand(yConsole, game, gameService) {

    function handler() {
        game.state.removeAssertionsLayer('session');
        gameService.updateStoryLog();
        yConsole.success("Story restarted");
    }

    return {
        name: "restart",
        shortDescription: "Clear the game session and restart the story.",
        longDescription: "Clear the game session and restart the story.",
        handler: handler
    };

}

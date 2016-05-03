yarn.factory('restartCommand', restartCommand);

function restartCommand(commands,
                        yConsole,
                        state,
                        player,
                        transcript,
                        synonyms,
                        statuses) {

    function handler() {
        commands.run("clear session");
        commands.run("clear localstorage");
        state.assertions.removeLayer('session');

        /*
         Refresh the list of Statuses and Synonyms, in case they changed during game play
         */
        //TODO: Those two updates should be extracted in a global behavior
        // They are repeated too ofter
        // TODO: Dont inject state as argument
        synonyms.update(state);
        statuses.update(state);

        transcript.clear();
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

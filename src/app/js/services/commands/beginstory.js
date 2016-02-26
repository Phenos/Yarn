yarn.factory('beginStoryCommand', beginStoryCommand);

function beginStoryCommand(yConsole,
                           logic,
                           writers) {

    function handler() {
        logic.routines.step();
        writers.describeWhereYouAre(true);
        yConsole.log("First step taken");
    }

    return {
        name: "beginstory",
        shortDescription: "Begin the story",
        longDescription: "Begin the story by taking the first game step, thus leaving the coverpage.",
        handler: handler
    };

}
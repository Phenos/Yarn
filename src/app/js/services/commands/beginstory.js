yarn.factory('beginStoryCommand', beginStoryCommand);

function beginStoryCommand(yConsole,
                           game,
                           writers) {

    function handler() {
        game.logic.routines.step();
        writers.DescribeWhereYouAre(true);
        yConsole.log("First step taken");
    }

    return {
        name: "beginstory",
        shortDescription: "Begin the story",
        longDescription: "Begin the story by taking the first game step, thus leaving the coverpage.",
        handler: handler
    };

}
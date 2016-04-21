yarn.service('beginStoryCommand', beginStoryCommand);

function beginStoryCommand(yConsole,
                           logic,
                           step,
                           events,
                           assert) {

    function handler() {
        events.trigger(assert("Story", "did", "Begin"));
        step.run(function () {
            yConsole.log("Beginning the story!");
        });
    }

    return {
        name: "beginstory",
        shortDescription: "Begin the story",
        longDescription: "Begin the story by taking the first " +
            "game step, thus leaving the coverpage.",
        handler: handler
    };

}
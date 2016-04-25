yarn.service('creditsCommand', function (state,
                                         assert,
                                         yConsole,
                                         storyLog) {

    function handler() {
        var credits = state.resolveValue(assert("Story", "has", "Credits"));
        storyLog.heading("Credits");
        storyLog.log(credits);
    }

    return {
        name: "credits",
        shortDescription: "Show the credits.",
        longDescription: 'Show the credits.',
        handler: handler
    };

});


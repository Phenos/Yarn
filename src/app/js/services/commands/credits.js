yarn.service('creditsCommand', function (state,
                                         assert,
                                         yConsole,
                                         transcript) {

    function handler() {
        var credits = state.resolveValue(assert("Story", "has", "Credits"));
        transcript.heading("Credits");
        transcript.log(credits);
    }

    return {
        name: "credits",
        shortDescription: "Show the credits.",
        longDescription: 'Show the credits.',
        handler: handler
    };

});


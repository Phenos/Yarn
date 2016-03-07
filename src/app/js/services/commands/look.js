yarn.factory('lookCommand', function (yConsole,
                                      events,
                                      state,
                                      logic,
                                      writers,
                                      storyLog) {

    function handler(args) {
        if (args.length) {
            var object = state.thing(args[0], true);
            if (object) {
                writers.describeThing(object);
            } else {
                yConsole.error("Could not find this thing to look at : " + args[0]);
            }
            storyLog.flushBuffers();
        } else {
            yConsole.tip("You must provide an object name as the first argument.");
        }
    }

    return {
        name: "look",
        shortDescription: "The player looks at an object.",
        longDescription: 'The player looks at an object.',
        handler: handler
    };

});


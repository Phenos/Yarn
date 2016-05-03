yarn.factory('lookCommand', function (yConsole,
                                      events,
                                      things,
                                      logic,
                                      lookRoutine,
                                      transcript) {

    function handler(args) {
        if (args.length) {
            var object = things.get(args[0], true);
            if (object) {
                lookRoutine(object);
            } else {
                yConsole.error("Could not find this thing to look at : " + args[0]);
            }
            transcript.flushBuffers();
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


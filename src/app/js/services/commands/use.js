yarn.factory('useCommand', function (yConsole,
                                     events,
                                     things,
                                     logic,
                                     storyLog,
                                     writers) {

    function handler(args) {
        if (args.length) {
            var object = things.get(args[0], true);
            if (object) {
                var somethingHappened = logic.routines.use(object);
                //console.log("somethingHappened", somethingHappened);
                if (!somethingHappened) {
                    writers.nothingHappened(true)
                }
                storyLog.flushBuffers();
            } else {
                yConsole.error("Could not find an object called : " + args[0]);
            }
        } else {
            yConsole.tip("You must provide a subject as the first argument.");
        }
    }

    return {
        name: "use",
        shortDescription: "The player uses an object",
        longDescription: 'The player uses an object. This action is similar to using the' +
        '"use", but from the commandLine the object doesnt need to be reachable.',
        handler: handler
    };

});


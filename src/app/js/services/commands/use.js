yarn.factory('useCommand', function (yConsole,
                                     events,
                                     state,
                                     logic,
                                     storyLog,
                                     writers) {

    function handler(args) {
        if (args.length) {
            var object = state.thing(args[0], true);
            if (object) {
                var somethingHappened = logic.routines.use(object);
                //console.log("somethingHappened", somethingHappened);
                if (!somethingHappened) {
                    writers.nothingHappened(true)
                }
                storyLog.flushBuffers();
            } else {
                yConsole.error("Could not find an object called : " + args[0]);
                // todo: In the tip, list the objects that can be used in the room
            }
        } else {
            yConsole.tip("You must provide a subject as the first argument.");
            // todo: In the tip, list the objects that can be used in the room
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


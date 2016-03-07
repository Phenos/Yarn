yarn.factory('takeCommand', function (yConsole,
                                     events,
                                     state,
                                     logic) {

    function handler(args) {
        if (args.length) {
            var object = state.thing(args[0], true);
            if (object) {
                logic.routines.take(object);
                storyLog.flushBuffers();
            } else {
                yConsole.error("Could not find any object called : " + args[0]);
            }
        } else {
            yConsole.tip("You must provide an object name as the first argument.");
        }
    }

    return {
        name: "take",
        shortDescription: "Take an object in inventory.",
        longDescription: 'Take an object in inventory.',
        handler: handler
    };

});


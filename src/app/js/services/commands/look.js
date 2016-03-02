yarn.factory('lookCommand', function (yConsole,
                                     events,
                                     state,
                                     logic,
                                     writers) {

    function handler(args) {
        if (args.length) {
            var object = state.thing(args[0], true);
            if (object) {
                writers.describeThing(object);
            } else {
                yConsole.error("Could not find this thing to look at : " + args[0]);
                // todo: In the tip, list the objects that can be used in the room
            }
        } else {
            yConsole.tip("You must provide an object name as the first argument.");
            // todo: In the tip, list the room that can be used or that are
            // accessible from the current location
        }
    }

    return {
        name: "look",
        shortDescription: "The player looks at an object.",
        longDescription: 'The player looks at an object.',
        handler: handler
    };

});


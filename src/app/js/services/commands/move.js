yarn.factory('moveCommand', function (yConsole,
                                     events,
                                     state,
                                     logic,
                                     writers) {

    function handler(args) {
        if (args.length) {
            var object = state.thing(args[0], true);
            if (object) {
                var success = logic.routines.move(object);
                if (success) writers.describeWhereYouAre(true);
            } else {
                yConsole.error("Could not find any object called : " + args[0]);
            }
        } else {
            yConsole.tip("You must provide a room name as the first argument.");
        }
    }

    return {
        name: "move",
        shortDescription: "Move the player to a room.",
        longDescription: 'Move the player to a room.',
        handler: handler
    };

});


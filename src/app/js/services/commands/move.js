yarn.factory('moveCommand', function (yConsole,
                                      events,
                                      things,
                                      state,
                                      logic,
                                      writers) {

    function handler(args) {
        if (args.length) {
            var door = things.get(args[0], true);
            if (door) {
                var success = logic.routines.move(door);
                if (success) writers.describeWhereYouAre(true);
            } else {
                yConsole.error("Could not find any object called : " + args[0]);
            }
        } else {
            yConsole.tip("You must provide a room and a door name as the first and second argument.");
        }
    }

    return {
        name: "move",
        shortDescription: "Move the player to a room.",
        longDescription: 'Move the player to a room.',
        handler: handler
    };

});


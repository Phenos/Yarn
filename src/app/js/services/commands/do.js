yarn.factory('doCommand', function (yConsole,
                                      events,
                                      things,
                                      state,
                                      logic) {

    function handler(args) {
        if (args.length) {
            var action = things.get(args[0], true);
            var object = things.get(args[1], true);
            // todo: Should verify if the object is really an action, otherwise
            // create a warning or an error
            if (action) {
                var success = logic.routines.do(action, object);
                //if (success) writers.describeActionDone(true);
            } else {
                yConsole.error("Could not find any action called : " + args[0]);
            }
        } else {
            yConsole.tip("You must provide an action name as the first argument.");
        }
    }

    return {
        name: "do",
        shortDescription: "Do an action.",
        longDescription: 'Do an action.',
        handler: handler
    };

});


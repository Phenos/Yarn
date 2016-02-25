yarn.service('aboutToCommand',
    function aboutToCommand(yConsole,
                            logic,
                            promptLoop) {

        var validStates = "Valid states are <span command=''>move</span>, " +
            "<span command='aboutTo look'>look</span>, " +
            "<span command='aboutTo take'>take</span>, " +
            "<span command='aboutTo use'>use</span>.";

        function handler(args) {
            var state = args[0];
            if (args.length) {
                if (state) {
                    if (
                        state === "move" ||
                        state === "take" ||
                        state === "look" ||
                        state === "use"
                    )
                        logic.routines.aboutTo(state);
                    promptLoop.update();
                } else {
                    yConsole.error(state + " is not a valid state");
                    yConsole.tip(validStates);
                }
            } else {
                yConsole.tip(
                    "You must provide a named state as the second argument.<br/>" +
                    validStates
                )
            }
        }

        return {
            name: "aboutTo",
            shortDescription: "Set which action the user is about to make",
            longDescription: "Set which action the user is about to make",
            handler: handler
        };

    }
);


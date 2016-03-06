yarn.factory('validateCommand', function (yConsole,
                                          state,
                                          Validator) {

    function handler() {

        var results = Validator.run(state);
        yConsole.log("Valiation processed a total of " + results.length + " tests");
        console.log("Validation results", results);
    }

    return {
        name: "validate",
        shortDescription: "Validate the game state for common mistakes and inconsistencies.",
        longDescription: "Validate the game state for common mistakes and inconsistencies.",
        handler: handler
    };

});


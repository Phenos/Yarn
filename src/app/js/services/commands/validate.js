yarn.factory('validateCommand', function (yConsole,
                                          state,
                                          Validator) {

    function handler() {
        var maxResults = 10;
        var limitMessage = "";
        var results = Validator.run(state);
        //console.log("Validation results", results.all);
        yConsole.log([
            "Validator executed " + results.all.length + " tests  :  ",
            results.pass.length, " Passed  /  ",
            results.fail.length + " Errors  /  ",
            results.warnings.length, " Warnings "].join(""));
        if (results.fail.length > maxResults) {
            limitMessage = " Showing the first <strong>" + maxResults + "</strong> items";
        }
        if (results.fail.length > 0) {
            yConsole.error("Validation failed with " + results.fail.length + " errors. " + limitMessage);
        } else {
            if (results.warnings.length) {
                yConsole.success("Validation passed with " + results.warnings.length + " warnings. " + limitMessage);
            } else {
                yConsole.success("Validation passed");
            }
        }
        var result;
        for (var i = 0; i < results.fail.length && i < maxResults; i++) {
            result = results.fail[i];
            if (result.type === "warning") {
                yConsole.warning(result.message);
            } else {
                yConsole.error(result.message);
            }
        }
    }

    return {
        name: "validate",
        shortDescription: "Validate the game state for common mistakes and inconsistencies.",
        longDescription: "Validate the game state for common mistakes and inconsistencies.",
        handler: handler
    };

});


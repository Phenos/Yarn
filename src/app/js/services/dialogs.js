yarn.service("dialogs", function (state,
                                  assert,
                                  Script,
                                  transcript,
                                  yConsole) {


    var service = {};
    service.process = function process() {
//        console.log("dialogs.process");

        var undef = void 0;
        var dialogs = state.assertions.find(assert(undef, "says", undef, {
            parent: null
        }));

        outputStatements(dialogs);

        function outputStatements(dialogsAssertions) {
            angular.forEach(dialogsAssertions, function (assertion) {
                var script;
                var scriptText = "";
                var statement;

                var isDialog = state.value("Object is a Dialog", {
                    Object: assertion.object
                });
//                console.log("--isDialog", isDialog);
                if (isDialog) {
                    scriptText = state.value("Object has a Script", {
                        Object: assertion.object
                    });
                    script = new Script(scriptText, assertion.source);

                } else {
                    // TODO: Parse if Dialog is a script without being an object
                    statement = state.resolveValue(assert(
                        assertion.subject,
                        assertion.predicate,
                        assertion.object
                    ));
                    scriptText = assertion.object.id.toUpperCase() + ": " + statement;
                    script = new Script(scriptText, assertion.source);
                }

                if (script.lines) {
                    script.play();
                } else {
                    yConsole.warn("Empty script!", {
                        source: assertion.source
                    });
                }

                // Then remove the "say" assertions
                state.negate(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

            });

        }

    };

    return service;
});
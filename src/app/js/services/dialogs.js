yarn.service("dialogs", function (state,
                                  assert,
                                  storyLog,
                                  yConsole) {

    var service = {};

    service.process = function process() {
//        console.log("dialogs.process");
        var sayMonologues = state.assertions.find(assert(undefined, "say", "Monologue", {
            parent: null
        }));

        var sayActions = state.assertions.find(assert(undefined, "say", "Action", {
            parent: null
        }));

        var sayInsight = state.assertions.find(assert(undefined, "say", "Insight", {
            parent: null
        }));

        outputStatement(sayActions, "action");
        outputStatement(sayMonologues, "log");
        outputStatement(sayInsight, "insight");

//        console.log("Dialog > sayAssertions", sayAssertions);

        function outputStatement(sayAssertions, type) {
            angular.forEach(sayAssertions, function (assertion) {

//                console.log("assertion", assertion);
                var statement = state.resolveValue(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

                if (angular.isString(statement)) {
                    var ellipsis = "";
                    if (statement.length > 20) {
                        ellipsis = "[…]";
                    }
                    var dialogExerpt = '"' + statement.substring(0, 20) + ellipsis + '"';
                    yConsole.log("Dialog: <strong>" + type + "</strong>:" + dialogExerpt, {
                        source: assertion.source
                    });

                    if (statement) {
                        storyLog.buffer()[type](statement);
                    }

                } else {
                    yConsole.error("Dialog was not text!", {
                        source: assertion.source
                    });
                }

                // Then remove the "say" assertion
//                state.assertions.remove(assertion);
                state.negate(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

            });

            storyLog.flushBuffers();
        }

    };

    return service;
});
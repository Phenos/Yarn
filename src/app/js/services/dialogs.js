yarn.service("dialogs", function (state,
                                  assert,
                                  storyLog) {

    var service = {};

    service.process = function process() {
        console.log("dialogs.process");
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

        //console.log("Dialog > sayAssertions", sayAssertions);

        function outputStatement(sayAssertions, type) {
            angular.forEach(sayAssertions, function (assertion) {
                //console.log("assertion", assertion);
                var statement = state.resolveValue(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

                // Then remove the "say" assertion
                state.assertions.remove(assertion);

                if (statement) {
                    storyLog.buffer()[type](statement);
                }
            });
        }

    };


    return service;
});
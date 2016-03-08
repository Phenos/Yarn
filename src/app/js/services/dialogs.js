yarn.service("dialogs", function (state,
                                  assert,
                                  storyLog) {

    var service = {};

    service.process = function process() {
        var sayAssertions = state.assertions.find(assert(undefined, "say", "Monologue", {
            parent: null
        }));

        //console.log("Dialog > sayAssertions", sayAssertions);

        angular.forEach(sayAssertions, function (assertion) {
            //console.log("assertion", assertion);
            if (assertion.subject && assertion.predicate && assertion.object) {
                var monologue = state.resolveValue(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

                // Then remove the "say" assertion
                state.assertions.remove(assertion);

                if (monologue) {
                    storyLog.buffer().log(monologue);
                }

            }
        });

    };


    return service;
});
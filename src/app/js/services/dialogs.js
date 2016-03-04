yarn.service("dialogs", function (state,
                                  storyLog) {

    var service = {};

    service.process = function process() {
        var sayAssertions = state.assertions.find({
            predicate: "say",
            object: "Monologue",
            parent: null
        });

        console.log("sayAssertions", sayAssertions);

        angular.forEach(sayAssertions, function (assertion) {
            //console.log("assertion", assertion);
            if (assertion.subject && assertion.predicate && assertion.object) {
                var monologue = state.resolveValue({
                    subject: assertion.subject.id,
                    predicate: assertion.predicate.id,
                    object: assertion.object.id
                });
                console.log("monologue", monologue);
                console.log("monologue", {
                    subject: assertion.subject.id,
                    predicate: assertion.predicate.id,
                    object: assertion.object.id
                });
                //console.log("object", assertion.object);
                if (monologue) {
                    storyLog.log(monologue);
                }

            }
        });

    };


    return service;
});
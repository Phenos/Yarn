yarn.service("dialogs", function (state,
                                  storyLog) {

    var service = {};

    service.process = function process() {
        var sayAssertions = state.assertions.find({
            predicate: "say",
            parent: null
        });

        //console.log("sayAssertions", sayAssertions);

        angular.forEach(sayAssertions, function (assertion) {
            //console.log("assertion", assertion);
            if (assertion.subject && assertion.predicate && assertion.object) {
                var isTrue = state.resolveValue({
                    subject: assertion.subject.id,
                    predicate: assertion.predicate.id,
                    object: assertion.object
                });
                //console.log("isTrue", isTrue);
                //console.log("object", assertion.object);
                if (isTrue) {
                    storyLog.log(assertion.object);
                }

            }
        });

    };


    return service;
});
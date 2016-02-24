yarn.service('events', function (Assertion,
                                 yConsole,
                                 consoleHelper) {

    function Events() {
    }

    Events.prototype.process = function () {
    };

    Events.prototype.trigger = function (subject, predicate, object) {
        var assertion = new Assertion(subject, predicate, object);
        assertion.set(true, "step");

        yConsole.log("Event: " + consoleHelper.assertion2log(assertion, null, true));
        //console.log("Triggering events : ", event);
        // Get the propper predicate
        if (predicate) {
            //console.log("actionHandler", actionHandler);
        } else {
            console.error("Triggering events requires a predicate: ", [subject, predicate, object]);
        }
    };

    return new Events();
});




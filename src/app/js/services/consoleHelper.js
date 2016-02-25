yarn.factory('consoleHelper', function (layerSetup,
                                        script) {
    var service = {};

    service.assertion2log = function (assertion, parentThing, evenIfFalse) {
        var url = "";
        var log = [];
        var object = assertion.object;
        var subject = assertion.subject;
        log.push("<span command='inspect " + subject.id + " '>" + subject.id + "</span> ");
        log.push(assertion.predicate.label);
        if (object) {
            if (angular.isObject(object)) {
                log.push(" <span command='inspect " + object.id + " '>" + object.id + "</span>");
            } else if (typeof object === "string") {
                if (
                    object.substr(0, 5) === "http:" ||
                    object.substr(0, 6) === "https:" ||
                    object.substr(0, 2) === "./" ||
                    object.substr(0, 2) === "//"
                ) {
                    url = script.resolveRelativeURI(object);
                    log.push(' "<a href=' + url + '>' + object + '</a>"');
                } else {
                    log.push(' "' + object + '"');
                }
            } else if (typeof object === "number") {
                log.push(' ' + object);
            }
        }


        var topState = assertion.getTopState(layerSetup, parentThing);
        if (topState) {
            log.push("<span class='truthStatement'>");
            log.push(" (is " + assertion.value(layerSetup) + " in " + assertion.valueLayer(layerSetup) + ":" + assertion.states.length + ")");
            log.push("</span>");
        }

        // Dont return anything if there is no value set for any situation
        // Unless it is requested
        if (!topState && !evenIfFalse) log = [];

        return log.join("");


    };

    return service;
});




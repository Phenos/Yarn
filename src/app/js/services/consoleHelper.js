yarn.factory('consoleHelper', function () {
    var service = {};

    service.assertion2log = function (assertion) {
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
                log.push(' "' + object + '"');
            } else if (typeof object === "number") {
                log.push(' ' + object);
            }
        }

        log.push("<span class='truthStatement'>");
        log.push(" (is " + assertion.value() + " in " + assertion.layer + ")");
        log.push("</span>");

        return log.join("");
    };

    return service;
});




yarn.factory('consoleHelper', function () {
    var service = {};

    service.assertion2log = function (assertion) {
        var log = [];
        var object = assertion.object;
        var subject = assertion.subject;
        log.push("&nbsp;&nbsp;<span class='assertion'>");
        log.push("<span class='subject' command='inspect " + subject.id +
            " '>" + subject.text() + "</span> ");
        log.push("<span class='predicate'>" + assertion.predicate.label + "</span>");

        if (object) {
            if (angular.isObject(object)) {
                log.push(" <span class='object' command='inspect " +
                    object.id + " '>" + object.text() + "</span>");
            } else if (typeof object === "string") {
                log.push(' "' + object + '"');
            } else if (typeof object === "number") {
                log.push(' ' + object);
            }
        }

        log.push("&nbsp;<span class='value'>");

        var tweakedStr = assertion.value() + "";
        tweakedStr = tweakedStr.replace( /(\/)/g ,"/&#8203;");
        log.push('"' + tweakedStr + '"');
        log.push("</span>");
        log.push("</span>");

        return log.join("");
    };

    return service;
});




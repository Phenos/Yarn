angular.module('yarn').factory('yConsole', yConsoleService);
angular.module('yarn').factory('consoleHelper', consoleHelper);

/**
 * Buffered console logging service
 * @returns {Logger}
 */
function yConsoleService(soundEffects) {

    var buffer = [];

    function Logger() {


        var yConsole = {
            write: mockFunction("write"),
            clear: mockFunction("clear")
        };

        // Mock function that buffer function calls until the console is ready
        function mockFunction(fn) {
            return function () {
                buffer.push([fn, arguments])
            }
        }

        this.register = function (directive) {
            yConsole = directive;
            this.flushBuffer();
        };

        this.flushBuffer = function() {
            var fnCall;
            var fn;
            while (buffer.length) {
                fnCall = buffer.shift();
                fn = yConsole[fnCall[0]];
                fn.apply(yConsole, fnCall[1]);
            }
        };

        this.log = function (text) {
            yConsole.write(text, "log");
        };

        this.debug = function (text) {
            yConsole.write(text, "debug");
        };

        this.error = function (text) {
            soundEffects.error();
            yConsole.write("<log-icon>✖</log-icon>" + text, "error");
        };

        this.success = function (text) {
            yConsole.write("<log-icon>✔</log-icon>" + text, "success");
        };

        this.tip = function (text) {
            yConsole.write("<log-icon>⬩</log-icon><strong>Tip: </strong> " + text, "tip");
        };

        this.command = function (text) {
            yConsole.write("<span command>" + text + "</span>", "command");
        };

        this.clear = function () {
            yConsole.clear();
        };

    }

    var logger = new Logger();

    return logger;
}


function consoleHelper(layerSetup) {
    var service = {};

    service.assertion2log = function (assertion) {
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
                    log.push(' "<a href=' + object + '>' + object + '</a>"');
                } else {
                    log.push(' "' + object + '"');
                }
            } else if (typeof object === "number") {
                log.push(' ' + object);
            }
        }

        var topState = assertion.getTopState(layerSetup);
        if (topState) {
            log.push("<span class='truthStatement'>");
            log.push(" (is " + assertion.value(layerSetup) + " in " + assertion.valueLayer(layerSetup) + ")");
            log.push("</span>");
        } else {
            // TODO: Implement an option to also show empty assertions ... ??? why ???
            // Maybe it's not even supposed to still be there ?
            // Or it depends if we are taking all layers in account in fetching the TopState ?
            // For now we just dont show them
            log.push("<span class='truthStatement'>");
            log.push(" (is not true anywhere)");
            log.push("</span>");
            // RESET ALL
            log = [];
        }

        return log.join("");


    };

    return service;
}


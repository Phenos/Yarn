angular.module('yarn').factory('yConsole', yConsoleService);
angular.module('yarn').factory('consoleHelper', consoleHelper);

/**
 * Buffered console logging service
 * @returns {Logger}
 */
function yConsoleService(ngAudio) {

    var buffer = [];
    var errorSound = ngAudio.load("./sounds/error.mp3");

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
            errorSound.play();
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


function consoleHelper() {
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
                log.push(' "' + object + '"');
            } else if (typeof object === "number") {
                log.push(' ' + object);
            }
        }
        log.push("<br/>");
        return log.join("");
    };

    return service;
}


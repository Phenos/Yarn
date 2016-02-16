angular.module('yarn').factory('yConsole', yConsoleService);

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
            yConsole.write("✖ " + text, "error");
        };

        this.success = function (text) {
            yConsole.write("✔ " + text, "success");
        };

        this.hint = function (text) {
            yConsole.write("<strong>Hint: </strong> " + text, "hint");
        };

        this.command = function (text) {
            yConsole.write(text, "command");
        };

        this.clear = function () {
            yConsole.clear();
        };

    }

    var logger = new Logger();

    return logger;
}





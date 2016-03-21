/**
 * Buffered console logging service
 * @returns {Logger}
 */
yarn.factory('yConsole', function (soundEffects) {

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

        this.warning = function (text) {
            yConsole.write("<log-icon>⚠</log-icon>" + text, "warning");
        };

        this.success = function (text) {
            yConsole.write("<log-icon>✔</log-icon>" + text, "success");
        };

        this.tip = function (text) {
            yConsole.write("<log-icon>⬩</log-icon><strong>Tip: </strong> " + text, "tip");
        };

        this.command = function (text) {
            yConsole.write("<log-icon>▶</log-icon><span command>" + text + "</span>", "command");
        };

        this.clear = function () {
            yConsole.clear();
        };

    }

    return new Logger();
});




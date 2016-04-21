/**
 * Buffered console logging service
 * @returns {Logger}
 */
yarn.service('yConsole', function (soundEffects) {

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

        this.log = function (text, options) {
            yConsole.write(text, "log", options);
        };

        this.debug = function (text, options) {
            yConsole.write(text, "debug", options);
        };

        this.error = function (text, options) {
            soundEffects.error();
            yConsole.write("<span class='log-icon'><span>✖</span></span>" +
                text, "error", options);
        };

        this.warning = function (text, options) {
            yConsole.write("<span class='log-icon'><span>⚠</span></span>" +
                text, "warning", options);
        };

        this.success = function (text, options) {
            yConsole.write("<span class='log-icon'><span>✔</span></span>" +
                text, "success", options);
        };

        this.transaction = function (text, options) {
            yConsole.write("<span class='log-icon'><span>⬩</span></span>" +
                text, "transaction", options);
        };

        this.tip = function (text, options) {
            yConsole.write("<span class='log-icon>'<span>⚑</span></span>" +
                "<strong>Tip: </strong> " +
                text, "tip", options);
        };

        this.command = function (text, options) {
            yConsole.write("<span class='log-icon'><span>▶</span></span>" +
                "<span command>" + text + "</span>", "command", options);
        };

        this.clear = function () {
            yConsole.clear();
        };

    }

    return new Logger();
});




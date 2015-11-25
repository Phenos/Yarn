angular.module('mindgame').factory('yConsole', yConsoleService);

function yConsoleService() {

    function Logger() {

        var yConsole = {
            log: mockFunction,
            debug: mockFunction,
            error: mockFunction,
            write: mockFunction,
            command: mockFunction,
            clear: mockFunction
        };

        function mockFunction() {
            console.error("Console not ready yet...");
        }

        this.register = function (directive) {
            yConsole = directive;
        };

        this.log = function (text) {
            yConsole.write(text, "log");
        };

        this.debug = function (text) {
            yConsole.write(text, "debug");
        };

        this.error = function (text) {
            yConsole.write(text, "error");
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





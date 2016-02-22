(function () {

    angular.module('yarn').directive('console', ConsoleDirective);
    angular.module('yarn').factory('consoleService', consoleService);


    function ConsoleDirective(commands) {
        return {
            restrict: 'E',
            bindToController: {
                onEscapeFocus: '&',
                onFocus: '&',
                ready: "&"
            },
            scope: {},
            replace: true,
            controllerAs: 'console',
            templateUrl: './html/console.html',
            controller: ConsoleController
        };

        function ConsoleController(consoleService,
                                   yConsole,
                                   $scope,
                                   $compile,
                                   $timeout,
                                   $element,
                                   hotkeys) {

            var self = this;

            hotkeys.bindTo($scope)
                .add({
                    combo: 'mod+k',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Clear the console',
                    callback: function () {
                        self.clear();
                    }
                });

            consoleService.register(this);

            var logsElem = $element.find("logs");
            var logscrollElem = $element.find("logscroll");

            $element.on("mouseup", function () {
                var selection = getSelectionText();
                if (!selection) {
                    self.focus();
                }
            });

            this.focus = function () {
                $timeout(function () {
                    $element.find("input")[0].focus();
                }, 200);
            };

            // todo: put in a utils service
            function getSelectionText() {
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                return text;
            }

            this.onInputEscapeFocus = function () {
                console.log("console.onInputEscapeFocus");
                this.onEscapeFocus();
            };

            this.onInputFocus = function () {
                console.log("console.onInputFocus");
                this.onFocus();
            };

            this.onInput = function (text) {
                var trimmed = text.trim();
                if (trimmed[0] === ">") {
                    yConsole.error("Story script not yet supported!")
                } else {
                    commands.command(trimmed);
                }
            };

            this.clear = function () {
                var logElement = $element.find("logs");
                logElement.empty();
            };

            this.write = function (text, type) {

                // Log Yarn console to the browser console
                //if (type === "error") {
                //    console.error("YARN: ", text);
                //} else {
                //    console.log("YARN: " + type + " : " + text.substring(0, 80), [text]);
                //}
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                var logElem = $compile('<log type="type" text="text"></log>')(scope);
                logsElem.append(logElem);
                $timeout(function () {
                    logscrollElem[0].scrollTop = logscrollElem[0].scrollHeight;
                });
            };

            yConsole.register(this);

        }

    }

    function consoleService() {
        var service = {};
        var controller;


        service.register = function (_controller) {
            controller = _controller;
        };

        service.focus = function () {
            controller.focus()
        };

        service.clear = function () {
            controller.clear()
        };

        return service;
    }

})();

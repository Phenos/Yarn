(function () {

    yarn.directive('console', ConsoleDirective);
    yarn.factory('consoleService', consoleService);

    function ConsoleDirective(commands,
                              state,
                              getSelectionText) {

        return {
            restrict: 'E',
            bindToController: {
                onEscapeFocus: '&',
                onFocus: '&',
                onClear: '&',
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
                                   $rootScope,
                                   $compile,
                                   $timeout,
                                   $element,
                                   hotkeys) {

            var self = this;
            var lastStep = 0;

            hotkeys.bindTo($rootScope)
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
            var logscrollElem = $element.find("md-content");

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

            this.onInputEscapeFocus = function () {
                //console.log("console.onInputEscapeFocus");
                this.onEscapeFocus();
            };

            this.onInputFocus = function () {
                //console.log("console.onInputFocus");
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

                this.onClear();
            };

            this.write = function (text, type) {
                $scope.$emit("refreshScrollbars");
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                scope.step = state.step();
                if (lastStep !== scope.step) {
                    scope.isNewStep = true;
                    lastStep = scope.step;
                } else {
                    scope.isNewStep = false;
                }
                scope.timestamp = Date.now();
                var logElem = $compile('<log is-new-step="isNewStep" timestamp="timestamp" step="step" type="type" text="text"></log>')(scope);
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

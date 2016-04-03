(function () {

    yarn.directive('console', ConsoleDirective);
    yarn.service('consoleService', consoleService);

    function ConsoleDirective(commands,
                              state,
                              getSelectionText,
                              smoothScroll,
                              easing) {

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
                                   $compile,
                                   $timeout,
                                   $element) {

            var self = this;
            var lastStep = 0;

            this.commands = commands;

            consoleService.register(this);

            var logsElem = $element.find("logs");
            var logscrollElem = angular.element($element.find("md-content")[0]);

            $element.on("mouseup", function () {
                var selection = getSelectionText();
                if (!selection) {
                    self.focus();
                }
            });

            this.runCommand = function (command) {
                commands.run(command);
            };

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
                    commands.run(trimmed);
                }
            };

            this.clear = function () {
                var logElement = $element.find("logs");
                logElement.empty();

                this.onClear();
            };

            this.write = function (text, type, options) {
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                scope.options = options || {};
                scope.step = state.step();
                if (lastStep !== scope.step) {
                    scope.isNewStep = true;
                    lastStep = scope.step;
                } else {
                    scope.isNewStep = false;
                }
                scope.timestamp = Date.now();
                var logElem = $compile('<log is-new-step="isNewStep" options="options" timestamp="timestamp" step="step" type="type" text="text"></log>')(scope);
                logsElem.append(logElem);
                smoothScroll(logElem[0], {
                    duration: 500,
                    //easing: 'easeOutQuad',
                    offset: 0,
                    containerId: 'yarn-console'
                });
                $scope.$emit("refreshScrollbars");
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

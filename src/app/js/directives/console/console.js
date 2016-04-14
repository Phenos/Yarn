(function () {

    yarn.directive('console', ConsoleDirective);
    yarn.service('consoleService', consoleService);

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
                                   $compile,
                                   $timeout,
                                   $element) {

            var self = this;
            var lastStep = 0;

            this.isReady = false;
            $timeout(function () {
                self.isReady = true;
            }, 1000);

            this.lines = [];

            this.scrollbarsConfig = {
                autoHideScrollbar: true,
                theme: 'light',
                advanced: {
                    updateOnContentResize: true
                },
                scrollInertia: 200
            };

            this.commands = commands;

            consoleService.register(this);

//            var logscrollElem = angular.element($element.find("console-main")[0]);

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
//                console.log("console.onInputEscapeFocus");
                this.onEscapeFocus();
            };

            this.onInputFocus = function () {
//                console.log("console.onInputFocus");
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
                this.lines = [];

                this.onClear();
            };

            this.write = function (text, type, options) {
                var scope = $scope.$new();
                var step = state.step();
                var isNewStep = false;
                if (lastStep !== scope.step) {
                    isNewStep = true;
                    lastStep = scope.step;
                }

                var newLine = new Line(text, type, step, isNewStep, options);
                this.lines.push(newLine);

                if (self.updateScrollbar) {
                    self.updateScrollbar('scrollTo', 10000000);
                }
            };

            function Line(text, type, step, isNewStep, options) {
                this.text = text;
                this.type = type;
                this.step = step;
                this.isNewStep = isNewStep;
                this.timestamp = Date.now();
                this.options = options;
            }

            this.old_write = function (text, type, options) {
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
                var logsElem = $element.find("logs");
                var logItemTemplate =
                    '<log is-new-step="::isNewStep" options="::options" timestamp="::timestamp" ' +
                    'step="{{::step}}" type="{{::type}}" text="{{::text}}"></log>';
                var logElem = $compile(logItemTemplate)(scope);
                logsElem.append(logElem);

                if (self.updateScrollbar) {
                    self.updateScrollbar('scrollTo', 10000000);
                }
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
            controller && controller.focus()
        };

        service.clear = function () {
            controller && controller.clear()
        };

        return service;
    }

})();

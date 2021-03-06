(function () {

    yarn.directive('console', ConsoleDirective);

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

        function ConsoleController(yConsole,
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

            this.lines = yConsole.lines;

            this.scrollbarsConfig = {
                autoHideScrollbar: true,
                theme: 'light',
                advanced: {
                    updateOnContentResize: true
                },
                scrollInertia: 200
            };

            this.commands = commands;

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
                this.lines.splice(0, this.lines.length);
                this.onClear();
            };

            this.write = function (text, type, options) {
                var step = state.step();
                var isNewStep = false;
                if (lastStep !== step) {
                    isNewStep = true;
                    lastStep = step;
                }

                var newLine = new Line(text, type, step, isNewStep, options);
                this.lines.push(newLine);

                // todo: Put maximum number of line in a config
                // Everytime the log overflows by 50 items it is cropped
                var overflow = this.lines.length - 200;
                if (overflow > 20) {
                    this.lines.splice(0, overflow);
                }

                if (self.updateScrollbar) {
                    self.updateScrollbar('scrollTo', 10000000);
                }
            };

            function Line(text, type, step, isNewStep, options) {
                this.text = text;
                this.type = type;
                this.step = step;
                this.isNewStep = isNewStep;
                this.isNewStepClass = isNewStep ? 'isNewStep' : '';
                this.timestamp = Date.now();
                if (options && options.source) {
                    this.source = options.source;
                } else {
                    this.source = null;
                }
                this.options = options;
            }

            yConsole.register(this);

        }

    }

})();

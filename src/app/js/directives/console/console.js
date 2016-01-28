(function () {

    angular.module('mindgame').directive('console', StoryLogDirective);

    function StoryLogDirective(commands) {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'console',
            template: '<logscroll><logs></logs></logscroll><user-input text="" on-submit="console.onInput(text)"></user-input>',
            controller: ConsoleController
        };

        function ConsoleController(yConsole, $scope, $compile, $window, $timeout, $element) {

            var logsElem = $element.find("logs");
            var logscrollElem = $element.find("logscroll");

            $element.on("mouseup", function () {
                var selection = getSelectionText();
                if (!selection) {
                    $element.find("textarea")[0].focus();
                }
            });

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

            this.onInput = function (text) {
                var trimmed = text.trim();
                if (trimmed[0] === ">") {
                    yConsole.error("Story script not yet supported!")
                } else {
                    commands.command(trimmed);
                }
            };

            this.clear = function () {
                $element.empty();
                $window.scroll(0, 0);
            };

            this.write = function (text, type) {
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

})();

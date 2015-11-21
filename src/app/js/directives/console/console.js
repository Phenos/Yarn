(function () {

    angular.module('mindgame').directive('console', StoryLogDirective);

    function StoryLogDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'console',
            template: '<logscroll><logs></logs></logscroll><user-input on-submit="game.command(text)"></user-input>',
            controller: ConsoleController
        };

        function ConsoleController(yConsole, $scope, $element, $compile, $window) {

            var logsElem = $element.find("logs");

            $element.on("scroll", function(e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventBubble();
                e.preventDefault();
                console.log(e);
            });

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
            };

            yConsole.register(this);

        }
    }

})();

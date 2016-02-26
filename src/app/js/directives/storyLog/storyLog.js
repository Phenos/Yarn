(function () {

    yarn.directive('storyLog', StoryLogDirective);

    function StoryLogDirective() {
        return {
            restrict: 'E',
            bindToController: {
                onClear: "&",
                ready: "&"
            },
            scope: {},
            controllerAs: 'storyLog',
            controller: StoryLogController
        };

        function StoryLogController(storyLog, $scope, $element, $compile) {

            this.clear = function () {
                $element.empty();
                this.onClear();
            };

            this.write = function (text, type) {
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                var logItemEl = $compile('<log-item type="type" text="text"></log-item>')(scope);
                $element.append(logItemEl);
            };

            storyLog.register(this);

        }
    }

})();

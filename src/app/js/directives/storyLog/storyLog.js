(function () {

    angular.module('yarn').directive('storyLog', StoryLogDirective);

    function StoryLogDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'storyLog',
            //template: '<div class="logItems">{{ userInput.text }}</div>',
            controller: StoryLogController
        };

        function StoryLogController(storyLogService, $scope, $element, $compile, $window) {

            this.clear = function () {
                $element.empty();
                $window.scroll(0, 0);
            };

            this.write = function (text, type) {
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                var logItemEl = $compile('<log-item type="type" text="text"></log-item>')(scope);
                $element.append(logItemEl);
            };

            storyLogService.register(this);

        }
    }

})();

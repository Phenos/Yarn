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

        function StoryLogController(storyLog, $scope, $element, $compile, player) {

            this.clear = function () {
                $element.empty();
                this.onClear();
            };

            this.write = function (text, type, scope) {
                var newScope = $scope.$new(false);
                if (scope) {
                    angular.extend(newScope, {
                        scope: scope
                    });
                }
                newScope.text = text;
                newScope.type = type;
                var logItemEl = $compile('<log-item class="unread" type="type" text="text" scope="scope"></log-item>')(newScope);
                $element.append(logItemEl);

                player.scroll();
            };

            this.markAsRead = function () {
                angular.element($element[0].getElementsByClassName("unread"))
                    .removeClass("unread")
                    .addClass("read")
            };

            storyLog.register(this);

        }
    }

})();

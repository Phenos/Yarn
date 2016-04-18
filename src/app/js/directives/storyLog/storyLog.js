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

        function StoryLogController(storyLog,
                                    $scope,
                                    $element,
                                    $compile,
                                    player) {

            this.clear = function () {
                $element.empty();
                this.onClear();
            };

            this.write = function (text, type, scope) {
                if (angular.isString(text)) {
                    var parsedTxt = text;

                    // Render bracket links
                    parsedTxt = parsedTxt.replace(/\[([^\]]+)]/g, function (match) {
                        var tokens = match.substring(1, match.length - 1).split(":");
                        var name = tokens[0];
                        var id = tokens[1] || tokens[0];
                        // Sanitize the id
                        id = id.trim().toLowerCase().replace(/ /g, "_");
                        return '<thing token="' + id + '" text="' + name + '"></thing>'
                    });

                    // Render paragraph breaks and line breaks
                    parsedTxt = parsedTxt.replace(/(\\[n])/g, '<br/>');


                    var newScope = $scope.$new(false);
                    if (scope) {
                        angular.extend(newScope, {
                            scope: scope
                        });
                    }
                    newScope.text = parsedTxt;
                    newScope.type = type;
                    var logItemEl = $compile(
                        '<log-item class="unread" type="type" text="text" scope="scope"></log-item>'
                    )(newScope);
                    $element.append(logItemEl);

                    player.scroll(logItemEl);
                }

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

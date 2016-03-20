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
                                    player,
                                    templating,
                                    state,
                                    assert) {

            this.clear = function () {
                $element.empty();
                this.onClear();
            };

            this.write = function (text, type, scope) {
                var parsedTxt = text;

                // Render tempate if necessary
                if (parsedTxt.substring(0, 5) === "tmpl:") {
                    parsedTxt = templating.render(parsedTxt.substring(5), {
                        // todo: move this in the "templating" service
                        assert: function (_assertion) {
                            var assertion = _assertion.split(" ");
                            var subject = assertion.shift();
                            var object = assertion.pop();
                            var predicate = assertion.join(" ");
                            var value = state.resolveValue(assert(subject, predicate, object));
                            return value;
                        }
                    });
                }

                // Render bracket links
                var BracketsMatch = /\[([^\]]+)]/g;
                var BracketsReplacement = '<thing token="$1">$1</thing>';
                parsedTxt = parsedTxt.replace(BracketsMatch, BracketsReplacement);


                var newScope = $scope.$new(false);
                if (scope) {
                    angular.extend(newScope, {
                        scope: scope
                    });
                }
                newScope.text = parsedTxt;
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

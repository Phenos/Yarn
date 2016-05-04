(function () {

    yarn.directive('storyLog', StoryLogDirective);

    function StoryLogDirective(storyLog,
                               parseThingLink) {
        return {
            restrict: 'E',
            bindToController: {
                onClear: "&",
                ready: "&"
            },
            scope: {},
            replace: false,
            controllerAs: 'storyLog',
            template:'<div class=story-log><log-item ng-repeat="item in storyLog.items" class=::item.unread item=::item></log-item></div>',
            controller: StoryLogController
        };

        function StoryLogController($scope,
                                    $element,
                                    $compile,
                                    $document) {

            this.lastItemRead = 0;

            this.clear = function () {
                storyLog.items.splice(0, storyLog.items.length);
                this.onClear();
            };

            this.write = function (text, type, scope) {
                // Get the number of the last item to increment the next
                var number = 0;
                if (storyLog.items.length > 0) {
                    var item = storyLog.items[storyLog.items.length - 1];
                    number = item.number + 1;
                }
                var logItem = new LogItem(number, text, type, scope);
                storyLog.items.push(logItem);

                // todo: Put maximum number of line in a config
                // Everytime the log overflows by 50 items it is cropped
                var overflow = storyLog.items.length - 30;
                if (overflow > 5) {
                    storyLog.items.splice(0, overflow);
                }
            };

            function LogItem(number, text, type, scope) {
                this.number = number;
                this.text = parseThingLink(text);
                this.type = type;
                this.scope = scope || {};

            }

            this.markAsRead = function () {
                var number = 0;
                if (storyLog.items.length > 0) {
                    var item = storyLog.items[storyLog.items.length - 1];
                    number = item.number;
                }
                storyLog.lastItemRead = number;
                this.lastItemRead = number;

                var document = $document[0];
                angular.forEach(storyLog.items, function (_item) {
                    var elem = angular.element(document.getElementById("logItem-" + _item.number));
                    var parent = elem.parent();
                    if (_item.number === storyLog.lastItemRead) {
                        parent.addClass("hasBookmark");
                    } else {
                        if (parent.hasClass("hasBookmark")) {
                            debugger;
                            parent.addClass("hadBookmark");
                        }
                        parent.removeClass("hasBookmark");
                    }
                    elem.removeClass("unread")
                        .addClass("read")
                });
            };

            storyLog.register(this);

            this.items = storyLog.items;

        }
    }

})();

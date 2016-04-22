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
            replace: false,
            controllerAs: 'storyLog',
            templateUrl: './html/storyLog.html',
            controller: StoryLogController
        };

        function StoryLogController(storyLog,
                                    $scope,
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
                var parsedTxt = text;

                if (angular.isString(text)) {
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
                }

                this.number = number;
                this.text = parsedTxt;
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
                    if (_item.number === storyLog.lastItemRead) {
                        elem.parent().addClass("hasBookmark");
                    } else {
                        elem.parent().removeClass("hasBookmark");
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

(function () {

    yarn.directive('transcript', transcriptDirective);

    function transcriptDirective(transcript,
                               parseThingLink) {
        return {
            restrict: 'E',
            bindToController: {
                onClear: "&",
                ready: "&"
            },
            scope: {},
            replace: false,
            controllerAs: 'transcript',
            templateUrl: './html/transcript.html',
            controller: transcriptController
        };

        function transcriptController($scope,
                                    $element,
                                    $compile,
                                    $document) {

            this.lastItemRead = 0;

            this.clear = function () {
                transcript.items.splice(0, transcript.items.length);
                this.onClear();
            };

            this.write = function (text, type, scope) {
                // Get the number of the last item to increment the next
                var number = 0;
                if (transcript.items.length > 0) {
                    var item = transcript.items[transcript.items.length - 1];
                    number = item.number + 1;
                }
                var logItem = new LogItem(number, text, type, scope);
                transcript.items.push(logItem);

                // todo: Put maximum number of line in a config
                // Everytime the log overflows by 50 items it is cropped
                var overflow = transcript.items.length - 30;
                if (overflow > 5) {
                    transcript.items.splice(0, overflow);
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
                if (transcript.items.length > 0) {
                    var item = transcript.items[transcript.items.length - 1];
                    number = item.number;
                }
                transcript.lastItemRead = number;
                this.lastItemRead = number;

                var document = $document[0];
                angular.forEach(transcript.items, function (_item) {
                    var elem = angular.element(document.getElementById("logItem-" + _item.number));
                    if (_item.number === transcript.lastItemRead) {
                        elem.parent().addClass("hasBookmark");
                    } else {
                        elem.parent().removeClass("hasBookmark");
                    }
                    elem.removeClass("unread")
                        .addClass("read")
                });
            };

            transcript.register(this);

            this.items = transcript.items;

        }
    }

})();

yarn.service('transcript', function (state,
                                     $document,
                                     $compile,
                                     parseThingLink) {

    function Transcript() {
        this.items = [];
        this.lastItemRead = 0;

    }

    Transcript.prototype.log = function (text) {
        this.write(text, "log");
    };

    Transcript.prototype.headline = function (text) {
        this.write(text, "headline");
    };

    Transcript.prototype.action = function (text) {
        this.write("—" + text, "action");
    };

    Transcript.prototype.dialog = function (text, scope) {
        var actorName = state.value("Subject has a Name", {
            Subject: scope.actor
        });
        var voiceLabel = actorName || scope.actor;
        this.write(text, "dialog");
    };

    Transcript.prototype.topic = function (text, scope) {
        this.write("<strong> ></strong> " + text, "topic");
    };

    Transcript.prototype.insight = function (text) {
        this.write(
            "<md-icon md-svg-icon='./svg-icons/insight.svg'></md-icon>" +
            text, "insight");
    };

    Transcript.prototype.prompt = function (prompt) {
        var scope = {
            prompt: prompt
        };
        this.write("<user-choice prompt='prompt'></user-choice>", "prompt", scope);
    };

    Transcript.prototype.image = function (url) {
        this.write("<img src='" + url + "' alt='coverpage'>", "image");
    };

    Transcript.prototype.error = function (text) {
        this.write(text, "error");
    };

    Transcript.prototype.heading = function (text) {
        this.write(text, "heading");
    };

    Transcript.prototype.subHeading = function (text) {
        this.write(text, "subHeading");
    };

    Transcript.prototype.thingImage = function (url) {
        this.write('<img src="' + url + '">', "thingImage");
    };

    Transcript.prototype.clear = function () {
        this.items.splice(0, this.items.length);
    };

    Transcript.prototype.write = function (text, type, scope) {
        var self = this;
        // Get the number of the last item to increment the next
        var number = 0;
        if (self.items.length > 0) {
            var item = self.items[self.items.length - 1];
            number = item.number + 1;
        }
        var logItem = new LogItem(number, text, type, scope);
        self.items.push(logItem);

        // todo: Put maximum number of line in a config
        // Everytime the log overflows by 50 items it is cropped
        var overflow = self.items.length - 30;
        if (overflow > 5) {
            self.items.splice(0, overflow);
        }
    };

    Transcript.prototype.markAsRead = function () {
        var self = this;
        var number = 0;
        if (self.items.length > 0) {
            var item = self.items[self.items.length - 1];
            number = item.number;
        }
        self.lastItemRead = number;

        var document = $document[0];
        angular.forEach(self.items, function (_item) {
            var elem = angular.element(document.getElementById("logItem-" + _item.number));
            if (_item.number === self.lastItemRead) {
                elem.parent().addClass("hasBookmark");
            } else {
                elem.parent().removeClass("hasBookmark");
            }
            elem.removeClass("unread").addClass("read")
        });
    };

    function LogItem(number, text, type, scope) {
        this.number = number;
        this.text = parseThingLink(text);
        this.type = type;
        this.scope = scope || {};

    }

    return new Transcript();
});





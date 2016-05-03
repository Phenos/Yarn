yarn.service('transcript', function (state,
                                     $window,
                                     $document,
                                     $compile,
                                     $timeout,
                                     storyLocalStorage,
                                     parseThingLink) {

    // todo: Put in an app config
    var MaxTranscriptLength = 30;

    function Transcript() {
        // Recent log items to be displayed
        this.items = [];
        // All items since the beginning
        this.archive = [];
        this.lastItemRead = 0;

        this.localStorage = storyLocalStorage.get("transcript");
        if (!this.localStorage.archive) {
            this.localStorage.archive = [];
        }
        this.localArchive = this.localStorage.archive;
        this.restoreItems(this.localArchive);
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

    Transcript.prototype.dialog = function (text) {
        this.write(text, "dialog");
    };

    Transcript.prototype.topic = function (text) {
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
        this.localArchive.splice(0, this.localArchive.length);
        this.archive.splice(0, this.archive.length);
    };

    Transcript.prototype.write = function (text, type, scope) {
        var self = this;
        // Get the number of the last item to increment the next
        var number = 0;
        if (self.items.length > 0) {
            var item = self.items[self.items.length - 1];
            number = item.number + 1;
        }
        var step = state.step();
        var logItem = new LogItem(step, number, text, type, scope);

        self.items.push(logItem);
        // Also keep a copy in the archive
        self.archive.push(logItem);

        // Persist the item to localStorage as a plain object
        self.persistItem(logItem.pojo());

        // todo: Put maximum number of line in a config
        // Everytime the log overflows by XX items it is cropped
        var overflow = self.items.length - MaxTranscriptLength;
        if (overflow > 5) {
            self.items.splice(0, overflow);
        }
    };

    Transcript.prototype.persistItem = function (item) {
        this.localArchive.push(item);
    };

    Transcript.prototype.restoreItems = function (items) {
        var itemCountToRestore = MaxTranscriptLength;
        if (items.length < itemCountToRestore) {
            itemCountToRestore = items.length;
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var logItem = new LogItem(item.step, item.number, item.text, item.type, {});
            this.archive.push(logItem);
            if (i > items.length - itemCountToRestore - 1) {
                this.items.push(logItem);
            }
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

    Transcript.prototype.export = function () {
        var stylesheet = [
            "<style>",
            ".item { margin-left: 4em; }",
            ".is-image img { max-width: 400px; max-height: 400px;  }",
            ".is-heading p { font-size: 1.4em; font-weight: bold; }",
            ".stepCount { position: absolute; left: 1em; font-family:" +
            "sans-serif; margin-left: 1em; font-size: 0.7em; color: #BBB; }",
            "</style>"
        ].join("");

        var body = [];

        angular.forEach(this.archive, function (item) {
            var html = [
                "<div class='item is-" + item.type + "'><span class='stepCount'>#",
                item.step,
                "</span> <p>",
                item.text,
                "</p></div>"
            ];
            body.push(html.join(""));
        });

        var elem = document.createElement("div");
        elem.innerHTML = body.join("");

        var thingTags = elem.getElementsByTagName("thing");
        thingTags = [].slice.call(thingTags);

        angular.forEach(thingTags, function (thingTag) {
            var text = thingTag.getAttribute("text");
            var token = thingTag.getAttribute("token");
            thingTag.outerHTML = "<a href='#" + token + "'>" + text + "</a>";
        });

        var doc = [
            "<html><head>",
            stylesheet,
            "</head><body>",
            elem.innerHTML,
            "</body>",
            "</html>"
        ].join("");

        var dataURI = "data:text/html;charset=utf-8," + encodeURIComponent(doc);
        $window.open(dataURI, "_blank", "");
    };

    function LogItem(step, number, text, type, scope) {
        this.number = number;
        this.text = parseThingLink(text);
        this.type = type;
        this.step = step;
        this.scope = scope || {};
    }

    LogItem.prototype.pojo = function () {
        return {
            step: this.step,
            number: this.number,
            text: this.text,
            type: this.type
        }
    };

    return new Transcript();
});





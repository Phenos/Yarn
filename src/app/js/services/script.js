yarn.service("Script", function (yConsole, storyLog, state) {

//    var scriptCuttingRegex = /((^[A-Z ]+:)|(.*))/gm;
//    var isActorRegex = /(^[A-Z ]+:)/g;
//    var isActorRegex =
//        /(?:(^[@A-Z][a-z_A-Z0-9]+)([\s]*(?:[@A-Z]+[a-z_A-Z0-9]*))*(:))/g;
    var isActorRegex =
        /(^(?:[ ]*)[@A-Z][a-z_A-Z0-9]+)(([ ]*)([@A-Z]+[a-z_A-Z0-9]*)*)*([ ]*)(?::)/g;
    var scriptCuttingRegex =
        /(^(?:[ ]*)[@A-Z][a-z_A-Z0-9]+)(([ ]*)([@A-Z]+[a-z_A-Z0-9]*)*)*([ ]*)(?::)|(.*)/gm;

    var matchvoiceToLogTypes = {
        default: "log",
        action: "action",
        monologue: "log",
        insight: "insight",
        narrator: "log",
        heading: "heading",
        topic: "topic"
    };

    function Script(text, source) {
        this.text = "";
        if (angular.isString(text)) {
            this.text = text;
        }
        this.lines = [];
        this.position = 0;
        this.source = source;
        this.parse(this.text);
    }

    Script.prototype.next = function () {
        this.position = this.position + 1;
    };

    Script.prototype.end = function () {
        return this.position >= this.lines.length;
    };

    Script.prototype.play = function () {
        console.log("play", this);
        var ellipsis = "";
        if (this.text.length > 50) {
            ellipsis = "[…]";
        }
        var textCropped = '<span class="value">' +
            this.text.substring(0, 50) + ellipsis +
            '"</span>';

        yConsole.log("Playing script: " + textCropped, {
            source: self.source
        });

        while (!this.end()) {
            this.playNext();
            this.next();
        }
    };

    Script.prototype.playNext = function () {
        var line = this.lines[this.position];
        outputLine(line[0], line[1]);
    };

    function outputLine(statement, _voice) {
        var voice = _voice.toLowerCase();

        var logType = matchvoiceToLogTypes[voice];
        if (logType) {
//                console.log("Found builtin voice", voice);
//                console.log("Statement", statement);
            storyLog.buffer()[logType](statement);
        } else {
//          console.log("Looking for alternate voice", voice);
            // The voice doesnt match any standard voice, so we look for an actor
            var isActor = state.value("Subject is Actor", {Subject: voice});
            if (isActor) {

                var statementParts = statement.split("--");
                var quotedStatement = [];
                angular.forEach(statementParts, function (part, index) {
                    if ((index + 1) % 2) {
                        quotedStatement.push(
                            "<span class='dialogText'>“" + part.trim() + "”</span>");
                    } else {
                        quotedStatement.push(
                            " <span class='dialogMeta'>" + part.trim() + "</span>. ");
                    }
                });
                statement = quotedStatement.join("");

                storyLog.buffer().dialog(statement, {
                    actor: voice
                });
            }
        }

    }

    Script.prototype.parse = function (script) {
        var self = this;
        // Here we start cutting the script in pieces
        var matches = script.match(scriptCuttingRegex);
//                    console.log("matches", matches);
        var buffer = [];
        var actor = "DEFAULT";

        function flushBuffer() {
            if (buffer.length > 0) {
                var text = buffer.join(" ");
                self.lines.push([text, actor]);
                buffer = [];
//                            console.log("flushed", [text, voice]);
                actor = "DEFAULT";
            }
        }

//        console.log("matches... ", matches);
        angular.forEach(matches, function (_match) {
            var match = _match.trim();
            if (isActorRegex.test(match)) {
                flushBuffer();
                actor = match.substring(0, match.length - 1);
//                            console.log("voice: ", voice);
            } else if (match.trim().length > 0) {
                buffer.push(match);
            }
        });
        flushBuffer();

    };

    return Script;

});
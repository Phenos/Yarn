yarn.service("Script", function (yConsole, storyLog, state) {

    var scriptCuttingRegex = /((^[A-Z ]+:)|(.*))/gm;
    var isActorRegex = /(^[A-Z ]+:)/g;

    function Script(text, source) {
        this.text = text;
        this.lines = [];
        this.position = 0;
        this.source = source;
    }

    Script.prototype.next = function () {
        this.position = this.position + 1;
    };

    Script.prototype.end = function () {
        return this.position >= this.lines.length;
    };

    Script.prototype.play = function () {
        var ellipsis = "";
        if (this.text > 30) {
            ellipsis = "[…]";
        }
        var textCropped = '"' + this.text.substring(0, 20) + ellipsis + '"';

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
        var matchvoiceToLogTypes = {
            action: "action",
            monologue: "log",
            insight: "insight",
            narrator: "log"
        };

        var logType = matchvoiceToLogTypes[voice];
        if (logType) {
//                console.log("Found builtin voice", voice);
            storyLog.buffer()[logType](statement);
        } else {
//          console.log("Looking for alternate voice", voice);
            // The voice doesnt match any standard voice, so we look for an actor
            var isActor = state.value("Subject is Actor", {Subject: voice});
            if (isActor) {
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

        angular.forEach(matches, function (_match) {
            var match = _match.trim();
            if (isActorRegex.test(match)) {
                flushBuffer();
                actor = match.substring(0, match.length - 1);
//                            console.log("voice: ", voice);
            } else {
                buffer.push(match);
            }
        });
        flushBuffer();

    };

    return Script;

});
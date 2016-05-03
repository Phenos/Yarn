yarn.service('transcript', function (state) {

    function Transcript() {
        var self = this;
        this._buffer = [];
        this.bufferedLogs = [];

        this.items = [];
        this.lastItemRead = 0;

        this.controller = {
            write: mockFunction("write"),
            clear: mockFunction("clear")
        };

        // Mock function that buffer function calls until the console is ready
        function mockFunction(fn) {
            return function () {
//                console.log("Log item buffered", fn, arguments);
                self._buffer.push([fn, arguments])
            }
        }
    }

    // Create and return a new buffered log
    // To be later flushed
    Transcript.prototype.buffer = function () {
        var bufferedLog = new Transcript();
//        console.log("Creating a buffered log ", bufferedLog);
        this.bufferedLogs.push(bufferedLog);
        return bufferedLog;
    };

    Transcript.prototype.flushBuffers = function () {
        var self = this;
        var log;
//        console.log("Flushing the log buffer", this.bufferedLogs);
        while (this.bufferedLogs.length) {
            log = this.bufferedLogs.shift();
            log.register(self.controller);
            log.flush();
        }
    };

    Transcript.prototype.flush = function () {
        var functionCall;
        var fn;
        while (this._buffer.length) {
            functionCall = this._buffer.shift();
            fn = this.controller[functionCall[0]];
            fn.apply(this.controller, functionCall[1]);
        }

    };

    Transcript.prototype.register = function (_controller) {
        this.controller = _controller;
    };

    Transcript.prototype.log = function (text) {
        this.controller.write(text, "log");
    };

    Transcript.prototype.headline = function (text) {
        this.controller.write(text, "headline");
    };

    Transcript.prototype.action = function (text) {
        this.controller.write("—" + text, "action");
    };

    Transcript.prototype.dialog = function (text, scope) {
//        console.log("SCOPE>>>>>> ", scope);
        var actorName = state.value("Subject has a Name", { Subject: scope.actor });
        var voiceLabel = actorName || scope.actor;
        this.controller.write(text, "dialog");
    };

    Transcript.prototype.topic = function (text, scope) {
//        console.log("SCOPE>>>>>> ", scope);
        this.controller.write("<strong> ></strong> " + text, "topic");
    };

    Transcript.prototype.insight = function (text) {
        this.controller.write(
            "<md-icon md-svg-icon='./svg-icons/insight.svg'></md-icon>" +
            text, "insight");
    };

    Transcript.prototype.prompt = function (prompt) {
        var scope = {
            prompt: prompt
        };
        this.controller.write("<user-choice prompt='prompt'></user-choice>", "prompt", scope);
    };

    Transcript.prototype.image = function (url) {
        this.controller.write("<img src='" + url + "' alt='coverpage'>", "image");
    };

    Transcript.prototype.error = function (text) {
        this.controller.write(text, "error");
    };

    Transcript.prototype.heading = function (text) {
        this.controller.write(text, "heading");
    };

    Transcript.prototype.subHeading = function (text) {
        this.controller.write(text, "subHeading");
    };

    Transcript.prototype.thingImage = function (url) {
        this.controller.write('<img src="' + url + '">', "thingImage");
    };

    Transcript.prototype.clear = function () {
        this.controller.clear();
    };

    Transcript.prototype.markAsRead = function () {
        this.controller.markAsRead();
    };

    return new Transcript();
});





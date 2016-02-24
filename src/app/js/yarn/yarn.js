yarn.service('yarn', function (State,
                               Script,
                               yConsole,
                               consoleHelper) {

    function Yarn() {
        var self = this;

        //todo : SCRIPT LOADED SHOULD NOT BE INJECTED AS ARG
        //this.scriptLoader = scriptLoader;

        this.script = null;
        this.scripts = [];
        this.state = new State();

        this.localState = {};
        this.id = ""; // String ID, should be set to either story url or ID configured in yarn script


        postal.subscribe({
            channel: "state",
            topic: "setAssertion",
            callback: function (assertion, envelope) {
                // If the story has started, log state changes to the console
                if (self.step() > 0) {
                    yConsole.log("Changed: " + consoleHelper.assertion2log(assertion));
                }
            }
        });

        this.run = function () {
            var self = this;
            this.scripts.forEach(function (script) {
                script.run(self.state);
            });
            return this;
        };

        this.restoreFromLocalState = function (localState) {
            var localStateObj;
            //console.log("restoreFromLocalState", localState);
            if (!localState[this.id]) localState[this.id] = {};
            localStateObj = localState[this.id];
            if (!localStateObj.assertions) localStateObj.assertions = {};

            this.state.restoreFromLocalState(localStateObj);
        };

        /**
         * Parse a text into various semantic parts to be consumed by Yarn
         * @param text
         * @param url
         */
            //todo: map exactly where script source is loaded
        this.load = function (text, url) {
            //console.log("yarn.load");
            var script = new Script();

            if (url) {
                script.url = url;
            }

            // Use url as initial ID (can be overwritted in yarn script)
            if (!this.id) this.id = url;

            if (!this.script) this.script = script;
            this.scripts.push(script);
            return script.load(text, url).then(function (v) {
                //console.log("script.load.then", v);
                return script;
            });
        };

        this.step = function (increment) {
            var state = this.state;
            var count = 0;
            var story = state.thing("Story");
            var hasStepped = state.predicate("hasStepped");

            var assertions = story.getAssertion(hasStepped);
            if (assertions.length) {
                if (typeof assertions[0].object === "number") {
                    count = assertions[0].object;
                }
            }

            if (increment && typeof(increment) === "number") {
                count = count + increment;
                story.setAssertion(hasStepped, count);
            }

            return count;
        }


    }

    return new Yarn();
});




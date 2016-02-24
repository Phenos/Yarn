yarn.service('yarn', function (state,
                               Script,
                               yConsole,
                               consoleHelper) {

    function Yarn() {
        var self = this;

        this.script = null;
        this.scripts = [];
        this.localState = {};
        this.id = ""; // String ID, should be set to either story url or ID configured in yarn script


        postal.subscribe({
            channel: "state",
            topic: "setAssertion",
            callback: function (assertion, envelope) {
                // If the story has started, log state changes to the console
                if (state.step() > 0) {
                    yConsole.log("Changed: " + consoleHelper.assertion2log(assertion));
                }
            }
        });

        this.run = function () {
            this.scripts.forEach(function (script) {
                script.run();
            });
            return this;
        };

        this.restoreFromLocalState = function (localState) {
            var localStateObj;
            //console.log("restoreFromLocalState", localState);
            if (!localState[this.id]) localState[this.id] = {};
            localStateObj = localState[this.id];
            if (!localStateObj.assertions) localStateObj.assertions = {};

            state.restoreFromLocalState(localStateObj);
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

    }

    return new Yarn();
});




yarn.service('yarn', function ($localStorage,
                               postal,
                               state,
                               script,
                               yConsole,
                               consoleHelper,
                               gamePedicates) {

    function Yarn() {

        this.localState = {};
        this.id = ""; // String ID, should be set to either story url or ID configured in yarn script
        this.scripts = [];

        postal.subscribe({
            channel: "state",
            topic: "setAssertion",
            callback: function (data) {
                // If the story has started, log state changes to the console
                if (state.step() > 0 && data.value() === true) {
                    yConsole.log("Changed: " + consoleHelper.assertion2log(data));
                }
            }
        });

        this.run = function () {
            this.scripts.forEach(function (script) {
                script.run();
            });
            return this;
        };

        this.restoreFromLocalState = function () {
            var localState = $localStorage.localState;
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
        this.load = function (text, url) {
            console.warn("Currently supporting only one script at once");
            //this.scripts = [];

            //if (url) {
            //    script.url = url;
            //}

            // Use url as initial ID (can be overwritted in yarn script)
            //if (!this.id) this.id = url;

            //this.scripts.push(script);

            return script.load(text, url).then(function () {
                //console.log("wtf", script);
                return script;
            });
        };

    }

    var yarn = new Yarn();

    gamePedicates(yarn);

    return yarn;
});




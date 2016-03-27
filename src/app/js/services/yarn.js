yarn.service('yarn', function ($localStorage,
                               postal,
                               state,
                               script,
                               yConsole,
                               consoleHelper,
                               gamePedicates) {

    function Yarn() {

        this.localState = {};
        this.scripts = [];

        postal.subscribe({
            channel: "state",
            topic: "setAssertion",
            callback: function (data) {
                // If the story has started, log state changes to the console
                if (state.step() > 0 && data.value() === true) {
                    yConsole.log("Changed: " + consoleHelper.assertion2log(data), {
                        source: data.source
                    });
                }
            }
        });

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
            return script.load(text, url).then(function () {
                //console.log("wtf", script);
                return script;
            });
        };

    }

    gamePedicates();

    var yarn = new Yarn();


    return yarn;
});

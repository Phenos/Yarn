"use strict";

angular.module('yarn').factory('Yarn', YarnService);

function YarnService(State, Logic, Script) {

    function Yarn() {

        //todo : SCRIPT LOADED SHOULD NOT BE INJECTED AS ARG
        //this.scriptLoader = scriptLoader;

        this.script = null;
        this.scripts = [];
        this.state = new State();
        this.logic = new Logic(this.state, this.scripts);
        this.localState = {};
        this.id = ""; // String ID, should be set to either story url or ID configured in yarn script

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

    return Yarn;
}




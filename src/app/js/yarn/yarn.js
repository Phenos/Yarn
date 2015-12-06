"use strict";

var yarn = angular.module('yarn', []);

angular.module('yarn').factory('Yarn', YarnService);

function YarnService(State, Logic, Script) {

    function Yarn() {

        //todo : SCRIPT LOADED SHOULD NOT BE INJECTED AS ARG
        //this.scriptLoader = scriptLoader;

        this.script = null;
        this.scripts = [];
        this.state = new State();
        this.logic = new Logic(this.state, this.scripts);

        this.run = function () {
            var self = this;
            this.scripts.forEach(function (script) {
                script.run(self.state);
            });
            return this;
        };

        /**
         * Parse a text into various semantic parts to be consumed by Yarn
         * @param text
         */
        //todo: map exactly where script source is loaded
        this.load = function (text, url) {
            console.log("yarn.load");
            var script = new Script();
            if (!this.script) this.script = script;
            this.scripts.push(script);
            return script.load(text, url).then(function (v) {
                console.log("script.load.then", v);
                return script;
            });
        };
    }

    return Yarn;
}




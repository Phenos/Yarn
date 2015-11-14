"use strict";

var yarn = angular.module('yarn', []);

angular.module('yarn').factory('Yarn', YarnService);

function YarnService(State, Logic, Script) {

    function Yarn() {

        //todo : SCRIPT LOADED SHOULD NOT BE INJECTED AS ARG
        //this.scriptLoader = scriptLoader;

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
        this.load = function (text) {
            var script = new Script();
            this.scripts.push(script);
            var promise = script.load(text).then(function () {
                return script;
            });
            return promise;
        };
    }

    return Yarn;
}




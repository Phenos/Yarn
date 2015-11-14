(function () {
    "use strict";
    angular.module('yarn').factory('Logic', LogicService);


    function LogicService() {
        function Logic(state, script) {
            this.state = state;
            this.script = script;
            this.routines = {};
        }

        Logic.prototype.register = function (id, fn) {
            var self = this;

            function routine() {
                return fn.apply(self, arguments);
            }

            this.routines[id] = routine;
        };

        Logic.prototype.trigger = function (subject, event, object) {
            console.log("Triggering events : ", event);
            // Get the propper predicate
            var predicate = this.state.predicate(event);
            if (predicate) {
                // Find any existing ActionHandles
                var actionHandler = this.state.getActionHandler(subject, predicate, object);

                if (actionHandler) {

                    // Find the script node which is child of the "do" operator
                    var referenceNode = this.script.references[actionHandler.do.id];
                    if (referenceNode) {
                        this.script.runtime.runNode(referenceNode);
                        // TODO Execute the node found
                        console.log("FOUND!!!!!", referenceNode);
                    } else {
                        console.log("No 'on' node reference found for " + actionHandler.do.id);
                    }
                }


                console.log("actionHandler", actionHandler);
            } else {
                console.log("Unknown action predicate: ", event);
            }
        };

        Logic.prototype.routine = function (id) {
            return this.routines[id];
        };

        return Logic;

    }


})();


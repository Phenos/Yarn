(function () {
    "use strict";

    angular.module('yarn').factory('Assertion', AssertionService);

    function AssertionService() {

        /**
         * An assertion about things in the graph
         * @param subject
         * @param predicate
         * @param object
         * @param layer
         * @constructor
         */
        function Assertion(subject, predicate, object) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.states = {};
        }

        Assertion.prototype.id = function() {
            var objectId = "";
            var subjectId = "";
            if (this.subject) subjectId = this.subject.id || "";
            if (!this.predicate.uniqueSubject) {
                if (this.object) objectId = this.object.id || "";
            }
            var id = [subjectId, this.predicate.id, objectId].join("-");
            console.log("id", id);
            return id;
        };

        /**
         * Output a assesions as JSON for a single state layer
         * @param layers
         * @param layerId
         * @returns {{}}
         */
        Assertion.prototype.toJSON = function(layers, layerId) {
            var json = {};
            var hasSessionLayer = this.valueLayer([layerId]);
            if (hasSessionLayer) {
                if (this.subject) {
                    json.subject = this.subject.id;
                }
                if (this.predicate) json.predicate = this.predicate.id;
                if (this.object) {
                    json.object = this.object.id;
                }
                json.value = this.value([layerId]);
            } else {
                json = false;
            }
            //console.log("json", json);
            return json;
        };

        // todo: value.value is confusing... find better taxonomy/syntax
        Assertion.prototype.set = function (value, layerId) {
            //console.log("===+++", value, layerId, this);
            if (!this.states[layerId])
                this.states[layerId] = new State(value, layerId);
            this.states[layerId].value = value;
            return this;
        };

        /**
         * Return a truth value according to a sequence of layers, the first layer being the lowest priority
         * @param {Array} layers
         * @returns {boolean}
         */
        Assertion.prototype.value = function (layers) {
            if (!layers) throw "Your must prodive an array of layers to obtain a value!";
            var isTrue = false;
            var topState = this.getTopState(layers);
            //console.log("=== Assertion", this, topState);
            if (topState && topState.value) isTrue = true;
            //console.trace("isTrue", isTrue, layers);
            return isTrue;
        };

        Assertion.prototype.valueLayer = function (layers) {
            var topState = this.getTopState(layers);
            var layerId = "";
            if (topState) layerId = topState.layerId;
            return layerId;
        };

        /**
         * Return the top most state according to a sequence of layers, the first layer being the lowest priority
         * @param {Array} layers
         * @returns {object}
         */
        Assertion.prototype.getTopState = function (layers) {
            var self = this;
            var topState;
            angular.forEach(layers, function (layerId) {
                var state = self.states[layerId];
                if (state && state.value) {
                    topState = state;
                }
            });
            return topState;
        };

        Assertion.prototype.removeState = function (layerId) {
            var self = this;
            angular.forEach(self.states, function (state, index) {
                // If a layerId has been provided and it matches
                // that state
                if (state.layerId === layerId) {
                    delete self.states[index];
                }
            });
        };


        function State(value, layerId) {
            this.value = value;
            this.layerId = layerId;
        }

        return Assertion;
    }

})();


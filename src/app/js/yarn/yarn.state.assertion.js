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

        // todo: value.value is confusing... find better taxonomy/syntax
        Assertion.prototype.set = function (value, layerId) {
            console.log("===+++", value, layerId, this);
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
            var topState = this.getTopState(layers);
            var isTrue = false;
            if (topState && topState.value) isTrue = true;
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

        function State(value, layerId) {
            this.value = value;
            this.layerId = layerId;
        }

        return Assertion;
    }

})();


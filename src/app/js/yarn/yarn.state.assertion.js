(function () {
    "use strict";

    angular.module('yarn').factory('Assertion', AssertionService);

    function AssertionService(layerSetup) {

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
            this.parent = null;
        }

        Assertion.prototype.id = function () {
            var objectId = "";
            var subjectId = "";
            if (this.subject) subjectId = this.subject.id || "";
            if (!this.predicate.uniqueSubject) {
                if (this.object) objectId = this.object.id || "";
            }
            var id = [subjectId, this.predicate.id, objectId].join("-");
            return id;
        };

        /**
         * Output a assesions as JSON for a single state layer
         * @param layers
         * @param layerId
         * @returns {{}}
         */
        Assertion.prototype.toJSON = function (layers, layerId) {
            var json = {};
            var hasSessionLayer = this.valueLayer([layerId]);
            if (hasSessionLayer) {
                if (this.subject) {
                    json.subject = this.subject.id;
                }
                if (this.predicate) json.predicate = this.predicate.id;

                if (this.object) {
                    if (typeof(this.object) === "number") {
                        json.object = this.object;
                    } else if (typeof(this.object) === "string") {
                        json.object = this.object;
                    } else {
                        json.object = "@id:" + this.object.id;
                    }
                }
                json.value = this.value([layerId]);
            } else {
                json = false;
            }
            //console.log("json", json);
            return json;
        };

        Assertion.prototype.set = function (value, layerId, parentId) {
            var stateId = layerId + "-" + (parentId || "");
            if (this.states[stateId]) {
                this.states[stateId].value = value;
            } else {
                this.states[stateId] = new State(value, layerId, parentId);
            }
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

        Assertion.prototype.isUniqueAndFalse = function () {
            var value;
            value = (
                this.predicate.uniqueSubject &&
                this.value(layerSetup) === false
            );
            return value;
        };

        /**
         * Return the top most state according to a sequence of layers, the first layer being the lowest priority
         * @param {Array} layers
         * @returns {object}
         */
        Assertion.prototype.getTopState = function (layers, parentId) {
            var self = this;
            var topState = null;
            //TODO: REALLY NOT PERFORMANT
            if (angular.isArray(layers)) {
                angular.forEach(layers, function (layerId) {
                    angular.forEach(self.states, function (state) {
                        var match = true;
                        if (state.layerId !== layerId) match = false;
                        if (parentId) {
                            if (state.parentId !== parentId) match = false;
                        } else {
                            // If not parent Id is supplied, then we discard any
                            // state that might have a parent id
                            if (state.parentId) match = false;
                        }
                        if (match) topState = state;
                    });
                });
            } else {
                console.error("LayerSetup must be an array... maybe you failed to inject layerSetup! idiot!")
            }
            return topState;
        };

        Assertion.prototype.removeState = function (layerId, parentId) {
            var self = this;
            angular.forEach(self.states, function (state, index) {
                var shouldDelete = true;

                if (layerId && layerId !== state.layerId) shouldDelete = false;
                if (parentId && parentId !== state.parentId) shouldDelete = false;

                if (shouldDelete) {
                    //console.log("deleted state ", layerId, index);
                    delete self.states[index];
                }
            });
        };


        function State(value, layerId, parentId) {
            this.value = value;
            this.layerId = layerId;
            this.parentId = parentId;
        }

        return Assertion;
    }

})();


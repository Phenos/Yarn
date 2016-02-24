(function () {
    "use strict";

    yarn.factory('Assertion', AssertionService);

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
            this.states = [];
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

        Assertion.prototype.set = function (value, layerId, parentThing) {
            if (parentThing) {
                //console.log("parentThing", this);
            }
            var alreadyExistingState = this.get(layerId, parentThing);
            if (alreadyExistingState) {
                alreadyExistingState.value = value;
            } else {
                this.states.push(
                    new AssertionState(this, value, layerId, parentThing)
                );
            }

            postal.publish({
                channel: "state",
                topic: "setAssertion",
                data: this
            });

            return this;
        };

        Assertion.prototype.get = function (layerId, parentThing) {
            var returnValue = null;
            var foundStates = this.states.filter(function (state) {
                return (layerId === state.layerId && parentThing === (state.parent || null))
            });
            if (foundStates.length) {
                returnValue = foundStates[0];
            }
            return returnValue;
        };

        /**
         * Return a truth value according to a sequence of layers, the first layer being the lowest priority
         * @param {Array} layers
         * @returns {boolean}
         */
        Assertion.prototype.value = function (_layers) {
            var layers = _layers || layerSetup;
            var isTrue = false;
            var topState = this.getTopState(layers);
            //console.log("=== Assertion", this, topState);
            if (topState && topState.value) isTrue = true;
            //console.trace("isTrue", isTrue, layers);
            return isTrue;
        };

        Assertion.prototype.valueLayer = function (_layers) {
            var layers = _layers || layerSetup;
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
         * @param _layers
         * @param parentThing
         * @returns {object}
         */
        Assertion.prototype.getTopState = function (_layers, parentThing) {
            var layers = _layers || layerSetup;
            var self = this;
            var topState = null;
            //TODO: REALLY NOT PERFORMANT, TOO MANY CAAALLLLLS
            if (angular.isArray(layers)) {
                angular.forEach(layers, function (layerId) {
                    angular.forEach(self.states, function (state) {
                        var match = true;
                        if (state.layerId !== layerId) match = false;
                        if (parentThing) {
                            if (state.parent !== parentThing) match = false;
                        } else {
                            // If not parent Id is supplied, then we discard any
                            // state that might have a parent id
                            if (state.parent) match = false;
                        }

                        if (match) {
                            topState = state;
                        }

                    });
                });
            } else {
                console.error("LayerSetup must be an array... maybe you failed to inject layerSetup?  layerSetup = " + layerSetup);
            }
            return topState;
        };

        Assertion.prototype.removeState = function (layerId, parentThing) {
            var self = this;
            self.states = self.states.filter(function (state, index) {
                var shouldDelete = true;

                if (layerId && layerId !== state.layerId) shouldDelete = false;
                if (parentThing && parentThing !== state.parentThing) shouldDelete = false;

                if (shouldDelete) {
                    //console.log("deleted state ", layerId, index);
                    state.dettachFromParent();
                }

                return !shouldDelete;
            });
        };


        function AssertionState(assertion, value, layerId, parentThing) {
            this.assertion = assertion;
            this.value = value;
            this.layerId = layerId;
            this.parent = null;
            if (parentThing) this.attachToParent(parentThing);
        }

        AssertionState.prototype.attachToParent = function(parentThing) {
            this.parent = parentThing;
            parentThing.attachToState(this);
        };

        AssertionState.prototype.dettachFromParent = function() {
            if (this.parent) {
                this.parent.dettachFromState(this);
                this.parent = null;
            }
        };

        return Assertion;
    }

})();


yarn.service('state', function (Assertion,
                                Assertions,
                                transactions,
                                Thing,
                                things,
                                Syntax,
                                Predicate,
                                predicates,
                                yConsole,
                                assert,
                                session,
                                editors,
                                profiles,
                                guid,
                                lodash,
                                templating,
                                parseAssert,
                                editorFiles,
                                storyLocalStorage,
                                channel) {

        function State() {
            var self = this;
            this.assertions = new Assertions();
            this.currentLayer = "code";
            this.localState = null;

            this.ready(false, "loading", "Loading...");

            channel.subscribe("editorFiles.change", function (file) {
                self.persistEditorFiles(file);
            });
        }

        State.prototype.ready = function (isReady, status, message) {
            var readyness = this.readyness = this.readyness || {};
            if (angular.isDefined(isReady)) {
                readyness.isReady = isReady;
            }
            if (angular.isDefined(status)) {
                readyness.message = message;
            }
            if (angular.isDefined(message)) {
                readyness.status = status;
            }
            return this.readyness;
        };

        State.prototype.undo = function () {
            transactions.undo(this);
        };

        /**
         * Persist one or all files to localStorage
         * @param {EditorFile} file A file to persist to local storage
         * @returns {undefined}
         */
        State.prototype.persistEditorFiles = function (file) {
            var projectFiles = storyLocalStorage.get("editorFiles");

//            console.log("persist -->", file);
            if (projectFiles) {

                if (!angular.isArray(projectFiles.files)) {
                    projectFiles.files = [];
                }

                if (file) {
                    // The filename stored is prefixed with the profile name
                    // and will be re-used later when re-loading the file.
                    projectFiles.files.push({
                        uri: file._uri,
                        profile: file.profile.username
                    });
                } else {
                    projectFiles.files = [];
                    angular.forEach(editorFiles.files, function (_file) {
                        projectFiles.files.push({
                            uri: _file._uri,
                            profile: _file.profile.username
                        });
                    });
                }
            }
        };

        /**
         * Reload the list open files from localStorage
         * @returns {undefined}
         */
        State.prototype.reloadFromLocalStorage = function () {
            var projectFiles = storyLocalStorage.get("editorFiles");

            var lastFocusFromMemory = editors.lastFocusFromMemory();

//            console.log("sessionFiles", sessionFiles);
            if (projectFiles) {
                if (angular.isArray(projectFiles.files)) {
                    var oldList = projectFiles.files;
                    projectFiles.files = [];
                    angular.forEach(oldList, function (file) {
//                        console.log("file", file);
                        var setFocus = false;
                        if (lastFocusFromMemory === file) {
                            setFocus = true;
                        }

                        var profile = profiles.get(file.profile);
                        var newFile = editorFiles.open(profile, file.uri, setFocus);
                    });
                }
            }
        };

        State.prototype.restoreFromLocalState = function () {
            var self = this;

            console.info("Restoring assersions from localStorage");

            // TODO: Try to find a way notto inject state here...
            var storyStorage = storyLocalStorage.get(this);
            var localAssertions = storyStorage.assertions || {};

//            console.log("Restoring assertion from localState", localAssertions);

            angular.forEach(localAssertions, function (assertion) {
                var object = null;
                var subject = null;

                // todo : Refactor the following next two blocks for D.R.Y.

                if (typeof(assertion.object) === "number") {
                    object = assertion.object;
                } else if (typeof(assertion.object) === "string") {
                    if (assertion.object.indexOf("@id:") === 0) {
                        object = things.get(assertion.object.substring(4));
                    } else {
                        object = assertion.object;
                    }
                }

                if (typeof(assertion.subject) === "number") {
                    object = assertion.subject;
                } else if (typeof(assertion.subject) === "string") {
                    if (assertion.subject.indexOf("@id:") === 0) {
                        subject = things.get(assertion.subject.substring(4));
                    } else {
                        subject = assertion.subject;
                    }
                }

                self.createAssertion(
                    subject,
                    predicates(assertion.predicate),
                    object, {
                        noTransaction: true,
                        value: assertion.value
                    }
                );
            });
        };


        State.prototype.resolveAll = function resolveAll(assert, returnAssertions) {
            var foundAssertions = [];
            var foundThings = [];
            if (assert && (assert.subject && assert.predicate) ||
                (assert.object && assert.predicate)) {
                var foundObjectsSets = {};

                // Exclused parented assertions unless already specified
                if (angular.isUndefined(assert.parent)) {
                    assert.parent = null;
                }

                // Match all assertions to the criterias
                var assertions = this.assertions.find(assert);

                // Sort assertion by weight
                assertions = assertions.sort(function (a, b) {
                    return a.weight() - b.weight();
                });

                // Check if the item to be resolved is the object or the subject
                var typeToResolve = (assert.object) ? "subject" : "object";

                // Split all assertion by their unique thing to be resolved
                assertions.forEach(function (assertion) {
                    var foundObjectSet;
                    if (assertion[typeToResolve]) {
                        foundObjectSet = foundObjectsSets[assertion[typeToResolve].id];
                        if (!foundObjectSet) {
                            foundObjectSet = foundObjectsSets[assertion[typeToResolve].id] = [];
                        }
                        foundObjectSet.push(assertion);
                    }
                });

                angular.forEach(foundObjectsSets, function (foundObjectSet) {
                    var topAssertion = foundObjectSet[foundObjectSet.length - 1];
                    if (topAssertion.value()) {
                        foundAssertions.push(topAssertion);
                        foundThings.push(topAssertion[typeToResolve]);
                    }
                });
//                console.log("FOUND: ", foundObjects);

            }

//            console.log("foundObjects", foundObjects);
            return (returnAssertions) ? foundAssertions : foundThings;
        };

        State.prototype.resolveOne = function (_assert) {
            var value = null;
            var objs = this.resolveAll(_assert);
            if (objs.length) {
                // We make sure that the top-most item is taken, in a case where
                // multiple assertions would have been true, the heaviest one
                // should be used
                value = objs[objs.length - 1];
            }
            return value;
        };

        State.prototype.resolveRawValue = function (_assert) {
            var value = null;
            if (_assert && (_assert.subject && _assert.predicate)) {

                // Exclused parented assertions
                _assert.parent = null;

                // If no object is supplied as criteria,
                // If no object is supplied as criteria,
                // indicate is should match for "no objects"
                if (!_assert.object) {
                    _assert.object = null;
                }

                // Match all assertions to the criterias
                var assertions = this.assertions.find(_assert);

//                console.log("criterias", criterias);
//                console.log("assertions", assertions);

                // Sort assertion by weight
                assertions = assertions.sort(function (a, b) {
                    return a.weight() - b.weight();
                });

                var topAssertion = assertions[assertions.length - 1];
                if (topAssertion) {
                    value = topAssertion.value();
                }

            }
//            console.log("foundObjects", foundObjects);
            return value;
        };

        State.prototype.applyObjectAsStageChange = function (object) {
            var self = this;
            var undef = void 0;
            var childAssertions = self.assertions.find(assert(undef, undef, undef, {
                parent: object.id
            }));
            angular.forEach(childAssertions, function (assertion) {
                self.createAssertion(assertion.subject, assertion.predicate, assertion.object, {
                    value: assertion.value(),
                    source: assertion.source
                });
            });
        };

        State.prototype.resolveValue = function (assert, scope) {
            var value = this.resolveRawValue(assert);
//            console.log("rawValue: ", rawValue);
            if (angular.isString(value)) {
                value = this.render(value, scope);
            }
//            console.log("resolveValue: ", value);
            return value;
        };

        State.prototype.value = function (assertion, scope) {
            var _assert = parseAssert(assertion, scope);
            return this.resolveValue(_assert, scope);
        };

        State.prototype.one = function (assertion, scope) {
            var _assert = parseAssert(assertion, scope);
            return this.resolveOne(_assert);
        };

        State.prototype.oneAssertion = function (assertion, scope) {
            var _assert = parseAssert(assertion, scope);
            return this.resolveOne(_assert, true);
        };

        State.prototype.many = function (assertion, scope) {
            var _assert = parseAssert(assertion, scope);
            return this.resolveAll(_assert);
        };

        State.prototype.manyAssertions = function (assertion, scope) {
            var _assert = parseAssert(assertion, scope);
            return this.resolveAll(_assert, true);
        };

        State.prototype.render = function (template, scope) {
            var _scope = this.scope(scope);
            return templating.render(template, _scope)
        };

        State.prototype.createAssertion = function (subject, predicate, object, _options) {
            var options = _options || {};
            var assertion;
//            console.log("options", options.source.uri);
            if (subject && predicate && object) {
                var _predicate = predicate;

                // If the predicate is a negation, we find the positive predicate
                // and force the value to false. We also warn if the author attempts
                // to set a value with a negative predicate
                if (typeof(_predicate.negative) === "string" && _predicate.negative !== "") {
                    if (angular.isDefined(options.value)) {
                        yConsole.error(
                            ["Setting a value with a negative assertion is not allowed. Ref.: ",
                                subject.id,
                                predicate.id,
                                object.id
                            ].join(" "));
                    }
                    options.value = false;
                    _predicate = predicates(predicate.negative);
                }

                // If no value is provided, we set "true" as the default
                if (angular.isUndefined(options.value)) {
                    options.value = true;
                }

                // If not layer is provided, we set the "currentLayer"
                if (!options.layer) {
                    options.layer = this.currentLayer;
                }

                /* ----- */
                // TODO:TEST: Dont negate assertions before knowing if an
                // existing assertion can bemodifier
                if (!options.parent && this.currentLayer !== "code") {
                    // Find exquivalent assertions to be negated
                    this.negate(assert(subject, _predicate, object));
                }
                /* ----- */

                var _assert = assert(subject, _predicate, object, {
                    layer: options.layer,
                    parent: options.parent
                });

                var identicalAssertions = this.assertions.filter(_assert);
                if (identicalAssertions.count() > 0) {
                    var topAssertion = identicalAssertions.sortByWeight().top();
                    if (topAssertion.layer === "code") {
                        // If the top assertion in on the static code layer
                        // We create a new assertion anyways
                        assertion = new Assertion(subject, _predicate, object, options);
                        this.assertions.add(assertion);
                        if (!options.noTransaction) {
                            channel.publish("state.createAssertion", {assertion: assertion});
                        }
                        this.persistAssertion(assertion);
                    } else {
                        var replaced = topAssertion.value();
                        // Else we re-use the existing assertion
                        if (angular.isDefined(options.evaluatedValue)) {
                            topAssertion.value(options.evaluatedValue);
                        } else {
                            topAssertion.value(options.value);
                        }
                        if (!options.noTransaction) {
                            channel.publish("state.updateAssertion", {
                                replaced: replaced,
                                assertion: topAssertion
                            });
                        }
                        this.persistAssertion(topAssertion);
                    }
                } else {
                    assertion = new Assertion(subject, _predicate, object, options);
                    this.assertions.add(assertion);
                    if (!options.noTransaction) {
                        channel.publish("state.createAssertion", {
                            assertion: assertion
                        });
                    }
                    this.persistAssertion(assertion);
                }

            } else {
                console.error("Impossible to create an incomplete assertion.", arguments);
            }
//            console.log("created: ", assertion);

            return assertion;
        };

        /*
         * Persist an assertion to localState for it "session" state layer (aka localStorage)
         * If the session layer is empty, the assertion is removed
         */
        State.prototype.persistAssertion = function (assertion) {
            var storyStorage = storyLocalStorage.get(this);

            if (!storyStorage.assertions) {
                storyStorage.assertions = {}
            }

//            console.log("persistAssertion", assertion, assertion.layer);
            if (assertion.layer === "session") {
                var json = assertion.toJSON();
                if (json) {
                    storyStorage.assertions[assertion.id()] = json;
                } else {
                    delete storyStorage.assertions[assertion.id()];
                }
            }
        };

        State.prototype.UnpersistAssertions = function (_assertions) {
            // todo: refactor: Initialising the localStorage this
            // way is not elegant.... use .ensure() pattern
            var storyStorage = storyLocalStorage.get(this);

            if (!storyStorage.assertions) {
                storyStorage.assertions = {}
            }

//            console.log("State.UnpersistAssertions", _assertions);
            var assertions = _assertions;
            if (!angular.isArray(assertions)) {
                assertions = [assertions];
            }

            angular.forEach(assertions, function (assertion) {
//                console.log("persistAssertion", assertion, assertion.layer);
                if (assertion.layer === "session") {
                    delete storyStorage.assertions[assertion.id()];
                }
            });
        };

        State.prototype.negate = function (assert) {
            var self = this;

            if (assert.layer) {
                throw "Cannot specify layer when negating assertions";
            }
            if (assert.parent) {
                throw "Cannot specify parent when negating assertions";
            }

            var groupedAssertions = this.assertions
                .filter(assert)
                .groupByTripple();

//            console.log("groupedAssertions", groupedAssertions);

            angular.forEach(groupedAssertions, function (assertions) {
                var topAssertion = assertions.sortByWeight().top();
                // First, we check wether the top assertion is already negative
                if (topAssertion.value() !== false) {
                    // Then we check if the topAssertion is on the static world layer
                    if (topAssertion.layer === "code") {
                        // If so, we create a new assertion on top to negate it
                        var newAssertion = topAssertion.clone();
                        if (self.currentLayer === "code") {
                            newAssertion.layer = "session";
                        } else {
                            newAssertion.layer = self.currentLayer;
                        }
                        newAssertion.parent = null;
                        newAssertion.value(false);

                        self.assertions.add(newAssertion);
                        channel.publish("state.createAssertion", {assertion: newAssertion});
//                        console.log("---------- negate2 ----> created new", newAssertion);
                        self.persistAssertion(newAssertion);
                    } else {
                        // Now we test if we have an underlying layer with a value,
                        // is so, we re-assign a "false" value to the current assertion
                        // if not, we can simply delete the assertion
                        var valueExistsUnder = assertions.count() > 1;

                        if (valueExistsUnder) {
                            var replaced = topAssertion.value();
                            topAssertion.value(false);

                            channel.publish("state.updateAssertion", {
                                replaced: replaced,
                                assertion: topAssertion
                            });

                            self.persistAssertion(topAssertion);
//                            console.log("---------- negate2 ----> reassigned to false",
//                              topAssertion);
                        } else {
                            var deleted = topAssertion;
                            self.assertions.remove(topAssertion);
                            channel.publish("state.deleteAssertion", {assertion: deleted});
                            self.UnpersistAssertions(topAssertion);
//                            console.log("---------- negate2 ----> Discarded", topAssertion);
                        }
                    }
                } else {
//                    console.log("---------- negate2 ----> already negative", topAssertion);
                }
            });


        };
        /*



         console.log("wasInAssertions", wasInAssertions);
         angular.forEach(wasInAssertions, function (assertion) {
         });

         */


        State.prototype.step = function (increment) {
            var count = 0;
            var stepCount = this.resolveValue(assert("Story", "has", "Steps"));
            if (stepCount) {
                if (typeof stepCount === "number") {
                    count = stepCount;
                }
            }

            if (increment && typeof(increment) === "number") {
                count = count + increment;
                var story = things.get("Story");
                var steps = things.get("Steps");
                var has = predicates("has");
                this.createAssertion(story, has, steps, {
                    value: count
                });
            }

            return count;
        };

        State.prototype.scope = function (_scope) {
            var state = this;
            var newScope = {};

            function timeOfDay(value) {
                var d = new Date(1976, 1, 1, 0, value, 0, 0);
                var minutesStr = "00" + d.getMinutes();
                return d.getHours() + ":" + (minutesStr).substr(minutesStr.length - 2, 2);
            }

            // todo: move this in the "templating" service
            function _assert(assertion) {
//                console.log("assert: " + assertion);
                var __assert = parseAssert(assertion);
                return state.resolveValue(__assert);
            }

            // todo: move this in the "templating" service
            function _value(assertion, scope) {
                var __scope = angular.extend({}, newScope, scope);
//                console.log("value: " + value);
                return state.value(assertion, __scope);
            }

            // todo: move this in the "templating" service
            function assertRaw(assertion) {
//                console.log("assertRaw: " + assertion);
                var __assert = parseAssert(assertion);
                return state.resolveRawValue(__assert);
            }

            var baseScope = {
                lodash: lodash,
                value: _value,
                assert: _assert,
                assertRaw: assertRaw,
                state: {
                    steps: this.step()
                }, format: {
                    timeOfDay: timeOfDay
                }
            };

            angular.extend(newScope, baseScope, _scope);

            return newScope;
        };

        return new State();

    }
);


(function (Cursor) {
    "use strict";
    angular.module('yarn').factory('Runtime', RuntimeService);

    function RuntimeService(Cursor) {

        var runtimeModes = {
            "when": true,
            "do": true,
            "on": true
        };


        /**
         * Runtime class user to execute the ast with the state
         * @param ast
         * @param state
         * @param onModeChange
         * @constructor
         * @return {string}
         */
        function Runtime(ast, state, onModeChange, onImport) {
            this.ast = ast;
            this.state = state;
            this.cursor = new Cursor();
            this.stack = new Stack();
            // Allows the logic class to keep track on special key nodes
            this.onModeChange = onModeChange || function () {};
            this.onImport = onImport || function () {};
        }

        // todo: See if code should be generalized between Stack/Pointer/Cursor
        // todo: Put Stack in its own service!
        function Stack() {
            this.scopes = [];
        }

        Stack.prototype.size = function () {
            return this.scopes.length;
        };

        Stack.prototype.head = function () {
            return this.scopes[this.scopes.length - 1];
        };

        Stack.prototype.parent = function () {
            var offset = (this.scopes.length > 2) ? 2 : 1;
            return this.scopes[this.scopes.length - offset];
        };

        Stack.prototype.root = function () {
            return this.scopes[0];
        };

        Stack.prototype.push = function (mode, obj) {
            //console.log("Pushed : ", obj);
            var head = this.head();
            this.scopes.push(new Scope(mode, obj, head));
        };

        Stack.prototype.pop = function () {
            //console.log("pop!");
            this.scopes.pop();
        };

        function Scope(mode, obj, parent) {
            this.values = obj;
            this.parent = parent;
            this.values["$mode"] = mode;
        }

        /**
         * Start to execute the AST
         */
        Runtime.prototype.run = function () {
            this.cursor.start(this.ast.root);
            this.runNode(this.ast.root);
        };

        Runtime.prototype.runNode = function (node) {
            var self = this;

            var returnValue;

            var defaultMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!
                    runtime.stack.push("default", {
                        "this": "root"
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                },
                "symbol": function (runtime, node) {
                    console.log("symbole ", node.value);
                    // Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("default", {
                        "this": returnValue
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    returnValue = node.value;
                    runtime.stack.push("default", {
                        "this": node.value
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    console.log("instruction ", node.value);
                    var predicate;
                    var args;
                    var mode;
                    // First, test if the instruction is for a mode change or a predicate
                    var modeHandler = modes[node.value.trim().toLowerCase()];
                    if (modeHandler) {
                        mode = node.value.trim().toLowerCase();
                        runtime.stack.push(mode, {
                        });
                        runtime.runSet(node.set);
                        runtime.stack.pop();

                    } else {

                        // Identify which predicate corresponds to this instruction
                        predicate = runtime.state.predicate(node.value);
                        // Run the child set of node to be used by the predicate
                        args = runtime.runSet(node.set);
                        // Create assertion from predicate
                        if (args.length) {
                            args.forEach(function (arg) {
                                //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                                var currentThis = runtime.stack.head().values.this;
                                var assertion = runtime.state.setAssertion(currentThis, predicate, arg);
                                console.log("created assetion: ", assertion);
                            });
                        } else {
                            var currentThis = runtime.stack.head().values.this;
                            runtime.state.setAssertion(currentThis, predicate);
                        }
                    }
                    return null;
                },
                "fallback": function (runtime, node) {
                    console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                    return null;
                }
            };

            var whenMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!

                    //runtime.stack.push("default", {
                    //    "this": "root"
                    //});
                    //runtime.runSet(node.set);
                    //runtime.stack.pop();
                },
                "symbol": function (runtime, node) {
                    // whenMode: Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("when", {
                        "this": returnValue
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    runtime.stack.push("when", {
                        "this": node.value
                    });
                    returnValue = node.value;
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    var predicate;
                    var args;

                    if (node.value === "do" ) {


                        var parent = runtime.stack.parent();
                        //debugger;
                        args = runtime.runSet(node.set);
                        parent.values["$do"] = args;

                    } else {

                        // Identify which predicate corresponds to this instruction
                        predicate = runtime.state.predicate(node.value);
                        // Run the child set of node to be used by the predicate
                        args = runtime.runSet(node.set);

                        var head = runtime.stack.head();
                        // Add a collection of action handler to add the "do" to then afterward
                        var actionHandlers = head.values.actionHandlers = [];

                        var doReferences = head.values["$do"] || [];

                        // Create assertion from predicate
                        //TODO: Instead of an "if", simply prefil the args with [undefined] if no args
                        if (args.length) {
                            args.forEach(function (arg) {
                                //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                                var currentThis = runtime.stack.head().values.this;
                                //console.log("runtime.stack.head().values", runtime.stack.head().values);
                                doReferences.forEach(function (doReference) {
                                    var actionHandler = runtime.state.setActionHandler(currentThis, predicate, arg, doReference);
                                    actionHandlers.push(actionHandler);
                                });
                                //console.log("created assetion: ", arg);
                            });
                        } else {
                            var currentThis = runtime.stack.head().values.this;
                            doReferences.forEach(function (doReference) {
                                var actionHandler = runtime.state.setActionHandler(currentThis, predicate, null, doReference);
                                actionHandlers.push(actionHandler);
                            });
                        }

                        //debugger;

                    }
                    return null;
                },
                "fallback": function (runtime, node) {
                    console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                    return null;
                }
            };


            var importMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!
                },
                "symbol": function (runtime, node) {
                    // whenMode: Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("when", {
                        "this": returnValue
                    });


                    // Call the onImport to trigger the loading and execution
                    // of an imported file
                    self.onImport(returnValue);
                    // DONT RUN THE SET ????
                    // todo: figure out...
                    //runtime.runSet(node.set);

                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    runtime.stack.push("import", {
                        "this": node.value
                    });
                    returnValue = node.value;
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    //var predicate;
                    //var args;
                    //
                    //if (node.value === "do" ) {
                    //
                    //
                    //    var parent = runtime.stack.parent();
                    //    //debugger;
                    //    args = runtime.runSet(node.set);
                    //    parent.values["$do"] = args;
                    //
                    //} else {
                    //
                    //    // Identify which predicate corresponds to this instruction
                    //    predicate = runtime.state.predicate(node.value);
                    //    // Run the child set of node to be used by the predicate
                    //    args = runtime.runSet(node.set);
                    //
                    //    var head = runtime.stack.head();
                    //    // Add a collection of action handler to add the "do" to then afterward
                    //    var actionHandlers = head.values.actionHandlers = [];
                    //
                    //    var doReferences = head.values["$do"] || [];
                    //
                    //    // Create assertion from predicate
                    //    //TODO: Instead of an "if", simply prefil the args with [undefined] if no args
                    //    if (args.length) {
                    //        args.forEach(function (arg) {
                    //            //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                    //            var currentThis = runtime.stack.head().values.this;
                    //            //console.log("runtime.stack.head().values", runtime.stack.head().values);
                    //            doReferences.forEach(function (doReference) {
                    //                var actionHandler = runtime.state.setActionHandler(currentThis, predicate, arg, doReference);
                    //                actionHandlers.push(actionHandler);
                    //            });
                    //            //console.log("created assetion: ", arg);
                    //        });
                    //    } else {
                    //        var currentThis = runtime.stack.head().values.this;
                    //        doReferences.forEach(function (doReference) {
                    //            var actionHandler = runtime.state.setActionHandler(currentThis, predicate, null, doReference);
                    //            actionHandlers.push(actionHandler);
                    //        });
                    //    }
                    //
                    //    //debugger;
                    //
                    //}
                    //return null;
                }
            };

            // Dont execute enything from a "on" node
            var onMode = {
                "root": function (runtime, node) {
                },
                "symbol": function (runtime, node) {
                },
                "value": function (runtime, node) {
                },
                "instruction": function (runtime, node) {
                },
                "fallback": function (runtime, node) {
                }
            };

            var modes = {
                "default": defaultMode,
                "import": importMode,
                "when": whenMode,
                "do": {}, //TODO: Not yet implement... really needed ?
                "on": onMode
            };


            this.cursor.push(node);

            var mode;
            var head = this.stack.head();
            if (!head) {
                mode = "default";
            } else {
                mode = head.values["$mode"];
                //console.log('-----head.values', mode, node.type, head.values);
                if (!mode) mode = "default";

                // Detect a mode change from parent node. Ex: when, on
                var parent = head.parent;
                if (parent) {
                    var parentMode = head.parent.values["$mode"];
                    if (!parentMode) parentMode = "default";
                    if (mode !== parentMode) this.onModeChange(mode, node);
                }

            }


            var nodeHandler = modes[mode][node.type];
            //console.log("  nodeHandler :   ", nodeHandler);

            if (!nodeHandler) {
                nodeHandler = modes.default.fallback;
            }


            returnValue = nodeHandler(this, node);


            this.cursor.pop();

            return returnValue;
        };

        Runtime.prototype.runSet = function (set) {
            var self = this;
            var args = [];

            set.nodes.forEach(function (node) {
                // Return the node value as an argument to be consumed
                args.push(self.runNode(node));
            });
            return args;
        };

        return Runtime;

    }


})();


(function (Cursor) {
    "use strict";
    yarn.factory('Runtime', RuntimeService);

    function RuntimeService(state,
                            Cursor,
                            yConsole) {

        /**
         * Runtime class user to execute the ast with the state
         * @param ast
         * @param state
         * @constructor
         * @return {string}
         */
        function Runtime(ast) {
            this.ast = ast;
            this.cursor = new Cursor();
            this.stack = new Stack();
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

        Stack.prototype.push = function (obj) {
            //console.log("Pushed : ", obj);
            var head = this.head();
            this.scopes.push(new Scope(obj, head));
        };

        Stack.prototype.pop = function () {
            //console.log("pop!");
            this.scopes.pop();
        };

        function Scope(obj, parent) {
            this.values = obj;
            this.parent = parent;
        }

        /**
         * Start to execute the AST
         */
        Runtime.prototype.run = function () {
            this.cursor.start(this.ast.root);
            return this.runNode(this.ast.root);
        };

        Runtime.prototype.runNode = function (node) {
            var returnValue;
            var nodeHandlers = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!
                    runtime.stack.push({
                        "this": "root"
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                },
                "symbol": function (runtime, node) {
                    var children;

                    //console.log("symbole ", node.value);
                    // Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = state.thing(node.value);
                        node.resolvedTo = returnValue;
                    } else if (node.variant === "constant") {
                        console.error("Constants not supported yet! : " + node.value);
                        //returnValue = state.thing(node.value);
                    } else {
                        console.error("Compilation error: Unknown node variant [" + node.variant + "]", node);
                        yConsole.error("Compilation error: Unknown node variant [" + node.variant + "-" + node.type + "-" + node.value+ "]");
                    }


                    var frame = {
                        "this": returnValue
                    };
                    runtime.stack.push(frame);

                    children = runtime.runSet(node.set);


                    runtime.stack.pop();
                    return [returnValue, children];
                },
                "value": function (runtime, node) {
                    var children;
                    returnValue = node.value;
                    runtime.stack.push({
                        "this": node.value
                    });
                    children = runtime.runSet(node.set);
                    runtime.stack.pop();
                    return [returnValue, children];
                },
                "instruction": function (runtime, node) {
                    //console.log("instruction ", node.value);
                    var predicate;
                    var args;
                    var createdAssertions = [];
                    if (node.value === "@imported") {
                        //console.log("Running imported node", node);
                        runtime.runSet(node.set);
                    } else {
                        var parent;
                        var parentObject;
                        // Check if the assertion needs to be assigned a parent Thing
                        var parentScope = runtime.stack.parent();
                        //if (parentScope) parentScope = runtime.stack.parent();
                        if (parentScope) {
                            parentObject = parentScope.values.this;
                            if ((parentObject && parentObject.constructor.name) === "Thing") {
                                var headObject = runtime.stack.head().values["this"];
                                if (parentObject && parentObject !== headObject) {
                                    parent = parentObject;
                                }
                            }
                        }

                        // Identify which predicate corresponds to this instruction
                        predicate = state.predicate(node.value);
                        // Run the child set of node to be used by the predicate
                        args = runtime.runSet(node.set);
                        // Create assertion from predicate
                        if (args.length) {
                            args.forEach(function (arg) {
                                var object = arg[0];
                                var children = arg[1] || [];
                                var value;
                                //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                                var headNode = runtime.stack.head();
                                var currentThis = headNode.values.this;
                                if (currentThis) {
                                    // Before creating the assertion, check if it is followed by values to be assigned
                                    if (children && children.length) {
                                        // Currently, only the first value is taken in account and used as a value
                                        value = children[0][0];
                                    }
                                    createdAssertions.push(
                                        state.createAssertion(currentThis, predicate, object, {
                                            parent: parent,
                                            value: value
                                        })
                                    );
                                    //console.log("created assetion: ", assertion);
                                } else {
                                    // Nothing to do!
                                    // Probably because a naked predicate such as "the" has been used on
                                    // the root node.
                                }
                            });
                        } else {
                            var currentThis = runtime.stack.head().values.this;
                            createdAssertions.push(
                                state.createAssertion(currentThis, predicate, null, {
                                    parent: parent
                                })
                            );
                        }

                    }
                    return null;
                },
                "fallback": function (runtime, node) {
                    console.error("Compilation error: Set ignored, unrecognised node type [" + node.type + "]", node);
                    yConsole.error("Compilation error: Set ignored, unrecognised node type [" + node.type + "]");
                    return null;
                }
            };

            this.cursor.push(node);
            var nodeHandler = nodeHandlers[node.type];
            returnValue = nodeHandler(this, node);

            this.cursor.pop();

            return returnValue;
        };

        // Returns an array of arrays containing pairs of [value, children]
        Runtime.prototype.runSet = function (set) {
            var self = this;
            var args = [];

            set.nodes.forEach(function (node) {
                var nodeValue = self.runNode(node);
                // Return the node value as an argument to be consumed
                if (nodeValue != null) {
                    args.push(nodeValue);
                }
            });
            return args;
        };

        return Runtime;

    }


})();


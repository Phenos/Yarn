yarn.service('Runtime', function RuntimeService(state,
                                                Cursor,
                                                predicates,
                                                things,
                                                Stack,
                                                yConsole,
                                                postal) {

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

    /**
     * Start to execute the AST
     */
    Runtime.prototype.run = function () {
        this.cursor.start(this.ast.root);
        var node = this.runNode(this.ast.root);

        postal.publish({
            channel: "runtime",
            topic: "afterRun",
            data: {
                root: node
            }
        });

        return node;
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
                    returnValue = things.get(node.value);
                    node.resolvedTo = returnValue;
                } else if (node.variant === "constant") {
                    console.error("Constants not supported yet! : " + node.value);
                } else if (node.variant === "statement") {
                    // Nothing to to with compilation statements
                } else {
                    console.error("Compilation error: Unknown node variant [" + node.variant + "]", node);
                    yConsole.error("Compilation error: Unknown node variant [" + node.variant + "-" + node.type + "-" + node.value + "]");
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
                predicate = predicates(node.value);
                // Run the child set of node to be used by the predicate
                args = runtime.runSet(node.set);
                // Create assertion from predicate
                if (args.length) {
                    args.forEach(function (arg) {
                        var object = arg[0];
                        var children = arg[1] || [];
                        var value;

                        var headNode = runtime.stack.head();
                        var currentThis = headNode.values.this;
                        if (currentThis) {
                            // Before creating the assertion, check if it is followed by values to be assigned
                            if (children && children.length) {
                                // Currently, only the first value is taken in account and used as a value
                                value = children[0][0];
                            }
                            if (typeof(object) === "string") {
                                yConsole.error("Invalid assertion, cannot use text as the object: " +
                                    currentThis.id + " " + predicate.id + " " + object.id, {
                                    source: node.source
                                });
                            } else if (typeof(object) === "number") {
                                yConsole.error("Invalid assertion, cannot use a number as the object: " +
                                    currentThis.id + " " + predicate.id + " " + object.id, {
                                    source: node.source
                                });
                            } else {
                                //console.log("node.source", node.source);
                                createdAssertions.push(
                                    state.createAssertion(currentThis, predicate, object, {
                                        parent: parent,
                                        value: value,
                                        source: node.source
                                    })
                                );
                            }
                            //console.log("created assetion: ", assertion);
                        } else {
                            yConsole.error("Invalid assertion, missing subject: " + predicate.id);
                            // Nothing to do!
                            // Probably because a naked predicate such as "the" has been used on
                            // the root node.
                        }
                    });
                } else {
                    var currentThis = runtime.stack.head().values.this;
                    if (currentThis) {
                        yConsole.error("Invalid assertion, missing object: " + currentThis.id + " " + predicate.id);
                    } else {
                        yConsole.error("Invalid assertion, missing subject: " + predicate.id);
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

});


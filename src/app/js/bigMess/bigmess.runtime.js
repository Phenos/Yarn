(function (Cursor) {
    "use strict";

    BigMess.Runtime = Runtime;
    /**
     * Runtime class user to execute the ast with the state
     * @param ast
     * @param state
     * @constructor
     */
    function Runtime(ast, state) {
        this.ast = ast;
        this.state = state;
        this.cursor = new Cursor();
        this.stack = new Stack();
    }

    // todo: See if code should be generalized between Stack/Pointer/Cursor
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
        var offset = (this.scopes.length > 2) ? -2 : -1;
        return this.scopes[this.scopes.length - offset];
    };

    Stack.prototype.root = function () {
        return this.scopes[0];
    };

    Stack.prototype.push = function (obj) {
        //console.log("Pushed : ", obj);
        this.scopes.push(new Scope(obj));
    };

    Stack.prototype.pop = function () {
        //console.log("pop!");
        this.scopes.pop();
    };

    function Scope(obj) {
        this.values = obj;
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
        var predicate;
        var args;
        var returnValue;
        this.cursor.push(node);

        if (node.type === "root") {
            // Nothing to do really with the root instruction!
            this.stack.push({
                "this": "root"
            });
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "symbol") {
            // Get or create a new thing according to that symbol
            if (node.variant === "value") {
                returnValue = node.value;
                //console.log("VALUE variant:", node.value);
            } else if (node.variant === "reference") {
                returnValue = this.state.thing(node.value);
            } else if (node.variant === "constant") {
                returnValue = this.state.thing(node.value);
            } else {
                console.warn("Unknown node variant [" + node.variant + "]");
            }
            this.stack.push({
                "this": returnValue
            });
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "value") {
            this.stack.push({
                "this": node.value
            });
            returnValue = node.value;
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "instruction") {
            // Identify which predicate corresponds to this instruction
            predicate = this.state.predicate(node.value);
            // Run the child set of node to be used by the predicate
            args = this.runSet(node.set);
            // Create assertion from predicate
            if (args.length) {
                args.forEach(function (arg) {
                    //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                    var currentThis = self.stack.head().values.this;
                    var assertion = self.state.setAssertion(currentThis, predicate, arg);
                    //console.log("created assetion: ", arg);
                });
            } else {
                var currentThis = self.stack.head().values.this;
                self.state.setAssertion(currentThis, predicate);
            }
            returnValue = null;
        } else {
            returnValue = null;
            console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
        }

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

})(BigMess.Cursor);


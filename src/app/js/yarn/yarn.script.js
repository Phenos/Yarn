(function () {
    "use strict";

    angular.module('yarn').factory('Script', ScriptService);

    function ScriptService(Pointer, AST, Runtime, $q, loadScript) {

        function Script() {
            this.source = "";
            this.pointer = new Pointer();
            this.ast = new AST();
            // Keep a reference t key named nodes
            this.references = {};
            // Imported child scripts
            this.imports = [];
            this.runtime = null;
        }

        Script.prototype.load = function (source) {
            this.source = source;
            var self = this;
            this.pointer.tokenize(source);
            console.log("yarn.script.load");
            return this.compile(this.pointer.tokens).then(function (ast) {
                console.log("after compile");
                return self.processImports(ast);
            });
        };

        Script.prototype.run = function (state) {
            var self = this;

            this.runtime = new Runtime(this.ast, state, onModeChange, onImport);
            this.runtime.run();

            function onModeChange(mode, node){
                console.log("Keeping reference to [" + node.value + "]", mode, node);
                var nodeReferenceId = node.value;
                self.references[nodeReferenceId.toLowerCase()] = node;
            }

            function onImport(url) {
                console.log("-----> onImport ", url);







                console.log("SCRIPT LOADING SHOULD OCCUR HERE!")



            }
        };

        Script.prototype.compile = function (tokens) {
            return this.ast.compile(tokens);
        };

        Script.prototype.processImports = function (ast) {
            console.info("Parsing AST for imports");
            console.log("ast", ast);
            return parseNode(ast.root);
        };

        function parseNode(node) {
            if (node.type === "instruction" && node.value === "Import") {
                return importSet(node.set);
            } else {
                return parseSet(node.set);
            }
        }

        function importSet(set) {
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(importNode(node));
                });
            }
            return $q.all(promises);
        }

        function importNode(node) {
            console.log("IMPORTING!", node);
            return loadScript(node.value).then(function (text) {
                var script = new Script();
                return script.load(text).then(function () {
                    console.log("SCRIPT IMPORTED", script);

                    // Graft the root node of the imported script onto
                    // the node which imported the script
                    // then change the node type to
                    node.type = "instruction";
                    node.value = "@imported";
                    node.set = script.ast.root.set;

                });
            });
        }

        function parseSet(set) {
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(parseNode(node));
                });
            }
            return $q.all(promises);
        }

/*

 cursor: Cursor
    root: Node
        set: Set
         nodes: Array[7]
             0: Node
                 set: Set
                     nodes: Array[4]

 */
        return Script;
    }

})();


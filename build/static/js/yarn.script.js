(function () {
    "use strict";

    angular.module('yarn').factory('Script', ScriptService);

    function ScriptService(Pointer, AST, Runtime, $q, loadScript, URI) {

        function Script() {
            this.url = "";
            this.source = "";
            this.pointer = new Pointer();
            this.ast = new AST();
            // Keep a reference t key named nodes
            this.references = {};
            // Imported child scripts
            this.imports = [];
            this.runtime = null;
        }

        // todo: this should load the scripts itself instead of relying on parent

        Script.prototype.load = function (source, url) {
            this.url = url || "";
            this.source = source;
            var self = this;
            this.pointer.tokenize(source);
            //console.log("yarn.script.load");
            return this.compile(this.pointer.tokens).then(function (ast) {
                //console.log("after compile");
                return self.processImports(ast);
            });
        };

        Script.prototype.run = function (state) {
            var self = this;

            this.runtime = new Runtime(this.ast, state, onModeChange);
            this.runtime.run();

            function onModeChange(mode, node){
                console.log("Keeping reference to [" + node.value + "]", mode, node);
                var nodeReferenceId = node.value;
                self.references[nodeReferenceId.toLowerCase()] = node;
            }
        };

        Script.prototype.compile = function (tokens) {
            return this.ast.compile(tokens);
        };

        Script.prototype.processImports = function (ast) {
            console.info("Parsing AST for imports");
            //console.log("ast", ast);
            return this.parseNode(ast.root);
        };

        Script.prototype.parseNode = function (node) {
            var self = this;
            if (node.type === "instruction" && node.value === "Import") {
                return self.importSet(node.set);
            } else {
                return self.parseSet(node.set);
            }
        };

        Script.prototype.importSet = function (set) {
            var self = this;
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(self.importNode(node));
                });
            }
            return $q.all(promises);
        };

        Script.prototype.importNode = function (node) {
            var url = URI(node.value).absoluteTo(this.url);
            return loadScript(url).then(function (loadedScript) {
                var script = new Script();
                return script.load(loadedScript.source, loadedScript.url).then(function () {
                    // Graft the root node of the imported script onto
                    // the node which imported the script
                    // then change the node type to
                    node.type = "instruction";
                    node.value = "@imported";
                    node.set = script.ast.root.set;
                    console.info("Grafted imported AST into parent AST")
                });
            });
        };

        Script.prototype.parseSet = function parseSet(set) {
            var self = this;
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(self.parseNode(node));
                });
            }
            return $q.all(promises);
        };

        return Script;
    }

})();


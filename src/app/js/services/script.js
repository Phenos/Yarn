yarn.service('script', function (Pointer,
                                 AST,
                                 Runtime,
                                 $q,
                                 loadScript,
                                 URI) {

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

    Script.prototype.run = function () {
        this.runtime = new Runtime(this.ast);
        this.runtime.run();
    };

    Script.prototype.compile = function (tokens) {
        return this.ast.compile(tokens);
    };

    Script.prototype.processImports = function (ast) {
        //console.log("Parsing AST for imports");
        //console.log("ast", ast);
        return this.parseNode(ast.root);
    };

    Script.prototype.parseNode = function (node) {
        var returnValue;
        if (node.type === "instruction" && node.value === "import") {
            node.type = "symbol";
            node.value = "IMPORT";
            node.variant = "statement";
            returnValue = this.importSet(node.set);
        } else {
            returnValue = this.parseSet(node.set);
        }
        return returnValue;
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
        var url = this.resolveRelativeURI(node.value);

        return loadScript(url).then(function (loadedScript) {
            var script = new Script();
            return script.load(loadedScript.source, loadedScript.url).then(function () {
                // Graft the root node of the imported script onto
                // the node which imported the script
                // then change the node type to
                node.type = "symbol";
                node.value = "IMPORT";
                node.variant = "statement";
                node.set = script.ast.root.set;
                //console.log("Grafted imported AST into parent AST")
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

    Script.prototype.resolveRelativeURI = function resolveRelativeURI(uri) {
        var resolvedURI = "";
        var tmpBaseURI = this.url;
        if (uri) {
            //console.log("relative to uri: ", tmpBaseURI);
            resolvedURI = URI(uri).absoluteTo(tmpBaseURI).toString();
        } else {
            resolvedURI = uri;
        }
        return resolvedURI;
    };

    return new Script();
});

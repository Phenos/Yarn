yarn.service('yarnScript', function (Pointer,
                                 AST,
                                 Runtime,
                                 $q,
                                 loadScript,
                                 URI,
                                 yConsole,
                                 state) {

    function YarnScript() {
        this.reset();
    }

    YarnScript.prototype.load = function (source, url) {
        var self = this;
        this.reset();
        this.url = url || "";
        this.pointer = new Pointer(this.url);
        this.source = source;
        this.pointer.tokenize(source);
        return this.compile(this.pointer.tokens).then(function (ast) {
//            console.log("after compile");
            return self.processImports(ast);
        });
    };

    YarnScript.prototype.reset = function () {
        this.url = "";
        this.source = "";
        this.ast = new AST();
        this.runtime = null;
    };

    YarnScript.prototype.run = function () {
        // We start by clearing the existing world layer
//        console.log("Removing layers", state.assertions._all.length);
        state.assertions.removeLayer('code');
        state.assertions.removeLayer('step');
//        console.log("Removing layers done", state.assertions._all.length);

        var berofeRun = performance.now();
        this.runtime = new Runtime(this.ast);
        this.runtime.run();
        var afterRun = performance.now();
        var duration = Math.floor(afterRun - berofeRun) / 1000;
        yConsole.log("Created " + state.assertions.count() +
            " assertions in " + duration + " seconds");
    };

    YarnScript.prototype.compile = function (tokens) {
        return this.ast.compile(tokens);
    };

    YarnScript.prototype.processImports = function (ast) {
//        console.log("Parsing AST for imports");
//        console.log("ast", ast);
        return this.parseNode(ast.root);
    };

    YarnScript.prototype.parseNode = function (node) {
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

    YarnScript.prototype.importSet = function (set) {
        var self = this;
        var promises = [];
        if (set.nodes.length) {
            angular.forEach(set.nodes, function (node) {
                promises.push(self.importNode(node));
            });
        }
        return $q.all(promises);
    };

    YarnScript.prototype.importNode = function (node) {
        var url = this.resolveRelativeURI(node.value);
//        console.log("-------> ", this, node.value);

        return loadScript(url).then(function (loadedScript) {
            var script = new YarnScript();
            return script.load(loadedScript.source, loadedScript.url).then(function () {
                // Graft the root node of the imported script onto
                // the node which imported the script
                // then change the node type to
                node.type = "symbol";
                node.value = "IMPORT";
                node.variant = "statement";
                node.set = script.ast.root.set;
//                console.log("Grafted imported AST into parent AST")
            });
        });
    };

    YarnScript.prototype.parseSet = function parseSet(set) {
        var self = this;
        var promises = [];
        if (set.nodes.length) {
            angular.forEach(set.nodes, function (node) {
                promises.push(self.parseNode(node));
            });
        }
        return $q.all(promises);
    };

    YarnScript.prototype.resolveRelativeURI = function resolveRelativeURI(uri) {
        var resolvedURI = "";
        var tmpBaseURI = this.url;
        if (uri) {
//            console.log("relative to uri: ", tmpBaseURI);
            resolvedURI = URI(uri).absoluteTo(tmpBaseURI).toString();
        } else {
            resolvedURI = uri;
        }
        return resolvedURI;
    };

    return new YarnScript();
});

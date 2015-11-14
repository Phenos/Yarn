(function () {
    "use strict";

    angular.module('yarn').factory('Script', ScriptService);

    function ScriptService(Pointer, AST, Runtime) {

        function Script() {
            this.pointer = new Pointer();
            this.ast = new AST();
            // Keep a reference t key named nodes
            this.references = {};
            // Imported child scripts
            this.imports = [];
            this.runtime = null;
        }

        Script.prototype.load = function (text) {
            this.pointer.tokenize(text);
            return this.compile(this.pointer.tokens); // Todo.. this should not be compile
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

        return Script;
    }

})();


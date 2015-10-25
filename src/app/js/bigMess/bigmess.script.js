(function (Pointer, AST) {
    "use strict";

    BigMess.Script = Script;
    function Script() {
        this.pointer = new Pointer();
        this.ast = new AST();
    }

    Script.prototype.load = function (text) {
        this.pointer.tokenize(text);
        this.compile(this.pointer.tokens); // Todo.. this should not be compile
        return this;
    };

    Script.prototype.execute = function (state) {

    };

    Script.prototype.compile = function (tokens) {
        this.ast.compile(tokens);
        return this;
    };

})(BigMess.Pointer, BigMess.AST);


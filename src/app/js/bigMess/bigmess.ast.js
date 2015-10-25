(function (Cursor, Node) {
    "use strict";

    BigMess.AST = AST;
    function AST() {
        this.root = new Node("sequence", "root");
        this.cursor = new Cursor().start(this.root);
    }

    AST.prototype.qualifyTokens = function (tokens) {

        tokens.forEach(function (token, index, tokens) {
            var command = "";
            var type = token[0];
            if (type === "default") {
                command = "appendInstruction"
            } else if (type === "period") {
                command = "endSequence"
            } else if (type === "multiLinebreak") {
                command = "endSequence"
            } else if (type === "numeric") {
                command = "appendValue"
            } else if (type === "singleQuote") {
                command = "appendValue"
            } else if (type === "doubleQuote") {
                command = "appendValue"
            } else if (type === "colon") {
                command = "startArguments"
            } else if (type === "hash") {
                command = "appendReference"
            } else if (type === "at") {
                command = "appendConstant"
            } else if (type === "comma") {
                command = "nextArgument"
            } else if (type === "linebreak") {
                command = "ignore"
            } else if (type === "lineComment") {
                command = "ignore"
            } else if (type === "blockComment") {
                command = "ignore"
            }
            token[3] = command;
        });
    };

    AST.prototype.html = function () {
        var html = ["<div class='tree'>"];
        html.push(this.root.html());
        html.push("</div>");
        return html.join("");
    };

    /**
     * Compile an Abstract Syntax Tree from a series of tokens
     * @param tokens
     * @returns {*}
     */
    AST.prototype.compile = function (tokens) {
        var cursor = this.cursor;

        this.qualifyTokens(tokens);

        tokens.forEach(function (token) {
            var command = token[3];
            var tokenString = token[1];
            switch (command) {
                case "appendInstruction":
                    cursor.appendInstruction(tokenString);
                    break;
                case "endSequence":
                    cursor.endSequence();
                    break;
                case "appendValue":
                    cursor.appendSymbol("value", tokenString);
                    break;
                case "appendReference":
                    cursor.appendSymbol("reference", tokenString);
                    break;
                case "appendConstant":
                    cursor.appendSymbol("constant", tokenString);
                    break;
                case "startArguments":
                    cursor.startArguments();
                    break;
                case "nextArgument":
                    cursor.nextArgument();
                    break;
                case "ignore":
                    break;
            }
        });
    };

})(BigMess.Cursor, BigMess.Node);



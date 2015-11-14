(function () {
    "use strict";
    angular.module('yarn').factory('AST', ASTService);

    function ASTService(Cursor, Node, $q) {

        function AST() {
            this.root = new Node("symbol", "root");
            this.cursor = new Cursor().start(this.root);
        }

        AST.prototype.qualifyTokens = function (tokens) {
            tokens.forEach(function (token) {
                var command;
                var type = token[0];
                command = TokenCommands[type];
                token[3] = command;
            });
        };

        var TokenCommands = {
            "default": "appendInstruction",
            "period": "endSequence",
            "multiLinebreak": "endSequence",
            "numeric": "appendValue",
            "singleQuote": "appendValue",
            "doubleQuote": "appendValue",
            "colon": "startArguments",
            "hash": "appendReference",
            "at": "appendConstant",
            "comma": "nextArgument",
            "linebreak": "ignore",
            "lineComment": "ignore",
            "blockComment": "ignore"
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
            var self = this;
            var cursor = this.cursor;

            this.qualifyTokens(tokens);

            var promise = $q(function (resolve) {

                tokens.forEach(function (token) {
                    var command = token[3];
                    var tokenString = token[1];
                    var tokenHandler = TokenHandlers[command];
                    tokenHandler(cursor, tokenString);
                });

                resolve(self);
            });

            return promise;
        };
        
        var TokenHandlers = {
            "appendInstruction": function (cursor, tokenString) {
                cursor.appendInstruction(tokenString);
            },
            "endSequence": function (cursor) {
                cursor.endSequence();
            },
            "appendValue": function (cursor, tokenString) {
                cursor.appendSymbol("value", tokenString);
            },
            "appendReference": function (cursor, tokenString) {
                cursor.appendSymbol("reference", tokenString);
            },
            "appendConstant": function (cursor, tokenString) {
                cursor.appendSymbol("constant", tokenString);
            },
            "startArguments": function (cursor) {
                cursor.startArguments();
            },
            "nextArgument": function (cursor) {
                cursor.nextArgument();
            },
            "ignore": function (cursor, tokenString) {
            }
        };

        return AST;

    }

})();



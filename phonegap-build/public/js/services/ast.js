(function () {
    yarn.factory('AST', ASTService);

    function ASTService(yConsole, Cursor, Node, $q) {

        function AST() {
            this.root = new Node("root", "root");
            this.cursor = new Cursor().start(this.root);
        }

        AST.prototype.qualifyTokens = function (tokens) {
            tokens.forEach(function (token) {
                var command;
                var type = token[0];
                command = TokenCommands[type];
                token[4] = command;
            });
        };

        var TokenCommands = {
            "default": "appendInstruction",
            "period": "endSequence",
//            "startParen": "startSubset",
//            "endParen": "endSubset",
            "startCurly": "startSubset",
            "endCurly": "endSubset",
            "multiLinebreak": "endSequence",
            "numeric": "appendNumeric",
            "singleQuote": "appendText",
            "doubleQuote": "appendText",
            "colon": "startArguments",
            "hash": "appendReference",
            "camelCase": "appendReference",
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
                    var command = token[4];
                    var tokenString = token[1];
                    var tokenSource = token[3];
                    var tokenHandler = TokenHandlers[command];
                    if (!tokenHandler) {
                        console.error("Invalid token found during compilation : ", token);
                        yConsole.error("Invalid token found during compilation : " + token[2]);
                    } else {
                        cursor.source = tokenSource;
                        //console.log("tokenSource", tokenSource);
                        tokenHandler(cursor, tokenString);
                    }
                });

                resolve(self);
            });

            return promise;
        };
        
        var TokenHandlers = {
            "appendInstruction": function (cursor, tokenString) {
                // Test if instruction is in reality true or false
                if (tokenString === "true") {
                    cursor.appendSymbol("value", true);
                } else if (tokenString === "false") {
                    cursor.appendSymbol("value", false);
                } else {
                    cursor.appendInstruction(tokenString);
                }
            },
            "endSequence": function (cursor) {
                cursor.endSequence();
            },
            "appendText": function (cursor, tokenString) {
                cursor.appendSymbol("value", tokenString);
            },
            "appendNumeric": function (cursor, tokenString) {
                var value = parseFloat(tokenString);
                cursor.appendSymbol("value", value);
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
            "startSubset": function (cursor) {
                cursor.startSubset();
            },
            "endSubset": function (cursor) {
                cursor.endSubset();
            },
            "ignore": function (cursor, tokenString) {
            }
        };

        return AST;

    }

})();



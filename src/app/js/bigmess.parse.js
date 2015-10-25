(function () {
    "user strict";

    var cycle = 0;
    var maxCycle = 10000;

    var numeric = "0123456789";
    var numericExtended = numeric + ".";
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var alphaNum = alpha + numeric;
    var alphaNumExtended = alphaNum + "-_";

    /**
     * Parse a text into various semantic parts to be consumed by BigMess
     * @param text
     */
    BigMess.prototype.parse = function (text) {
        var pointer = new Pointer(text);

        var tokens = tokenize(pointer);
        this.script = new Script();
        var grid = this.script
            .compile(tokens);

        return grid;

        //    .run(this, {});

        //console.log("pointer", pointer);
        //console.log("pointer.tokens", pointer.tokens);

        //pointer.tokens.forEach(function (token) {
        //    console.log(token[0] + "   %c[" + token[1] + "]", 'color: #ccc');
        //});


    };

    function Script() {
        this.ast;

        this.compile = function (tokens) {
            setASTOperations(tokens); // todo: make setASTOperation a method of AST
            this.ast = compileAST(tokens); // todo: make compileAST a method of AST
            console.log(this.ast);
            return renderToken(tokens);
        };

        this.run = function (bigMess, scope) {

        }
    }


    function renderToken(tokens) {
        var grid = ["<table class='testGrid'><thead><tr><td>Type</td><td>AST Operation</td><td>Token</td><td>Raw</td></tr></thead>"];
        tokens.forEach(function (token, index, tokens) {
            grid.push("<tr><td>");
            grid.push(token[0]);
            grid.push("</td><td>");
            grid.push(token[3]);
            grid.push("</td><td>");
            grid.push(token[1]);
            grid.push("</td><td>[");
            grid.push(token[2]);
            grid.push("]</td></tr>");
        });
        grid.push("</table>");
        return grid.join("");
    }

    function setASTOperations(tokens) {

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
    }

    function compileAST(tokens) {
        var ast = new AST();
        var cursor = ast.cursor;

        tokens.forEach(function (token, index, tokens) {
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
        return ast;
    }

    function AST() {
        this.root = new Node("sequence", "root");
        this.cursor = new Cursor().start(this.root);
    }

    AST.prototype.render = function() {
        var html = ["<div class='tree'>"];
        html.push(this.root.render());
        html.push("</div>");
        return html.join("");
    };


    function Node(type, value, variant) {
        this.type = type;
        this.variant = variant;
        this.value = value;
        this.set = new Set();
    }

    Node.prototype.render = function () {
        var html = [];
        html.push("<div class='node'>");
        html.push(
            "<span class='label'><span class='value'>" +
            this.value.substr(0, 80) +
            "</span> <span class='type'>"
            + this.type +
            "</span>");
        if (this.variant) html.push("<span class='variant'>" + this.variant + "</span>");
        html.push("</span>");
        html.push(this.set.render());
        html.push("</div>");
        return html.join("");
    };

    function Set() {
        this.nodes = [];
    }

    Set.prototype.render = function ()  {
        var html = [];
        html.push("<div class='set'>");
        this.nodes.forEach(function (node) {
            html.push(node.render());
        });
        html.push("</div>");
        return html.join("");
    };

    Set.prototype.add = function (node) {
        this.nodes.push(node);
        return this;
    };

    Set.prototype.last = function () {
        return this.nodes[this.nodes.length - 1];
    };


    function Cursor() {
        this.stack = [];
        this.sequenceBroken = false;
    }

    Cursor.prototype.size = function () {
        return this.stack.length;
    };

    Cursor.prototype.start = function (node) {
        this.stack = [node];
        return this;
    };

    Cursor.prototype.push = function (node) {
        this.stack.push(node);
        return this;
    };

    Cursor.prototype.pop = function () {
        this.stack.pop();
        return this;
    };

    Cursor.prototype.head = function () {
        return this.stack[this.stack.length - 1];
    };

    Cursor.prototype.parent = function () {
        var offset = (this.stack.length > 2) ? -2 : -1;
        return this.stack[this.stack.length - offset];
    };

    Cursor.prototype.root = function () {
        return this.stack[0];
    };

    Cursor.prototype.appendInstruction = function (value) {
        var node = new Node("instruction", value);

        if (this.head().set.last() &&
            this.head().set.last().type === 'symbol' &&
            !this.sequenceBroken) {
            // If the instruction follows a symbol, the instruction is considered to be "absorbed" as
            // a unique argument by the symble (and vice versa)

            this.sequenceBroken = false;
            this.push(this.head().set.last());
            this.head().set.add(node);
            //this.pop();
        } else {
            this.sequenceBroken = false;
            this.head().set.add(node);
        }
        return this;
    };
    Cursor.prototype.endSequence = function () {
        while (this.size() > 1) {
            this.pop();
        }
        // if the next sequence starts with a value following an instruction
        // this will prevent the value from being "absorbed" by the instruction
        this.sequenceBroken = true;
        return this;
    };
    Cursor.prototype.appendSymbol = function (variant, value) {
        var node = new Node("symbol", value, variant);

        if (this.head().set.last() &&
            this.head().set.last().type === 'instruction' &&
            !this.sequenceBroken) {
            // If the value follows an instruction, the value is considered to be "absorbed" as
            // a unique argument by the instruction

            this.sequenceBroken = false;
            this.push(this.head().set.last());
            this.head().set.add(node);
            //this.pop();
        } else {
            this.sequenceBroken = false;
            this.head().set.add(node);
        }
        return this;
    };
    Cursor.prototype.startArguments = function () {
        this.sequenceBroken = false;
        var node = this.head().set.last();
        this.push(node);
        return this;
    };
    Cursor.prototype.nextArgument = function () {
        this.sequenceBroken = true;
        if (this.size() > 1) {
            this.pop();
        }
        return this;
    };


    function Pointer(text) {

        this._state = "default";

        this.start = function (text) {
            this.text = text;
            this.chr = "";
            this.pos = 0;
            this.buffer = [];
            this.rawBuffer = [];
            this.tokens = [];
            this._state = "default";
            this.chr = this.text[this.pos];
        };

        this.peek = function (len) {
            var str = this.text.substr(this.pos + 1, len);
            return str;
        };

        this.state = function (id) {
            if (id || id === "") this._state = id;
            return this._state;
        };

        this.step = function () {
            this.buffer.push(this.chr);
            this.rawBuffer.push(this.chr);
            this.pos++;
            this.read();
            return this;
        };

        this.skip = function () {
            this.rawBuffer.push(this.chr);
            this.pos++;
            this.read();
            return this;
        };

        this.read = function () {
            this.chr = this.text[this.pos];
            return this;
        };

        this.flush = function () {
            var txt;
            var txtRaw;
            var token;
            var previousToken;
            txtRaw = this.rawBuffer.join("");
            txt = this.buffer.join("").trim();
            if (txtRaw !== "") {
                if (txt === "" && this.state() === "default") {
                    // Ignore whitespace here!

                } else {
                    // Collapse line-breaks into multiLinebreak
                    previousToken = this.tokens[this.tokens.length - 1];
                    if (previousToken && this.state() === "linebreak" &&
                        (previousToken[0] === "linebreak" || previousToken[0] === "multiLinebreak")
                    ) {
                        previousToken[0] = "multiLinebreak";
                        previousToken[2] = previousToken[2] + txtRaw;
                    } else {
                        token = [this.state(), txt, txtRaw];
                        this.tokens.push(token);
                    }
                    // Reset the state
                    this.state("default");
                    this.buffer = [];
                    this.rawBuffer = [];
                }
            }
            return this;
        };

        this.startSingleCharBlock = function (stateId) {
            this.flush()
                .skip()
                .state(stateId);
        };

        this.endSingleCharBlock = function () {
            this.skip()
                .flush();
        };

        this.endPunctuationToken = function (type) {
            this.flush().state(type);
            this.step().flush();
        };

        this.isEnded = function () {
            return this.pos > this.text.length;
        };

        this.start(text);
    }

    function tokenize(pointer) {
        while (!pointer.isEnded()) {

            cycle++;
            if (cycle > maxCycle) {
                console.log(pointer);
                throw("Too many cycles!");
            }

            if (pointer.state() === "default") {
                if (pointer.chr === '"') {
                    pointer.startSingleCharBlock("doubleQuote");
                    continue;
                } else if (pointer.chr === "'") {
                    pointer.startSingleCharBlock("singleQuote");
                    continue;
                } else if (pointer.chr === "{") {
                    pointer.startSingleCharBlock("mustache");
                    continue;
                } else if (pointer.chr === "[") {
                    pointer.startSingleCharBlock("bracket");
                    continue;
                } else if (numeric.indexOf(pointer.chr) >= 0) {
                    pointer
                        .flush()
                        .state("numeric");
                    continue;
                } else if (pointer.chr === '@') {
                    pointer.startSingleCharBlock("at");
                    continue;
                } else if (pointer.chr === '#') {
                    pointer.startSingleCharBlock("hash");
                    continue;
                } else if (pointer.chr === '$') {
                    pointer.startSingleCharBlock("dollar");
                    continue;
                } else if (pointer.chr === '/') {
                    if (pointer.peek(1) === '/') {
                        pointer
                            .flush()
                            .skip()
                            .skip()
                            .state("lineComment");
                        continue;
                    } else if (pointer.peek(1) === '*') {
                        pointer
                            .flush()
                            .skip()
                            .skip()
                            .state("blockComment");
                        continue;
                    }
                } else if (pointer.chr === '\n') {
                    pointer.endPunctuationToken("linebreak");
                    continue;
                } else if (pointer.chr === '.') {
                    pointer.endPunctuationToken("period");
                    continue;
                } else if (pointer.chr === ',') {
                    pointer.endPunctuationToken("comma");
                    continue;
                } else if (pointer.chr === ':') {
                    pointer.endPunctuationToken("colon");
                    continue;
                }
            } else if (pointer.state() === "lineComment") {
                if (pointer.chr === "\n") {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "blockComment") {
                if (pointer.chr === "*") {
                    if (pointer.peek(1) === "/") {
                        pointer
                            .skip()
                            .skip()
                            .flush();
                        continue;
                    }
                }
            } else if (pointer.state() === "doubleQuote") {
                if (pointer.chr === '"') {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "singleQuote") {
                if (pointer.chr === "'") {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "mustache") {
                if (pointer.chr === "}") {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "bracket") {
                if (pointer.chr === "]") {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "numeric") {
                if (numericExtended.indexOf(pointer.chr) < 0) {
                    pointer
                        .flush(pointer.state());
                    continue;
                }
            } else if (
                pointer.state() === "hash" ||
                pointer.state() === "at" ||
                pointer.state() === "dollar"
            ) {
                if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                    pointer
                        .flush(pointer.state());
                    continue;
                }
            }
            // Otherwise
            pointer.step();
        }
        return pointer.tokens;
    }

})();


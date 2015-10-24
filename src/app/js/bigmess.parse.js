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
        var script = new Script();
        var grid = script
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
            this.ast = new Sequence();
            return compile(this.ast, tokens);
        };

        this.run = function (bigMess, scope) {

        }
    }


    function compile(ast, tokens) {
        var grid = ["<table class='testGrid'><thead><tr><td>Type</td><td>Token</td><td>Raw</td></tr></thead>"];
        tokens.forEach(function (token, index, tokens) {
            grid.push("<tr><td>");
            grid.push(token[0]);
            grid.push("</td><td>");
            grid.push(token[1]);
            grid.push("</td><td>");
            grid.push(token[2]);
            grid.push("</td></tr>");
        });
        grid.push("</table>");
        return grid;
    }


    function Statement(type) {
        this.type = type;
        this.arguments = [];
    }

    function Sequence() {
        this.statements = [];
    }

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
            txt = this.buffer.join("");
            if (txtRaw != "") {
                // Collapse line-breaks into multi-linebreak
                previousToken = this.tokens[this.tokens.length - 1];
                if (previousToken && this.state() === "linebreak" &&
                    (previousToken[0] === "linebreak" || previousToken[0] === "multi-linebreak")
                ) {
                    previousToken[0] = "multi-linebreak";
                    previousToken[2] = previousToken[2] + txtRaw;
                } else {
                    token = [this.state(), txt, txtRaw];
                    this.tokens.push(token);
                }
            }
            // Reset the state
            this.state("default");
            this.buffer = [];
            this.rawBuffer = [];
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
                    pointer.startSingleCharBlock("double-quote");
                    continue;
                } else if (pointer.chr === "'") {
                    pointer.startSingleCharBlock("single-quote");
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
                            .state("line-comment");
                        continue;
                    } else if (pointer.peek(1) === '*') {
                        pointer
                            .flush()
                            .skip()
                            .skip()
                            .state("block-comment");
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
            } else if (pointer.state() === "line-comment") {
                if (pointer.chr === "\n") {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "block-comment") {
                if (pointer.chr === "*") {
                    if (pointer.peek(1) === "/") {
                        pointer
                            .skip()
                            .skip()
                            .flush();
                        continue;
                    }
                }
            } else if (pointer.state() === "double-quote") {
                if (pointer.chr === '"') {
                    pointer.endSingleCharBlock();
                    continue;
                }
            } else if (pointer.state() === "single-quote") {
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


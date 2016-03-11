yarn.factory('Pointer', function PointerService() {

    function Pointer() {
        this._state = "default";
        this.start();
    }

    Pointer.prototype.start = function () {
        this.text = "";
        this.chr = "";
        this.pos = 0;
        this.buffer = [];
        this.rawBuffer = [];
        this.tokens = [];
        this._state = "default";
        this.chr = this.text[this.pos];
    };

    Pointer.prototype.peek = function (len) {
        return this.text.substr(this.pos + 1, len);
    };

    Pointer.prototype.state = function (id) {
        if (id || id === "") this._state = id;
        return this._state;
    };

    Pointer.prototype.step = function () {
        this.buffer.push(this.chr);
        this.rawBuffer.push(this.chr);
        this.pos++;
        this.read();
        return this;
    };

    Pointer.prototype.skip = function () {
        this.rawBuffer.push(this.chr);
        this.pos++;
        this.read();
        return this;
    };

    Pointer.prototype.read = function () {
        this.chr = this.text[this.pos];
        return this;
    };

    Pointer.prototype.flush = function () {
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

    Pointer.prototype.startSingleCharBlock = function (stateId) {
        this.flush()
            .skip()
            .state(stateId);
    };

    Pointer.prototype.endSingleCharBlock = function () {
        this.skip()
            .flush();
    };

    Pointer.prototype.endPunctuationToken = function (type) {
        this.flush().state(type);
        this.step().flush();
    };

    Pointer.prototype.isEnded = function () {
        return this.pos > this.text.length;
    };


    Pointer.prototype.tokenize = function (text) {
        var pointer = this;
        var cycle = 0;
        var maxCycle = 100000;

        var numeric = "0123456789";
        var numericExtended = numeric + ".";
        var lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
        var upperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var alpha = upperAlpha + lowerAlpha;
        var alphaNum = alpha + numeric;
        var alphaNumExtended = alphaNum + "_";

        pointer.text = text;

        // Read the first character!
        this.read();

        while (!pointer.isEnded()) {

            cycle++;
            if (cycle > maxCycle) {
                console.log(pointer);
                throw("Too many cycles!");
            }

            if (pointer.state() === "default") {
                if (upperAlpha.indexOf(pointer.chr) >= 0) {
                    pointer
                        .flush()
                        .state("camelCase");
                    continue;
                } else if (pointer.chr === '"') {
                    pointer.startSingleCharBlock("doubleQuote");
                    continue;
                } else if (pointer.chr === "'") {
                    pointer.startSingleCharBlock("singleQuote");
                    continue;
                } else if (pointer.chr === "(") {
                    pointer.endPunctuationToken("startParen");
                    continue;
                } else if (pointer.chr === ")") {
                    pointer.endPunctuationToken("endParen");
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
                pointer.state() === "camelCase" ||
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
    };


    Pointer.prototype.html = function () {
        var tokens = this.tokens;
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
    };

    return Pointer;
});


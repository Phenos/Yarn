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

        tokenize(pointer);

        console.log("pointer", pointer);
        console.log("pointer.tokens", pointer.tokens);

        console.log("------");
        pointer.tokens.forEach(function (token) {
            console.log(token[0] + "   %c[" + token[1] + "]", 'color: #ccc');
        });
    };

    function Pointer(text) {

        this._state = "";

        this.start = function (text) {
            this.text = text;
            this.chr = "";
            this.pos = 0;
            this.buffer = [];
            this.tokens = [];
            this._state = "";
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
            this.pos++;
            this.read();
            return this;
        };

        this.skip = function () {
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
            var token;
            txt = this.buffer.join("");
            //console.log("FLUSH!!", txt);
            txt = txt.trim();
            if (txt !== "") {
                token = [txt, this.state()];
                this.tokens.push(token);
            }
            this.buffer = [];
            return this;
        };

        this.startSingleCharBlock = function (stateId) {
            this.flush()
                .skip()
                .state(stateId);
        };

        this.endSingleCharBlock = function () {
            this.flush()
                .skip()
                .state("");
        };

        this.endPunctuationToken = function () {
            this.flush()
                .step()
                .flush()
                .step();
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

            if (pointer.state() === "") {
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
                } else if (pointer.chr === '.') {
                    pointer.endPunctuationToken();
                    continue;
                } else if (pointer.chr === ',') {
                    pointer.endPunctuationToken();
                    continue;
                } else if (pointer.chr === ':') {
                    pointer.endPunctuationToken();
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
                            .flush()
                            .skip()
                            .state("");
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
                        .flush()
                        .state("");
                    continue;
                }
            } else if (
                pointer.state() === "hash" ||
                pointer.state() === "at" ||
                pointer.state() === "dollar"
            ) {
                if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                    // End hash token and back to default state
                    pointer
                        .flush()
                        .state("");
                    continue;
                }
            }
            // Otherwise
            pointer.step();
        }
    }

})();


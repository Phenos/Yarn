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
            console.log(token[0] + "   %c[" + token[1] +"]", 'color: #ccc');
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

        this.isEnded = function () {
            return this.pos > this.text.length;
        };

        this.start(text);
    }

    function tokenize(pointer) {
        while (!pointer.isEnded()) {

            cycle++;
            if (cycle>maxCycle) {
                console.log(pointer)
                throw("Too many cycles!");
            }

            if (pointer.state() === "") {
                if (pointer.chr === '"') {
                    pointer
                        .flush()
                        .skip()
                        .state("double-quote");
                } else if (pointer.chr === "'") {
                    pointer
                        .flush()
                        .skip()
                        .state("single-quote");
                } else if (numeric.indexOf(pointer.chr) >= 0) {
                    pointer
                        .flush()
                        .state("numeric");
                } else if (pointer.chr === '@') {
                    pointer
                        .flush()
                        .skip()
                        .state("at");
                } else if (pointer.chr === '#') {
                    pointer
                        .flush()
                        .skip()
                        .state("hash");
                } else if (pointer.chr === '$') {
                    pointer
                        .flush()
                        .skip()
                        .state("dollar");
                } else if (pointer.chr === '/') {
                    if (pointer.peek(1) === '/') {
                        pointer
                            .flush()
                            .skip()
                            .skip()
                            .state("line-comment")
                    } else if (pointer.peek(1) === '*') {
                        pointer
                            .flush()
                            .skip()
                            .skip()
                            .state("block-comment")
                    } else {
                        pointer.step();
                    }
                } else if (pointer.chr === '.') {
                    // Flush new token with additionnal dot token
                    pointer
                        .flush()
                        .step()
                        .flush()
                        .step();
                } else if (pointer.chr === ',') {
                    // Flush token with additionnal comma token
                    pointer
                        .flush()
                        .step()
                        .flush()
                        .step();
                } else if (pointer.chr === ':') {
                    // Flush token with additionnal comma token
                    pointer
                        .flush()
                        .step()
                        .flush()
                        .step();
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "line-comment") {
                if (pointer.chr === "\n") {
                    pointer
                        .flush()
                        .skip()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "block-comment") {
                if (pointer.chr === "*") {
                    if (pointer.peek(1) === "/") {
                        pointer
                            .flush()
                            .skip()
                            .state("");
                    } else {
                        pointer.step();
                    }
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "double-quote") {
                if (pointer.chr === '"') {
                    // End quoted token and back to default state
                    pointer
                        .flush()
                        .skip()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "single-quote") {
                if (pointer.chr === "'") {
                    // End quoted token and back to default state
                    pointer
                        .flush()
                        .skip()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "numeric") {
                if (numericExtended.indexOf(pointer.chr) < 0) {
                    // End hash token and back to default state
                    pointer
                        .flush()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "hash") {
                if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                    // End hash token and back to default state
                    pointer
                        .flush()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "at") {
                if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                    // End hash token and back to default state
                    pointer
                        .flush()
                        .state("");
                } else {
                    pointer.step();
                }
            } else if (pointer.state() === "dollar") {
                if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                    // End hash token and back to default state
                    pointer
                        .flush()
                        .state("");
                } else {
                    pointer.step();
                }
            } else {
                pointer.step();
            }
        }
    }

})();


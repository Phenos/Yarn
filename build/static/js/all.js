"use strict";

var yarn = angular.module('yarn', []);

angular.module('yarn').factory('Yarn', YarnService);

function YarnService(State, Logic, Script) {

    function Yarn() {

        //todo : SCRIPT LOADED SHOULD NOT BE INJECTED AS ARG
        //this.scriptLoader = scriptLoader;

        this.scripts = [];
        this.state = new State();
        this.logic = new Logic(this.state, this.scripts);

        this.run = function () {
            var self = this;
            this.scripts.forEach(function (script) {
                script.run(self.state);
            });
            return this;
        };

        /**
         * Parse a text into various semantic parts to be consumed by Yarn
         * @param text
         */
        this.load = function (text) {
            var script = new Script();
            this.scripts.push(script);
            console.log("yarn.load");
            return script.load(text).then(function (v) {
                console.log("?", v);
                return script;
            });
        };
    }

    return Yarn;
}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgeWFybiA9IGFuZ3VsYXIubW9kdWxlKCd5YXJuJywgW10pO1xuXG5hbmd1bGFyLm1vZHVsZSgneWFybicpLmZhY3RvcnkoJ1lhcm4nLCBZYXJuU2VydmljZSk7XG5cbmZ1bmN0aW9uIFlhcm5TZXJ2aWNlKFN0YXRlLCBMb2dpYywgU2NyaXB0KSB7XG5cbiAgICBmdW5jdGlvbiBZYXJuKCkge1xuXG4gICAgICAgIC8vdG9kbyA6IFNDUklQVCBMT0FERUQgU0hPVUxEIE5PVCBCRSBJTkpFQ1RFRCBBUyBBUkdcbiAgICAgICAgLy90aGlzLnNjcmlwdExvYWRlciA9IHNjcmlwdExvYWRlcjtcblxuICAgICAgICB0aGlzLnNjcmlwdHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBTdGF0ZSgpO1xuICAgICAgICB0aGlzLmxvZ2ljID0gbmV3IExvZ2ljKHRoaXMuc3RhdGUsIHRoaXMuc2NyaXB0cyk7XG5cbiAgICAgICAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNjcmlwdHMuZm9yRWFjaChmdW5jdGlvbiAoc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0LnJ1bihzZWxmLnN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIGEgdGV4dCBpbnRvIHZhcmlvdXMgc2VtYW50aWMgcGFydHMgdG8gYmUgY29uc3VtZWQgYnkgWWFyblxuICAgICAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2FkID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBuZXcgU2NyaXB0KCk7XG4gICAgICAgICAgICB0aGlzLnNjcmlwdHMucHVzaChzY3JpcHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5YXJuLmxvYWRcIik7XG4gICAgICAgICAgICByZXR1cm4gc2NyaXB0LmxvYWQodGV4dCkudGhlbihmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiP1wiLCB2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NyaXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIFlhcm47XG59XG5cblxuXG4iXSwiZmlsZSI6Inlhcm4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLmFzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGFuZ3VsYXIubW9kdWxlKCd5YXJuJykuZmFjdG9yeSgnQVNUJywgQVNUU2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiBBU1RTZXJ2aWNlKEN1cnNvciwgTm9kZSwgJHEpIHtcblxuICAgICAgICBmdW5jdGlvbiBBU1QoKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShcInN5bWJvbFwiLCBcInJvb3RcIik7XG4gICAgICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKS5zdGFydCh0aGlzLnJvb3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgQVNULnByb3RvdHlwZS5xdWFsaWZ5VG9rZW5zID0gZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0b2tlblswXTtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gVG9rZW5Db21tYW5kc1t0eXBlXTtcbiAgICAgICAgICAgICAgICB0b2tlblszXSA9IGNvbW1hbmQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgVG9rZW5Db21tYW5kcyA9IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImFwcGVuZEluc3RydWN0aW9uXCIsXG4gICAgICAgICAgICBcInBlcmlvZFwiOiBcImVuZFNlcXVlbmNlXCIsXG4gICAgICAgICAgICBcIm11bHRpTGluZWJyZWFrXCI6IFwiZW5kU2VxdWVuY2VcIixcbiAgICAgICAgICAgIFwibnVtZXJpY1wiOiBcImFwcGVuZFZhbHVlXCIsXG4gICAgICAgICAgICBcInNpbmdsZVF1b3RlXCI6IFwiYXBwZW5kVmFsdWVcIixcbiAgICAgICAgICAgIFwiZG91YmxlUXVvdGVcIjogXCJhcHBlbmRWYWx1ZVwiLFxuICAgICAgICAgICAgXCJjb2xvblwiOiBcInN0YXJ0QXJndW1lbnRzXCIsXG4gICAgICAgICAgICBcImhhc2hcIjogXCJhcHBlbmRSZWZlcmVuY2VcIixcbiAgICAgICAgICAgIFwiYXRcIjogXCJhcHBlbmRDb25zdGFudFwiLFxuICAgICAgICAgICAgXCJjb21tYVwiOiBcIm5leHRBcmd1bWVudFwiLFxuICAgICAgICAgICAgXCJsaW5lYnJlYWtcIjogXCJpZ25vcmVcIixcbiAgICAgICAgICAgIFwibGluZUNvbW1lbnRcIjogXCJpZ25vcmVcIixcbiAgICAgICAgICAgIFwiYmxvY2tDb21tZW50XCI6IFwiaWdub3JlXCJcbiAgICAgICAgfTtcblxuICAgICAgICBBU1QucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IFtcIjxkaXYgY2xhc3M9J3RyZWUnPlwiXTtcbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLnJvb3QuaHRtbCgpKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjwvZGl2PlwiKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sLmpvaW4oXCJcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBpbGUgYW4gQWJzdHJhY3QgU3ludGF4IFRyZWUgZnJvbSBhIHNlcmllcyBvZiB0b2tlbnNcbiAgICAgICAgICogQHBhcmFtIHRva2Vuc1xuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIEFTVC5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSB0aGlzLmN1cnNvcjtcblxuICAgICAgICAgICAgdGhpcy5xdWFsaWZ5VG9rZW5zKHRva2Vucyk7XG5cbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWFuZCA9IHRva2VuWzNdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5TdHJpbmcgPSB0b2tlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuSGFuZGxlciA9IFRva2VuSGFuZGxlcnNbY29tbWFuZF07XG4gICAgICAgICAgICAgICAgICAgIHRva2VuSGFuZGxlcihjdXJzb3IsIHRva2VuU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB2YXIgVG9rZW5IYW5kbGVycyA9IHtcbiAgICAgICAgICAgIFwiYXBwZW5kSW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKGN1cnNvciwgdG9rZW5TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IuYXBwZW5kSW5zdHJ1Y3Rpb24odG9rZW5TdHJpbmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZW5kU2VxdWVuY2VcIjogZnVuY3Rpb24gKGN1cnNvcikge1xuICAgICAgICAgICAgICAgIGN1cnNvci5lbmRTZXF1ZW5jZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYXBwZW5kVmFsdWVcIjogZnVuY3Rpb24gKGN1cnNvciwgdG9rZW5TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IuYXBwZW5kU3ltYm9sKFwidmFsdWVcIiwgdG9rZW5TdHJpbmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYXBwZW5kUmVmZXJlbmNlXCI6IGZ1bmN0aW9uIChjdXJzb3IsIHRva2VuU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yLmFwcGVuZFN5bWJvbChcInJlZmVyZW5jZVwiLCB0b2tlblN0cmluZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJhcHBlbmRDb25zdGFudFwiOiBmdW5jdGlvbiAoY3Vyc29yLCB0b2tlblN0cmluZykge1xuICAgICAgICAgICAgICAgIGN1cnNvci5hcHBlbmRTeW1ib2woXCJjb25zdGFudFwiLCB0b2tlblN0cmluZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJzdGFydEFyZ3VtZW50c1wiOiBmdW5jdGlvbiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yLnN0YXJ0QXJndW1lbnRzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJuZXh0QXJndW1lbnRcIjogZnVuY3Rpb24gKGN1cnNvcikge1xuICAgICAgICAgICAgICAgIGN1cnNvci5uZXh0QXJndW1lbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImlnbm9yZVwiOiBmdW5jdGlvbiAoY3Vyc29yLCB0b2tlblN0cmluZykge1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBBU1Q7XG5cbiAgICB9XG5cbn0pKCk7XG5cblxuIl0sImZpbGUiOiJ5YXJuLmFzdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";
    angular.module('yarn').factory('Cursor', CursorService);

    function CursorService(Node) {

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
                this.head().set.last().type === 'symbol' && !this.sequenceBroken) {
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
                this.head().set.last().type === 'instruction' && !this.sequenceBroken) {
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

        return Cursor;
    }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLmN1cnNvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGFuZ3VsYXIubW9kdWxlKCd5YXJuJykuZmFjdG9yeSgnQ3Vyc29yJywgQ3Vyc29yU2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiBDdXJzb3JTZXJ2aWNlKE5vZGUpIHtcblxuICAgICAgICBmdW5jdGlvbiBDdXJzb3IoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgICAgICAgICB0aGlzLnNlcXVlbmNlQnJva2VuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBDdXJzb3IucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gW25vZGVdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIEN1cnNvci5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIEN1cnNvci5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMuc3RhY2subGVuZ3RoID4gMikgPyAtMiA6IC0xO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSBvZmZzZXRdO1xuICAgICAgICB9O1xuXG4gICAgICAgIEN1cnNvci5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrWzBdO1xuICAgICAgICB9O1xuXG4gICAgICAgIEN1cnNvci5wcm90b3R5cGUuYXBwZW5kSW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoXCJpbnN0cnVjdGlvblwiLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWQoKS5zZXQubGFzdCgpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0Lmxhc3QoKS50eXBlID09PSAnc3ltYm9sJyAmJiAhdGhpcy5zZXF1ZW5jZUJyb2tlbikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBpbnN0cnVjdGlvbiBmb2xsb3dzIGEgc3ltYm9sLCB0aGUgaW5zdHJ1Y3Rpb24gaXMgY29uc2lkZXJlZCB0byBiZSBcImFic29yYmVkXCIgYXNcbiAgICAgICAgICAgICAgICAvLyBhIHVuaXF1ZSBhcmd1bWVudCBieSB0aGUgc3ltYmxlIChhbmQgdmljZSB2ZXJzYSlcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2godGhpcy5oZWFkKCkuc2V0Lmxhc3QoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0LmFkZChub2RlKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQoKS5zZXQuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5lbmRTZXF1ZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnNpemUoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgdGhlIG5leHQgc2VxdWVuY2Ugc3RhcnRzIHdpdGggYSB2YWx1ZSBmb2xsb3dpbmcgYW4gaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBwcmV2ZW50IHRoZSB2YWx1ZSBmcm9tIGJlaW5nIFwiYWJzb3JiZWRcIiBieSB0aGUgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5hcHBlbmRTeW1ib2wgPSBmdW5jdGlvbiAodmFyaWFudCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbmV3IE5vZGUoXCJzeW1ib2xcIiwgdmFsdWUsIHZhcmlhbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkKCkuc2V0Lmxhc3QoKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCgpLnNldC5sYXN0KCkudHlwZSA9PT0gJ2luc3RydWN0aW9uJyAmJiAhdGhpcy5zZXF1ZW5jZUJyb2tlbikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBmb2xsb3dzIGFuIGluc3RydWN0aW9uLCB0aGUgdmFsdWUgaXMgY29uc2lkZXJlZCB0byBiZSBcImFic29yYmVkXCIgYXNcbiAgICAgICAgICAgICAgICAvLyBhIHVuaXF1ZSBhcmd1bWVudCBieSB0aGUgaW5zdHJ1Y3Rpb25cblxuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2godGhpcy5oZWFkKCkuc2V0Lmxhc3QoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0LmFkZChub2RlKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQoKS5zZXQuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgQ3Vyc29yLnByb3RvdHlwZS5zdGFydEFyZ3VtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5oZWFkKCkuc2V0Lmxhc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIEN1cnNvci5wcm90b3R5cGUubmV4dEFyZ3VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZUJyb2tlbiA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5zaXplKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBDdXJzb3I7XG4gICAgfVxuXG59KSgpO1xuIl0sImZpbGUiOiJ5YXJuLmN1cnNvci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";
    angular.module('yarn').factory('Logic', LogicService);


    function LogicService() {
        function Logic(state, script) {
            this.state = state;
            this.script = script;
            this.routines = {};
        }

        Logic.prototype.register = function (id, fn) {
            var self = this;

            function routine() {
                return fn.apply(self, arguments);
            }

            this.routines[id] = routine;
        };

        Logic.prototype.trigger = function (subject, event, object) {
            console.log("Triggering events : ", event);
            // Get the propper predicate
            var predicate = this.state.predicate(event);
            if (predicate) {
                // Find any existing ActionHandles
                var actionHandler = this.state.getActionHandler(subject, predicate, object);

                if (actionHandler) {

                    // Find the script node which is child of the "do" operator
                    var referenceNode = this.script.references[actionHandler.do.id];
                    if (referenceNode) {
                        this.script.runtime.runNode(referenceNode);
                        // TODO Execute the node found
                        console.log("FOUND!!!!!", referenceNode);
                    } else {
                        console.log("No 'on' node reference found for " + actionHandler.do.id);
                    }
                }


                console.log("actionHandler", actionHandler);
            } else {
                console.log("Unknown action predicate: ", event);
            }
        };

        Logic.prototype.routine = function (id) {
            return this.routines[id];
        };

        return Logic;

    }


})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLmxvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdMb2dpYycsIExvZ2ljU2VydmljZSk7XG5cblxuICAgIGZ1bmN0aW9uIExvZ2ljU2VydmljZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gTG9naWMoc3RhdGUsIHNjcmlwdCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgICAgICB0aGlzLnJvdXRpbmVzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBMb2dpYy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIGZuKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJvdXRpbmUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucm91dGluZXNbaWRdID0gcm91dGluZTtcbiAgICAgICAgfTtcblxuICAgICAgICBMb2dpYy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChzdWJqZWN0LCBldmVudCwgb2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRyaWdnZXJpbmcgZXZlbnRzIDogXCIsIGV2ZW50KTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgcHJvcHBlciBwcmVkaWNhdGVcbiAgICAgICAgICAgIHZhciBwcmVkaWNhdGUgPSB0aGlzLnN0YXRlLnByZWRpY2F0ZShldmVudCk7XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gRmluZCBhbnkgZXhpc3RpbmcgQWN0aW9uSGFuZGxlc1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25IYW5kbGVyID0gdGhpcy5zdGF0ZS5nZXRBY3Rpb25IYW5kbGVyKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25IYW5kbGVyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgc2NyaXB0IG5vZGUgd2hpY2ggaXMgY2hpbGQgb2YgdGhlIFwiZG9cIiBvcGVyYXRvclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlTm9kZSA9IHRoaXMuc2NyaXB0LnJlZmVyZW5jZXNbYWN0aW9uSGFuZGxlci5kby5pZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdC5ydW50aW1lLnJ1bk5vZGUocmVmZXJlbmNlTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEV4ZWN1dGUgdGhlIG5vZGUgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQhISEhIVwiLCByZWZlcmVuY2VOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gJ29uJyBub2RlIHJlZmVyZW5jZSBmb3VuZCBmb3IgXCIgKyBhY3Rpb25IYW5kbGVyLmRvLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3Rpb25IYW5kbGVyXCIsIGFjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gYWN0aW9uIHByZWRpY2F0ZTogXCIsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBMb2dpYy5wcm90b3R5cGUucm91dGluZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGluZXNbaWRdO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBMb2dpYztcblxuICAgIH1cblxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4ubG9naWMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function () {
    "use strict";
    angular.module('yarn').factory('Node', NodeService);

    function NodeService() {
        function Node(type, value, variant) {
            this.type = type;
            this.variant = variant;
            this.value = value;
            this.set = new Set();
        }

        Node.prototype.html = function () {
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
            html.push(this.set.html());
            html.push("</div>");
            return html.join("");
        };


        // todo: Put Set in its own service
        function Set() {
            this.nodes = [];
        }

        Set.prototype.html = function () {
            var html = [];
            html.push("<div class='set'>");
            this.nodes.forEach(function (node) {
                html.push(node.html());
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


        return Node;
    }


})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLm5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhbmd1bGFyLm1vZHVsZSgneWFybicpLmZhY3RvcnkoJ05vZGUnLCBOb2RlU2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiBOb2RlU2VydmljZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gTm9kZSh0eXBlLCB2YWx1ZSwgdmFyaWFudCkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMudmFyaWFudCA9IHZhcmlhbnQ7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5vZGUucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IFtdO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPGRpdiBjbGFzcz0nbm9kZSc+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFxuICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2xhYmVsJz48c3BhbiBjbGFzcz0ndmFsdWUnPlwiICtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnN1YnN0cigwLCA4MCkgK1xuICAgICAgICAgICAgICAgIFwiPC9zcGFuPiA8c3BhbiBjbGFzcz0ndHlwZSc+XCJcbiAgICAgICAgICAgICAgICArIHRoaXMudHlwZSArXG4gICAgICAgICAgICAgICAgXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFyaWFudCkgaHRtbC5wdXNoKFwiPHNwYW4gY2xhc3M9J3ZhcmlhbnQnPlwiICsgdGhpcy52YXJpYW50ICsgXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPlwiKTtcbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLnNldC5odG1sKCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9kaXY+XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWwuam9pbihcIlwiKTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIHRvZG86IFB1dCBTZXQgaW4gaXRzIG93biBzZXJ2aWNlXG4gICAgICAgIGZ1bmN0aW9uIFNldCgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIFNldC5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8ZGl2IGNsYXNzPSdzZXQnPlwiKTtcbiAgICAgICAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChub2RlLmh0bWwoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjwvZGl2PlwiKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sLmpvaW4oXCJcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgU2V0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIHJldHVybiBOb2RlO1xuICAgIH1cblxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4ubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function(){
    "use strict";
    angular.module('yarn').factory('Pointer', PointerService);


    function PointerService() {

        // Todo: Token should be an object not an array
        // Todo: Move all method functions into the prototype
        function Pointer() {

            this._state = "default";

            this.start = function () {
                this.text = "";
                this.chr = "";
                this.pos = 0;
                this.buffer = [];
                this.rawBuffer = [];
                this.tokens = [];
                this._state = "default";
                this.chr = this.text[this.pos];
            };

            this.peek = function (len) {
                return this.text.substr(this.pos + 1, len);
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

            this.start();
        }

        Pointer.prototype.tokenize = function (text) {
            var pointer = this;
            var cycle = 0;
            var maxCycle = 10000;

            var numeric = "0123456789";
            var numericExtended = numeric + ".";
            var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var alphaNum = alpha + numeric;
            var alphaNumExtended = alphaNum + "-_";

            pointer.text = text;

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
    }


})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnBvaW50ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdQb2ludGVyJywgUG9pbnRlclNlcnZpY2UpO1xuXG5cbiAgICBmdW5jdGlvbiBQb2ludGVyU2VydmljZSgpIHtcblxuICAgICAgICAvLyBUb2RvOiBUb2tlbiBzaG91bGQgYmUgYW4gb2JqZWN0IG5vdCBhbiBhcnJheVxuICAgICAgICAvLyBUb2RvOiBNb3ZlIGFsbCBtZXRob2QgZnVuY3Rpb25zIGludG8gdGhlIHByb3RvdHlwZVxuICAgICAgICBmdW5jdGlvbiBQb2ludGVyKCkge1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwiZGVmYXVsdFwiO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaHIgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucmF3QnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hyID0gdGhpcy50ZXh0W3RoaXMucG9zXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucGVlayA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0LnN1YnN0cih0aGlzLnBvcyArIDEsIGxlbik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkIHx8IGlkID09PSBcIlwiKSB0aGlzLl9zdGF0ZSA9IGlkO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuY2hyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhd0J1ZmZlci5wdXNoKHRoaXMuY2hyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcysrO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5za2lwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmF3QnVmZmVyLnB1c2godGhpcy5jaHIpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9zKys7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaHIgPSB0aGlzLnRleHRbdGhpcy5wb3NdO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHh0O1xuICAgICAgICAgICAgICAgIHZhciB0eHRSYXc7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1Rva2VuO1xuICAgICAgICAgICAgICAgIHR4dFJhdyA9IHRoaXMucmF3QnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgdHh0ID0gdGhpcy5idWZmZXIuam9pbihcIlwiKS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHR4dFJhdyAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHh0ID09PSBcIlwiICYmIHRoaXMuc3RhdGUoKSA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSB3aGl0ZXNwYWNlIGhlcmUhXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbGxhcHNlIGxpbmUtYnJlYWtzIGludG8gbXVsdGlMaW5lYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVG9rZW4gPSB0aGlzLnRva2Vuc1t0aGlzLnRva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHRoaXMuc3RhdGUoKSA9PT0gXCJsaW5lYnJlYWtcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcmV2aW91c1Rva2VuWzBdID09PSBcImxpbmVicmVha1wiIHx8IHByZXZpb3VzVG9rZW5bMF0gPT09IFwibXVsdGlMaW5lYnJlYWtcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVG9rZW5bMF0gPSBcIm11bHRpTGluZWJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUb2tlblsyXSA9IHByZXZpb3VzVG9rZW5bMl0gKyB0eHRSYXc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gW3RoaXMuc3RhdGUoKSwgdHh0LCB0eHRSYXddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhd0J1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zdGFydFNpbmdsZUNoYXJCbG9jayA9IGZ1bmN0aW9uIChzdGF0ZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpXG4gICAgICAgICAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKHN0YXRlSWQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5lbmRTaW5nbGVDaGFyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgLmZsdXNoKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmVuZFB1bmN0dWF0aW9uVG9rZW4gPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmx1c2goKS5zdGF0ZSh0eXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoKS5mbHVzaCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5pc0VuZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvcyA+IHRoaXMudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBQb2ludGVyLnByb3RvdHlwZS50b2tlbml6ZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcG9pbnRlciA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY3ljbGUgPSAwO1xuICAgICAgICAgICAgdmFyIG1heEN5Y2xlID0gMTAwMDA7XG5cbiAgICAgICAgICAgIHZhciBudW1lcmljID0gXCIwMTIzNDU2Nzg5XCI7XG4gICAgICAgICAgICB2YXIgbnVtZXJpY0V4dGVuZGVkID0gbnVtZXJpYyArIFwiLlwiO1xuICAgICAgICAgICAgdmFyIGFscGhhID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4gICAgICAgICAgICB2YXIgYWxwaGFOdW0gPSBhbHBoYSArIG51bWVyaWM7XG4gICAgICAgICAgICB2YXIgYWxwaGFOdW1FeHRlbmRlZCA9IGFscGhhTnVtICsgXCItX1wiO1xuXG4gICAgICAgICAgICBwb2ludGVyLnRleHQgPSB0ZXh0O1xuXG4gICAgICAgICAgICB3aGlsZSAoIXBvaW50ZXIuaXNFbmRlZCgpKSB7XG5cbiAgICAgICAgICAgICAgICBjeWNsZSsrO1xuICAgICAgICAgICAgICAgIGlmIChjeWNsZSA+IG1heEN5Y2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvaW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyhcIlRvbyBtYW55IGN5Y2xlcyFcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyLnN0YXJ0U2luZ2xlQ2hhckJsb2NrKFwiZG91YmxlUXVvdGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLmNociA9PT0gXCInXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJzaW5nbGVRdW90ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSBcIntcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5zdGFydFNpbmdsZUNoYXJCbG9jayhcIm11c3RhY2hlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09IFwiW1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyLnN0YXJ0U2luZ2xlQ2hhckJsb2NrKFwiYnJhY2tldFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG51bWVyaWMuaW5kZXhPZihwb2ludGVyLmNocikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mbHVzaCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXRlKFwibnVtZXJpY1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnQCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJhdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJoYXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICckJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5zdGFydFNpbmdsZUNoYXJCbG9jayhcImRvbGxhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2ludGVyLnBlZWsoMSkgPT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZsdXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNraXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2tpcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGF0ZShcImxpbmVDb21tZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnBlZWsoMSkgPT09ICcqJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZsdXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNraXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2tpcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGF0ZShcImJsb2NrQ29tbWVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLmNociA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kUHVuY3R1YXRpb25Ub2tlbihcImxpbmVicmVha1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kUHVuY3R1YXRpb25Ub2tlbihcInBlcmlvZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnLCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kUHVuY3R1YXRpb25Ub2tlbihcImNvbW1hXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICc6Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5lbmRQdW5jdHVhdGlvblRva2VuKFwiY29sb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5zdGF0ZSgpID09PSBcImxpbmVDb21tZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFNpbmdsZUNoYXJCbG9jaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJibG9ja0NvbW1lbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRlci5wZWVrKDEpID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNraXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2tpcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnN0YXRlKCkgPT09IFwiZG91YmxlUXVvdGVcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kU2luZ2xlQ2hhckJsb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5zdGF0ZSgpID09PSBcInNpbmdsZVF1b3RlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSBcIidcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5lbmRTaW5nbGVDaGFyQmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnN0YXRlKCkgPT09IFwibXVzdGFjaGVcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFNpbmdsZUNoYXJCbG9jaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJicmFja2V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5lbmRTaW5nbGVDaGFyQmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnN0YXRlKCkgPT09IFwibnVtZXJpY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1lcmljRXh0ZW5kZWQuaW5kZXhPZihwb2ludGVyLmNocikgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZsdXNoKHBvaW50ZXIuc3RhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJoYXNoXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5zdGF0ZSgpID09PSBcImF0XCIgfHxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlci5zdGF0ZSgpID09PSBcImRvbGxhclwiXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbHBoYU51bUV4dGVuZGVkLmluZGV4T2YocG9pbnRlci5jaHIpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mbHVzaChwb2ludGVyLnN0YXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlXG4gICAgICAgICAgICAgICAgcG9pbnRlci5zdGVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cblxuICAgICAgICBQb2ludGVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRva2VucyA9IHRoaXMudG9rZW5zO1xuICAgICAgICAgICAgdmFyIGdyaWQgPSBbXCI8dGFibGUgY2xhc3M9J3Rlc3RHcmlkJz48dGhlYWQ+PHRyPjx0ZD5UeXBlPC90ZD48dGQ+QVNUIE9wZXJhdGlvbjwvdGQ+PHRkPlRva2VuPC90ZD48dGQ+UmF3PC90ZD48L3RyPjwvdGhlYWQ+XCJdO1xuICAgICAgICAgICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpbmRleCwgdG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgZ3JpZC5wdXNoKFwiPHRyPjx0ZD5cIik7XG4gICAgICAgICAgICAgICAgZ3JpZC5wdXNoKHRva2VuWzBdKTtcbiAgICAgICAgICAgICAgICBncmlkLnB1c2goXCI8L3RkPjx0ZD5cIik7XG4gICAgICAgICAgICAgICAgZ3JpZC5wdXNoKHRva2VuWzNdKTtcbiAgICAgICAgICAgICAgICBncmlkLnB1c2goXCI8L3RkPjx0ZD5cIik7XG4gICAgICAgICAgICAgICAgZ3JpZC5wdXNoKHRva2VuWzFdKTtcbiAgICAgICAgICAgICAgICBncmlkLnB1c2goXCI8L3RkPjx0ZD5bXCIpO1xuICAgICAgICAgICAgICAgIGdyaWQucHVzaCh0b2tlblsyXSk7XG4gICAgICAgICAgICAgICAgZ3JpZC5wdXNoKFwiXTwvdGQ+PC90cj5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyaWQucHVzaChcIjwvdGFibGU+XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGdyaWQuam9pbihcIlwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gUG9pbnRlcjtcbiAgICB9XG5cblxufSkoKTtcbiJdLCJmaWxlIjoieWFybi5wb2ludGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function (Cursor) {
    "use strict";
    angular.module('yarn').factory('Runtime', RuntimeService);

    function RuntimeService(Cursor) {

        var runtimeModes = {
            "when": true,
            "do": true,
            "on": true
        };


        /**
         * Runtime class user to execute the ast with the state
         * @param ast
         * @param state
         * @param onModeChange
         * @constructor
         * @return {string}
         */
        function Runtime(ast, state, onModeChange, onImport) {
            this.ast = ast;
            this.state = state;
            this.cursor = new Cursor();
            this.stack = new Stack();
            // Allows the logic class to keep track on special key nodes
            this.onModeChange = onModeChange || function () {};
            this.onImport = onImport || function () {};
        }

        // todo: See if code should be generalized between Stack/Pointer/Cursor
        // todo: Put Stack in its own service!
        function Stack() {
            this.scopes = [];
        }

        Stack.prototype.size = function () {
            return this.scopes.length;
        };

        Stack.prototype.head = function () {
            return this.scopes[this.scopes.length - 1];
        };

        Stack.prototype.parent = function () {
            var offset = (this.scopes.length > 2) ? 2 : 1;
            return this.scopes[this.scopes.length - offset];
        };

        Stack.prototype.root = function () {
            return this.scopes[0];
        };

        Stack.prototype.push = function (mode, obj) {
            //console.log("Pushed : ", obj);
            var head = this.head();
            this.scopes.push(new Scope(mode, obj, head));
        };

        Stack.prototype.pop = function () {
            //console.log("pop!");
            this.scopes.pop();
        };

        function Scope(mode, obj, parent) {
            this.values = obj;
            this.parent = parent;
            this.values["$mode"] = mode;
        }

        /**
         * Start to execute the AST
         */
        Runtime.prototype.run = function () {
            this.cursor.start(this.ast.root);
            return this.runNode(this.ast.root);
        };

        Runtime.prototype.runNode = function (node) {
            var self = this;

            var returnValue;

            var defaultMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!
                    runtime.stack.push("default", {
                        "this": "root"
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                },
                "symbol": function (runtime, node) {
                    //console.log("symbole ", node.value);
                    // Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("default", {
                        "this": returnValue
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    returnValue = node.value;
                    runtime.stack.push("default", {
                        "this": node.value
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    //console.log("instruction ", node.value);
                    var predicate;
                    var args;
                    var mode;
                    // First, test if the instruction is for a mode change or a predicate
                    var modeHandler = modes[node.value.trim().toLowerCase()];
                    if (modeHandler) {
                        mode = node.value.trim().toLowerCase();
                        runtime.stack.push(mode, {
                        });
                        runtime.runSet(node.set);
                        runtime.stack.pop();

                    } else if (node.value === "@imported") {
                        //runtime.stack.push("default", {
                        //    "this": "root"
                        //});
                        runtime.runSet(node.set);
                        //runtime.stack.pop();

                    } else {

                        // Identify which predicate corresponds to this instruction
                        predicate = runtime.state.predicate(node.value);
                        // Run the child set of node to be used by the predicate
                        args = runtime.runSet(node.set);
                        // Create assertion from predicate
                        if (args.length) {
                            args.forEach(function (arg) {
                                //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                                var currentThis = runtime.stack.head().values.this;
                                var assertion = runtime.state.setAssertion(currentThis, predicate, arg);
                                console.log("created assetion: ", assertion);
                            });
                        } else {
                            var currentThis = runtime.stack.head().values.this;
                            runtime.state.setAssertion(currentThis, predicate);
                        }
                    }
                    return null;
                },
                "fallback": function (runtime, node) {
                    console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                    return null;
                }
            };

            var whenMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!

                    //runtime.stack.push("default", {
                    //    "this": "root"
                    //});
                    //runtime.runSet(node.set);
                    //runtime.stack.pop();
                },
                "symbol": function (runtime, node) {
                    // whenMode: Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("when", {
                        "this": returnValue
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    runtime.stack.push("when", {
                        "this": node.value
                    });
                    returnValue = node.value;
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    var predicate;
                    var args;

                    if (node.value === "do" ) {


                        var parent = runtime.stack.parent();
                        //debugger;
                        args = runtime.runSet(node.set);
                        parent.values["$do"] = args;

                    } else {

                        // Identify which predicate corresponds to this instruction
                        predicate = runtime.state.predicate(node.value);
                        // Run the child set of node to be used by the predicate
                        args = runtime.runSet(node.set);

                        var head = runtime.stack.head();
                        // Add a collection of action handler to add the "do" to then afterward
                        var actionHandlers = head.values.actionHandlers = [];

                        var doReferences = head.values["$do"] || [];

                        // Create assertion from predicate
                        //TODO: Instead of an "if", simply prefil the args with [undefined] if no args
                        if (args.length) {
                            args.forEach(function (arg) {
                                //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                                var currentThis = runtime.stack.head().values.this;
                                //console.log("runtime.stack.head().values", runtime.stack.head().values);
                                doReferences.forEach(function (doReference) {
                                    var actionHandler = runtime.state.setActionHandler(currentThis, predicate, arg, doReference);
                                    actionHandlers.push(actionHandler);
                                });
                                //console.log("created assetion: ", arg);
                            });
                        } else {
                            var currentThis = runtime.stack.head().values.this;
                            doReferences.forEach(function (doReference) {
                                var actionHandler = runtime.state.setActionHandler(currentThis, predicate, null, doReference);
                                actionHandlers.push(actionHandler);
                            });
                        }

                        //debugger;

                    }
                    return null;
                },
                "fallback": function (runtime, node) {
                    console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                    return null;
                }
            };


            var importMode = {
                "root": function (runtime, node) {
                    // Nothing to do really with the root instruction!
                },
                "symbol": function (runtime, node) {
                    // whenMode: Get or create a new thing according to that symbol
                    if (node.variant === "value") {
                        returnValue = node.value;
                        //console.log("VALUE variant:", node.value);
                    } else if (node.variant === "reference") {
                        returnValue = runtime.state.thing(node.value);
                    } else if (node.variant === "constant") {
                        returnValue = runtime.state.thing(node.value);
                    } else {
                        console.warn("Unknown node variant [" + node.variant + "]");
                    }
                    runtime.stack.push("when", {
                        "this": returnValue
                    });


                    // Call the onImport to trigger the loading and execution
                    // of an imported file
                    self.onImport(returnValue);
                    // DONT RUN THE SET ????
                    // todo: figure out...
                    //runtime.runSet(node.set);

                    runtime.stack.pop();
                    return returnValue;
                },
                "value": function (runtime, node) {
                    runtime.stack.push("import", {
                        "this": node.value
                    });
                    returnValue = node.value;
                    runtime.runSet(node.set);
                    runtime.stack.pop();
                    return returnValue;
                },
                "instruction": function (runtime, node) {
                    //var predicate;
                    //var args;
                    //
                    //if (node.value === "do" ) {
                    //
                    //
                    //    var parent = runtime.stack.parent();
                    //    //debugger;
                    //    args = runtime.runSet(node.set);
                    //    parent.values["$do"] = args;
                    //
                    //} else {
                    //
                    //    // Identify which predicate corresponds to this instruction
                    //    predicate = runtime.state.predicate(node.value);
                    //    // Run the child set of node to be used by the predicate
                    //    args = runtime.runSet(node.set);
                    //
                    //    var head = runtime.stack.head();
                    //    // Add a collection of action handler to add the "do" to then afterward
                    //    var actionHandlers = head.values.actionHandlers = [];
                    //
                    //    var doReferences = head.values["$do"] || [];
                    //
                    //    // Create assertion from predicate
                    //    //TODO: Instead of an "if", simply prefil the args with [undefined] if no args
                    //    if (args.length) {
                    //        args.forEach(function (arg) {
                    //            //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                    //            var currentThis = runtime.stack.head().values.this;
                    //            //console.log("runtime.stack.head().values", runtime.stack.head().values);
                    //            doReferences.forEach(function (doReference) {
                    //                var actionHandler = runtime.state.setActionHandler(currentThis, predicate, arg, doReference);
                    //                actionHandlers.push(actionHandler);
                    //            });
                    //            //console.log("created assetion: ", arg);
                    //        });
                    //    } else {
                    //        var currentThis = runtime.stack.head().values.this;
                    //        doReferences.forEach(function (doReference) {
                    //            var actionHandler = runtime.state.setActionHandler(currentThis, predicate, null, doReference);
                    //            actionHandlers.push(actionHandler);
                    //        });
                    //    }
                    //
                    //    //debugger;
                    //
                    //}
                    //return null;
                }
            };

            // Dont execute enything from a "on" node
            var onMode = {
                "root": function (runtime, node) {
                },
                "symbol": function (runtime, node) {
                },
                "value": function (runtime, node) {
                },
                "instruction": function (runtime, node) {
                },
                "fallback": function (runtime, node) {
                }
            };

            var modes = {
                "default": defaultMode,
                "import": importMode,
                "when": whenMode,
                "do": {}, //TODO: Not yet implement... really needed ?
                "on": onMode
            };


            this.cursor.push(node);

            var mode;
            var head = this.stack.head();
            if (!head) {
                mode = "default";
            } else {
                mode = head.values["$mode"];
                //console.log('-----head.values', mode, node.type, head.values);
                if (!mode) mode = "default";

                // Detect a mode change from parent node. Ex: when, on
                var parent = head.parent;
                if (parent) {
                    var parentMode = head.parent.values["$mode"];
                    if (!parentMode) parentMode = "default";
                    if (mode !== parentMode) this.onModeChange(mode, node);
                }

            }


            var nodeHandler = modes[mode][node.type];
            //console.log("  nodeHandler :   ", nodeHandler);

            if (!nodeHandler) {
                nodeHandler = modes.default.fallback;
            }


            returnValue = nodeHandler(this, node);


            this.cursor.pop();

            return returnValue;
        };

        Runtime.prototype.runSet = function (set) {
            var self = this;
            var args = [];

            set.nodes.forEach(function (node) {
                // Return the node value as an argument to be consumed
                args.push(self.runNode(node));
            });
            return args;
        };

        return Runtime;

    }


})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnJ1bnRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChDdXJzb3IpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhbmd1bGFyLm1vZHVsZSgneWFybicpLmZhY3RvcnkoJ1J1bnRpbWUnLCBSdW50aW1lU2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiBSdW50aW1lU2VydmljZShDdXJzb3IpIHtcblxuICAgICAgICB2YXIgcnVudGltZU1vZGVzID0ge1xuICAgICAgICAgICAgXCJ3aGVuXCI6IHRydWUsXG4gICAgICAgICAgICBcImRvXCI6IHRydWUsXG4gICAgICAgICAgICBcIm9uXCI6IHRydWVcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSdW50aW1lIGNsYXNzIHVzZXIgdG8gZXhlY3V0ZSB0aGUgYXN0IHdpdGggdGhlIHN0YXRlXG4gICAgICAgICAqIEBwYXJhbSBhc3RcbiAgICAgICAgICogQHBhcmFtIHN0YXRlXG4gICAgICAgICAqIEBwYXJhbSBvbk1vZGVDaGFuZ2VcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFJ1bnRpbWUoYXN0LCBzdGF0ZSwgb25Nb2RlQ2hhbmdlLCBvbkltcG9ydCkge1xuICAgICAgICAgICAgdGhpcy5hc3QgPSBhc3Q7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBuZXcgU3RhY2soKTtcbiAgICAgICAgICAgIC8vIEFsbG93cyB0aGUgbG9naWMgY2xhc3MgdG8ga2VlcCB0cmFjayBvbiBzcGVjaWFsIGtleSBub2Rlc1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVDaGFuZ2UgPSBvbk1vZGVDaGFuZ2UgfHwgZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgICB0aGlzLm9uSW1wb3J0ID0gb25JbXBvcnQgfHwgZnVuY3Rpb24gKCkge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2RvOiBTZWUgaWYgY29kZSBzaG91bGQgYmUgZ2VuZXJhbGl6ZWQgYmV0d2VlbiBTdGFjay9Qb2ludGVyL0N1cnNvclxuICAgICAgICAvLyB0b2RvOiBQdXQgU3RhY2sgaW4gaXRzIG93biBzZXJ2aWNlIVxuICAgICAgICBmdW5jdGlvbiBTdGFjaygpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBTdGFjay5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjb3Blcy5sZW5ndGg7XG4gICAgICAgIH07XG5cbiAgICAgICAgU3RhY2sucHJvdG90eXBlLmhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY29wZXNbdGhpcy5zY29wZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH07XG5cbiAgICAgICAgU3RhY2sucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAodGhpcy5zY29wZXMubGVuZ3RoID4gMikgPyAyIDogMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjb3Blc1t0aGlzLnNjb3Blcy5sZW5ndGggLSBvZmZzZXRdO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YWNrLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzWzBdO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG1vZGUsIG9iaikge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlB1c2hlZCA6IFwiLCBvYmopO1xuICAgICAgICAgICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQoKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVzLnB1c2gobmV3IFNjb3BlKG1vZGUsIG9iaiwgaGVhZCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicG9wIVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVzLnBvcCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIFNjb3BlKG1vZGUsIG9iaiwgcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IG9iajtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbXCIkbW9kZVwiXSA9IG1vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgdG8gZXhlY3V0ZSB0aGUgQVNUXG4gICAgICAgICAqL1xuICAgICAgICBSdW50aW1lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnNvci5zdGFydCh0aGlzLmFzdC5yb290KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bk5vZGUodGhpcy5hc3Qucm9vdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgUnVudGltZS5wcm90b3R5cGUucnVuTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZTtcblxuICAgICAgICAgICAgdmFyIGRlZmF1bHRNb2RlID0ge1xuICAgICAgICAgICAgICAgIFwicm9vdFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGRvIHJlYWxseSB3aXRoIHRoZSByb290IGluc3RydWN0aW9uIVxuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGhpc1wiOiBcInJvb3RcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJzeW1ib2xcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInN5bWJvbGUgXCIsIG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgb3IgY3JlYXRlIGEgbmV3IHRoaW5nIGFjY29yZGluZyB0byB0aGF0IHN5bWJvbFxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52YXJpYW50ID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWQUxVRSB2YXJpYW50OlwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwicmVmZXJlbmNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcnVudGltZS5zdGF0ZS50aGluZyhub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwiY29uc3RhbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBydW50aW1lLnN0YXRlLnRoaW5nKG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biBub2RlIHZhcmlhbnQgW1wiICsgbm9kZS52YXJpYW50ICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucHVzaChcImRlZmF1bHRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IHJldHVyblZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGhpc1wiOiBub2RlLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiaW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImluc3RydWN0aW9uIFwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWRpY2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaXJzdCwgdGVzdCBpZiB0aGUgaW5zdHJ1Y3Rpb24gaXMgZm9yIGEgbW9kZSBjaGFuZ2Ugb3IgYSBwcmVkaWNhdGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVIYW5kbGVyID0gbW9kZXNbbm9kZS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IG5vZGUudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2gobW9kZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS52YWx1ZSA9PT0gXCJAaW1wb3J0ZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9ydW50aW1lLnN0YWNrLnB1c2goXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwidGhpc1wiOiBcInJvb3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcnVudGltZS5zdGFjay5wb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZGVudGlmeSB3aGljaCBwcmVkaWNhdGUgY29ycmVzcG9uZHMgdG8gdGhpcyBpbnN0cnVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlID0gcnVudGltZS5zdGF0ZS5wcmVkaWNhdGUobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSdW4gdGhlIGNoaWxkIHNldCBvZiBub2RlIHRvIGJlIHVzZWQgYnkgdGhlIHByZWRpY2F0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IHJ1bnRpbWUucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhc3NlcnRpb24gZnJvbSBwcmVkaWNhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogSGFuZGxlIFwibm9uIHByZWRpY2F0ZVwiIGluc3RydWN0aW9ucyBzdWNoIGFzIFwidGhpcy90aGF0XCIsIHdpdGhvdXQgY3JlYXRpbmcgbmV3IGFzc2VydGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRoaXMgPSBydW50aW1lLnN0YWNrLmhlYWQoKS52YWx1ZXMudGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2VydGlvbiA9IHJ1bnRpbWUuc3RhdGUuc2V0QXNzZXJ0aW9uKGN1cnJlbnRUaGlzLCBwcmVkaWNhdGUsIGFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBhc3NldGlvbjogXCIsIGFzc2VydGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGhpcyA9IHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcy50aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhdGUuc2V0QXNzZXJ0aW9uKGN1cnJlbnRUaGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJmYWxsYmFja1wiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJTZXQgaWdub3JlZCwgdW5yZWNvZ25pc2VkIG5vZGUgdHlwZSBbXCIgKyBub2RlLnR5cGUgKyBcIl1cIiwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciB3aGVuTW9kZSA9IHtcbiAgICAgICAgICAgICAgICBcInJvb3RcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90aGluZyB0byBkbyByZWFsbHkgd2l0aCB0aGUgcm9vdCBpbnN0cnVjdGlvbiFcblxuICAgICAgICAgICAgICAgICAgICAvL3J1bnRpbWUuc3RhY2sucHVzaChcImRlZmF1bHRcIiwge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICBcInRoaXNcIjogXCJyb290XCJcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgLy9ydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIC8vcnVudGltZS5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwic3ltYm9sXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW5Nb2RlOiBHZXQgb3IgY3JlYXRlIGEgbmV3IHRoaW5nIGFjY29yZGluZyB0byB0aGF0IHN5bWJvbFxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52YXJpYW50ID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWQUxVRSB2YXJpYW50OlwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwicmVmZXJlbmNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcnVudGltZS5zdGF0ZS50aGluZyhub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwiY29uc3RhbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBydW50aW1lLnN0YXRlLnRoaW5nKG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biBub2RlIHZhcmlhbnQgW1wiICsgbm9kZS52YXJpYW50ICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucHVzaChcIndoZW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IHJldHVyblZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wdXNoKFwid2hlblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRoaXNcIjogbm9kZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiaW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWRpY2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3M7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudmFsdWUgPT09IFwiZG9cIiApIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gcnVudGltZS5zdGFjay5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnZhbHVlc1tcIiRkb1wiXSA9IGFyZ3M7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWRlbnRpZnkgd2hpY2ggcHJlZGljYXRlIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZSA9IHJ1bnRpbWUuc3RhdGUucHJlZGljYXRlKG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUnVuIHRoZSBjaGlsZCBzZXQgb2Ygbm9kZSB0byBiZSB1c2VkIGJ5IHRoZSBwcmVkaWNhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkID0gcnVudGltZS5zdGFjay5oZWFkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBjb2xsZWN0aW9uIG9mIGFjdGlvbiBoYW5kbGVyIHRvIGFkZCB0aGUgXCJkb1wiIHRvIHRoZW4gYWZ0ZXJ3YXJkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlcnMgPSBoZWFkLnZhbHVlcy5hY3Rpb25IYW5kbGVycyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9SZWZlcmVuY2VzID0gaGVhZC52YWx1ZXNbXCIkZG9cIl0gfHwgW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhc3NlcnRpb24gZnJvbSBwcmVkaWNhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogSW5zdGVhZCBvZiBhbiBcImlmXCIsIHNpbXBseSBwcmVmaWwgdGhlIGFyZ3Mgd2l0aCBbdW5kZWZpbmVkXSBpZiBubyBhcmdzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IEhhbmRsZSBcIm5vbiBwcmVkaWNhdGVcIiBpbnN0cnVjdGlvbnMgc3VjaCBhcyBcInRoaXMvdGhhdFwiLCB3aXRob3V0IGNyZWF0aW5nIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaGlzID0gcnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzLnRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJydW50aW1lLnN0YWNrLmhlYWQoKS52YWx1ZXNcIiwgcnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9SZWZlcmVuY2VzLmZvckVhY2goZnVuY3Rpb24gKGRvUmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlciA9IHJ1bnRpbWUuc3RhdGUuc2V0QWN0aW9uSGFuZGxlcihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBhcmcsIGRvUmVmZXJlbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXJzLnB1c2goYWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY3JlYXRlZCBhc3NldGlvbjogXCIsIGFyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGhpcyA9IHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcy50aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvUmVmZXJlbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkb1JlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlciA9IHJ1bnRpbWUuc3RhdGUuc2V0QWN0aW9uSGFuZGxlcihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBudWxsLCBkb1JlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXJzLnB1c2goYWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiZmFsbGJhY2tcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiU2V0IGlnbm9yZWQsIHVucmVjb2duaXNlZCBub2RlIHR5cGUgW1wiICsgbm9kZS50eXBlICsgXCJdXCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBpbXBvcnRNb2RlID0ge1xuICAgICAgICAgICAgICAgIFwicm9vdFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGRvIHJlYWxseSB3aXRoIHRoZSByb290IGluc3RydWN0aW9uIVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJzeW1ib2xcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbk1vZGU6IEdldCBvciBjcmVhdGUgYSBuZXcgdGhpbmcgYWNjb3JkaW5nIHRvIHRoYXQgc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnZhcmlhbnQgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlZBTFVFIHZhcmlhbnQ6XCIsIG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudmFyaWFudCA9PT0gXCJyZWZlcmVuY2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBydW50aW1lLnN0YXRlLnRoaW5nKG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudmFyaWFudCA9PT0gXCJjb25zdGFudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJ1bnRpbWUuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIG5vZGUgdmFyaWFudCBbXCIgKyBub2RlLnZhcmlhbnQgKyBcIl1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wdXNoKFwid2hlblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRoaXNcIjogcmV0dXJuVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBvbkltcG9ydCB0byB0cmlnZ2VyIHRoZSBsb2FkaW5nIGFuZCBleGVjdXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYW4gaW1wb3J0ZWQgZmlsZVxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uSW1wb3J0KHJldHVyblZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRE9OVCBSVU4gVEhFIFNFVCA/Pz8/XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IGZpZ3VyZSBvdXQuLi5cbiAgICAgICAgICAgICAgICAgICAgLy9ydW50aW1lLnJ1blNldChub2RlLnNldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJpbXBvcnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IG5vZGUudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImluc3RydWN0aW9uXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHByZWRpY2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgYXJncztcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy9pZiAobm9kZS52YWx1ZSA9PT0gXCJkb1wiICkge1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgcGFyZW50ID0gcnVudGltZS5zdGFjay5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9kZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgYXJncyA9IHJ1bnRpbWUucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcGFyZW50LnZhbHVlc1tcIiRkb1wiXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gSWRlbnRpZnkgd2hpY2ggcHJlZGljYXRlIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcHJlZGljYXRlID0gcnVudGltZS5zdGF0ZS5wcmVkaWNhdGUobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIFJ1biB0aGUgY2hpbGQgc2V0IG9mIG5vZGUgdG8gYmUgdXNlZCBieSB0aGUgcHJlZGljYXRlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGFyZ3MgPSBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBoZWFkID0gcnVudGltZS5zdGFjay5oZWFkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIEFkZCBhIGNvbGxlY3Rpb24gb2YgYWN0aW9uIGhhbmRsZXIgdG8gYWRkIHRoZSBcImRvXCIgdG8gdGhlbiBhZnRlcndhcmRcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGFjdGlvbkhhbmRsZXJzID0gaGVhZC52YWx1ZXMuYWN0aW9uSGFuZGxlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGRvUmVmZXJlbmNlcyA9IGhlYWQudmFsdWVzW1wiJGRvXCJdIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBDcmVhdGUgYXNzZXJ0aW9uIGZyb20gcHJlZGljYXRlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vVE9ETzogSW5zdGVhZCBvZiBhbiBcImlmXCIsIHNpbXBseSBwcmVmaWwgdGhlIGFyZ3Mgd2l0aCBbdW5kZWZpbmVkXSBpZiBubyBhcmdzXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RvZG86IEhhbmRsZSBcIm5vbiBwcmVkaWNhdGVcIiBpbnN0cnVjdGlvbnMgc3VjaCBhcyBcInRoaXMvdGhhdFwiLCB3aXRob3V0IGNyZWF0aW5nIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgY3VycmVudFRoaXMgPSBydW50aW1lLnN0YWNrLmhlYWQoKS52YWx1ZXMudGhpcztcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzXCIsIHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZG9SZWZlcmVuY2VzLmZvckVhY2goZnVuY3Rpb24gKGRvUmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBhY3Rpb25IYW5kbGVyID0gcnVudGltZS5zdGF0ZS5zZXRBY3Rpb25IYW5kbGVyKGN1cnJlbnRUaGlzLCBwcmVkaWNhdGUsIGFyZywgZG9SZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVycy5wdXNoKGFjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjcmVhdGVkIGFzc2V0aW9uOiBcIiwgYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGN1cnJlbnRUaGlzID0gcnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzLnRoaXM7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkb1JlZmVyZW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoZG9SZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlciA9IHJ1bnRpbWUuc3RhdGUuc2V0QWN0aW9uSGFuZGxlcihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBudWxsLCBkb1JlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYWN0aW9uSGFuZGxlcnMucHVzaChhY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIERvbnQgZXhlY3V0ZSBlbnl0aGluZyBmcm9tIGEgXCJvblwiIG5vZGVcbiAgICAgICAgICAgIHZhciBvbk1vZGUgPSB7XG4gICAgICAgICAgICAgICAgXCJyb290XCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInN5bWJvbFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJpbnN0cnVjdGlvblwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJmYWxsYmFja1wiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtb2RlcyA9IHtcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRcIjogZGVmYXVsdE1vZGUsXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogaW1wb3J0TW9kZSxcbiAgICAgICAgICAgICAgICBcIndoZW5cIjogd2hlbk1vZGUsXG4gICAgICAgICAgICAgICAgXCJkb1wiOiB7fSwgLy9UT0RPOiBOb3QgeWV0IGltcGxlbWVudC4uLiByZWFsbHkgbmVlZGVkID9cbiAgICAgICAgICAgICAgICBcIm9uXCI6IG9uTW9kZVxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aGlzLmN1cnNvci5wdXNoKG5vZGUpO1xuXG4gICAgICAgICAgICB2YXIgbW9kZTtcbiAgICAgICAgICAgIHZhciBoZWFkID0gdGhpcy5zdGFjay5oZWFkKCk7XG4gICAgICAgICAgICBpZiAoIWhlYWQpIHtcbiAgICAgICAgICAgICAgICBtb2RlID0gXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGUgPSBoZWFkLnZhbHVlc1tcIiRtb2RlXCJdO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJy0tLS0taGVhZC52YWx1ZXMnLCBtb2RlLCBub2RlLnR5cGUsIGhlYWQudmFsdWVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZGUpIG1vZGUgPSBcImRlZmF1bHRcIjtcblxuICAgICAgICAgICAgICAgIC8vIERldGVjdCBhIG1vZGUgY2hhbmdlIGZyb20gcGFyZW50IG5vZGUuIEV4OiB3aGVuLCBvblxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBoZWFkLnBhcmVudDtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRNb2RlID0gaGVhZC5wYXJlbnQudmFsdWVzW1wiJG1vZGVcIl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyZW50TW9kZSkgcGFyZW50TW9kZSA9IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZSAhPT0gcGFyZW50TW9kZSkgdGhpcy5vbk1vZGVDaGFuZ2UobW9kZSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIG5vZGVIYW5kbGVyID0gbW9kZXNbbW9kZV1bbm9kZS50eXBlXTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIgIG5vZGVIYW5kbGVyIDogICBcIiwgbm9kZUhhbmRsZXIpO1xuXG4gICAgICAgICAgICBpZiAoIW5vZGVIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgbm9kZUhhbmRsZXIgPSBtb2Rlcy5kZWZhdWx0LmZhbGxiYWNrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gbm9kZUhhbmRsZXIodGhpcywgbm9kZSk7XG5cblxuICAgICAgICAgICAgdGhpcy5jdXJzb3IucG9wKCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBSdW50aW1lLnByb3RvdHlwZS5ydW5TZXQgPSBmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuXG4gICAgICAgICAgICBzZXQubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbm9kZSB2YWx1ZSBhcyBhbiBhcmd1bWVudCB0byBiZSBjb25zdW1lZFxuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzZWxmLnJ1bk5vZGUobm9kZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gUnVudGltZTtcblxuICAgIH1cblxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4ucnVudGltZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";

    angular.module('yarn').factory('Script', ScriptService);

    function ScriptService(Pointer, AST, Runtime, $q, loadScript) {

        function Script() {
            this.source = "";
            this.pointer = new Pointer();
            this.ast = new AST();
            // Keep a reference t key named nodes
            this.references = {};
            // Imported child scripts
            this.imports = [];
            this.runtime = null;
        }

        Script.prototype.load = function (source) {
            this.source = source;
            var self = this;
            this.pointer.tokenize(source);
            console.log("yarn.script.load");
            return this.compile(this.pointer.tokens).then(function (ast) {
                console.log("after compile");
                return self.processImports(ast);
            });
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

        Script.prototype.processImports = function (ast) {
            console.info("Parsing AST for imports");
            console.log("ast", ast);
            return parseNode(ast.root);
        };

        function parseNode(node) {
            if (node.type === "instruction" && node.value === "Import") {
                return importSet(node.set);
            } else {
                return parseSet(node.set);
            }
        }

        function importSet(set) {
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(importNode(node));
                });
            }
            return $q.all(promises);
        }

        function importNode(node) {
            console.log("IMPORTING!", node);
            return loadScript(node.value).then(function (text) {
                var script = new Script();
                return script.load(text).then(function () {
                    console.log("SCRIPT IMPORTED", script);

                    // Graft the root node of the imported script onto
                    // the node which imported the script
                    // then change the node type to
                    node.type = "instruction";
                    node.value = "@imported";
                    node.set = script.ast.root.set;

                });
            });
        }

        function parseSet(set) {
            var promises = [];
            if (set.nodes.length) {
                angular.forEach(set.nodes, function (node) {
                    promises.push(parseNode(node));
                });
            }
            return $q.all(promises);
        }

/*

 cursor: Cursor
    root: Node
        set: Set
         nodes: Array[7]
             0: Node
                 set: Set
                     nodes: Array[4]

 */
        return Script;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdTY3JpcHQnLCBTY3JpcHRTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIFNjcmlwdFNlcnZpY2UoUG9pbnRlciwgQVNULCBSdW50aW1lLCAkcSwgbG9hZFNjcmlwdCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIFNjcmlwdCgpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlciA9IG5ldyBQb2ludGVyKCk7XG4gICAgICAgICAgICB0aGlzLmFzdCA9IG5ldyBBU1QoKTtcbiAgICAgICAgICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdCBrZXkgbmFtZWQgbm9kZXNcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlcyA9IHt9O1xuICAgICAgICAgICAgLy8gSW1wb3J0ZWQgY2hpbGQgc2NyaXB0c1xuICAgICAgICAgICAgdGhpcy5pbXBvcnRzID0gW107XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgU2NyaXB0LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXIudG9rZW5pemUoc291cmNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieWFybi5zY3JpcHQubG9hZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBpbGUodGhpcy5wb2ludGVyLnRva2VucykudGhlbihmdW5jdGlvbiAoYXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZnRlciBjb21waWxlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnByb2Nlc3NJbXBvcnRzKGFzdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBTY3JpcHQucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUgPSBuZXcgUnVudGltZSh0aGlzLmFzdCwgc3RhdGUsIG9uTW9kZUNoYW5nZSwgb25JbXBvcnQpO1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnJ1bigpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vZGVDaGFuZ2UobW9kZSwgbm9kZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZWVwaW5nIHJlZmVyZW5jZSB0byBbXCIgKyBub2RlLnZhbHVlICsgXCJdXCIsIG1vZGUsIG5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBub2RlUmVmZXJlbmNlSWQgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIHNlbGYucmVmZXJlbmNlc1tub2RlUmVmZXJlbmNlSWQudG9Mb3dlckNhc2UoKV0gPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkltcG9ydCh1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tPiBvbkltcG9ydCBcIiwgdXJsKTtcblxuXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0NSSVBUIExPQURJTkcgU0hPVUxEIE9DQ1VSIEhFUkUhXCIpXG5cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgU2NyaXB0LnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXN0LmNvbXBpbGUodG9rZW5zKTtcbiAgICAgICAgfTtcblxuICAgICAgICBTY3JpcHQucHJvdG90eXBlLnByb2Nlc3NJbXBvcnRzID0gZnVuY3Rpb24gKGFzdCkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiUGFyc2luZyBBU1QgZm9yIGltcG9ydHNcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFzdFwiLCBhc3QpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlTm9kZShhc3Qucm9vdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VOb2RlKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiaW5zdHJ1Y3Rpb25cIiAmJiBub2RlLnZhbHVlID09PSBcIkltcG9ydFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltcG9ydFNldChub2RlLnNldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZVNldChub2RlLnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbXBvcnRTZXQoc2V0KSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChzZXQubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNldC5ub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChpbXBvcnROb2RlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW1wb3J0Tm9kZShub2RlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklNUE9SVElORyFcIiwgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbG9hZFNjcmlwdChub2RlLnZhbHVlKS50aGVuKGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcmlwdCA9IG5ldyBTY3JpcHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NyaXB0LmxvYWQodGV4dCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0NSSVBUIElNUE9SVEVEXCIsIHNjcmlwdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gR3JhZnQgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgaW1wb3J0ZWQgc2NyaXB0IG9udG9cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5vZGUgd2hpY2ggaW1wb3J0ZWQgdGhlIHNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIGNoYW5nZSB0aGUgbm9kZSB0eXBlIHRvXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudHlwZSA9IFwiaW5zdHJ1Y3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52YWx1ZSA9IFwiQGltcG9ydGVkXCI7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0ID0gc2NyaXB0LmFzdC5yb290LnNldDtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwYXJzZVNldChzZXQpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHNldC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2V0Lm5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHBhcnNlTm9kZShub2RlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfVxuXG4vKlxuXG4gY3Vyc29yOiBDdXJzb3JcbiAgICByb290OiBOb2RlXG4gICAgICAgIHNldDogU2V0XG4gICAgICAgICBub2RlczogQXJyYXlbN11cbiAgICAgICAgICAgICAwOiBOb2RlXG4gICAgICAgICAgICAgICAgIHNldDogU2V0XG4gICAgICAgICAgICAgICAgICAgICBub2RlczogQXJyYXlbNF1cblxuICovXG4gICAgICAgIHJldHVybiBTY3JpcHQ7XG4gICAgfVxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4uc2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    "use strict";

    angular.module('yarn').factory('ActionHandler', ActionHandlerService);

    function ActionHandlerService() {

        /**
         * An assertion of an action or an event about things in the graph
         * @param subject
         * @param predicate
         * @param object
         * @constructor
         */
        function ActionHandler(subject, predicate, object, doReference) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.do = doReference;
        }


        return ActionHandler;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLmFjdGlvbkhhbmRsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCd5YXJuJykuZmFjdG9yeSgnQWN0aW9uSGFuZGxlcicsIEFjdGlvbkhhbmRsZXJTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIEFjdGlvbkhhbmRsZXJTZXJ2aWNlKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBhc3NlcnRpb24gb2YgYW4gYWN0aW9uIG9yIGFuIGV2ZW50IGFib3V0IHRoaW5ncyBpbiB0aGUgZ3JhcGhcbiAgICAgICAgICogQHBhcmFtIHN1YmplY3RcbiAgICAgICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gQWN0aW9uSGFuZGxlcihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZG9SZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgICAgICAgICAgdGhpcy5kbyA9IGRvUmVmZXJlbmNlO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gQWN0aW9uSGFuZGxlcjtcbiAgICB9XG5cbn0pKCk7XG5cbiJdLCJmaWxlIjoieWFybi5zdGF0ZS5hY3Rpb25IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    "use strict";

    angular.module('yarn').factory('Assertion', AssertionService);

    function AssertionService() {

        /**
         * An assertion about things in the graph
         * @param subject
         * @param predicate
         * @param object
         * @constructor
         */
        function Assertion(subject, predicate, object) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
        }

        return Assertion;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLmFzc2VydGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdBc3NlcnRpb24nLCBBc3NlcnRpb25TZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIEFzc2VydGlvblNlcnZpY2UoKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFzc2VydGlvbiBhYm91dCB0aGluZ3MgaW4gdGhlIGdyYXBoXG4gICAgICAgICAqIEBwYXJhbSBzdWJqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIEFzc2VydGlvbihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQXNzZXJ0aW9uO1xuICAgIH1cblxufSkoKTtcblxuIl0sImZpbGUiOiJ5YXJuLnN0YXRlLmFzc2VydGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";

    angular.module('yarn').factory('State', StateService);

    function StateService(Assertion, ActionHandler, Thing, Syntax, Predicate) {

        function State() {
            this.assertions = [];
            this.actionHandlers = [];
            this.things = {};
            this.predicates = {};
            this.syntaxes = {};
        }

        State.prototype.getPredicates = function(tokens) {
            var self = this;
            var predicates = [];
            tokens.forEach(function (token) {
                var predicate = self.predicate(token);
                if (!predicate) throw "Unknown predicate [" + token + "] in expression [" + expression + "]";
                predicates.push(predicate);
            });
            return predicates;
        };

        State.prototype.resolve = function (expression, _thing) {
            var thing = _thing;
            var allResolved = [];
            // If a thing was not supplied as a starting point, use the first token as the thing id
            if (!thing) {
                var tokens = expression.split(".");
                var thingId = tokens.shift();
                if (thingId) thing = this.thing(thingId);
            }
            if (thing && tokens.length) {
                allResolved = thing.resolve(tokens.join("."));
            }
            return allResolved;
        };


        State.prototype.resolveValue = function (expression) {
            var value;
            var resolved = this.resolve(expression);
            //console.log('State.resolved', resolved);
            if (resolved.length) value = resolved[0];
            return value;
        };

        State.prototype.html = function () {
            var html = [];

            html.push("<div class='assertions'>");
            this.assertions.forEach(function (assertion) {
                html.push("<div class='assertion'>");
                html.push("<span class='subject " + getTypeFromThingOrValue(assertion.subject) + "'>");
                html.push(getStringFromThingOrValue(assertion.subject));
                html.push("</span><span class='predicate'>");
                html.push(getStringFromThingOrValue(assertion.predicate));
                html.push("</span><span class='object " + getTypeFromThingOrValue(assertion.object) + "'>");
                html.push(getStringFromThingOrValue(assertion.object));
                html.push("</span></div>");
            });
            html.push("</div><hr /><div>");
            this.actionHandlers.forEach(function (actionHandler) {
                html.push("<div class='assertion'>");
                html.push("<span class='subject " + getTypeFromThingOrValue(actionHandler.subject) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.subject));
                html.push("</span><span class='predicate'>");
                html.push(getStringFromThingOrValue(actionHandler.predicate));
                html.push("</span><span class='object " + getTypeFromThingOrValue(actionHandler.object) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.object));
                html.push("</span>+<span class='doReference " + getTypeFromThingOrValue(actionHandler.do) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.do));
                html.push("</span></div>");
            });
            html.push("</div>");

            function getStringFromThingOrValue(obj) {
                var value;
                if (typeof obj === "undefined") {
                    value = "[undefined]";
                } else if (typeof obj === "object") {
                    value = obj.label || obj.id;
                    console.log('--------->>>>-', value, obj);
                } else {
                    value = obj;
                }
                return value;
            }

            function getTypeFromThingOrValue(obj) {
                var value;
                var type;
                if (typeof obj === "undefined") {
                    value = "isUndefined";
                } else if (typeof obj === "object") {
                    value = "isThing"
                } else {
                    type = typeof obj;
                    type = "is" + type.substr(0,1).toUpperCase() + type.substr(1);
                    value = type;
                }
                return value;
            }

            return html.join("");
        };

        /**
         * Get or create a new thing
         * @param _id
         */
        State.prototype.thing = function (_id) {
            var thing;
            var id = _id.toLowerCase();

            if (!id)
                throw("Things must have an id");
            thing = this.things[id];
            if (!thing) {
                thing = new Thing(id, this);
                this.things[id] = thing;
            }
            return thing;
        };

        /**
         * Get or create a new thing
         * @param predicate
         * @param text
         * @returns {*}
         */
        State.prototype.syntax = function (predicate, text) {
            var syntax;

            if (!predicate)
                throw("Syntax must have a predicate");
            if (!text)
                throw("Syntax must have a text");
            syntax = this.syntaxes[text];
            if (!syntax) {
                syntax = new Syntax(text, predicate);
                this.syntaxes[text] = syntax;
            }
            return syntax;
        };

        /**
         * Get a new Action Handler
         * @param subject
         * @param predicate
         * @param object
         * @param doReference
         * @returns {*}
         */
        State.prototype.setActionHandler = function (subject, predicate, object, doReference) {
            var actionHandler;
            var foundActionHandler;

            if (predicate && subject) {
                // Look for an existing assertion
                foundActionHandler = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.actionHandlers.forEach(function (actionHandler) {
                    if (actionHandler.subject === subject &&
                        actionHandler.predicate === predicate &&
                        actionHandler.object === object) {
                        foundActionHandler.push(actionHandler);
                    }
                });
                if (foundActionHandler[0]) {
                    actionHandler = foundActionHandler[0].object;
                } else {
                    // Create a new assertion
                    actionHandler = new ActionHandler(subject, predicate, object, doReference);
                    this.actionHandlers.push(actionHandler);
                }
            } else {
                console.warn("Impossible to create an Action Handler' type of assertion without at least a subject and a predicate.")
            }

            return actionHandler;
        };

        /**
         * Get a new assertion
         * @param subject
         * @param predicate
         * @param object
         * @returns {*}
         */
        State.prototype.setAssertion = function (subject, predicate, object) {
            var assertion;
            var foundAssertions;

            if (predicate && subject) {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate &&
                        assertion.object === object) {
                        foundAssertions.push(assertion);
                    }
                });
                if (foundAssertions[0]) {
                    assertion = foundAssertions[0].object;
                } else {
                    // Create a new assertion
                    assertion = new Assertion(subject, predicate, object, this);
                    this.assertions.push(assertion);
                }
            } else {
                console.warn("Impossible to create assertion without at least a subject and a predicate.")
            }

            return assertion;
        };

        State.prototype.removeAssertions = function (subject, predicate, object) {
            // Look for matching assertions
            // todo: use built indexes instead of itterating trough all predicates
            this.assertions = this.assertions.filter(function (assertion) {
                var keep = true;
                if (subject && Object.is(object, assertion.subject)) keep = false;
                if (predicate && Object.is(predicate, assertion.predicate)) keep = false;
                if (object && Object.is(object, assertion.object)) keep = false;
                return keep;
            });
            return this;
        };


        // TODO: Rename to getAssertions and have a version that return 1 item and need an objet argument
        State.prototype.getAssertion = function (subject, predicate) {
            var assertion;
            var foundAssertions;

            if (predicate && subject) {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate) {
                        foundAssertions.push(assertion);
                    }
                });
            } else {
                console.warn("Impossible to find assertion without at least a subject and a predicate.")
            }

            return foundAssertions;
        };

        State.prototype.getActionHandler = function (subject, predicate, object) {
            var foundActionHandler;

            if (predicate && subject && object) {
                // Look for an existing assertion
                // todo: use built indexes instead of itterating trough all predicates
                this.actionHandlers.forEach(function (actionHandler) {
                    if (actionHandler.subject === subject &&
                        actionHandler.predicate === predicate &&
                        actionHandler.object === object) {
                        foundActionHandler = actionHandler;
                    }
                });
            } else {
                console.warn("Impossible to ensure a single actionHandler without at least a subject, predicate and object.")
            }

            return foundActionHandler;
        };



        /**
         * Get or create a new type of predicate
         * @param _id
         */
        State.prototype.predicate = function (_id, type) {
            var id = _id.toLowerCase();
            var predicate;
            var syntax;

            if (!id)
                throw("Assertions must have an id");

            // Resolve the predicate from the syntax
            syntax = this.syntaxes[id];
            if (syntax) predicate = syntax.predicate;

            if (!predicate) {
                predicate = new Predicate(id, type, this);
                //console.log("Created new predicate", predicate);
                this.predicates[id] = predicate;
                this.syntaxes[id] = new Syntax(id, predicate);
            }
            return predicate;
        };

        return State;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgneWFybicpLmZhY3RvcnkoJ1N0YXRlJywgU3RhdGVTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIFN0YXRlU2VydmljZShBc3NlcnRpb24sIEFjdGlvbkhhbmRsZXIsIFRoaW5nLCBTeW50YXgsIFByZWRpY2F0ZSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIFN0YXRlKCkge1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRpb25zID0gW107XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLnRoaW5ncyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5wcmVkaWNhdGVzID0ge307XG4gICAgICAgICAgICB0aGlzLnN5bnRheGVzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuZ2V0UHJlZGljYXRlcyA9IGZ1bmN0aW9uKHRva2Vucykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHByZWRpY2F0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHZhciBwcmVkaWNhdGUgPSBzZWxmLnByZWRpY2F0ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUpIHRocm93IFwiVW5rbm93biBwcmVkaWNhdGUgW1wiICsgdG9rZW4gKyBcIl0gaW4gZXhwcmVzc2lvbiBbXCIgKyBleHByZXNzaW9uICsgXCJdXCI7XG4gICAgICAgICAgICAgICAgcHJlZGljYXRlcy5wdXNoKHByZWRpY2F0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWNhdGVzO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24sIF90aGluZykge1xuICAgICAgICAgICAgdmFyIHRoaW5nID0gX3RoaW5nO1xuICAgICAgICAgICAgdmFyIGFsbFJlc29sdmVkID0gW107XG4gICAgICAgICAgICAvLyBJZiBhIHRoaW5nIHdhcyBub3Qgc3VwcGxpZWQgYXMgYSBzdGFydGluZyBwb2ludCwgdXNlIHRoZSBmaXJzdCB0b2tlbiBhcyB0aGUgdGhpbmcgaWRcbiAgICAgICAgICAgIGlmICghdGhpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gZXhwcmVzc2lvbi5zcGxpdChcIi5cIik7XG4gICAgICAgICAgICAgICAgdmFyIHRoaW5nSWQgPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpbmdJZCkgdGhpbmcgPSB0aGlzLnRoaW5nKHRoaW5nSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaW5nICYmIHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbGxSZXNvbHZlZCA9IHRoaW5nLnJlc29sdmUodG9rZW5zLmpvaW4oXCIuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhbGxSZXNvbHZlZDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5yZXNvbHZlVmFsdWUgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gdGhpcy5yZXNvbHZlKGV4cHJlc3Npb24pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnU3RhdGUucmVzb2x2ZWQnLCByZXNvbHZlZCk7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWQubGVuZ3RoKSB2YWx1ZSA9IHJlc29sdmVkWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBbXTtcblxuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPGRpdiBjbGFzcz0nYXNzZXJ0aW9ucyc+XCIpO1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFzc2VydGlvbikge1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J2Fzc2VydGlvbic+XCIpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjxzcGFuIGNsYXNzPSdzdWJqZWN0IFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLnN1YmplY3QpICsgXCInPlwiKTtcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhc3NlcnRpb24uc3ViamVjdCkpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48c3BhbiBjbGFzcz0ncHJlZGljYXRlJz5cIik7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLnByZWRpY2F0ZSkpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48c3BhbiBjbGFzcz0nb2JqZWN0IFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLm9iamVjdCkgKyBcIic+XCIpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFzc2VydGlvbi5vYmplY3QpKTtcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+PC9kaXY+XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8L2Rpdj48aHIgLz48ZGl2PlwiKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J2Fzc2VydGlvbic+XCIpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjxzcGFuIGNsYXNzPSdzdWJqZWN0IFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYWN0aW9uSGFuZGxlci5zdWJqZWN0KSArIFwiJz5cIik7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUoYWN0aW9uSGFuZGxlci5zdWJqZWN0KSk7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPjxzcGFuIGNsYXNzPSdwcmVkaWNhdGUnPlwiKTtcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLnByZWRpY2F0ZSkpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48c3BhbiBjbGFzcz0nb2JqZWN0IFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYWN0aW9uSGFuZGxlci5vYmplY3QpICsgXCInPlwiKTtcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLm9iamVjdCkpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj4rPHNwYW4gY2xhc3M9J2RvUmVmZXJlbmNlIFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYWN0aW9uSGFuZGxlci5kbykgKyBcIic+XCIpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFjdGlvbkhhbmRsZXIuZG8pKTtcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+PC9kaXY+XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8L2Rpdj5cIik7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUob2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gXCJbdW5kZWZpbmVkXVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG9iai5sYWJlbCB8fCBvYmouaWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0+Pj4+LScsIHZhbHVlLCBvYmopO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gb2JqO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFwiaXNVbmRlZmluZWRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcImlzVGhpbmdcIlxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJpc1wiICsgdHlwZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaHRtbC5qb2luKFwiXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgb3IgY3JlYXRlIGEgbmV3IHRoaW5nXG4gICAgICAgICAqIEBwYXJhbSBfaWRcbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS50aGluZyA9IGZ1bmN0aW9uIChfaWQpIHtcbiAgICAgICAgICAgIHZhciB0aGluZztcbiAgICAgICAgICAgIHZhciBpZCA9IF9pZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWlkKVxuICAgICAgICAgICAgICAgIHRocm93KFwiVGhpbmdzIG11c3QgaGF2ZSBhbiBpZFwiKTtcbiAgICAgICAgICAgIHRoaW5nID0gdGhpcy50aGluZ3NbaWRdO1xuICAgICAgICAgICAgaWYgKCF0aGluZykge1xuICAgICAgICAgICAgICAgIHRoaW5nID0gbmV3IFRoaW5nKGlkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRoaW5nc1tpZF0gPSB0aGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGluZztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZ1xuICAgICAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGUucHJvdG90eXBlLnN5bnRheCA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIHRleHQpIHtcbiAgICAgICAgICAgIHZhciBzeW50YXg7XG5cbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKVxuICAgICAgICAgICAgICAgIHRocm93KFwiU3ludGF4IG11c3QgaGF2ZSBhIHByZWRpY2F0ZVwiKTtcbiAgICAgICAgICAgIGlmICghdGV4dClcbiAgICAgICAgICAgICAgICB0aHJvdyhcIlN5bnRheCBtdXN0IGhhdmUgYSB0ZXh0XCIpO1xuICAgICAgICAgICAgc3ludGF4ID0gdGhpcy5zeW50YXhlc1t0ZXh0XTtcbiAgICAgICAgICAgIGlmICghc3ludGF4KSB7XG4gICAgICAgICAgICAgICAgc3ludGF4ID0gbmV3IFN5bnRheCh0ZXh0LCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ludGF4ZXNbdGV4dF0gPSBzeW50YXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3ludGF4O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBuZXcgQWN0aW9uIEhhbmRsZXJcbiAgICAgICAgICogQHBhcmFtIHN1YmplY3RcbiAgICAgICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBkb1JlZmVyZW5jZVxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5zZXRBY3Rpb25IYW5kbGVyID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0LCBkb1JlZmVyZW5jZSkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkhhbmRsZXI7XG4gICAgICAgICAgICB2YXIgZm91bmRBY3Rpb25IYW5kbGVyO1xuXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlICYmIHN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBMb29rIGZvciBhbiBleGlzdGluZyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICBmb3VuZEFjdGlvbkhhbmRsZXIgPSBbXTtcbiAgICAgICAgICAgICAgICAvLyB0b2RvOiB1c2UgYnVpbHQgaW5kZXhlcyBpbnN0ZWFkIG9mIGl0dGVyYXRpbmcgdHJvdWdoIGFsbCBwcmVkaWNhdGVzXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25IYW5kbGVyLnN1YmplY3QgPT09IHN1YmplY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIucHJlZGljYXRlID09PSBwcmVkaWNhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIub2JqZWN0ID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kQWN0aW9uSGFuZGxlci5wdXNoKGFjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kQWN0aW9uSGFuZGxlclswXSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyID0gZm91bmRBY3Rpb25IYW5kbGVyWzBdLm9iamVjdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIgPSBuZXcgQWN0aW9uSGFuZGxlcihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZG9SZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXJzLnB1c2goYWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbXBvc3NpYmxlIHRvIGNyZWF0ZSBhbiBBY3Rpb24gSGFuZGxlcicgdHlwZSBvZiBhc3NlcnRpb24gd2l0aG91dCBhdCBsZWFzdCBhIHN1YmplY3QgYW5kIGEgcHJlZGljYXRlLlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uSGFuZGxlcjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGEgbmV3IGFzc2VydGlvblxuICAgICAgICAgKiBAcGFyYW0gc3ViamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuc2V0QXNzZXJ0aW9uID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgYXNzZXJ0aW9uO1xuICAgICAgICAgICAgdmFyIGZvdW5kQXNzZXJ0aW9ucztcblxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSAmJiBzdWJqZWN0KSB7XG4gICAgICAgICAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhpc3RpbmcgYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgZm91bmRBc3NlcnRpb25zID0gW107XG4gICAgICAgICAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXJ0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2VydGlvbi5zdWJqZWN0ID09PSBzdWJqZWN0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnRpb24ucHJlZGljYXRlID09PSBwcmVkaWNhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbi5vYmplY3QgPT09IG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRBc3NlcnRpb25zLnB1c2goYXNzZXJ0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZEFzc2VydGlvbnNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uID0gZm91bmRBc3NlcnRpb25zWzBdLm9iamVjdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oc3ViamVjdCwgcHJlZGljYXRlLCBvYmplY3QsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW1wb3NzaWJsZSB0byBjcmVhdGUgYXNzZXJ0aW9uIHdpdGhvdXQgYXQgbGVhc3QgYSBzdWJqZWN0IGFuZCBhIHByZWRpY2F0ZS5cIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFzc2VydGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICBTdGF0ZS5wcm90b3R5cGUucmVtb3ZlQXNzZXJ0aW9ucyA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hpbmcgYXNzZXJ0aW9uc1xuICAgICAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRpb25zID0gdGhpcy5hc3NlcnRpb25zLmZpbHRlcihmdW5jdGlvbiAoYXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtlZXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChzdWJqZWN0ICYmIE9iamVjdC5pcyhvYmplY3QsIGFzc2VydGlvbi5zdWJqZWN0KSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGUgJiYgT2JqZWN0LmlzKHByZWRpY2F0ZSwgYXNzZXJ0aW9uLnByZWRpY2F0ZSkpIGtlZXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0ICYmIE9iamVjdC5pcyhvYmplY3QsIGFzc2VydGlvbi5vYmplY3QpKSBrZWVwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlZXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gVE9ETzogUmVuYW1lIHRvIGdldEFzc2VydGlvbnMgYW5kIGhhdmUgYSB2ZXJzaW9uIHRoYXQgcmV0dXJuIDEgaXRlbSBhbmQgbmVlZCBhbiBvYmpldCBhcmd1bWVudFxuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuZ2V0QXNzZXJ0aW9uID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgdmFyIGFzc2VydGlvbjtcbiAgICAgICAgICAgIHZhciBmb3VuZEFzc2VydGlvbnM7XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUgJiYgc3ViamVjdCkge1xuICAgICAgICAgICAgICAgIC8vIExvb2sgZm9yIGFuIGV4aXN0aW5nIGFzc2VydGlvblxuICAgICAgICAgICAgICAgIGZvdW5kQXNzZXJ0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IHVzZSBidWlsdCBpbmRleGVzIGluc3RlYWQgb2YgaXR0ZXJhdGluZyB0cm91Z2ggYWxsIHByZWRpY2F0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NlcnRpb24uc3ViamVjdCA9PT0gc3ViamVjdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkltcG9zc2libGUgdG8gZmluZCBhc3NlcnRpb24gd2l0aG91dCBhdCBsZWFzdCBhIHN1YmplY3QgYW5kIGEgcHJlZGljYXRlLlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmRBc3NlcnRpb25zO1xuICAgICAgICB9O1xuXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5nZXRBY3Rpb25IYW5kbGVyID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgZm91bmRBY3Rpb25IYW5kbGVyO1xuXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlICYmIHN1YmplY3QgJiYgb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhpc3RpbmcgYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uSGFuZGxlci5zdWJqZWN0ID09PSBzdWJqZWN0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyLm9iamVjdCA9PT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEFjdGlvbkhhbmRsZXIgPSBhY3Rpb25IYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkltcG9zc2libGUgdG8gZW5zdXJlIGEgc2luZ2xlIGFjdGlvbkhhbmRsZXIgd2l0aG91dCBhdCBsZWFzdCBhIHN1YmplY3QsIHByZWRpY2F0ZSBhbmQgb2JqZWN0LlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmRBY3Rpb25IYW5kbGVyO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0eXBlIG9mIHByZWRpY2F0ZVxuICAgICAgICAgKiBAcGFyYW0gX2lkXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZS5wcm90b3R5cGUucHJlZGljYXRlID0gZnVuY3Rpb24gKF9pZCwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGlkID0gX2lkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRlO1xuICAgICAgICAgICAgdmFyIHN5bnRheDtcblxuICAgICAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgICAgICB0aHJvdyhcIkFzc2VydGlvbnMgbXVzdCBoYXZlIGFuIGlkXCIpO1xuXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcmVkaWNhdGUgZnJvbSB0aGUgc3ludGF4XG4gICAgICAgICAgICBzeW50YXggPSB0aGlzLnN5bnRheGVzW2lkXTtcbiAgICAgICAgICAgIGlmIChzeW50YXgpIHByZWRpY2F0ZSA9IHN5bnRheC5wcmVkaWNhdGU7XG5cbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgcHJlZGljYXRlID0gbmV3IFByZWRpY2F0ZShpZCwgdHlwZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNyZWF0ZWQgbmV3IHByZWRpY2F0ZVwiLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljYXRlc1tpZF0gPSBwcmVkaWNhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW50YXhlc1tpZF0gPSBuZXcgU3ludGF4KGlkLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY2F0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gU3RhdGU7XG4gICAgfVxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4uc3RhdGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function () {
    "use strict";

    angular.module('yarn').factory('Predicate', PredicateService);

    function PredicateService() {

        /**
         * A type of predicate used to make assertions
         * @param id
         * @constructor
         */
        function Predicate(_id, type, yarn) {
            var id = _id.toLowerCase();
            this.id = id;
            this.label = id;
            this.type = type;
    
            /**
             * Define a new syntax for this predicate
             * @param text
             * @returns {Predicate}
             */
            this.syntax = function (text) {
                this.label = text;
                yarn.syntax(this, text);
                return this;
            }
        }

        return Predicate;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLnByZWRpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdQcmVkaWNhdGUnLCBQcmVkaWNhdGVTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIFByZWRpY2F0ZVNlcnZpY2UoKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgdHlwZSBvZiBwcmVkaWNhdGUgdXNlZCB0byBtYWtlIGFzc2VydGlvbnNcbiAgICAgICAgICogQHBhcmFtIGlkXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gUHJlZGljYXRlKF9pZCwgdHlwZSwgeWFybikge1xuICAgICAgICAgICAgdmFyIGlkID0gX2lkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZWZpbmUgYSBuZXcgc3ludGF4IGZvciB0aGlzIHByZWRpY2F0ZVxuICAgICAgICAgICAgICogQHBhcmFtIHRleHRcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtQcmVkaWNhdGV9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc3ludGF4ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsID0gdGV4dDtcbiAgICAgICAgICAgICAgICB5YXJuLnN5bnRheCh0aGlzLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcmVkaWNhdGU7XG4gICAgfVxuXG59KSgpO1xuXG4iXSwiZmlsZSI6Inlhcm4uc3RhdGUucHJlZGljYXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    "use strict";

    angular.module('yarn').factory('Syntax', SyntaxService);

    function SyntaxService() {

        /**
         * A syntax of natural language that be use to define a predicate
         * @param text
         * @param predicate
         * @constructor
         */
        function Syntax(text, predicate) {
            this.text = text;
            this.predicate = predicate;
        }

        return Syntax;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLnN5bnRheC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3lhcm4nKS5mYWN0b3J5KCdTeW50YXgnLCBTeW50YXhTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIFN5bnRheFNlcnZpY2UoKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc3ludGF4IG9mIG5hdHVyYWwgbGFuZ3VhZ2UgdGhhdCBiZSB1c2UgdG8gZGVmaW5lIGEgcHJlZGljYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBTeW50YXgodGV4dCwgcHJlZGljYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU3ludGF4O1xuICAgIH1cblxufSkoKTtcblxuIl0sImZpbGUiOiJ5YXJuLnN0YXRlLnN5bnRheC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";

    angular.module('yarn').factory('Thing', ThingService);

    function ThingService() {

        /**
         * A "thing" in the graph
         * @param _id
         * @constructor
         */
        function Thing(_id, state) {
            this.id =_id.toLowerCase();
            this.state = state;
        }

        /**
         * Get an assertion, returns itself or the object of the assertion found.
         * @type {Function}
         */
        Thing.prototype.getAssertion = function (predicate) {
            return this.state.getAssertion(this, predicate);
        };

        Thing.prototype.setAssertion = function (predicate, object) {
            this.state.setAssertion(this, predicate, object);
            return this;
        };

        Thing.prototype.removeAssertions = function (predicate, object) {
            this.state.removeAssertions(this, predicate, object);
            return this;
        };

        /**
         * Return this thing as text (string)
         * @returns {*}
         */
        Thing.prototype.text = function () {
            return this.id;
        };

        Thing.prototype.resolve = function (expression) {
            var thingInContext = this;
            var tokens = expression.split(".");
            var predicates = this.state.getPredicates(tokens);
            var allResolved = [];
            predicates.forEach(function (predicate, index, predicates) {
                //console.log('context', context);
                var assertions;
                //console.log('predicate', predicate);
                if (thingInContext) {
                    assertions = thingInContext.getAssertion(predicate);
                    if (assertions.length) {
                        //console.log('assertion', assertion[0].object);
                        // If it is the last predicate, return multiple value
                        // todo: allow to broader search (not just collection on the last branch)
                        if (predicates.length === index + 1) {
                            assertions.forEach(function (assertion) {
                                allResolved.push(assertion.object);
                            });
                            thingInContext = assertions[0];
                        } else {
                            thingInContext = assertions[0].object;
                        }
                    } else {
                        //console.log('context nulled');
                        thingInContext = null;
                    }
                }
            });
            return allResolved;
        };

        Thing.prototype.resolveValue = function (expression) {
            this.resolve(expression);

            var value;
            var context = this;
            var tokens = expression.split(".");
            var predicates = this.state.getPredicates(tokens);
            predicates.forEach(function (predicate) {
                //console.log('context', context);
                var assertion;
                //console.log('predicate', predicate);
                if (context) {
                    assertion = context.getAssertion(predicate);
                    if (assertion.length) {
                        //console.log('assertion', assertion[0].object);
                        context = assertion[0].object;
                    } else {
                        //console.log('context nulled');
                        context = null;
                    }
                }
            });
            if (context) value = context;
            return value;
        };


        return Thing;
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ5YXJuLnN0YXRlLnRoaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgneWFybicpLmZhY3RvcnkoJ1RoaW5nJywgVGhpbmdTZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIFRoaW5nU2VydmljZSgpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBcInRoaW5nXCIgaW4gdGhlIGdyYXBoXG4gICAgICAgICAqIEBwYXJhbSBfaWRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBUaGluZyhfaWQsIHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmlkID1faWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gYXNzZXJ0aW9uLCByZXR1cm5zIGl0c2VsZiBvciB0aGUgb2JqZWN0IG9mIHRoZSBhc3NlcnRpb24gZm91bmQuXG4gICAgICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgICAgICovXG4gICAgICAgIFRoaW5nLnByb3RvdHlwZS5nZXRBc3NlcnRpb24gPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRBc3NlcnRpb24odGhpcywgcHJlZGljYXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBUaGluZy5wcm90b3R5cGUuc2V0QXNzZXJ0aW9uID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgb2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNldEFzc2VydGlvbih0aGlzLCBwcmVkaWNhdGUsIG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICBUaGluZy5wcm90b3R5cGUucmVtb3ZlQXNzZXJ0aW9ucyA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZW1vdmVBc3NlcnRpb25zKHRoaXMsIHByZWRpY2F0ZSwgb2JqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gdGhpcyB0aGluZyBhcyB0ZXh0IChzdHJpbmcpXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgVGhpbmcucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICAgICAgfTtcblxuICAgICAgICBUaGluZy5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChleHByZXNzaW9uKSB7XG4gICAgICAgICAgICB2YXIgdGhpbmdJbkNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHRva2VucyA9IGV4cHJlc3Npb24uc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgdmFyIHByZWRpY2F0ZXMgPSB0aGlzLnN0YXRlLmdldFByZWRpY2F0ZXModG9rZW5zKTtcbiAgICAgICAgICAgIHZhciBhbGxSZXNvbHZlZCA9IFtdO1xuICAgICAgICAgICAgcHJlZGljYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVkaWNhdGUsIGluZGV4LCBwcmVkaWNhdGVzKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29udGV4dCcsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHZhciBhc3NlcnRpb25zO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZWRpY2F0ZScsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaW5nSW5Db250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbnMgPSB0aGluZ0luQ29udGV4dC5nZXRBc3NlcnRpb24ocHJlZGljYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2VydGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhc3NlcnRpb24nLCBhc3NlcnRpb25bMF0ub2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIHRoZSBsYXN0IHByZWRpY2F0ZSwgcmV0dXJuIG11bHRpcGxlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBhbGxvdyB0byBicm9hZGVyIHNlYXJjaCAobm90IGp1c3QgY29sbGVjdGlvbiBvbiB0aGUgbGFzdCBicmFuY2gpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlcy5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFJlc29sdmVkLnB1c2goYXNzZXJ0aW9uLm9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmdJbkNvbnRleHQgPSBhc3NlcnRpb25zWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGluZ0luQ29udGV4dCA9IGFzc2VydGlvbnNbMF0ub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29udGV4dCBudWxsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5nSW5Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFsbFJlc29sdmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgIFRoaW5nLnByb3RvdHlwZS5yZXNvbHZlVmFsdWUgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlKGV4cHJlc3Npb24pO1xuXG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgdG9rZW5zID0gZXhwcmVzc2lvbi5zcGxpdChcIi5cIik7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRlcyA9IHRoaXMuc3RhdGUuZ2V0UHJlZGljYXRlcyh0b2tlbnMpO1xuICAgICAgICAgICAgcHJlZGljYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb250ZXh0JywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgdmFyIGFzc2VydGlvbjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVkaWNhdGUnLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbiA9IGNvbnRleHQuZ2V0QXNzZXJ0aW9uKHByZWRpY2F0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NlcnRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhc3NlcnRpb24nLCBhc3NlcnRpb25bMF0ub2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhc3NlcnRpb25bMF0ub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29udGV4dCBudWxsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dCkgdmFsdWUgPSBjb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgcmV0dXJuIFRoaW5nO1xuICAgIH1cblxufSkoKTtcblxuIl0sImZpbGUiOiJ5YXJuLnN0YXRlLnRoaW5nLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame', [
    'ngAnimate',
    'yarn',
    'ui.router',
    'luegg.directives',
    'cfp.hotkeys',
    'breakpointApp'
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJywgW1xuICAgICduZ0FuaW1hdGUnLFxuICAgICd5YXJuJyxcbiAgICAndWkucm91dGVyJyxcbiAgICAnbHVlZ2cuZGlyZWN0aXZlcycsXG4gICAgJ2NmcC5ob3RrZXlzJyxcbiAgICAnYnJlYWtwb2ludEFwcCdcbl0pOyJdLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    'use strict';


    angular.module('mindgame').config(app);

    angular.module('mindgame').run(function($rootScope) {
        $rootScope.breakpoints = {
            0: 'isMobileWidth',
            480: 'isMobileLandscapeWidth',
            641: 'isTabletWidth',
            1025: 'isDesktopWidth',
            1281: 'isWidescreenLayout'
            };
        });

    function app($stateProvider,
                 $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            resolve: {
                "metadata": function (loadMetadata) {
                    return loadMetadata().then(function (metadata) {
                        return metadata;
                    });
                }
            },
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

    }
})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyb3V0ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmNvbmZpZyhhcHApO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICAgICAgJHJvb3RTY29wZS5icmVha3BvaW50cyA9IHtcbiAgICAgICAgICAgIDA6ICdpc01vYmlsZVdpZHRoJyxcbiAgICAgICAgICAgIDQ4MDogJ2lzTW9iaWxlTGFuZHNjYXBlV2lkdGgnLFxuICAgICAgICAgICAgNjQxOiAnaXNUYWJsZXRXaWR0aCcsXG4gICAgICAgICAgICAxMDI1OiAnaXNEZXNrdG9wV2lkdGgnLFxuICAgICAgICAgICAgMTI4MTogJ2lzV2lkZXNjcmVlbkxheW91dCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYXBwKCRzdGF0ZVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncm9vdCcsIHtcbiAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogZnVuY3Rpb24gKGxvYWRNZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9hZE1ldGFkYXRhKCkudGhlbihmdW5jdGlvbiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Jvb3QnLFxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge30sXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vaHRtbC9hcHAuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncm9vdCdcbiAgICAgICAgfSk7XG5cbiAgICB9XG59KSgpO1xuXG4iXSwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

"use strict";
angular.module('mindgame').factory('gamePedicates', function() {
    return gamePedicates;
});

function gamePedicates(game) {
    var state = game.state;

    // What something is of a kind
    state
        .predicate("isAuthoredBy")
        .syntax("is created by")
        .syntax("is authored by");

    // The Action the user what about to make (ex.: Move, Look, etc)
    state
        .predicate("isAboutTo")
        .syntax("is about to");

    // What something is of a kind
    state
        .predicate("isA")
        .syntax("is an")
        .syntax("is a");

    // What something is of a kind
    state
        .predicate("hasScenery")
        .syntax("has scenery");

    state
        .predicate("hasImage")
        .syntax("has image");

    // What something has an attribute
    state
        .predicate("is")
        .syntax("is");

    // What something is called
    state
        .predicate("isNamed")
        .syntax("is titled")
        .syntax("is named")
        .syntax("is called");

    // What something is described as when looked at
    state
        .predicate("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");

    state
        .predicate("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");

    // When something is in a place
    state
        .predicate("isIn")
        .syntax("is in the")
        .syntax("is inside the")
        .syntax("is at the")
        .syntax("is in")
        .syntax("is inside")
        .syntax("is at")
        .syntax("are in the")
        .syntax("are inside the")
        .syntax("are at the")
        .syntax("are in")
        .syntax("are inside")
        .syntax("are at");

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInIt")
        .syntax("has in it the")
        .syntax("has in it a")
        .syntax("has a");

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInInventory")
        .syntax("has in inventory a")
        .syntax("has in inventoy")
        .syntax("has inventoy");

    // When a place is linked to another place
    state
        .predicate("linksTo")
        .syntax("goes to")
        .syntax("is open to")
        .syntax("goes to the")
        .syntax("is open to the")
        .syntax("links to the")
        .syntax("links to");

    // When a place is linked to another place
    state
        .predicate("this")
        .syntax("that")
        .syntax("the");


    /*
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     Create the Action predicates
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     */



    // Something uses something else
    state
        .predicate("use", "action")
        .syntax("use")
        .syntax("uses")
        .syntax("use the")
        .syntax("uses the")
        .syntax("use a")
        .syntax("uses a");

    // Something uses something else
    state
        .predicate("movesTo", "action")
        .syntax("moves to")
        .syntax("moves into")
        .syntax("goes to")
        .syntax("goes into")
        .syntax("moves")
        .syntax("goes")
        .syntax("enters")
        .syntax("enters the")
        .syntax("enters in")
        .syntax("enters into");

}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnByZWRpY2F0ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5hbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdnYW1lUGVkaWNhdGVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdhbWVQZWRpY2F0ZXM7XG59KTtcblxuZnVuY3Rpb24gZ2FtZVBlZGljYXRlcyhnYW1lKSB7XG4gICAgdmFyIHN0YXRlID0gZ2FtZS5zdGF0ZTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIG9mIGEga2luZFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0F1dGhvcmVkQnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGNyZWF0ZWQgYnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF1dGhvcmVkIGJ5XCIpO1xuXG4gICAgLy8gVGhlIEFjdGlvbiB0aGUgdXNlciB3aGF0IGFib3V0IHRvIG1ha2UgKGV4LjogTW92ZSwgTG9vaywgZXRjKVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFib3V0IHRvXCIpO1xuXG4gICAgLy8gV2hhdCBzb21ldGhpbmcgaXMgb2YgYSBraW5kXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzQVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYW5cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFcIik7XG5cbiAgICAvLyBXaGF0IHNvbWV0aGluZyBpcyBvZiBhIGtpbmRcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzU2NlbmVyeVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIHNjZW5lcnlcIik7XG5cbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzSW1hZ2VcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBpbWFnZVwiKTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGhhcyBhbiBhdHRyaWJ1dGVcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaXNcIilcbiAgICAgICAgLnN5bnRheChcImlzXCIpO1xuXG4gICAgLy8gV2hhdCBzb21ldGhpbmcgaXMgY2FsbGVkXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzTmFtZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIHRpdGxlZFwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgbmFtZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGNhbGxlZFwiKTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIGRlc2NyaWJlZCBhcyB3aGVuIGxvb2tlZCBhdFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Rlc2NyaWJlZEFzXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBkZXNjcmliZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGRlc2NyaWJlZCBhc1wiKTtcblxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Fsc29EZXNjcmliZWRBc1wiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYWxzbyBkZXNjcmliZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGFsc28gZGVzY3JpYmVkIGFzXCIpO1xuXG4gICAgLy8gV2hlbiBzb21ldGhpbmcgaXMgaW4gYSBwbGFjZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0luXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBpbiB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGluc2lkZSB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF0IHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgaW5cIilcbiAgICAgICAgLnN5bnRheChcImlzIGluc2lkZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYXRcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbiB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbnNpZGUgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJhcmUgYXQgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJhcmUgaW5cIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbnNpZGVcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBhdFwiKTtcblxuICAgIC8vIFdoZW4gc29tZXRoaW5nIGhhcyBzb21ldGhpbmcgZWxzZS4gRXguOiBLaXRjaGVuIGhhcyBhIEtpdGNoZW4gVGFibGVcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzSW5JdFwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGl0IHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGl0IGFcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBhXCIpO1xuXG4gICAgLy8gV2hlbiBzb21ldGhpbmcgaGFzIHNvbWV0aGluZyBlbHNlLiBFeC46IEtpdGNoZW4gaGFzIGEgS2l0Y2hlbiBUYWJsZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJoYXNJbkludmVudG9yeVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGludmVudG9yeSBhXCIpXG4gICAgICAgIC5zeW50YXgoXCJoYXMgaW4gaW52ZW50b3lcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBpbnZlbnRveVwiKTtcblxuICAgIC8vIFdoZW4gYSBwbGFjZSBpcyBsaW5rZWQgdG8gYW5vdGhlciBwbGFjZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJsaW5rc1RvXCIpXG4gICAgICAgIC5zeW50YXgoXCJnb2VzIHRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBvcGVuIHRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJnb2VzIHRvIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgb3BlbiB0byB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImxpbmtzIHRvIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwibGlua3MgdG9cIik7XG5cbiAgICAvLyBXaGVuIGEgcGxhY2UgaXMgbGlua2VkIHRvIGFub3RoZXIgcGxhY2VcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwidGhpc1wiKVxuICAgICAgICAuc3ludGF4KFwidGhhdFwiKVxuICAgICAgICAuc3ludGF4KFwidGhlXCIpO1xuXG5cbiAgICAvKlxuICAgICA9LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cbiAgICAgQ3JlYXRlIHRoZSBBY3Rpb24gcHJlZGljYXRlc1xuICAgICA9LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cbiAgICAgKi9cblxuXG5cbiAgICAvLyBTb21ldGhpbmcgdXNlcyBzb21ldGhpbmcgZWxzZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJ1c2VcIiwgXCJhY3Rpb25cIilcbiAgICAgICAgLnN5bnRheChcInVzZVwiKVxuICAgICAgICAuc3ludGF4KFwidXNlc1wiKVxuICAgICAgICAuc3ludGF4KFwidXNlIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwidXNlcyB0aGVcIilcbiAgICAgICAgLnN5bnRheChcInVzZSBhXCIpXG4gICAgICAgIC5zeW50YXgoXCJ1c2VzIGFcIik7XG5cbiAgICAvLyBTb21ldGhpbmcgdXNlcyBzb21ldGhpbmcgZWxzZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJtb3Zlc1RvXCIsIFwiYWN0aW9uXCIpXG4gICAgICAgIC5zeW50YXgoXCJtb3ZlcyB0b1wiKVxuICAgICAgICAuc3ludGF4KFwibW92ZXMgaW50b1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lcyB0b1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lcyBpbnRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJtb3Zlc1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lc1wiKVxuICAgICAgICAuc3ludGF4KFwiZW50ZXJzXCIpXG4gICAgICAgIC5zeW50YXgoXCJlbnRlcnMgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJlbnRlcnMgaW5cIilcbiAgICAgICAgLnN5bnRheChcImVudGVycyBpbnRvXCIpO1xuXG59Il0sImZpbGUiOiJnYW1lLnByZWRpY2F0ZXMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

"use strict";
angular.module('mindgame').factory('gameRoutines', function() {
    return gameRoutines;
});

function gameRoutines(game) {

    // Move the player to another room
    game.logic.register("move", move);
    function move(roomId) {
        var room = game.state.thing(roomId);
        var isIn = game.state.predicate("isIn");
        var you = game.state.thing("You");
        if (room) {
            you
                .removeAssertions(isIn)
                .setAssertion(isIn, room);
        }
        // TODO : Trigger movesFrom
        game.logic.trigger(you, "movesTo", room);
        return room;
    }

    // Set what action the player is "about to do"
    game.logic.register("aboutTo", aboutTo);
    function aboutTo(aboutToId) {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").removeAssertions(isAboutTo);
        if (aboutToId) {
            game.state.thing("You").setAssertion(isAboutTo, aboutToId);
        }
        return true;
    }

}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnJvdXRpbmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnZ2FtZVJvdXRpbmVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdhbWVSb3V0aW5lcztcbn0pO1xuXG5mdW5jdGlvbiBnYW1lUm91dGluZXMoZ2FtZSkge1xuXG4gICAgLy8gTW92ZSB0aGUgcGxheWVyIHRvIGFub3RoZXIgcm9vbVxuICAgIGdhbWUubG9naWMucmVnaXN0ZXIoXCJtb3ZlXCIsIG1vdmUpO1xuICAgIGZ1bmN0aW9uIG1vdmUocm9vbUlkKSB7XG4gICAgICAgIHZhciByb29tID0gZ2FtZS5zdGF0ZS50aGluZyhyb29tSWQpO1xuICAgICAgICB2YXIgaXNJbiA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNJblwiKTtcbiAgICAgICAgdmFyIHlvdSA9IGdhbWUuc3RhdGUudGhpbmcoXCJZb3VcIik7XG4gICAgICAgIGlmIChyb29tKSB7XG4gICAgICAgICAgICB5b3VcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXNzZXJ0aW9ucyhpc0luKVxuICAgICAgICAgICAgICAgIC5zZXRBc3NlcnRpb24oaXNJbiwgcm9vbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyA6IFRyaWdnZXIgbW92ZXNGcm9tXG4gICAgICAgIGdhbWUubG9naWMudHJpZ2dlcih5b3UsIFwibW92ZXNUb1wiLCByb29tKTtcbiAgICAgICAgcmV0dXJuIHJvb207XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoYXQgYWN0aW9uIHRoZSBwbGF5ZXIgaXMgXCJhYm91dCB0byBkb1wiXG4gICAgZ2FtZS5sb2dpYy5yZWdpc3RlcihcImFib3V0VG9cIiwgYWJvdXRUbyk7XG4gICAgZnVuY3Rpb24gYWJvdXRUbyhhYm91dFRvSWQpIHtcbiAgICAgICAgdmFyIGlzQWJvdXRUbyA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICBnYW1lLnN0YXRlLnRoaW5nKFwiWW91XCIpLnJlbW92ZUFzc2VydGlvbnMoaXNBYm91dFRvKTtcbiAgICAgICAgaWYgKGFib3V0VG9JZCkge1xuICAgICAgICAgICAgZ2FtZS5zdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaXNBYm91dFRvLCBhYm91dFRvSWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuIl0sImZpbGUiOiJnYW1lLnJvdXRpbmVzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

"use strict";
angular.module('mindgame').factory('gameThings', function() {
    return gameThings;
});

function gameThings(game) {
    // Player
    game.state
        .thing("player");

    // Persons
    game.state
        .thing("person");

    // Places
    game.state
        .thing("room");

    // Objects (as in "object" in the game)
    game.state
        .thing("object");
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnRoaW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2dhbWVUaGluZ3MnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2FtZVRoaW5ncztcbn0pO1xuXG5mdW5jdGlvbiBnYW1lVGhpbmdzKGdhbWUpIHtcbiAgICAvLyBQbGF5ZXJcbiAgICBnYW1lLnN0YXRlXG4gICAgICAgIC50aGluZyhcInBsYXllclwiKTtcblxuICAgIC8vIFBlcnNvbnNcbiAgICBnYW1lLnN0YXRlXG4gICAgICAgIC50aGluZyhcInBlcnNvblwiKTtcblxuICAgIC8vIFBsYWNlc1xuICAgIGdhbWUuc3RhdGVcbiAgICAgICAgLnRoaW5nKFwicm9vbVwiKTtcblxuICAgIC8vIE9iamVjdHMgKGFzIGluIFwib2JqZWN0XCIgaW4gdGhlIGdhbWUpXG4gICAgZ2FtZS5zdGF0ZVxuICAgICAgICAudGhpbmcoXCJvYmplY3RcIik7XG59XG4iXSwiZmlsZSI6ImdhbWUudGhpbmdzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope) {
    $scope.metadata = metadata;
    console.info("Yarn game started!");
    loadGameScripts();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyb290LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmNvbnRyb2xsZXIoJ3Jvb3QnLCByb290Q29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIHJvb3RDb250cm9sbGVyKG1ldGFkYXRhLCBsb2FkR2FtZVNjcmlwdHMsICRzY29wZSkge1xuICAgICRzY29wZS5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIGNvbnNvbGUuaW5mbyhcIllhcm4gZ2FtZSBzdGFydGVkIVwiKTtcbiAgICBsb2FkR2FtZVNjcmlwdHMoKTtcbn0iXSwiZmlsZSI6InJvb3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').factory('commands', commands);

function commands(storyLogService,
                  hotkeys,
                  game) {

    var storyLog = storyLogService;
    var state = game.state;

    var commands = {
        move: moveCommand,
        look: lookCommand,
        take: takeCommand,
        inventory: inventoryCommand,
        state: stateCommand,
        tree: treeCommand,
        tokens: tokensCommand
    };

    // todo: Move commands into a separate directive
    var command = function (text) {
        var command = commands[text];
        if (command) {
            command();
        } else {
            storyLog.error("Sorry... unknown command : " + text);
        }
    };

    // todo: Move hotkey into a separate directive
    hotkeys.add({
        combo: 'ctrl+1',
        description: 'Output the current state',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("state");
        }
    });
    hotkeys.add({
        combo: 'ctrl+2',
        description: 'Output the execution tree',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tree");
        }
    });
    hotkeys.add({
        combo: 'ctrl+3',
        description: 'Outputing script parsing',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tokens");
        }
    });

    //todo: Create a class for commands

    function stateCommand() {
        var html = game.state.html();
        storyLog.debug("Outputing current game state:");
        storyLog.debug(html);
    }

    function treeCommand() {
        var html = game.script.ast.html();
        storyLog.debug("Outputing execution tree:");
        storyLog.debug(html);
    }

    function tokensCommand() {
        var html = game.script.pointer.html();
        storyLog.debug("Outputing script parsing:");
        storyLog.debug(html);
    }

    function moveCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "move");
    }

    function takeCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "take");
    }

    function lookCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "look");
    }

    function inventoryCommand() {
        var itemList;
        var thingsInInventory = game.state.resolve("You.hasInInventory");
        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = thing.resolveValue("isNamed");
                itemList.push(label);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            storyLog.log(message.join(""));
        } else {
            storyLog.error("You have nothing in inventory!");
        }
    }

    return {
        command: command
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tYW5kcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdjb21tYW5kcycsIGNvbW1hbmRzKTtcblxuZnVuY3Rpb24gY29tbWFuZHMoc3RvcnlMb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgaG90a2V5cyxcbiAgICAgICAgICAgICAgICAgIGdhbWUpIHtcblxuICAgIHZhciBzdG9yeUxvZyA9IHN0b3J5TG9nU2VydmljZTtcbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuXG4gICAgdmFyIGNvbW1hbmRzID0ge1xuICAgICAgICBtb3ZlOiBtb3ZlQ29tbWFuZCxcbiAgICAgICAgbG9vazogbG9va0NvbW1hbmQsXG4gICAgICAgIHRha2U6IHRha2VDb21tYW5kLFxuICAgICAgICBpbnZlbnRvcnk6IGludmVudG9yeUNvbW1hbmQsXG4gICAgICAgIHN0YXRlOiBzdGF0ZUNvbW1hbmQsXG4gICAgICAgIHRyZWU6IHRyZWVDb21tYW5kLFxuICAgICAgICB0b2tlbnM6IHRva2Vuc0NvbW1hbmRcbiAgICB9O1xuXG4gICAgLy8gdG9kbzogTW92ZSBjb21tYW5kcyBpbnRvIGEgc2VwYXJhdGUgZGlyZWN0aXZlXG4gICAgdmFyIGNvbW1hbmQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgY29tbWFuZCA9IGNvbW1hbmRzW3RleHRdO1xuICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJTb3JyeS4uLiB1bmtub3duIGNvbW1hbmQgOiBcIiArIHRleHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIHRvZG86IE1vdmUgaG90a2V5IGludG8gYSBzZXBhcmF0ZSBkaXJlY3RpdmVcbiAgICBob3RrZXlzLmFkZCh7XG4gICAgICAgIGNvbWJvOiAnY3RybCsxJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPdXRwdXQgdGhlIGN1cnJlbnQgc3RhdGUnLFxuICAgICAgICBhbGxvd0luOiBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29tbWFuZChcInN0YXRlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaG90a2V5cy5hZGQoe1xuICAgICAgICBjb21ibzogJ2N0cmwrMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnT3V0cHV0IHRoZSBleGVjdXRpb24gdHJlZScsXG4gICAgICAgIGFsbG93SW46IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ10sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb21tYW5kKFwidHJlZVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGhvdGtleXMuYWRkKHtcbiAgICAgICAgY29tYm86ICdjdHJsKzMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ091dHB1dGluZyBzY3JpcHQgcGFyc2luZycsXG4gICAgICAgIGFsbG93SW46IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ10sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb21tYW5kKFwidG9rZW5zXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL3RvZG86IENyZWF0ZSBhIGNsYXNzIGZvciBjb21tYW5kc1xuXG4gICAgZnVuY3Rpb24gc3RhdGVDb21tYW5kKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGdhbWUuc3RhdGUuaHRtbCgpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhcIk91dHB1dGluZyBjdXJyZW50IGdhbWUgc3RhdGU6XCIpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhodG1sKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmVlQ29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBnYW1lLnNjcmlwdC5hc3QuaHRtbCgpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhcIk91dHB1dGluZyBleGVjdXRpb24gdHJlZTpcIik7XG4gICAgICAgIHN0b3J5TG9nLmRlYnVnKGh0bWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRva2Vuc0NvbW1hbmQoKSB7XG4gICAgICAgIHZhciBodG1sID0gZ2FtZS5zY3JpcHQucG9pbnRlci5odG1sKCk7XG4gICAgICAgIHN0b3J5TG9nLmRlYnVnKFwiT3V0cHV0aW5nIHNjcmlwdCBwYXJzaW5nOlwiKTtcbiAgICAgICAgc3RvcnlMb2cuZGVidWcoaHRtbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZUNvbW1hbmQoKSB7XG4gICAgICAgIHZhciBpc0Fib3V0VG8gPSBnYW1lLnN0YXRlLnByZWRpY2F0ZShcImlzQWJvdXRUb1wiKTtcbiAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikuc2V0QXNzZXJ0aW9uKGlzQWJvdXRUbywgXCJtb3ZlXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRha2VDb21tYW5kKCkge1xuICAgICAgICB2YXIgaXNBYm91dFRvID0gZ2FtZS5zdGF0ZS5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIik7XG4gICAgICAgIHN0YXRlLnRoaW5nKFwiWW91XCIpLnNldEFzc2VydGlvbihpc0Fib3V0VG8sIFwidGFrZVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rQ29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGlzQWJvdXRUbyA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaXNBYm91dFRvLCBcImxvb2tcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52ZW50b3J5Q29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGl0ZW1MaXN0O1xuICAgICAgICB2YXIgdGhpbmdzSW5JbnZlbnRvcnkgPSBnYW1lLnN0YXRlLnJlc29sdmUoXCJZb3UuaGFzSW5JbnZlbnRvcnlcIik7XG4gICAgICAgIGlmICh0aGluZ3NJbkludmVudG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gW107XG4gICAgICAgICAgICB0aGluZ3NJbkludmVudG9yeS5mb3JFYWNoKGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgaXRlbUxpc3QucHVzaChsYWJlbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gW1xuICAgICAgICAgICAgICAgIFwiWW91IGhhdmUgXCIsXG4gICAgICAgICAgICAgICAgdGhpbmdzSW5JbnZlbnRvcnkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIFwiIGl0ZW0gaW4gaW52ZW50b3J5OiA8YSBocmVmPScjJz5cIixcbiAgICAgICAgICAgICAgICBpdGVtTGlzdC5qb2luKFwiPC9hPiwgPGEgaHJlZj0nIyc+XCIpLFxuICAgICAgICAgICAgICAgIFwiPC9hPi5cIlxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHN0b3J5TG9nLmxvZyhtZXNzYWdlLmpvaW4oXCJcIikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJZb3UgaGF2ZSBub3RoaW5nIGluIGludmVudG9yeSFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21tYW5kOiBjb21tYW5kXG4gICAgfTtcblxufVxuXG5cblxuIl0sImZpbGUiOiJjb21tYW5kcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('game', gameService);

function gameService(Yarn,
              loadScript,
              gamePedicates,
              gameRoutines,
              gameThings) {

    var game = new Yarn();

    // Load various configuration modules
    gamePedicates(game);
    gameRoutines(game);
    gameThings(game);

    return game;

}


/*

This lib was tweaked to use Screen width instead of window width temporariblly

*/
// TODO: Make a pull request? Put into a /patched-vendors folder ?
var breakpointApp = angular.module('breakpointApp',[]);

breakpointApp.directive('breakpoint', ['$window', '$rootScope', function($window, $rootScope){
    return {
        restrict:"A",
        link:function(scope, element, attr){
            scope.breakpoint = {class:'', windowSize:$window.innerWidth }; // Initialise Values

            var breakpoints = (scope.$eval(attr.breakpoint));

            angular.element($window).bind('resize', setWindowSize);
            angular.element($window).bind('load', setWindowSize);
            //console.log("YEAG!");

            scope.$watch('breakpoint.windowSize', function(windowWidth, oldValue){
                setClass(windowWidth);
            });

            scope.$watch('breakpoint.class', function(newClass, oldClass) {
                if (newClass != oldClass) broadcastEvent(oldClass);
            });

            function broadcastEvent (oldClass) {
                $rootScope.$broadcast('breakpointChange', scope.breakpoint, oldClass);
            }

            function setWindowSize (){
                scope.breakpoint.windowSize = $window.innerWidth;

                // This lib was tweaked to use Screen width instead of window width temporariblly
                //if (screen && screen.width) scope.breakpoint.windowSize = screen.width;

                if(!scope.$$phase) scope.$apply();
            }

            function setClass(windowWidth){
                var breakpointClass = breakpoints[Object.keys(breakpoints)[0]];
                for (var breakpoint in breakpoints){
                    if (breakpoint < windowWidth) breakpointClass = breakpoints[breakpoint];
                    element.removeClass(breakpoints[breakpoint]);
                }
                element.addClass(breakpointClass);
                scope.breakpoint.class  = breakpointClass;
                if(!scope.$$phase) scope.$apply();
            }
        }
    };
}]);



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2dhbWUnLCBnYW1lU2VydmljZSk7XG5cbmZ1bmN0aW9uIGdhbWVTZXJ2aWNlKFlhcm4sXG4gICAgICAgICAgICAgIGxvYWRTY3JpcHQsXG4gICAgICAgICAgICAgIGdhbWVQZWRpY2F0ZXMsXG4gICAgICAgICAgICAgIGdhbWVSb3V0aW5lcyxcbiAgICAgICAgICAgICAgZ2FtZVRoaW5ncykge1xuXG4gICAgdmFyIGdhbWUgPSBuZXcgWWFybigpO1xuXG4gICAgLy8gTG9hZCB2YXJpb3VzIGNvbmZpZ3VyYXRpb24gbW9kdWxlc1xuICAgIGdhbWVQZWRpY2F0ZXMoZ2FtZSk7XG4gICAgZ2FtZVJvdXRpbmVzKGdhbWUpO1xuICAgIGdhbWVUaGluZ3MoZ2FtZSk7XG5cbiAgICByZXR1cm4gZ2FtZTtcblxufVxuXG5cbi8qXG5cblRoaXMgbGliIHdhcyB0d2Vha2VkIHRvIHVzZSBTY3JlZW4gd2lkdGggaW5zdGVhZCBvZiB3aW5kb3cgd2lkdGggdGVtcG9yYXJpYmxseVxuXG4qL1xuLy8gVE9ETzogTWFrZSBhIHB1bGwgcmVxdWVzdD8gUHV0IGludG8gYSAvcGF0Y2hlZC12ZW5kb3JzIGZvbGRlciA/XG52YXIgYnJlYWtwb2ludEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdicmVha3BvaW50QXBwJyxbXSk7XG5cbmJyZWFrcG9pbnRBcHAuZGlyZWN0aXZlKCdicmVha3BvaW50JywgWyckd2luZG93JywgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkd2luZG93LCAkcm9vdFNjb3BlKXtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDpcIkFcIixcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cil7XG4gICAgICAgICAgICBzY29wZS5icmVha3BvaW50ID0ge2NsYXNzOicnLCB3aW5kb3dTaXplOiR3aW5kb3cuaW5uZXJXaWR0aCB9OyAvLyBJbml0aWFsaXNlIFZhbHVlc1xuXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSAoc2NvcGUuJGV2YWwoYXR0ci5icmVha3BvaW50KSk7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdyZXNpemUnLCBzZXRXaW5kb3dTaXplKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdsb2FkJywgc2V0V2luZG93U2l6ZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiWUVBRyFcIik7XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnYnJlYWtwb2ludC53aW5kb3dTaXplJywgZnVuY3Rpb24od2luZG93V2lkdGgsIG9sZFZhbHVlKXtcbiAgICAgICAgICAgICAgICBzZXRDbGFzcyh3aW5kb3dXaWR0aCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdicmVha3BvaW50LmNsYXNzJywgZnVuY3Rpb24obmV3Q2xhc3MsIG9sZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0NsYXNzICE9IG9sZENsYXNzKSBicm9hZGNhc3RFdmVudChvbGRDbGFzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYnJvYWRjYXN0RXZlbnQgKG9sZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdicmVha3BvaW50Q2hhbmdlJywgc2NvcGUuYnJlYWtwb2ludCwgb2xkQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRXaW5kb3dTaXplICgpe1xuICAgICAgICAgICAgICAgIHNjb3BlLmJyZWFrcG9pbnQud2luZG93U2l6ZSA9ICR3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgICAgICAgICAgICAgIC8vIFRoaXMgbGliIHdhcyB0d2Vha2VkIHRvIHVzZSBTY3JlZW4gd2lkdGggaW5zdGVhZCBvZiB3aW5kb3cgd2lkdGggdGVtcG9yYXJpYmxseVxuICAgICAgICAgICAgICAgIC8vaWYgKHNjcmVlbiAmJiBzY3JlZW4ud2lkdGgpIHNjb3BlLmJyZWFrcG9pbnQud2luZG93U2l6ZSA9IHNjcmVlbi53aWR0aDtcblxuICAgICAgICAgICAgICAgIGlmKCFzY29wZS4kJHBoYXNlKSBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q2xhc3Mod2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgIHZhciBicmVha3BvaW50Q2xhc3MgPSBicmVha3BvaW50c1tPYmplY3Qua2V5cyhicmVha3BvaW50cylbMF1dO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGJyZWFrcG9pbnQgaW4gYnJlYWtwb2ludHMpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnJlYWtwb2ludCA8IHdpbmRvd1dpZHRoKSBicmVha3BvaW50Q2xhc3MgPSBicmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhicmVha3BvaW50c1ticmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYnJlYWtwb2ludENsYXNzKTtcbiAgICAgICAgICAgICAgICBzY29wZS5icmVha3BvaW50LmNsYXNzICA9IGJyZWFrcG9pbnRDbGFzcztcbiAgICAgICAgICAgICAgICBpZighc2NvcGUuJCRwaGFzZSkgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xuXG5cbiJdLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('loadGameScripts', loadGameScripts);

function loadGameScripts(game,
                         loadPageScripts,
                         writers,
                         promptLoop,
                         splashService) {

    function loadGameScripts() {
        // Load all game scipts
        return loadPageScripts('yarn')
            .then(onSuccess, onFail);
    }

    function onFail(error) {
        console.log("Fail????? BOOOM!!! ", error);
    }

    /**
     * Called once all files are loaded (including imports)
     */
    function onSuccess(scripts) {
        console.info("Game script loaded successfully", scripts);

        if (scripts.length) {
            game.load(scripts[0]).then(function (script) {
                console.log("============[ THIS SHOULD BE THE LAST CALL ]============");
                console.log("script WHOO", script);

                script.run(game.state);

                console.log("======[ SHOULD HAVE ENDED RUN ]=======");
                splashService.hide();
                writers
                    .LogStoryIntroduction()
                    .DescribeWhereYouAre();
                promptLoop.update();

            });
        }



    }

    ///**
    // * handler when additionnal module must be imported from the initial loaded file
    // * @param source
    // */
    //function onLoad(source) {
    //    function onCompiled(script) {
    //        console.log("running script", source.substr(0, 100));
    //        //script.run(game.state, onImport);
    //    }
    //}

    //
    //// todo: put scriptLoader into a service
    //function onImport(url) {
    //    console.log("-------- REMOVE OLD IMPORTING: ", url);
    //}

    return loadGameScripts;

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkR2FtZVNjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZEdhbWVTY3JpcHRzJywgbG9hZEdhbWVTY3JpcHRzKTtcblxuZnVuY3Rpb24gbG9hZEdhbWVTY3JpcHRzKGdhbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VTY3JpcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0TG9vcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBzcGxhc2hTZXJ2aWNlKSB7XG5cbiAgICBmdW5jdGlvbiBsb2FkR2FtZVNjcmlwdHMoKSB7XG4gICAgICAgIC8vIExvYWQgYWxsIGdhbWUgc2NpcHRzXG4gICAgICAgIHJldHVybiBsb2FkUGFnZVNjcmlwdHMoJ3lhcm4nKVxuICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzLCBvbkZhaWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmFpbChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWw/Pz8/PyBCT09PTSEhISBcIiwgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbmNlIGFsbCBmaWxlcyBhcmUgbG9hZGVkIChpbmNsdWRpbmcgaW1wb3J0cylcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvblN1Y2Nlc3Moc2NyaXB0cykge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJHYW1lIHNjcmlwdCBsb2FkZWQgc3VjY2Vzc2Z1bGx5XCIsIHNjcmlwdHMpO1xuXG4gICAgICAgIGlmIChzY3JpcHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZ2FtZS5sb2FkKHNjcmlwdHNbMF0pLnRoZW4oZnVuY3Rpb24gKHNjcmlwdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09WyBUSElTIFNIT1VMRCBCRSBUSEUgTEFTVCBDQUxMIF09PT09PT09PT09PT1cIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzY3JpcHQgV0hPT1wiLCBzY3JpcHQpO1xuXG4gICAgICAgICAgICAgICAgc2NyaXB0LnJ1bihnYW1lLnN0YXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09WyBTSE9VTEQgSEFWRSBFTkRFRCBSVU4gXT09PT09PT1cIik7XG4gICAgICAgICAgICAgICAgc3BsYXNoU2VydmljZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgd3JpdGVyc1xuICAgICAgICAgICAgICAgICAgICAuTG9nU3RvcnlJbnRyb2R1Y3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICAuRGVzY3JpYmVXaGVyZVlvdUFyZSgpO1xuICAgICAgICAgICAgICAgIHByb21wdExvb3AudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgLy8vKipcbiAgICAvLyAqIGhhbmRsZXIgd2hlbiBhZGRpdGlvbm5hbCBtb2R1bGUgbXVzdCBiZSBpbXBvcnRlZCBmcm9tIHRoZSBpbml0aWFsIGxvYWRlZCBmaWxlXG4gICAgLy8gKiBAcGFyYW0gc291cmNlXG4gICAgLy8gKi9cbiAgICAvL2Z1bmN0aW9uIG9uTG9hZChzb3VyY2UpIHtcbiAgICAvLyAgICBmdW5jdGlvbiBvbkNvbXBpbGVkKHNjcmlwdCkge1xuICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgc2NyaXB0XCIsIHNvdXJjZS5zdWJzdHIoMCwgMTAwKSk7XG4gICAgLy8gICAgICAgIC8vc2NyaXB0LnJ1bihnYW1lLnN0YXRlLCBvbkltcG9ydCk7XG4gICAgLy8gICAgfVxuICAgIC8vfVxuXG4gICAgLy9cbiAgICAvLy8vIHRvZG86IHB1dCBzY3JpcHRMb2FkZXIgaW50byBhIHNlcnZpY2VcbiAgICAvL2Z1bmN0aW9uIG9uSW1wb3J0KHVybCkge1xuICAgIC8vICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0gUkVNT1ZFIE9MRCBJTVBPUlRJTkc6IFwiLCB1cmwpO1xuICAgIC8vfVxuXG4gICAgcmV0dXJuIGxvYWRHYW1lU2NyaXB0cztcblxufVxuXG5cblxuIl0sImZpbGUiOiJsb2FkR2FtZVNjcmlwdHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').factory('loadMetadata', loadMetadata);

function loadMetadata($http) {

    function loadMetadata () {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: './metadata.json'
        };

        function then(response) {
            console.info("Loaded metadata from : ", response.config.url, response.data);
            return response.data;
        }

        return $http(config).then(then);
    }

    return loadMetadata;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkTWV0YWRhdGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZE1ldGFkYXRhJywgbG9hZE1ldGFkYXRhKTtcblxuZnVuY3Rpb24gbG9hZE1ldGFkYXRhKCRodHRwKSB7XG5cbiAgICBmdW5jdGlvbiBsb2FkTWV0YWRhdGEgKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNjcmlwdFRhZyk7XG4gICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnLi9tZXRhZGF0YS5qc29uJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkxvYWRlZCBtZXRhZGF0YSBmcm9tIDogXCIsIHJlc3BvbnNlLmNvbmZpZy51cmwsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJGh0dHAoY29uZmlnKS50aGVuKHRoZW4pO1xuICAgIH1cblxuICAgIHJldHVybiBsb2FkTWV0YWRhdGE7XG59XG4iXSwiZmlsZSI6ImxvYWRNZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('loadPageScripts', loadPageScripts);

function loadPageScripts(loadScript,
                         $document,
                         $q) {

    function loadPageScripts(scriptType) {
        //var promise = $q(function () {
        //    console.log("starting chain!");
        //});
        var deferred = $q.defer();
        var scripts = [];

        /**
         * Queue all scripts on the page to load sequencially
         */
        var promises = [];
        var scriptTags = $document.find("script");
        angular.forEach(scriptTags, function (scriptTag) {
            if (scriptTag.type.toLowerCase() === scriptType) {
                console.log("queued script ", scriptTag.src);
                promises.push(loadScript(scriptTag.src));
            }
        });

        $q.all(promises).then(function (scripts) {
            console.log("scripts", scripts);
            deferred.resolve(scripts);
        });

        return deferred.promise;
    }

    return loadPageScripts;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkUGFnZVNjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZFBhZ2VTY3JpcHRzJywgbG9hZFBhZ2VTY3JpcHRzKTtcblxuZnVuY3Rpb24gbG9hZFBhZ2VTY3JpcHRzKGxvYWRTY3JpcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICRxKSB7XG5cbiAgICBmdW5jdGlvbiBsb2FkUGFnZVNjcmlwdHMoc2NyaXB0VHlwZSkge1xuICAgICAgICAvL3ZhciBwcm9taXNlID0gJHEoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGNoYWluIVwiKTtcbiAgICAgICAgLy99KTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHNjcmlwdHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUXVldWUgYWxsIHNjcmlwdHMgb24gdGhlIHBhZ2UgdG8gbG9hZCBzZXF1ZW5jaWFsbHlcbiAgICAgICAgICovXG4gICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgICAgICB2YXIgc2NyaXB0VGFncyA9ICRkb2N1bWVudC5maW5kKFwic2NyaXB0XCIpO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NyaXB0VGFncywgZnVuY3Rpb24gKHNjcmlwdFRhZykge1xuICAgICAgICAgICAgaWYgKHNjcmlwdFRhZy50eXBlLnRvTG93ZXJDYXNlKCkgPT09IHNjcmlwdFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInF1ZXVlZCBzY3JpcHQgXCIsIHNjcmlwdFRhZy5zcmMpO1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gobG9hZFNjcmlwdChzY3JpcHRUYWcuc3JjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRxLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAoc2NyaXB0cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzY3JpcHRzXCIsIHNjcmlwdHMpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzY3JpcHRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvYWRQYWdlU2NyaXB0cztcbn1cbiJdLCJmaWxlIjoibG9hZFBhZ2VTY3JpcHRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('loadScript', loadScript);

function loadScript($http) {

    function loadScript (src) {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: src
        };

        function then(response) {
            console.info("Loaded script: ", response.config.url);
            return response.data;
        }

        return $http(config).then(then);
    }


    return loadScript;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkU2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2xvYWRTY3JpcHQnLCBsb2FkU2NyaXB0KTtcblxuZnVuY3Rpb24gbG9hZFNjcmlwdCgkaHR0cCkge1xuXG4gICAgZnVuY3Rpb24gbG9hZFNjcmlwdCAoc3JjKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coc2NyaXB0VGFnKTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IHNyY1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkxvYWRlZCBzY3JpcHQ6IFwiLCByZXNwb25zZS5jb25maWcudXJsKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICRodHRwKGNvbmZpZykudGhlbih0aGVuKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBsb2FkU2NyaXB0O1xufVxuIl0sImZpbGUiOiJsb2FkU2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('promptLoop', promptLoop);

function promptLoop(storyLogService,
                    commands,
                    game,
                    writers) {

    var storyLog = storyLogService;

    var state = game.state;
    var logic = game.logic;

    function WhereToGo(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "move";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";
            var rooms = state.resolve("you.isIn.linksTo");
            //console.log('rooms', rooms);
            rooms.forEach(function (room) {
                var label = room.resolveValue("isNamed");
                prompt.option(label, room.id);
            });
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhereToDo");
            // todo: this should be injected instead of taken from parent scope
            logic.routines.aboutTo("");
            if (logic.routines.move(option.value)) {
                writers.DescribeWhereYouAre(true);
            } else {
                storyLog.error("Failed to find this room [%s]", option.value);
            }
        };
        return promptLoop;
    }

    function WhatToLookAt(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "look";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            //console.log('thingsInRoom', thingsInRoom);
            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            logic.routines.aboutTo("");
            if (option) {
                var thing = state.thing(option.value);
                writers.DescribeThing(thing);
            } else {
                storyLog.error("Nothing to look at here!");
            }
        };
    }

    function WhatToTake(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "take";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            var thingsThatAreInventory = [];
            console.trace("thingsInRoom", thingsInRoom);

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                console.trace("thing", thing.id);
                // Check if item is an InventoryItem
                var isInventoryItem = false;
                var thingsThatAre = thing.resolve("isA");
                thingsThatAre.forEach(function (thing) {
                    console.trace("is a", thing.id);
                    if (thing === state.thing("InventoryItem")) isInventoryItem = true;
                });
                if (isInventoryItem) thingsThatAreInventory.push(thing);
            });


            //console.log('thingsInRoom', thingsInRoom);
            if (thingsThatAreInventory.length) {
                thingsThatAreInventory.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);

            if (option) {
                // todo: Find sexier api for removing an assertion
                // todo: Implement "unique" assertions... such as when someone is
                var thing = state.thing(option.value);
                var hasInInventory = state.predicate("hasInInventory");
                state.thing("You").setAssertion(hasInInventory, thing);
                writers.DescribeThingTakenInInventory(thing);
            } else {
                storyLog.error("Sorry, nothing to take here!");
            }

        };
    }

    function WhatToDo(context) {
        context.when = function (state) {
            return true;
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do ?";
            prompt.option("Move", "move");
            prompt.option("Look", "look");
            prompt.option("Take", "take");
            prompt.option("Inventory", "inventory");
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            commands.command(option.value);
        };
    }

    // Create an instant of the promptLoop
    var promptLoop = new PromptLoop(state);

    promptLoop.addContext("WhereToDo", WhereToGo);
    promptLoop.addContext("WhatToLookAt", WhatToLookAt);
    promptLoop.addContext("WhatToTake", WhatToTake);
    promptLoop.addContext("WhatToDo", WhatToDo);
    promptLoop.update();

    return promptLoop;
}




function PromptLoop(state) {
    this.state = state;
    this.contexts = [];
    this.contextsRef = [];
    this.currentPrompt = null;
    this.updatePromptUI = function() {};
}

PromptLoop.prototype.onUpdate = function (onUpdatePrompt) {
    this.updatePromptUI = onUpdatePrompt;
};

PromptLoop.prototype.update = function (dontUpdateUI) {
    var prompt;
    var self = this;
    var context = this.contexts.find(findContext);

    function findContext(context) {
        var found;
        if (context.when(self.state)) found = context;
        return found;
    }

    // Setup the prompt if a context was found
    if (context) {
        prompt = new Prompt();
        this.currentPrompt = prompt;
        context.question(this, prompt);
        if (prompt.options.length) {
            prompt.answer = function (promptLoop, value) {
                var option = prompt.optionsRef[value];
                context.answer(self, option);
                self.update();
            };
        } else {
            // No choices available... simply process a null answer
            // And update the state afterward
            context.answer(self, null);
            //self.updatePromptUI(self);
        }
        if (!dontUpdateUI) this.updatePromptUI(this);
    } else {
        console.log("No context found!");
    }
};

PromptLoop.prototype.addContext = function (id, config) {
    var context = new Context(id);
    config(context);
    this.contexts.push(context);
    this.contextsRef[id] = context;
};

function Context(id) {
    this.id = id;
    this.question = null;
    this.when = null;
    this.answer = null;
}

function Prompt() {
    this.question = "";
    this.options = [];
    this.optionsRef = {};
}

Prompt.prototype.option = function (label, value) {
    var option = new Option(label, value);
    this.options.push(option);
    this.optionsRef[value] = option;
};

function Option(label, value) {
    this.label = label;
    this.value = value;
}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwcm9tcHRMb29wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3Byb21wdExvb3AnLCBwcm9tcHRMb29wKTtcblxuZnVuY3Rpb24gcHJvbXB0TG9vcChzdG9yeUxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICB3cml0ZXJzKSB7XG5cbiAgICB2YXIgc3RvcnlMb2cgPSBzdG9yeUxvZ1NlcnZpY2U7XG5cbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuICAgIHZhciBsb2dpYyA9IGdhbWUubG9naWM7XG5cbiAgICBmdW5jdGlvbiBXaGVyZVRvR28oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LndoZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBpc0Fib3V0VG8gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJZb3UuaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGlzQWJvdXRUbyA9PT0gXCJtb3ZlXCI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQucXVlc3Rpb24gPSBmdW5jdGlvbiAocHJvbXB0TG9vcCwgcHJvbXB0KSB7XG4gICAgICAgICAgICBwcm9tcHQucXVlc3Rpb24gPSBcIldoZXJlIGRvIHlvdSB3YW50IHRvIGdvID9cIjtcbiAgICAgICAgICAgIHZhciByb29tcyA9IHN0YXRlLnJlc29sdmUoXCJ5b3UuaXNJbi5saW5rc1RvXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncm9vbXMnLCByb29tcyk7XG4gICAgICAgICAgICByb29tcy5mb3JFYWNoKGZ1bmN0aW9uIChyb29tKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gcm9vbS5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHJvb20uaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuYW5zd2VyID0gZnVuY3Rpb24gYW5zd2VyKHByb21wdExvb3AsIG9wdGlvbikge1xuICAgICAgICAgICAgLy9jb25zb2xlLnRyYWNlKFwiLmFuc3dlciBmb3IgV2hlcmVUb0RvXCIpO1xuICAgICAgICAgICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgaW5qZWN0ZWQgaW5zdGVhZCBvZiB0YWtlbiBmcm9tIHBhcmVudCBzY29wZVxuICAgICAgICAgICAgbG9naWMucm91dGluZXMuYWJvdXRUbyhcIlwiKTtcbiAgICAgICAgICAgIGlmIChsb2dpYy5yb3V0aW5lcy5tb3ZlKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJzLkRlc2NyaWJlV2hlcmVZb3VBcmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3J5TG9nLmVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGhpcyByb29tIFslc11cIiwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHByb21wdExvb3A7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvTG9va0F0KGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC53aGVuID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucmVzb2x2ZVZhbHVlKFwiWW91LmlzQWJvdXRUb1wiKTtcbiAgICAgICAgICAgIHJldHVybiBpc0Fib3V0VG8gPT09IFwibG9va1wiO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGxvb2sgYXQgP1wiO1xuICAgICAgICAgICAgdmFyIHRoaW5nc0luUm9vbSA9IHN0YXRlLnJlc29sdmUoXCJZb3UuaXNJbi5oYXNJbkl0XCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndGhpbmdzSW5Sb29tJywgdGhpbmdzSW5Sb29tKTtcbiAgICAgICAgICAgIGlmICh0aGluZ3NJblJvb20ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpbmdzSW5Sb29tLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICBsb2dpYy5yb3V0aW5lcy5hYm91dFRvKFwiXCIpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGluZyA9IHN0YXRlLnRoaW5nKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgd3JpdGVycy5EZXNjcmliZVRoaW5nKHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJOb3RoaW5nIHRvIGxvb2sgYXQgaGVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvVGFrZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQud2hlbiA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGlzQWJvdXRUbyA9IHN0YXRlLnJlc29sdmVWYWx1ZShcIllvdS5pc0Fib3V0VG9cIik7XG4gICAgICAgICAgICByZXR1cm4gaXNBYm91dFRvID09PSBcInRha2VcIjtcbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbiA9IGZ1bmN0aW9uIChwcm9tcHRMb29wLCBwcm9tcHQpIHtcbiAgICAgICAgICAgIHByb21wdC5xdWVzdGlvbiA9IFwiV2hhdCBkbyB5b3Ugd2FudCB0byB0YWtlID9cIjtcbiAgICAgICAgICAgIHZhciB0aGluZ3NJblJvb20gPSBzdGF0ZS5yZXNvbHZlKFwiWW91LmlzSW4uaGFzSW5JdFwiKTtcbiAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlSW52ZW50b3J5ID0gW107XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKFwidGhpbmdzSW5Sb29tXCIsIHRoaW5nc0luUm9vbSk7XG5cbiAgICAgICAgICAgIC8vIFRvZG86IFlVQ0suLi4gRmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhlc2UgY2hlY2tzISEhISFcbiAgICAgICAgICAgIHRoaW5nc0luUm9vbS5mb3JFYWNoKGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJ0aGluZ1wiLCB0aGluZy5pZCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXRlbSBpcyBhbiBJbnZlbnRvcnlJdGVtXG4gICAgICAgICAgICAgICAgdmFyIGlzSW52ZW50b3J5SXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlID0gdGhpbmcucmVzb2x2ZShcImlzQVwiKTtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJpcyBhXCIsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nID09PSBzdGF0ZS50aGluZyhcIkludmVudG9yeUl0ZW1cIikpIGlzSW52ZW50b3J5SXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzSW52ZW50b3J5SXRlbSkgdGhpbmdzVGhhdEFyZUludmVudG9yeS5wdXNoKHRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoaW5nc0luUm9vbScsIHRoaW5nc0luUm9vbSk7XG4gICAgICAgICAgICBpZiAodGhpbmdzVGhhdEFyZUludmVudG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlSW52ZW50b3J5LmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikucmVtb3ZlQXNzZXJ0aW9ucyhpc0Fib3V0VG8pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9kbzogRmluZCBzZXhpZXIgYXBpIGZvciByZW1vdmluZyBhbiBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAvLyB0b2RvOiBJbXBsZW1lbnQgXCJ1bmlxdWVcIiBhc3NlcnRpb25zLi4uIHN1Y2ggYXMgd2hlbiBzb21lb25lIGlzXG4gICAgICAgICAgICAgICAgdmFyIHRoaW5nID0gc3RhdGUudGhpbmcob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzSW5JbnZlbnRvcnkgPSBzdGF0ZS5wcmVkaWNhdGUoXCJoYXNJbkludmVudG9yeVwiKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaGFzSW5JbnZlbnRvcnksIHRoaW5nKTtcbiAgICAgICAgICAgICAgICB3cml0ZXJzLkRlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5KHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJTb3JyeSwgbm90aGluZyB0byB0YWtlIGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvRG8oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LndoZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGRvID9cIjtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJNb3ZlXCIsIFwibW92ZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJMb29rXCIsIFwibG9va1wiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJUYWtlXCIsIFwidGFrZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJJbnZlbnRvcnlcIiwgXCJpbnZlbnRvcnlcIik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuYW5zd2VyID0gZnVuY3Rpb24gYW5zd2VyKHByb21wdExvb3AsIG9wdGlvbikge1xuICAgICAgICAgICAgLy9jb25zb2xlLnRyYWNlKFwiLmFuc3dlciBmb3IgV2hhdFRvRG9cIik7XG4gICAgICAgICAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBpbmplY3RlZCBpbnN0ZWFkIG9mIHRha2VuIGZyb20gcGFyZW50IHNjb3BlXG4gICAgICAgICAgICBjb21tYW5kcy5jb21tYW5kKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIGluc3RhbnQgb2YgdGhlIHByb21wdExvb3BcbiAgICB2YXIgcHJvbXB0TG9vcCA9IG5ldyBQcm9tcHRMb29wKHN0YXRlKTtcblxuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoZXJlVG9Eb1wiLCBXaGVyZVRvR28pO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb0xvb2tBdFwiLCBXaGF0VG9Mb29rQXQpO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb1Rha2VcIiwgV2hhdFRvVGFrZSk7XG4gICAgcHJvbXB0TG9vcC5hZGRDb250ZXh0KFwiV2hhdFRvRG9cIiwgV2hhdFRvRG8pO1xuICAgIHByb21wdExvb3AudXBkYXRlKCk7XG5cbiAgICByZXR1cm4gcHJvbXB0TG9vcDtcbn1cblxuXG5cblxuZnVuY3Rpb24gUHJvbXB0TG9vcChzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmNvbnRleHRzID0gW107XG4gICAgdGhpcy5jb250ZXh0c1JlZiA9IFtdO1xuICAgIHRoaXMuY3VycmVudFByb21wdCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IGZ1bmN0aW9uKCkge307XG59XG5cblByb21wdExvb3AucHJvdG90eXBlLm9uVXBkYXRlID0gZnVuY3Rpb24gKG9uVXBkYXRlUHJvbXB0KSB7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IG9uVXBkYXRlUHJvbXB0O1xufTtcblxuUHJvbXB0TG9vcC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbnRVcGRhdGVVSSkge1xuICAgIHZhciBwcm9tcHQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0cy5maW5kKGZpbmRDb250ZXh0KTtcblxuICAgIGZ1bmN0aW9uIGZpbmRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGZvdW5kO1xuICAgICAgICBpZiAoY29udGV4dC53aGVuKHNlbGYuc3RhdGUpKSBmb3VuZCA9IGNvbnRleHQ7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCB0aGUgcHJvbXB0IGlmIGEgY29udGV4dCB3YXMgZm91bmRcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICBwcm9tcHQgPSBuZXcgUHJvbXB0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFByb21wdCA9IHByb21wdDtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbih0aGlzLCBwcm9tcHQpO1xuICAgICAgICBpZiAocHJvbXB0Lm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcm9tcHQuYW5zd2VyID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHByb21wdC5vcHRpb25zUmVmW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBvcHRpb24pO1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gY2hvaWNlcyBhdmFpbGFibGUuLi4gc2ltcGx5IHByb2Nlc3MgYSBudWxsIGFuc3dlclxuICAgICAgICAgICAgLy8gQW5kIHVwZGF0ZSB0aGUgc3RhdGUgYWZ0ZXJ3YXJkXG4gICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBudWxsKTtcbiAgICAgICAgICAgIC8vc2VsZi51cGRhdGVQcm9tcHRVSShzZWxmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRvbnRVcGRhdGVVSSkgdGhpcy51cGRhdGVQcm9tcHRVSSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNvbnRleHQgZm91bmQhXCIpO1xuICAgIH1cbn07XG5cblByb21wdExvb3AucHJvdG90eXBlLmFkZENvbnRleHQgPSBmdW5jdGlvbiAoaWQsIGNvbmZpZykge1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoaWQpO1xuICAgIGNvbmZpZyhjb250ZXh0KTtcbiAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgdGhpcy5jb250ZXh0c1JlZltpZF0gPSBjb250ZXh0O1xufTtcblxuZnVuY3Rpb24gQ29udGV4dChpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnF1ZXN0aW9uID0gbnVsbDtcbiAgICB0aGlzLndoZW4gPSBudWxsO1xuICAgIHRoaXMuYW5zd2VyID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gUHJvbXB0KCkge1xuICAgIHRoaXMucXVlc3Rpb24gPSBcIlwiO1xuICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgIHRoaXMub3B0aW9uc1JlZiA9IHt9O1xufVxuXG5Qcm9tcHQucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCwgdmFsdWUpIHtcbiAgICB2YXIgb3B0aW9uID0gbmV3IE9wdGlvbihsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMub3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgdGhpcy5vcHRpb25zUmVmW3ZhbHVlXSA9IG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIE9wdGlvbihsYWJlbCwgdmFsdWUpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG5cblxuIl0sImZpbGUiOiJwcm9tcHRMb29wLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('sceneryService', sceneryService);

function sceneryService() {

    var image = "";
    var onChangeFn = function () {};

    // todo: allo more flexible event hooks with a true "bind" syntax
    function onChange(fn) {
        onChangeFn = fn;
    }

    function change(_image) {
        image = _image;
        onChangeFn(image);
    }

    return {
        change: change,
        onChange: onChange
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3NjZW5lcnlTZXJ2aWNlJywgc2NlbmVyeVNlcnZpY2UpO1xuXG5mdW5jdGlvbiBzY2VuZXJ5U2VydmljZSgpIHtcblxuICAgIHZhciBpbWFnZSA9IFwiXCI7XG4gICAgdmFyIG9uQ2hhbmdlRm4gPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIHRvZG86IGFsbG8gbW9yZSBmbGV4aWJsZSBldmVudCBob29rcyB3aXRoIGEgdHJ1ZSBcImJpbmRcIiBzeW50YXhcbiAgICBmdW5jdGlvbiBvbkNoYW5nZShmbikge1xuICAgICAgICBvbkNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlKF9pbWFnZSkge1xuICAgICAgICBpbWFnZSA9IF9pbWFnZTtcbiAgICAgICAgb25DaGFuZ2VGbihpbWFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbmdlOiBjaGFuZ2UsXG4gICAgICAgIG9uQ2hhbmdlOiBvbkNoYW5nZVxuICAgIH07XG5cbn1cblxuXG5cbiJdLCJmaWxlIjoic2NlbmVyeS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('storyLogService', storyLogService);

function storyLogService() {

    function Logger() {

        var storyLog = {
            write: mockFunction,
            clear: mockFunction
        };

        function mockFunction() {
            console.error("storyLog not ready yet...");
        }

        this.register = function (directive) {
            storyLog = directive;
        };

        this.log = function (text) {
            storyLog.write(text, "log");
        };

        this.debug = function (text) {
            storyLog.write(text, "debug");
        };

        this.error = function (text) {
            storyLog.write(text, "error");
        };

        this.heading = function (text) {
            storyLog.write(text, "heading");
        };

        this.subHeading = function (text) {
            storyLog.write(text, "subHeading");
        };

        this.divider = function (text) {
            storyLog.write('<div class="divider"><svg viewBox="0 100 600 160" xmlns="http://www.w3.org/2000/svg"><g>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m130.424789,192.484528c5.347214,-7.567429 3.672729,-18.679031 -0.897858,-21.884766c-8.063118,-5.856277 -16.876259,6.366287 -12.837143,18.526962c4.031113,12.517319 14.122147,21.267746 27.859741,23.769913c29.803345,5.265564 88.753922,-27.178055 126.139771,-37.105835c27.772552,-7.374985 44.737732,3.70697 53.891937,15.980652c-18.814636,-13.327133 -35.962769,-8.691956 -53.610626,-5.4198c-40.492233,7.507782 -82.376175,39.384064 -126.758072,34.370102c-20.720802,-3.09549 -35.239151,-23.671143 -34.04528,-39.805344c0.106049,-1.433762 0.336189,-2.832489 0.697144,-4.180801c2.727554,-9.561676 7.519974,-13.483307 11.765518,-14.646454c11.540581,-3.161896 22.972786,17.871918 7.794868,30.39537z" id="path2383"/>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m487.119385,189.199921c-5.671265,7.631012 -3.895264,18.836304 0.952271,22.069031c8.551758,5.905624 17.89917,-6.419983 13.615234,-18.682968c-4.275269,-12.622757 -14.978088,-21.446869 -29.548309,-23.969986c-31.609894,-5.309998 -94.133331,27.406815 -133.785309,37.418243c-29.45575,7.437042 -47.449219,-3.73822 -57.158203,-16.115265c19.954956,13.439377 38.142334,8.765167 56.859802,5.465454c42.946655,-7.570999 87.369202,-39.715729 134.441101,-34.659546c21.976685,3.121552 37.375,23.870499 36.108826,40.140549c-0.112488,1.445938 -0.356628,2.856339 -0.739441,4.216019c-2.892883,9.642197 -7.975769,13.596756 -12.478638,14.769791c-12.240051,3.188507 -24.365143,-18.0224 -8.267334,-30.651321z" id="path2479"/>' +
                '</g></svg></div>', "divider");
        };

        this.thingImage = function (url) {
            storyLog.write('<img src="' + url + '">', "thingImage");
        };

        this.clear = function () {
            storyLog.clear();
        };

    }

    var logger = new Logger();

    return logger;
}





//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdzdG9yeUxvZ1NlcnZpY2UnLCBzdG9yeUxvZ1NlcnZpY2UpO1xuXG5mdW5jdGlvbiBzdG9yeUxvZ1NlcnZpY2UoKSB7XG5cbiAgICBmdW5jdGlvbiBMb2dnZXIoKSB7XG5cbiAgICAgICAgdmFyIHN0b3J5TG9nID0ge1xuICAgICAgICAgICAgd3JpdGU6IG1vY2tGdW5jdGlvbixcbiAgICAgICAgICAgIGNsZWFyOiBtb2NrRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBtb2NrRnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic3RvcnlMb2cgbm90IHJlYWR5IHlldC4uLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICBzdG9yeUxvZyA9IGRpcmVjdGl2ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImxvZ1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlYnVnID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLndyaXRlKHRleHQsIFwiZGVidWdcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImVycm9yXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaGVhZGluZyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImhlYWRpbmdcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdWJIZWFkaW5nID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLndyaXRlKHRleHQsIFwic3ViSGVhZGluZ1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRpdmlkZXIgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgc3RvcnlMb2cud3JpdGUoJzxkaXYgY2xhc3M9XCJkaXZpZGVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAxMDAgNjAwIDE2MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Zz4nICtcbiAgICAgICAgICAgICAgICAnPHBhdGggZmlsbD1cIiMwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCIgZD1cIm0xMzAuNDI0Nzg5LDE5Mi40ODQ1MjhjNS4zNDcyMTQsLTcuNTY3NDI5IDMuNjcyNzI5LC0xOC42NzkwMzEgLTAuODk3ODU4LC0yMS44ODQ3NjZjLTguMDYzMTE4LC01Ljg1NjI3NyAtMTYuODc2MjU5LDYuMzY2Mjg3IC0xMi44MzcxNDMsMTguNTI2OTYyYzQuMDMxMTEzLDEyLjUxNzMxOSAxNC4xMjIxNDcsMjEuMjY3NzQ2IDI3Ljg1OTc0MSwyMy43Njk5MTNjMjkuODAzMzQ1LDUuMjY1NTY0IDg4Ljc1MzkyMiwtMjcuMTc4MDU1IDEyNi4xMzk3NzEsLTM3LjEwNTgzNWMyNy43NzI1NTIsLTcuMzc0OTg1IDQ0LjczNzczMiwzLjcwNjk3IDUzLjg5MTkzNywxNS45ODA2NTJjLTE4LjgxNDYzNiwtMTMuMzI3MTMzIC0zNS45NjI3NjksLTguNjkxOTU2IC01My42MTA2MjYsLTUuNDE5OGMtNDAuNDkyMjMzLDcuNTA3NzgyIC04Mi4zNzYxNzUsMzkuMzg0MDY0IC0xMjYuNzU4MDcyLDM0LjM3MDEwMmMtMjAuNzIwODAyLC0zLjA5NTQ5IC0zNS4yMzkxNTEsLTIzLjY3MTE0MyAtMzQuMDQ1MjgsLTM5LjgwNTM0NGMwLjEwNjA0OSwtMS40MzM3NjIgMC4zMzYxODksLTIuODMyNDg5IDAuNjk3MTQ0LC00LjE4MDgwMWMyLjcyNzU1NCwtOS41NjE2NzYgNy41MTk5NzQsLTEzLjQ4MzMwNyAxMS43NjU1MTgsLTE0LjY0NjQ1NGMxMS41NDA1ODEsLTMuMTYxODk2IDIyLjk3Mjc4NiwxNy44NzE5MTggNy43OTQ4NjgsMzAuMzk1Mzd6XCIgaWQ9XCJwYXRoMjM4M1wiLz4nICtcbiAgICAgICAgICAgICAgICAnPHBhdGggZmlsbD1cIiMwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCIgZD1cIm00ODcuMTE5Mzg1LDE4OS4xOTk5MjFjLTUuNjcxMjY1LDcuNjMxMDEyIC0zLjg5NTI2NCwxOC44MzYzMDQgMC45NTIyNzEsMjIuMDY5MDMxYzguNTUxNzU4LDUuOTA1NjI0IDE3Ljg5OTE3LC02LjQxOTk4MyAxMy42MTUyMzQsLTE4LjY4Mjk2OGMtNC4yNzUyNjksLTEyLjYyMjc1NyAtMTQuOTc4MDg4LC0yMS40NDY4NjkgLTI5LjU0ODMwOSwtMjMuOTY5OTg2Yy0zMS42MDk4OTQsLTUuMzA5OTk4IC05NC4xMzMzMzEsMjcuNDA2ODE1IC0xMzMuNzg1MzA5LDM3LjQxODI0M2MtMjkuNDU1NzUsNy40MzcwNDIgLTQ3LjQ0OTIxOSwtMy43MzgyMiAtNTcuMTU4MjAzLC0xNi4xMTUyNjVjMTkuOTU0OTU2LDEzLjQzOTM3NyAzOC4xNDIzMzQsOC43NjUxNjcgNTYuODU5ODAyLDUuNDY1NDU0YzQyLjk0NjY1NSwtNy41NzA5OTkgODcuMzY5MjAyLC0zOS43MTU3MjkgMTM0LjQ0MTEwMSwtMzQuNjU5NTQ2YzIxLjk3NjY4NSwzLjEyMTU1MiAzNy4zNzUsMjMuODcwNDk5IDM2LjEwODgyNiw0MC4xNDA1NDljLTAuMTEyNDg4LDEuNDQ1OTM4IC0wLjM1NjYyOCwyLjg1NjMzOSAtMC43Mzk0NDEsNC4yMTYwMTljLTIuODkyODgzLDkuNjQyMTk3IC03Ljk3NTc2OSwxMy41OTY3NTYgLTEyLjQ3ODYzOCwxNC43Njk3OTFjLTEyLjI0MDA1MSwzLjE4ODUwNyAtMjQuMzY1MTQzLC0xOC4wMjI0IC04LjI2NzMzNCwtMzAuNjUxMzIxelwiIGlkPVwicGF0aDI0NzlcIi8+JyArXG4gICAgICAgICAgICAgICAgJzwvZz48L3N2Zz48L2Rpdj4nLCBcImRpdmlkZXJcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy50aGluZ0ltYWdlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgc3RvcnlMb2cud3JpdGUoJzxpbWcgc3JjPVwiJyArIHVybCArICdcIj4nLCBcInRoaW5nSW1hZ2VcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLmNsZWFyKCk7XG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICB2YXIgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG4gICAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuXG5cblxuIl0sImZpbGUiOiJzdG9yeUxvZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('writers', writers);

// TODO:  storyLog and state are ASYNC ????

function writers(storyLogService,
                 game,
                 sceneryService) {

    var storyLog = storyLogService;
    var state = game.state;

    // Story welcome message and introduction
    // todo: Output specially styled titles for story and chapters
    function LogStoryIntroduction() {
        var story = state.thing("story");
        var storyTitle = state.resolveValue("story.isNamed");

        if (storyTitle) storyLog.heading(storyTitle);

        var storyDescription = state.resolveValue("story.isDescribedAs");
        if (storyDescription) storyLog.subHeading(storyDescription);
        // todo: Output specially styled separators
        storyLog.divider();
        return this;
    }


    // Describe where you are at the beginning
    function DescribeWhereYouAre(justMoved) {
        storyLog.clear();
        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var scenery = room.resolveValue("hasScenery");
            if (scenery) sceneryService.change(scenery);

            var label = room.resolveValue("isNamed");
            storyLog.heading(label);
            var description = room.resolveValue("isDescribedAs");
            if (description) storyLog.log(description);
        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThing(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            var description = thing.resolveValue("isDescribedAs");
            var image = thing.resolveValue("hasImage");
            if (image) storyLog.thingImage(image);
            if (label) storyLog.subHeading(label);
            if (description) storyLog.log(description);
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThingTakenInInventory(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            if (label) storyLog.log("You took the " + label);
        }
        return this;
    }

    return {
        DescribeThingTakenInInventory: DescribeThingTakenInInventory,
        DescribeThing:DescribeThing,
        DescribeWhereYouAre:DescribeWhereYouAre,
        LogStoryIntroduction:LogStoryIntroduction
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ3cml0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3dyaXRlcnMnLCB3cml0ZXJzKTtcblxuLy8gVE9ETzogIHN0b3J5TG9nIGFuZCBzdGF0ZSBhcmUgQVNZTkMgPz8/P1xuXG5mdW5jdGlvbiB3cml0ZXJzKHN0b3J5TG9nU2VydmljZSxcbiAgICAgICAgICAgICAgICAgZ2FtZSxcbiAgICAgICAgICAgICAgICAgc2NlbmVyeVNlcnZpY2UpIHtcblxuICAgIHZhciBzdG9yeUxvZyA9IHN0b3J5TG9nU2VydmljZTtcbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuXG4gICAgLy8gU3Rvcnkgd2VsY29tZSBtZXNzYWdlIGFuZCBpbnRyb2R1Y3Rpb25cbiAgICAvLyB0b2RvOiBPdXRwdXQgc3BlY2lhbGx5IHN0eWxlZCB0aXRsZXMgZm9yIHN0b3J5IGFuZCBjaGFwdGVyc1xuICAgIGZ1bmN0aW9uIExvZ1N0b3J5SW50cm9kdWN0aW9uKCkge1xuICAgICAgICB2YXIgc3RvcnkgPSBzdGF0ZS50aGluZyhcInN0b3J5XCIpO1xuICAgICAgICB2YXIgc3RvcnlUaXRsZSA9IHN0YXRlLnJlc29sdmVWYWx1ZShcInN0b3J5LmlzTmFtZWRcIik7XG5cbiAgICAgICAgaWYgKHN0b3J5VGl0bGUpIHN0b3J5TG9nLmhlYWRpbmcoc3RvcnlUaXRsZSk7XG5cbiAgICAgICAgdmFyIHN0b3J5RGVzY3JpcHRpb24gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJzdG9yeS5pc0Rlc2NyaWJlZEFzXCIpO1xuICAgICAgICBpZiAoc3RvcnlEZXNjcmlwdGlvbikgc3RvcnlMb2cuc3ViSGVhZGluZyhzdG9yeURlc2NyaXB0aW9uKTtcbiAgICAgICAgLy8gdG9kbzogT3V0cHV0IHNwZWNpYWxseSBzdHlsZWQgc2VwYXJhdG9yc1xuICAgICAgICBzdG9yeUxvZy5kaXZpZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVXaGVyZVlvdUFyZShqdXN0TW92ZWQpIHtcbiAgICAgICAgc3RvcnlMb2cuY2xlYXIoKTtcbiAgICAgICAgdmFyIHJvb20gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJ5b3UuaXNJblwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIllvdXIgaW4gcm9vbSBcIiwgcm9vbSk7XG4gICAgICAgIGlmIChyb29tKSB7XG4gICAgICAgICAgICB2YXIgc2NlbmVyeSA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaGFzU2NlbmVyeVwiKTtcbiAgICAgICAgICAgIGlmIChzY2VuZXJ5KSBzY2VuZXJ5U2VydmljZS5jaGFuZ2Uoc2NlbmVyeSk7XG5cbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaXNOYW1lZFwiKTtcbiAgICAgICAgICAgIHN0b3J5TG9nLmhlYWRpbmcobGFiZWwpO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcm9vbS5yZXNvbHZlVmFsdWUoXCJpc0Rlc2NyaWJlZEFzXCIpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSBzdG9yeUxvZy5sb2coZGVzY3JpcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcnlMb2cubG9nKFwiWW91IGFyZSBub3doZXJlIHRvIGJlIGZvdW5kISBQbGFjZSB5b3VyIGhlcm8gc29tZXdoZXJlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIERlc2NyaWJlIHdoZXJlIHlvdSBhcmUgYXQgdGhlIGJlZ2lubmluZ1xuICAgIGZ1bmN0aW9uIERlc2NyaWJlVGhpbmcodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpbmcucmVzb2x2ZVZhbHVlKFwiaXNEZXNjcmliZWRBc1wiKTtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImhhc0ltYWdlXCIpO1xuICAgICAgICAgICAgaWYgKGltYWdlKSBzdG9yeUxvZy50aGluZ0ltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGlmIChsYWJlbCkgc3RvcnlMb2cuc3ViSGVhZGluZyhsYWJlbCk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHN0b3J5TG9nLmxvZyhkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnkodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSBzdG9yeUxvZy5sb2coXCJZb3UgdG9vayB0aGUgXCIgKyBsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnk6IERlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5LFxuICAgICAgICBEZXNjcmliZVRoaW5nOkRlc2NyaWJlVGhpbmcsXG4gICAgICAgIERlc2NyaWJlV2hlcmVZb3VBcmU6RGVzY3JpYmVXaGVyZVlvdUFyZSxcbiAgICAgICAgTG9nU3RvcnlJbnRyb2R1Y3Rpb246TG9nU3RvcnlJbnRyb2R1Y3Rpb25cbiAgICB9O1xuXG59XG5cblxuXG4iXSwiZmlsZSI6IndyaXRlcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').directive('scenery', SceneryDirective);

function SceneryDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        controllerAs: 'scenery',
        templateUrl: './html/scenery.html',
        controller: SceneryController
    };

    function SceneryController(sceneryService, $element) {
        console.log("screnery directive loader!");

        sceneryService.onChange( function (image) {
            console.log("Changing the scenere: ", image);
            $element.css("background-image", "url(" + image + ")");
            console.log($element);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZXJ5L3NjZW5lcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdzY2VuZXJ5JywgU2NlbmVyeURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIFNjZW5lcnlEaXJlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICB9LFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3NjZW5lcnknLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy4vaHRtbC9zY2VuZXJ5Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBTY2VuZXJ5Q29udHJvbGxlclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBTY2VuZXJ5Q29udHJvbGxlcihzY2VuZXJ5U2VydmljZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY3JlbmVyeSBkaXJlY3RpdmUgbG9hZGVyIVwiKTtcblxuICAgICAgICBzY2VuZXJ5U2VydmljZS5vbkNoYW5nZSggZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5naW5nIHRoZSBzY2VuZXJlOiBcIiwgaW1hZ2UpO1xuICAgICAgICAgICAgJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcInVybChcIiArIGltYWdlICsgXCIpXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il0sImZpbGUiOiJzY2VuZXJ5L3NjZW5lcnkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').directive('splash', SplashDirective);

function SplashDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {
            visible: "=",
            metadata: "="
        },
        controllerAs: 'splash',
        template: '<div class="splash" ng-show="visible"><div class="splash-content" ng-show="visible"><img class="splash-logo" src="/images/logo-253px-onDark.png"><p>v{{ metadata.version }}</p><p>Loading...</p><div></div>',
        controller: SplashController
    };

    function SplashController($timeout, $scope, splashService) {
        $scope.visible = true;

        this.hide = function () {
            $timeout(function () {
                $scope.visible = false;
            }, 1000);
        };

        splashService.register(this);

    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzcGxhc2gvc3BsYXNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmRpcmVjdGl2ZSgnc3BsYXNoJywgU3BsYXNoRGlyZWN0aXZlKTtcblxuZnVuY3Rpb24gU3BsYXNoRGlyZWN0aXZlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHZpc2libGU6IFwiPVwiLFxuICAgICAgICAgICAgbWV0YWRhdGE6IFwiPVwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3NwbGFzaCcsXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInNwbGFzaFwiIG5nLXNob3c9XCJ2aXNpYmxlXCI+PGRpdiBjbGFzcz1cInNwbGFzaC1jb250ZW50XCIgbmctc2hvdz1cInZpc2libGVcIj48aW1nIGNsYXNzPVwic3BsYXNoLWxvZ29cIiBzcmM9XCIvaW1hZ2VzL2xvZ28tMjUzcHgtb25EYXJrLnBuZ1wiPjxwPnZ7eyBtZXRhZGF0YS52ZXJzaW9uIH19PC9wPjxwPkxvYWRpbmcuLi48L3A+PGRpdj48L2Rpdj4nLFxuICAgICAgICBjb250cm9sbGVyOiBTcGxhc2hDb250cm9sbGVyXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFNwbGFzaENvbnRyb2xsZXIoJHRpbWVvdXQsICRzY29wZSwgc3BsYXNoU2VydmljZSkge1xuICAgICAgICAkc2NvcGUudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzcGxhc2hTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMpO1xuXG4gICAgfVxufSJdLCJmaWxlIjoic3BsYXNoL3NwbGFzaC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('splashService', splashService);

function splashService() {
    var splashController;
    var hidden = false;
    console.log("Splash service loaded");

    function hide() {
        hidden = true;
        if (splashController)
            splashController.hide();
    }

    function register(ctrl) {
        splashController = ctrl;
        console.log('splashController', splashController);
        if (hidden) splashController.hide();
    }

    return {
        register: register,
        hide: hide
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzcGxhc2gvc3BsYXNoU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdzcGxhc2hTZXJ2aWNlJywgc3BsYXNoU2VydmljZSk7XG5cbmZ1bmN0aW9uIHNwbGFzaFNlcnZpY2UoKSB7XG4gICAgdmFyIHNwbGFzaENvbnRyb2xsZXI7XG4gICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKFwiU3BsYXNoIHNlcnZpY2UgbG9hZGVkXCIpO1xuXG4gICAgZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNwbGFzaENvbnRyb2xsZXIpXG4gICAgICAgICAgICBzcGxhc2hDb250cm9sbGVyLmhpZGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlcihjdHJsKSB7XG4gICAgICAgIHNwbGFzaENvbnRyb2xsZXIgPSBjdHJsO1xuICAgICAgICBjb25zb2xlLmxvZygnc3BsYXNoQ29udHJvbGxlcicsIHNwbGFzaENvbnRyb2xsZXIpO1xuICAgICAgICBpZiAoaGlkZGVuKSBzcGxhc2hDb250cm9sbGVyLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgICAgIGhpZGU6IGhpZGVcbiAgICB9XG59Il0sImZpbGUiOiJzcGxhc2gvc3BsYXNoU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function() {

angular.module('mindgame').directive('logItem', LogItemDirective);

function LogItemDirective($sce) {
    return {
        restrict: 'E',
        bindToController: {
            type: '=',
            text: '='
        },
        scope: {},
        controllerAs: 'logItem',
        template: '<div class="logItem"></div>',
        controller: LogItemController
    };

    function LogItemController($scope, $element) {
        var self = this;

        $scope.$watch('logItem.text', function(value) {
            $element[0].innerHTML = "<div class='logItem is-" + self.type + "'>" + value + "<div>";
        });

    }
}

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy9sb2dJdGVtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdsb2dJdGVtJywgTG9nSXRlbURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIExvZ0l0ZW1EaXJlY3RpdmUoJHNjZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICc9JyxcbiAgICAgICAgICAgIHRleHQ6ICc9J1xuICAgICAgICB9LFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2xvZ0l0ZW0nLFxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJsb2dJdGVtXCI+PC9kaXY+JyxcbiAgICAgICAgY29udHJvbGxlcjogTG9nSXRlbUNvbnRyb2xsZXJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gTG9nSXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnbG9nSXRlbS50ZXh0JywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICRlbGVtZW50WzBdLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nbG9nSXRlbSBpcy1cIiArIHNlbGYudHlwZSArIFwiJz5cIiArIHZhbHVlICsgXCI8ZGl2PlwiO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxufSkoKTtcbiJdLCJmaWxlIjoic3RvcnlMb2cvbG9nSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {

    angular.module('mindgame').directive('storyLog', StoryLogDirective);

    function StoryLogDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'storyLog',
            //template: '<div class="logItems">{{ userInput.text }}</div>',
            controller: StoryLogController
        };

        function StoryLogController(storyLogService, $scope, $element, $compile, $window) {

            this.clear = function () {
                $element.empty();
                $window.scroll(0, 0);
            };

            this.write = function (text, type) {
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                var logItemEl = $compile('<log-item type="type" text="text"></log-item>')(scope);
                $element.append(logItemEl);
            };

            storyLogService.register(this);

        }
    }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy9zdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdzdG9yeUxvZycsIFN0b3J5TG9nRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIFN0b3J5TG9nRGlyZWN0aXZlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgICAgICByZWFkeTogXCImXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdzdG9yeUxvZycsXG4gICAgICAgICAgICAvL3RlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxvZ0l0ZW1zXCI+e3sgdXNlcklucHV0LnRleHQgfX08L2Rpdj4nLFxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RvcnlMb2dDb250cm9sbGVyXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gU3RvcnlMb2dDb250cm9sbGVyKHN0b3J5TG9nU2VydmljZSwgJHNjb3BlLCAkZWxlbWVudCwgJGNvbXBpbGUsICR3aW5kb3cpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKDAsIDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uICh0ZXh0LCB0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgICAgICBzY29wZS50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICBzY29wZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgbG9nSXRlbUVsID0gJGNvbXBpbGUoJzxsb2ctaXRlbSB0eXBlPVwidHlwZVwiIHRleHQ9XCJ0ZXh0XCI+PC9sb2ctaXRlbT4nKShzY29wZSk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGxvZ0l0ZW1FbCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzdG9yeUxvZ1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiJdLCJmaWxlIjoic3RvcnlMb2cvc3RvcnlMb2cuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        bindToController: {
            question: '=',
            options: '=',
            onChoose: '&'
        },
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController(promptLoop) {
        var self = this;

        promptLoop.onUpdate( function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            if (prompt) {
                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                self.question = prompt.question;
                self.options = prompt.options;
                self.choose = function (value) {
                    prompt.answer(promptLoop, value);
                    promptLoop.update();
                };
            } else {
                console.error("OUPS!!!... no prompt were found!!!");
            }
        });

        this.choose = function (value) {
            //console.log("this.submit!!!", this.text);
            self.onChoose({value: value});
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VyQ2hvaWNlL3VzZXJDaG9pY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCd1c2VyQ2hvaWNlJywgVXNlckNob2ljZURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIFVzZXJDaG9pY2VEaXJlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgcXVlc3Rpb246ICc9JyxcbiAgICAgICAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICAgICAgICAgIG9uQ2hvb3NlOiAnJidcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VyQ2hvaWNlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2h0bWwvdXNlckNob2ljZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogVXNlckNob2ljZUNvbnRyb2xsZXJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gVXNlckNob2ljZUNvbnRyb2xsZXIocHJvbXB0TG9vcCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcHJvbXB0TG9vcC5vblVwZGF0ZSggZnVuY3Rpb24gKHByb21wdExvb3ApIHtcbiAgICAgICAgICAgIC8vIExvYWQgdGhlIGFwcHJvcHJpYXRlIHByb21wdCBhbmQgc2V0dXAgdGhlIHVpIHdpdGggdGhlIHByb21wdFxuICAgICAgICAgICAgdmFyIHByb21wdCA9IHByb21wdExvb3AuY3VycmVudFByb21wdDtcbiAgICAgICAgICAgIGlmIChwcm9tcHQpIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9tcHQgdGhlIHVzZXIgd2l0aCBhIHF1ZXN0aW9uXG4gICAgICAgICAgICAgICAgLy8gdG9kbzogVGhpcyBzaG91bGQgYmUgaW5zaWRlIGEgc29ydCBvZiBSRVBMIHBhdHRlcm4gd2l0aCBhIGhhbmRsZXIgZm9yIGVhY2ggdHlwZXMgb2YgY29udGV4dFxuICAgICAgICAgICAgICAgIHNlbGYucXVlc3Rpb24gPSBwcm9tcHQucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zID0gcHJvbXB0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgc2VsZi5jaG9vc2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0LmFuc3dlcihwcm9tcHRMb29wLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdExvb3AudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9VUFMhISEuLi4gbm8gcHJvbXB0IHdlcmUgZm91bmQhISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hvb3NlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5zdWJtaXQhISFcIiwgdGhpcy50ZXh0KTtcbiAgICAgICAgICAgIHNlbGYub25DaG9vc2Uoe3ZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9O1xuICAgIH1cbn0iXSwiZmlsZSI6InVzZXJDaG9pY2UvdXNlckNob2ljZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').directive('userInput', UserInputDirective);

function UserInputDirective() {
    return {
        restrict: 'E',
        bindToController: {
            text: '=',
            onSubmit: '&'
        },
        scope: {},
        controllerAs: 'userInput',
        template: '<form><input ng-keypress="userInput.keypress($event)" ng-model="userInput.text" type="text" /><button ng-click="userInput.submit()">Go</button></form>',
        controller: UserInputController
    };

    function UserInputController($scope, $element) {
        var self = this;

        this.keypress = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.submit();
            }
        };

        this.submit = function () {
            //console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            $element.find("input")[0].focus();
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VySW5wdXQvdXNlcklucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmRpcmVjdGl2ZSgndXNlcklucHV0JywgVXNlcklucHV0RGlyZWN0aXZlKTtcblxuZnVuY3Rpb24gVXNlcklucHV0RGlyZWN0aXZlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIHRleHQ6ICc9JyxcbiAgICAgICAgICAgIG9uU3VibWl0OiAnJidcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VySW5wdXQnLFxuICAgICAgICB0ZW1wbGF0ZTogJzxmb3JtPjxpbnB1dCBuZy1rZXlwcmVzcz1cInVzZXJJbnB1dC5rZXlwcmVzcygkZXZlbnQpXCIgbmctbW9kZWw9XCJ1c2VySW5wdXQudGV4dFwiIHR5cGU9XCJ0ZXh0XCIgLz48YnV0dG9uIG5nLWNsaWNrPVwidXNlcklucHV0LnN1Ym1pdCgpXCI+R288L2J1dHRvbj48L2Zvcm0+JyxcbiAgICAgICAgY29udHJvbGxlcjogVXNlcklucHV0Q29udHJvbGxlclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBVc2VySW5wdXRDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMua2V5cHJlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnN1Ym1pdCEhIVwiLCB0aGlzLnRleHQpO1xuICAgICAgICAgICAgdGhpcy5vblN1Ym1pdCh7dGV4dDogdGhpcy50ZXh0fSk7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImlucHV0XCIpWzBdLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgfVxufSJdLCJmaWxlIjoidXNlcklucHV0L3VzZXJJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

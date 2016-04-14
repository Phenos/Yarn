yarn.factory('Cursor', function CursorService(Node) {

    function Cursor() {
        this.source = null;
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
        node.source = this.source;

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
        node.source = this.source;
        var lastPreviousNode = this.head().set.last();

        if (lastPreviousNode) {
            if (lastPreviousNode.type === 'instruction' && !this.sequenceBroken) {
                // If the symbol follows an instruction, the value is considered to be "absorbed" as
                // a unique argument by the instruction

                this.sequenceBroken = false;
                this.push(this.head().set.last());
                this.head().set.add(node);
                //this.pop();
            } else if (
                lastPreviousNode.type === 'symbol' &&
                lastPreviousNode.variant === 'reference' &&
                variant === 'value' && !this.sequenceBroken
            ) {
                // If a value symbol follows a reference symbol, the value is added under the symbol
                // to be later use in assigning a value to an assertion
                this.sequenceBroken = false;
                this.push(this.head().set.last());
                this.head().set.add(node);
            } else {
                this.sequenceBroken = false;
                this.head().set.add(node);
            }
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

    Cursor.prototype.endSequence = function () {
        while (this.size() > 1 && !this.head().subSetOpen) {
            this.pop();
        }

        // if the next sequence starts with a value following an instruction
        // this will prevent the value from being "absorbed" by the instruction
        this.sequenceBroken = true;
        return this;
    };


    Cursor.prototype.startSubset = function () {
        this.sequenceBroken = false;
        var node = this.head().set.last();
        this.push(node);

        node.subSetOpen = true;

        return this;
    };
    Cursor.prototype.endSubset = function () {
        while (this.size() > 1 && !this.head().subSetOpen) {
            this.pop();
        }

        // If the node was openned by a subset (parens)
        // We then mark the node as not having an open subset anymore
        if (this.head().subSetOpen) {
            this.head().subSetOpen = false;
        }

        // if the next sequence starts with a value following an instruction
        // this will prevent the value from being "absorbed" by the instruction
        this.sequenceBroken = true;
        return this;
    };


    Cursor.prototype.nextArgument = function () {
        this.sequenceBroken = true;
        if (this.size() > 1) {
            // Pop until you back at a "symbol reference"
            while (this.head().type !== 'instruction') {
                this.pop();
            }
            // Pop one last time to get to the subject of the assertion.
            this.pop();
        }
        return this;
    };

    return Cursor;
});

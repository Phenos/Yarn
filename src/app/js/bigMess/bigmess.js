
function BigMess() {
    this.script = new BigMess.Script();
    this.state = new BigMess.State();
}

(function () {
    "use strict";

    BigMess.prototype.run = function () {
        this.script.run(this.state);
        return this;
    };

    /**
     * Parse a text into various semantic parts to be consumed by BigMess
     * @param text
     */
    BigMess.prototype.load = function (text) {
        this.script.load(text);
        return this;
    };

})();

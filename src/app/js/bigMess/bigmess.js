
function BigMess() {
    this.script = new BigMess.Script();
    this.state = new BigMess.State();
}

(function () {
    "use strict";

    BigMess.prototype.runScript = function () {
        console.log("BigMess.runScript");
        this.script.execute(this.state);
        return this;
    };

    /**
     * Parse a text into various semantic parts to be consumed by BigMess
     * @param text
     */
    BigMess.prototype.load = function (text) {
        this.script.load(text);
    };

})();

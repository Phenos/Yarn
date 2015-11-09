

function BigMess(scriptLoader) {
    this.scriptLoader = scriptLoader;
    this.scripts = [];
    this.state = new BigMess.State();
    this.logic = new BigMess.Logic(this.state, this.scripts);
}

(function () {
    "use strict";

    BigMess.prototype.run = function () {
        var self = this;
        this.scripts.forEach(function (script) {
            script.run(self.state);
        });
        return this;
    };

    /**
     * Parse a text into various semantic parts to be consumed by BigMess
     * @param text
     */
    BigMess.prototype.load = function (text) {
        var script = new BigMess.Script(this.scriptLoader);
        this.scripts.push(script);
        script.load(text);
        return script;
    };

})();

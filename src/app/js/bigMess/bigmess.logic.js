(function () {
    "use strict";

    BigMess.Logic = Logic;

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

    Logic.prototype.routine = function (id) {
        return this.routines[id];
    };



})();


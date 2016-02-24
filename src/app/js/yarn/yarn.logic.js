yarn.service('logic', function () {

    function Logic() {
        this.routines = {};
    }

    Logic.prototype.register = function (id, fn) {
        var self = this;

        function routine() {
            return fn.apply(self, arguments);
        }

        this.routines[id] = routine;
    };

    return new Logic();
});


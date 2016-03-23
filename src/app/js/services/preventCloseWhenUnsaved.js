yarn.service("preventCloseWhenUnsaved", function ($window) {

    function PreventCloseWhenUnsaved() {
        var self = this;
        this.checks = [];

        function checkBeforeUnload(e) {
            var confirmationMessage;
            for (var i = 0; i < self.checks.length && !confirmationMessage; i++) {
                confirmationMessage = self.checks[i]();
            }
            if (confirmationMessage) {
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            }
        }
        $window.addEventListener("beforeunload", checkBeforeUnload);
    }

    PreventCloseWhenUnsaved.prototype.check = function(checkFn) {
        this.checks.push(checkFn);
    };

    return new PreventCloseWhenUnsaved();

});


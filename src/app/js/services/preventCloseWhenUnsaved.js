yarn.service("preventCloseWhenUnsaved", function ($window) {


    function PreventCloseWhenUnsaved() {
        var self = this;
        this.isActive = false;

        $window.addEventListener("beforeunload", function (e) {
            var returnValue;
            if (self.isActive) {
                var confirmationMessage = 'You have unsaved files. Are you sure you want to '
                    + 'close this window and loose those changes ?';
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                returnValue = confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            }
            return returnValue;
        });

    }

    PreventCloseWhenUnsaved.prototype.active = function(newValue) {
        if (angular.isDefined(newValue)) {
            this.isActive = newValue;
        }
        return this.isActive;
    };

    return new PreventCloseWhenUnsaved();

});



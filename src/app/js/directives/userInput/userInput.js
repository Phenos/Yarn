angular.module('yarn').directive('userInput', UserInputDirective);

function UserInputDirective() {
    return {
        restrict: 'E',
        bindToController: {
            text: '=',
            onFocus: '&',
            onEscapeFocus: '&',
            onSubmit: '&'
        },
        scope: {},
        controllerAs: 'userInput',
        templateUrl: './html/userInput.html',
        controller: UserInputController
    };

    function UserInputController($scope, $element, hotkeys) {
        var self = this;

        this.hasFocus = false;

        hotkeys.bindTo($scope)
            .add({
                combo: 'esc',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Focus back to the editor',
                callback: function () {
                    self.toggleFocus();
                }
        });

        this.keypress = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.submit();
                this.focus();
            }
        };

        this.toggleFocus = function () {
            if (this.hasFocus) {
                this.blur();
            } else {
                this.focus();
            }
        };

        this.focus = function () {
            if (!this.hasFocus) {
                console.log("console in!");
                $element.find("textarea")[0].focus();
                this.hasFocus = true;
                this.onFocus();
            }
        };

        this.blur = function () {
            if (this.hasFocus) {
                console.log("console out!");
                $element.find("textarea")[0].blur();
                this.hasFocus = false;
                this.onEscapeFocus();
            }
        };

        this.submit = function () {
            //console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            this.focus();
        };
    }
}
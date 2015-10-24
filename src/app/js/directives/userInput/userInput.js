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
            console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            $element.find("input")[0].focus();
        };
    }
}
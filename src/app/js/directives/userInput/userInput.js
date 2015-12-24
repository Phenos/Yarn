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
        template: '<form><textarea placeholder="Type in your command or script" ng-keypress="userInput.keypress($event)" ng-model="userInput.text"></textarea><button ng-click="userInput.submit()">Run</button></form>',
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
            //console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            $element.find("textarea")[0].focus();
        };
    }
}
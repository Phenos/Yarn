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
        template: '<form ng-submit="userInput.submit()"><input ng-model="userInput.text" type="text"></input><input type="submit"/></form>',
        controller: UserInputController
    };

    function UserInputController($scope, $element) {

        this.submit = function () {
            console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            $element.find("input")[0].focus();
        }
    }
}
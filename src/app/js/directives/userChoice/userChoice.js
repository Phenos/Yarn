angular.module('mindgame').directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        bindToController: {
            question: '=',
            choices: '=',
            onChoose: '&'
        },
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController() {
        var self = this;

        this.choose = function (value) {
            //console.log("this.submit!!!", this.text);
            self.onChoose({value: value});
        };
    }
}
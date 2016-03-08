yarn.directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        bindToController: {
            prompt: "="
        },
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController(promptLoop, soundEffects) {
        var self = this;

        if (self.prompt) {
            // Prompt the user with a question
            self.choose = function (value) {
                soundEffects.tap();
                self.prompt.answer(promptLoop, value);
                promptLoop.update();
            };
        } else {
            console.error("OUPS!!!... no prompt were found!!!");
        }

        promptLoop.update();
    }
}
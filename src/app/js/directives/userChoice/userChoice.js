yarn.directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        bindToController: {},
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController(promptLoop, soundEffects) {
        var self = this;

        promptLoop.onUpdate( function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            if (prompt) {
                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                self.question = prompt.question;
                self.options = prompt.options;
                self.choose = function (value) {
                    soundEffects.tap();
                    prompt.answer(promptLoop, value);
                    promptLoop.update();
                };
            } else {
                console.error("OUPS!!!... no prompt were found!!!");
            }
        });

        promptLoop.update();
    }
}
angular.module('mindgame').directive('userChoice', UserChoiceDirective);

function UserChoiceDirective(ngAudio) {
    return {
        restrict: 'E',
        bindToController: {
            question: '=',
            options: '=',
            onChoose: '&'
        },
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController(promptLoop) {
        var self = this;

        var clickSound = ngAudio.load("./sounds/click.mp3");

        promptLoop.onUpdate( function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            if (prompt) {
                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                self.question = prompt.question;
                self.options = prompt.options;
                self.choose = function (value) {
                    clickSound.play();
                    prompt.answer(promptLoop, value);
                    promptLoop.update();
                };
            } else {
                console.error("OUPS!!!... no prompt were found!!!");
            }
        });

        this.choose = function (value) {
            console.log("onChoose!");
            self.onChoose({value: value});
        };
    }
}
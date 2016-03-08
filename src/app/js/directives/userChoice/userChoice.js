yarn.directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        scope: {
            prompt: "="
        },
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController($scope, promptLoop, soundEffects) {

        if ($scope.prompt) {
            // Prompt the user with a question
            $scope.choose = function (value) {
                soundEffects.tap();
                $scope.prompt.answer(promptLoop, value);
                promptLoop.update();
            };
        } else {
            console.error("OUPS!!!... no prompt were found!!!");
        }

        promptLoop.update();
    }
}
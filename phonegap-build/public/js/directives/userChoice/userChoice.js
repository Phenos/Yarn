yarn.directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        scope: {
            prompt: "="
        },
        template:'<div><h3 ng-if=prompt.question class=question ng-bind=prompt.question></h3><section layout=row layout-align="center center" layout-wrap><md-button ng-repeat="option in prompt.options" ng-class=option._iconStyle ng-click="$event.preventDefault(); choose(option.value);" aria-label=option.label><md-icon ng-if=option.iconId md-svg-icon="/svg-icons/{{ option.iconId }}.svg"></md-icon><span ng-if=!option.iconOnly ng-bind=option.label></span><md-tooltip md-visible=option.tooltipIsVisible md-direction=botton ng-if=option.iconOnly ng-bind=option.label></md-tooltip></md-button></section></div>',
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
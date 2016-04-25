yarn.directive('validatorTool', function CommandsTool(channel) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div layout-fill layout=column class=validator-tool><md-toolbar class=toolsToolbar><div class=md-toolbar-tools><md-button ng-click=update() class=md-icon-button aria-label=Refresh><md-icon md-svg-icon=/svg-icons/refresh.svg></md-icon><md-tooltip>Re-validate</md-tooltip></md-button></div></md-toolbar><md-content flex=grow><md-content flex=70 class=list-of-things><md-list><md-list-item ng-repeat="result in results.all" ng-class="\'type-\' + result.type"><md-icon md-svg-icon=./svg-icons/validation-result-{{result.type}}.svg></md-icon><p>{{ result.message }}</p></md-list-item></md-list></md-content></md-content></div>',
        controller: Controller
    };

    function Controller($scope, validator) {

        $scope.results = validator.results;

        channel.subscribe("validator.results", function (results) {
            $scope.results = results;
        });

        $scope.update = function () {
            validator.run();
            console.log("results", $scope.results);
        };
    }

});


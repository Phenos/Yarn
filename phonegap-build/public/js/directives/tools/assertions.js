yarn.directive('assertionsTool', function AssertionsTool() {

    return {
        restrict: 'E',
        scope: {
            isFocused: "="
        },
        replace: true,
        template:'<div flex=100 layout=column><md-toolbar class=toolsToolbar flex=noshrink><div class=md-toolbar-tools><md-button ng-click=update() class=md-icon-button aria-label=Refresh><md-icon md-svg-icon=./svg-icons/refresh.svg></md-icon><md-tooltip>Refresh</md-tooltip></md-button></div></md-toolbar><div flex=grow layout=column><assertion-grid ng-if=isFocused flex=grow layout=column data=allAssertions></assertion-grid></div></div>',
        controller: function Controller($scope, state, channel) {
            $scope.allAssertions = [];

            channel.subscribe("runtime.afterRun", function () {
                $scope.update();
            });

            $scope.update = function () {
                $scope.allAssertions = state.assertions.all();
//                console.log("updateAssertions", $scope.allAssertions.length);
            };

        }
    };

});


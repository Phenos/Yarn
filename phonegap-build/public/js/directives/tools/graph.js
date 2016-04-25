yarn.directive('graphTool', function CommandsTool(graph) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div layout-fill layout=column><md-toolbar class=toolsToolbar><div class=md-toolbar-tools><md-button ng-click=graph.update() class=md-icon-button aria-label=Refresh><md-icon md-svg-icon=/svg-icons/refresh.svg></md-icon><md-tooltip>Refresh</md-tooltip></md-button><md-button ng-click="graph.model(\'rooms\')" aria-label=Rooms><md-icon md-svg-icon=/svg-icons/exit.svg></md-icon>Rooms<md-tooltip>Rooms</md-tooltip></md-button><md-button ng-click="graph.model(\'containers\')" aria-label=Containers><md-icon md-svg-icon=/svg-icons/container.svg></md-icon>Container<md-tooltip>Container</md-tooltip></md-button></div></md-toolbar><md-content flex=grow><graph thingIsA="\'Space\'" predicate="\'linksTo\'"></graph></md-content></div>',
        controller: Controller
    };

    function Controller($scope) {
        $scope.graph = graph;
    }

});


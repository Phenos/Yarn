yarn.directive('annotationsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div layout-fill layout=column><md-toolbar class=toolsToolbar flex=noshrink><div class=md-toolbar-tools><md-button ng-click=graph.update() class=md-icon-button aria-label=Refresh><md-icon md-svg-icon=./svg-icons/refresh.svg></md-icon><md-tooltip>Refresh</md-tooltip></md-button></div></md-toolbar><md-content flex=grow>Comming soon...</md-content></div>',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});


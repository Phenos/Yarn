yarn.directive('commandsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/commands.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});


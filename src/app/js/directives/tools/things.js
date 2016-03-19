yarn.directive('thingsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/things.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});


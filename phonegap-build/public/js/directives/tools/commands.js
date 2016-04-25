yarn.directive('commandsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div flex=100 layout=row><console on-escape-focus=onConsoleEscapeFocus() on-focus=onConsoleFocus()></console></div>',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});


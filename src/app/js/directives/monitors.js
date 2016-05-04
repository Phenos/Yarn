yarn.directive('monitors', function (monitors) {
    return {
        restrict: 'E',
        scope: {},
        controllerAs: 'monitors',
        templateUrl: './html/monitors.html',
        controller: monitorsController
    };

    function monitorsController() {
        this.monitors = monitors;
    }
});
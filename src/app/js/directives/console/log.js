(function() {

yarn.directive('log', LogDirective);

function LogDirective($sce) {
    return {
        restrict: 'E',
        bindToController: {
            type: '=',
            text: '=',
            step: '=',
            isNewStep: '=',
            timestamp: '='
        },
        scope: {},
        controllerAs: 'log',
        template: '',
        controller: LogController
    };

    function LogController($scope, $element, $compile) {
        var self = this;

        $scope.$watch('log.text', function(value) {
            console.log("timestam", self.timestamp);
            var _time = new Date(self.timestamp);
            self.time = _time.getHours() + ":" + _time.getMinutes();
            $element.addClass("is-" + self.type);

            console.log("isNewStep", self.isNewStep);
            if (self.isNewStep) {
                $element.addClass("isNewStep");
            }

            var elem = $compile("<div><span class='step'>#{{ log.step }}</span><span class='timestamp'>{{ log.time }}</span><span class='text'>" + value + "</span></div>")($scope);
            //console.log("elem: ", elem);
            $element.append(elem);
        });

    }
}

})();

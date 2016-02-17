angular.module('yarn').directive('scenery', SceneryDirective);

function SceneryDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        controllerAs: 'scenery',
        templateUrl: './html/scenery.html',
        controller: SceneryController
    };

    function SceneryController(sceneryService, $element) {
        sceneryService.onChange(function (image) {
            $element.css("background-image", "url(" + image + ")");
        });
    }
}
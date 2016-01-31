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
        //console.log("screnery directive loaded!");

        sceneryService.onChange( function (image) {
            //console.log("Changing the scenere: ", image);
            //console.log($element);
            $element.css("background-image", "url(" + image + ")");
        });
    }
}
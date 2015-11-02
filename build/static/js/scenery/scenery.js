angular.module('mindgame').directive('scenery', SceneryDirective);

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
        console.log("screnery directive loader!");

        sceneryService.onChange( function (image) {
            console.log("Changing the scenere: ", image);
            $element.css("background-image", "url(" + image + ")");
            console.log($element);
        });
    }
}
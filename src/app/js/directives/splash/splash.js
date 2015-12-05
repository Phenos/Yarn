angular.module('mindgame').directive('splash', SplashDirective);

function SplashDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {
            visible: "=",
            metadata: "="
        },
        controllerAs: 'splash',
        template: '<div class="splash" ng-show="visible"><div class="splash-content" ng-show="visible"><img class="splash-logo" src="./images/logo-253px-onDark.png"><p>v{{ metadata.version }}</p><div></div>',
        controller: SplashController
    };

    function SplashController($timeout, $scope, splashService) {
        $scope.visible = true;

        this.hide = function () {
            $timeout(function () {
                $scope.visible = false;
            }, 1000);
        };

        splashService.register(this);

    }
}
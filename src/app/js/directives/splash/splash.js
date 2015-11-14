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
        template: '<div class="splash" ng-show="visible"><div class="splash-content" ng-show="visible"><img class="splash-logo" src="/images/logo-253px-onDark.png"><p>v{{ metadata.version }}</p><p>Loading...</p><div></div>',
        controller: SplashController
    };

    function SplashController($timeout, $scope) {
        $scope.visible = true;

        // todo: Trigger fadeout only when app has finished loading and compiling all initial assets
        $timeout(hide, 1500);

        function hide() {
            $scope.visible = false;
        }
    }
}
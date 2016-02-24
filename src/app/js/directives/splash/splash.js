yarn.directive('splash', SplashDirective);

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
        templateUrl: './html/splash.html',
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
yarn.directive('player', function () {
    return {
        restrict: 'E',
        bindToController: {},
        scope: {},
        controllerAs: 'player',
        templateUrl: './html/player.html',
        controller: playerController
    };

    function playerController($scope, $element, $mdSidenav, sidebar, writers, promptLoop, player) {


        this.onStoryLogClear = function () {
            $element.find("md-content")[0].scrollTop = 0;
            $scope.$broadcast("refreshScrollbars");
        };

        player.register(this);

        this.refresh = function () {
            writers
                .describeWhereYouAre();
            promptLoop.update();
        };

        /*
         Side navigation visibility
         */
        this.openSidenav = function () {
            sidebar.open();
        };

        this.closeSidenav = function () {
            sidebar.close();
        };

    }
});




yarn.directive('player', function (metadata) {
    return {
        restrict: 'E',
        bindToController: {},
        scope: {},
        controllerAs: 'player',
        templateUrl: './html/player.html',
        controller: playerController
    };

    function playerController($scope, $element, writers, promptLoop, player) {


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

        this.metadata = metadata;

        /*
         Side navigation visibility
         */
        this.openSidenav = function () {
            $mdSidenav("leftSidebar").open();
        };

        this.closeSidenav = function () {
            $mdSidenav("leftSidebar").close();
        };

    }
});




yarn.directive('player', function () {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        controllerAs: 'player',
        templateUrl: './html/player.html',
        controller: playerController
    };

    function playerController($scope, $element, sidebar, writers, promptLoop, player) {

        promptLoop.onUpdate(function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            $scope.prompt = prompt;
        });
        promptLoop.update();

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




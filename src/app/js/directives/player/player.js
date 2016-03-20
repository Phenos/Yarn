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

    function playerController($scope,
                              $element,
                              $timeout,
                              sidebar,
                              writers,
                              promptLoop,
                              player,
                              state,
                              easing) {

        var scrollAreaElem = $element[0].getElementsByClassName("player")[0];

        promptLoop.onUpdate(function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            $scope.prompt = prompt;
        });
        promptLoop.update();

        this.onStoryLogClear = function () {
            scrollAreaElem.scrollTop = 0;
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

        this.scroll = function (targetElement) {
            var duration = 1500;
            var offset = 200;

            // First we check to see if it's the first game step
            // to prevent scrolling when first showing the coverpage
            if (state.step() > 0 && targetElement) {
                angular.element(scrollAreaElem)
                    .scrollToElementAnimated(targetElement, offset, duration, function (t) {
                        return t * (2 - t)
                    });
            }
        };

    }


});




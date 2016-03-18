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

        this.scroll = function (offset) {
            // First we check to see if it's the first game step
            // to prevent scrolling when first showing the coverpage
            if (state.step() > 0) {

                var _offset = 600;
                if (!angular.isUndefined(offset)) {
                    _offset = offset;
                }
                //var scrollHeight = scrollAreaElem.scrollHeight + _offset;
                var scrollTop = scrollAreaElem.scrollTop + _offset;
                if (scrollTop > scrollAreaElem.scrollHeight) {
                    scrollTop = scrollAreaElem.scrollHeight;
                }

                angular.element(scrollAreaElem)
                    .scrollTopAnimated(scrollTop, 1250, easing.easeOutQuart())
            }
        };

    }


});




yarn.directive('player', function () {

    var EasingFunctions = {
        // no easing, no acceleration
        linear: function (t) { return t },
        // accelerating from zero velocity
        easeInQuad: function (t) { return t*t },
        // decelerating to zero velocity
        easeOutQuad: function (t) { return t*(2-t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
        // accelerating from zero velocity
        easeInCubic: function (t) { return t*t*t },
        // decelerating to zero velocity
        easeOutCubic: function (t) { return (--t)*t*t+1 },
        // acceleration until halfway, then deceleration
        easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
        // accelerating from zero velocity
        easeInQuart: function (t) { return t*t*t*t },
        // decelerating to zero velocity
        easeOutQuart: function (t) { return 1-(--t)*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
        // accelerating from zero velocity
        easeInQuint: function (t) { return t*t*t*t*t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }

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

        var scrollAreaElem = $element[0].getElementsByClassName("player")[0]

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
                .scrollTopAnimated(scrollTop, 750, EasingFunctions.easeOutQuart())
        };

    }


});




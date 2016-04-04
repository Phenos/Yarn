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
                              postal,
                              sidebar,
                              writers,
                              promptLoop,
                              player,
                              state,
                              smoothScroll,
                              profiles,
                              login) {

        var self = this;

        this.state = state;
        this.profile = profiles.visited();
        this.isOwnProfile = false;

        console.log("profile", this.profile);
        console.log("auth", profiles.authenticated());

        postal.subscribe({
            channel: "profiles",
            topic: "updated",
            callback: function () {
                self.profile = profiles.visited();
                if (self.profile === profiles.authenticated()) {
                    self.isOwnProfile = true;
                }
                console.log("profile", self.profile);
                console.log("auth", profiles.authenticated());
            }
        });


        var scrollAreaElem = $element[0].getElementsByClassName("player")[0];

        promptLoop.onUpdate(function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            $scope.prompt = prompt;
        });
        promptLoop.update();

        this.onStoryLogClear = function () {
            smoothScroll(0, {
                duration: 0,
                offset: 0,
                containerId: 'yarn-player'
            });
            $scope.$broadcast("refreshScrollbars");
        };

        player.register(this);

        this.refresh = function () {
            writers
                .describeWhereYouAre();
            promptLoop.update();
        };

        this.login = function () {
            login();
        }

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
            //console.log("player.scroll", [scrollAreaElem, targetElement]);
            // First we check to see if it's the first game step
            // to prevent scrolling when first showing the coverpage
            if (state.step() > 0 && targetElement) {
                smoothScroll(targetElement[0], {
                    duration: 1500,
                    easing: 'easeInOutQuint',
                    offset: 0,
                    containerId: 'yarn-player'
                });
            }
        };

    }


});




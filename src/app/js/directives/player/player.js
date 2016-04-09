yarn.directive('player', function (channel,
                                   sidebar,
                                   writers,
                                   theme,
                                   promptLoop,
                                   player,
                                   state,
                                   smoothScroll,
                                   profiles,
                                   login) {

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

    function playerController($scope) {

        var self = this;

        this.state = state;
        this.profiles = profiles;
        this.theme = theme;

//        console.log("profile", this.profile);
//        console.log("auth", profiles.authenticated());

        this.profile = null;
        this.isOwnProfile = false;

        this.setProfile = function (profile) {
            if (profile) {

                self.profile = profile;

                if (profiles.authenticated()) {
                    console.log("setProfile", self.profile.username, profiles.authenticated().username);

                    if (self.profile.username === profiles.authenticated().username) {
                        self.isOwnProfile = true;
                    }
                } else {
                    console.log("no auth yet!");
                }
//            console.log("profile", self.profile);
//            console.log("auth", profiles.authenticated());
//            console.log("profiles.updated", self.profile,
//              profiles.authenticated(), self.isOwnProfile);
            }
        };

        channel.subscribe("profiles.updated", function () {
            self.setProfile(profiles.visited());
        });

        this.setProfile(profiles.visited());

        promptLoop.onUpdate(function (_promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            $scope.prompt = _promptLoop.currentPrompt;
        });
        promptLoop.update();

        player.register(this);

        this.refresh = function () {
            writers
                .describeWhereYouAre();
            promptLoop.update();
        };

        this.login = function () {
            login();
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
//            console.log("player.scroll", [scrollAreaElem, targetElement]);
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




yarn.directive('player', function (channel,
                                   sidebar,
                                   writers,
                                   currentTheme,
                                   promptLoop,
                                   player,
                                   state,
                                   lookAroundRoutine,
                                   profiles,
                                   login,
                                   assert) {

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
        this.currentTheme = currentTheme;

        this.scrollbarsConfig = {
            autoHideScrollbar: true,
            theme: 'light',
            advanced: {
                updateOnContentResize: true
            },
            scrollInertia: 500
        };

//        console.log("profile", this.profile);
//        console.log("auth", profiles.authenticated());

        this.profile = null;
        this.isOwnProfile = false;

        this.setProfile = function (profile) {
            if (profile) {

                self.profile = profile;

                if (profiles.authenticated()) {
                    console.log("setProfile",
                        self.profile.username,
                        profiles.authenticated().username);

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
            console.log("player.refresh");

            var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
            if (storyHasEnded) {
                writers.describeTheEnd();
            } else if (state.step() === 0) {
                writers.describeCoverpage();
            } else {
                lookAroundRoutine();
            }

            currentTheme.refresh();
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

        this.scroll = function () {
            // First we check to see if it's the first game step
            // to prevent scrolling when first showing the coverpage
            if (state.step() > 0) {
                    self.updateScrollbar('scrollTo', 10000000);
            }
        };

    }

});




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
                                   assert,
                                   $timeout) {

    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        controllerAs: 'player',
        template:'<div ng-class="\'theme-brightness-\' + player.currentTheme.wallpaper.brightness" style="position: relative" layout-fill layout=column><wallpaper></wallpaper><sidebar></sidebar><toolbar user=player.user></toolbar><div style="z-index: 0" flex=grow layout=column ng-if=player.state.readyness.isReady><div class=player flex=grow><div class=main-ui><story-log on-clear=player.onStoryLogClear()></story-log><context-action-menu></context-action-menu><user-choice prompt=prompt></user-choice><div class=player-footer></div></div></div></div><div style="z-index: 0" flex=grow layout=column ng-if=!player.state.readyness.isReady><div class=player flex=grow ng-scrollbars ng-scrollbars-update=updateScrollbar ng-scrollbars-config=player.scrollbarsConfig><div class=readyness><div style=height:6em></div><div ng-if="player.state.readyness.status === \'loading\'"><md-progress-circular md-diameter=70 md-mode=indeterminate></md-progress-circular><p class=message ng-bind-html=player.state.readyness.message></p></div><div ng-if="player.state.readyness.status === \'choosestory\' && player.profile"><div class=profile-info ng-if=player.profile.twitterProfile><img alt="{{ player.profile.shortUsername }}" ng-src="{{ player.profile.twitterProfile.profile_image_url| biggerProfileImage }}" class=avatar><h3>{{ player.profile.shortUsername }}</h3></div><div ng-if="player.profile.storage.allProjectFolders.length === 0"><div ng-if=player.isOwnProfile><p class=message>You have no projects on Yarn Studio!</p></div><div ng-if="player.profile.twitterProfile === false"><md-icon md-svg-icon=/svg-icons/warning.svg></md-icon><p class=message>Sorry, Could not find a twitter profile for <strong>{{ player.profile.shortUsername }}</strong></p><md-list><md-list-item ng-if=player.profiles.authenticated()><md-button ui-sref="profile({ profile: player.profiles.authenticated().shortUsername })">Back to your profile</md-button></md-list-item></md-list></div><div ng-if="!player.isOwnProfile && player.profile.twitterProfile"><p class=message>Sorry, {{ player.profile.shortUsername }} doesn\'t have any project on YarnStudio!</p><md-list><md-list-item ng-if=player.profiles.authenticated()><md-button ui-sref="profile({ profile: player.profiles.authenticated().shortUsername })">Back to your profile</md-button></md-list-item><md-list-item ng-if=!player.profiles.authenticated()><md-button ui-sref=root()>Back home</md-button></md-list-item></md-list></div></div><div ng-if="player.profile.storage.allProjectFolders.length > 0"><p class=message>To get started, choose a project:</p><md-list><md-list-item ng-repeat="folder in player.profile.storage.projectFolders"><md-button ui-sref="story({ profile: player.profile.shortUsername, story: folder.name })">{{ folder.name }}</md-button></md-list-item><md-list-item ng-if=player.isOwnProfile><md-button ui-sref=createNewProject()><md-icon style="margin-right: 10px;width:20px; height: 20px;" md-svg-icon=/svg-icons/add.svg></md-icon>Create a new project</md-button></md-list-item></md-list></div></div><div ng-if="player.state.readyness.status === \'error\'"><md-icon md-svg-icon=/svg-icons/warning.svg></md-icon><p class=message ng-bind=player.state.readyness.message></p></div><div ng-if="player.state.readyness.status === \'nostory\'"><md-icon md-svg-icon=/svg-icons/warning.svg></md-icon><p class=message>Sorry! Could not find a story project called "{{ player.state.story.id }}"</p><md-list><md-list-item ng-if=player.isOwnProfile><md-button ui-sref="createNewProject({ story: player.state.story.id })">Create a new project called {{ player.state.story.id }}</md-button></md-list-item><md-list-item ng-if=player.profiles.authenticated()><md-button ui-sref="profile({ profile: player.profiles.authenticated().shortUsername })">Back to your profile</md-button></md-list-item><md-list-item ng-if=!player.isOwnProfile><md-button ui-sref="profile({ profile: player.profile.shortUsername })">Back to {{ player.profile.shortUsername }}</md-button></md-list-item></md-list></div><div class=loginfirst ng-if="player.state.readyness.status === \'loginfirst\'"><md-icon md-svg-icon=/svg-icons/twitter.svg></md-icon><p class=message ng-bind-html=player.state.readyness.message></p><md-list><md-list-item><md-button ng-click=player.login();>Login</md-button></md-list-item></md-list></div></div></div></div><status-bar></status-bar></div>',
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
            scrollButtons: {
                enable: false
            },
            advanced: {
                updateOnContentResize: true
            },
            axis: "y",
            scrollInertia: 700
//            scrollInertia: 0
        };

//        console.log("profile", this.profile);
//        console.log("auth", profiles.authenticated());

        this.profile = null;
        this.isOwnProfile = false;

        this.setProfile = function (profile) {
            if (profile) {

                self.profile = profile;

                if (profiles.authenticated()) {
//                    console.log("setProfile",
//                        self.profile.username,
//                        profiles.authenticated().username);

                    if (self.profile.username === profiles.authenticated().username) {
                        self.isOwnProfile = true;
                    }
                } else {
//                    console.log("no auth yet!");
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
//            console.log("player.refresh");

            var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
            if (storyHasEnded) {
                // The story is at the end
                writers.describeTheEnd();
            } else if (state.step() === 0) {
                // The story is at the begining
                writers.describeCoverpage();
            } else {
                // The story is ongoing
                var space = state.one("Player is in *");
                var script = state.one("Player is acting *");
                if (space) {
                    lookAroundRoutine();
                }
                if (script) {

//                    playScriptRoutine();
                    console.warn("Auto-replay script of reload is deactivated")

                }
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
            $timeout(function () {
                // First we check to see if it's the first game step
                // to prevent scrolling when first showing the coverpage
                if (state.step() > 0) {
                    console.warn("Auto scrolling de-activated");
//                    $scope.updateScrollbar('scrollTo', "bottom");
                }
            }, 50);
        };

    }

});




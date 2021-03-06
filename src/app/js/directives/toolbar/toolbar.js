yarn.directive('toolbar', function ToolbarDirective($window,
                                                    session,
                                                    state,
                                                    profiles,
                                                    commands,
                                                    login) {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        replace: true,
        controllerAs: 'toolbar',
        templateUrl: './html/toolbar.html',
        controller: ToolbarController
    };

    function ToolbarController(sidebar, $scope) {

        this.state = state;
        this.visited = profiles.visited();

        if (session.user()) {
            this.user = session.user();
        }

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profileImageURL;
            $scope.username = this.user.displayName;
        }

        this.restartStory = function () {
            commands.run("restart");
        };

        this.undo = function () {
            state.undo();
        };

        this.login = function () {
            login();
        };

        this.openSidebar = function() {
            sidebar.open();
        };

    }
});


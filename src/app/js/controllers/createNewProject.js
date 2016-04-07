yarn.controller('createNewProject', function rootController(user,
                                                            $localStorage,
                                                            $scope,
                                                            $element,
                                                            $state,
                                                            wallpaper,
                                                            login,
                                                            $timeout,
                                                            profiles,
                                                            Profile) {

    if (user) {
        $scope.user = user; // Note: User not yet in a service, resolved in route instead
        profiles.authenticated(new Profile(user.username, user));
    }

    $scope.profiles = profiles;
    $scope.isLoading = false;

    $scope.projectName = "";

    if ($state.params.story) {
        $scope.projectName = $state.params.story;
    }

    wallpaper.change({
        image: "/images/splash/splash-bg.jpg",
        layout: "fullscreen"
    });

    $scope.confirm = function confirm() {
        $scope.isLoading = true;
        $timeout(function () {
            $scope.isLoading = false;
            $scope.error = true;
        }, 2000)
    };

    $scope.login = function confirm() {
        login();
    };

    $scope.tryAgain = function confirm() {
        $scope.error = false;
    };

});

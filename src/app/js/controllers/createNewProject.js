yarn.controller('createNewProject', function rootController(user,
                                                            $localStorage,
                                                            $scope,
                                                            $element,
                                                            $state,
                                                            wallpaper,
                                                            login,
                                                            editorFiles,
                                                            Story,
                                                            $timeout,
                                                            profiles,
                                                            Profile) {

    $scope.profiles = profiles;
    $scope.profile = null;
    $scope.isLoading = false;
    $scope.isSuccess = false;
    $scope.projectName = "";
    var defaultStory;

    var defaultStoryContent = "";

    function success() {
        editorFiles.close(defaultStory);
        defaultStoryContent = defaultStory.content;
    }

    function fail() {
        editorFiles.close(defaultStory);
        console.log("Failed while loading default story");
    }

    var YarnProfile = profiles.get("twitter.YarnStudioGames");
    defaultStory = editorFiles.open(
        YarnProfile, "default-story/story.txt",
        false, null, success, fail);
    var defaultStoryContent = "";


    // Fetch current user
    if (user) {
        $scope.user = user; // Note: User not yet in a service, resolved in route instead
        $scope.profile = profiles.authenticated(new Profile(user.username, user));
    }

    // Prefil the project name in the form
    if ($state.params.story) {
        $scope.projectName = $state.params.story;
    }

    wallpaper.change({
        image: "/images/splash/splash-bg.jpg",
        layout: "fullscreen"
    });

    $scope.confirm = function confirm(scope) {
        $scope.isLoading = true;
//        $timeout(function () {
//            $scope.isLoading = false;
//            $scope.error = true;
//        }, 2000)
        $scope.projectName = scope.projectName;
        var profile = profiles.authenticated();
        var url = $scope.projectName + "/story.txt";
        var newStoryFile = editorFiles.open(profile, url, true);
        console.log("createNewProject.confirm", url, newStoryFile);
        if (!newStoryFile.content) {
            newStoryFile.content = defaultStoryContent;
        }
        profile.storage.save(newStoryFile, function () {
            console.log("SUCCESS!");
            $scope.isLoading = false;
            $scope.isSuccess = true;
        }, function (err) {
            console.log("Error while creating a new project", err);
            $scope.isLoading = false;
            $scope.error = true;
        })

    };

    $scope.login = function confirm() {
        login();
    };

    $scope.tryAgain = function confirm() {
        $scope.error = false;
    };

});

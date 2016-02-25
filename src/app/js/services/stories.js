yarn.factory('stories', StoriesService);

function StoriesService(Story,
                        yConsole,
                        rememberLastStory,
                        gameController) {


    var service = {
        defaultStoryURL: "http://storage.yarnstudio.io/welcome/story.yarn.txt",
        currentStory: null,
        currentUser: null
    };

    service.playDefault = function () {
        var storyURL = rememberLastStory.get() || service.defaultStoryURL;
        gameController.loadFromURL(storyURL);
    };

    // Try to load a story for the current user...
    // if non exists, a default one is created
    service.findOrCreateUserStory = function (user, success, failure) {
        if (user.username) {
            console.log("Finding or creating story for user: ", user);
            Story.findOne({where: {user: user.username}}, function (story) {
                console.log("Story found", story);
                service.currentStory = story;
                service.currentUser = user;
                success(story);
            }, function (err) {
                console.log("No story found", err);
                createDefaultStory(user, success, failure);
            });
        } else {
            if (failure) failure();
            console.log("No user found. No story will be loaded by default.")
        }
    };

    service.createDefaultStory = function (user, success, failure) {
        console.log("Creating default story for user");
        Story.create({
            guid: "123456789",
            username: user.username,
            content: "!!!POTATOE!!!"
        }, function (story) {
            console.log("Default story created: ", story);
            service.currentStory = story;
            service.currentUser = user;
            success(story);
        }, failure);
    };

    service.save = function (success, failure) {
        service.currentStory.$save(
            function (story) {
                console.log("Story saved");
                yConsole.success("Story saved");
                if (success) success(story);
            },
            function (error) {
                yConsole.error("A problem occured while trying to save the story.");
                console.error("A problem occured while trying to save the story.", error);
                if (failure) failure(error);
            }
        )
    };

    return service;

}
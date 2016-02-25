yarn.factory('writers', function (yarn,
                                  yConsole,
                                  storyLog,
                                  state,
                                  sceneryService) {

    // Story welcome message and introduction
    // todo: Output specially styled titles for story and chapters
    function LogStoryIntroduction() {
        var story = state.thing("story");
        var storyTitle = state.resolveValue("story.isNamed");

        if (storyTitle) storyLog.heading(storyTitle);

        var storyDescription = state.resolveValue("story.isDescribedAs");
        if (storyDescription) storyLog.subHeading(storyDescription);
        // todo: Output specially styled separators
        storyLog.divider();
        return this;
    }


    // Describe where you are at the beginning
    function DescribeWhereYouAre() {
        var returnFn;
        if (state.step() === 0) {
            returnFn = describeCoverpage();
        } else {
            returnFn = describeRoom();
        }
        return returnFn;
    }

    function describeCoverpage() {
        var story = state.thing("Story");


        storyLog.clear();

        // Show the story title
        var storyIsCalled = story.resolveValue("isNamed");
        if (storyIsCalled) {
            storyLog.heading(storyIsCalled);
        }

        // Set the scenery
        var scenery = story.resolveValue("hasScenery");
        var coverpage = story.resolveValue("hasCoverpage");
        var scenery_url = scenery && yarn.script.resolveRelativeURI(scenery);
        var coverpage_url = coverpage && yarn.script.resolveRelativeURI(coverpage);
        var url = scenery_url || coverpage_url || false;

        if (url) {
            sceneryService.change(url);
        } else {
            sceneryService.clear();
        }

        if (coverpage) {
            storyLog.image(coverpage_url);
        }

        var description = story.resolveValue("isDescribedAs");
        if (description) {
            storyLog.log("“&nbsp;" + description + "&nbsp;”");
        }

        var author = story.resolveValue("isAuthoredBy");
        if (author) {
            storyLog.log("by " + author);
        }

        return this;
    }

    function describeRoom() {
        storyLog.clear();

        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var scenery = room.resolveValue("hasScenery");
            var url = yarn.script.resolveRelativeURI(scenery);
            if (url) {
                sceneryService.change(url);
            } else {
                sceneryService.clear();
            }

            var label = room.resolveValue("isNamed");
            storyLog.heading(label);
            var description = room.resolveValue("isDescribedAs");
            if (description) storyLog.log(description);
        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
            yConsole.error("Your hero is nowhere to be found!");
            yConsole.tip(
                "For the story to start, you must place you hero in a room.<br/>" +
                "Ex.: #You is in #YourBedroom.");
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThing(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            var description = thing.resolveValue("isDescribedAs");
            var image = thing.resolveValue("hasImage");
            if (image) {
                storyLog.thingImage(
                    yarn.script.resolveRelativeURI(image)
                );
            }
            if (label) storyLog.subHeading(label);
            if (description) storyLog.log(description);
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThingTakenInInventory(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            if (label) storyLog.log("You took the " + label);
        }
        return this;
    }

    return {
        DescribeThingTakenInInventory: DescribeThingTakenInInventory,
        DescribeThing: DescribeThing,
        DescribeRoom: describeRoom,
        DescribeCoverpage: describeCoverpage,
        DescribeWhereYouAre: DescribeWhereYouAre,
        LogStoryIntroduction: LogStoryIntroduction
    };

});






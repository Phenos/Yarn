angular.module('mindgame').factory('writers', writers);

// TODO:  storyLog and state are ASYNC ????

function writers(storyLogService,
                 game,
                 sceneryService) {

    var storyLog = storyLogService;
    var state = game.state;

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
    function DescribeWhereYouAre(justMoved) {
        storyLog.clear();
        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var scenery = room.resolveValue("hasScenery");
            if (scenery) sceneryService.change(scenery);

            var label = room.resolveValue("isNamed");
            storyLog.heading(label);
            var description = room.resolveValue("isDescribedAs");
            if (description) storyLog.log(description);
        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThing(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            var description = thing.resolveValue("isDescribedAs");
            var image = thing.resolveValue("hasImage");
            if (image) storyLog.thingImage(image);
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
        DescribeThing:DescribeThing,
        DescribeWhereYouAre:DescribeWhereYouAre,
        LogStoryIntroduction:LogStoryIntroduction
    };

}




angular.module('mindgame').factory('writers', writers);

// TODO:  storyLog and state are ASYNC ????

function writers(storyLogService,
                 game) {

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
    }


    // Describe where you are at the beginning
    function DescribeWhereYouAre(justMoved) {
        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var label = room.resolveValue("isNamed");
            if (justMoved) {
                storyLog.log("You moved to " + label);
            } else {
                storyLog.log("You are in " + label);
            }
            var description = room.resolveValue("isDescribedAs");
            if (description) storyLog.log(description);
        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
        }
    }

    // Describe where you are at the beginning
    function DescribeThing(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            var description = thing.resolveValue("isDescribedAs");
            if (label) storyLog.log("You look at the " + label);
            if (description) storyLog.log(description);
        }
    }

    // Describe where you are at the beginning
    function DescribeThingTakenInInventory(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            if (label) storyLog.log("You took the " + label);
        }
    }

    return {
        DescribeThingTakenInInventory: DescribeThingTakenInInventory,
        DescribeThing:DescribeThing,
        DescribeWhereYouAre:DescribeWhereYouAre,
        LogStoryIntroduction:LogStoryIntroduction
    };

}




yarn.factory('writers', function (yarn,
                                  assert,
                                  yConsole,
                                  storyLog,
                                  state,
                                  script,
                                  sceneryService) {

    // Describe where you are at the beginning
    function describeWhereYouAre() {
        var returnFn;
        if (state.step() === 0) {
            returnFn = describeCoverpage();
        } else {
            returnFn = describeRoom();
        }
        return returnFn;
    }

    function describeCoverpage() {

        storyLog.clear();

        // Show the story title
        var name = state.resolveValue(assert("Story", "has", "Name"));
        if (name) {
            storyLog.heading(name);
        }

        // Set the scenery
        var scenery = state.resolveValue(assert("Story", "has", "Scenery"));
        var coverpage = state.resolveValue(assert("Story", "has", "Coverpage"));
        var scenery_url = scenery && script.resolveRelativeURI(scenery);
        var coverpage_url = coverpage && script.resolveRelativeURI(coverpage);
        var url = scenery_url || coverpage_url || false;

        if (url) {
            sceneryService.change(url);
        } else {
            sceneryService.clear();
        }

        if (coverpage) {
            storyLog.image(coverpage_url);
        }

        var description = state.resolveValue(assert("Story", "has", "Description"));
        if (description) {
            storyLog.log("“&nbsp;" + description + "&nbsp;”");
        }

        var author = state.resolveValue(assert("Story", "has", "Author"));
        if (author) {
            storyLog.log("by " + author);
        }

        return this;
    }

    function describeRoom() {
        storyLog.clear();

        var room = state.resolveOne(assert("You", "is in"));

        if (room) {
            var scenery = state.resolveValue(assert(room, "has", "Scenery"));
            var url = script.resolveRelativeURI(scenery);
            if (url) {
                sceneryService.change(url);
            } else {
                sceneryService.clear();
            }

            var name = state.resolveValue(assert(room, "has", "Name"));
            if (name) storyLog.heading(name);

            var introduction = state.resolveValue(assert(room, "has", "Introduction"));
            var description = state.resolveValue(assert(room, "has", "Description"));

            if (introduction) {
                storyLog.log(introduction);
            } else if (description) {
                storyLog.log(description);
            }

        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
            yConsole.error("Your hero is nowhere to be found!");
            yConsole.tip(
                "For the story to start, you must place you hero in a room.<br/>" +
                "Ex.: #You is in #YourBedroom.");
        }

        // Before ending, flush the log from any buffered logs
        storyLog.flushBuffers();

        return this;
    }

    // Describe where you are at the beginning
    function describeThing(thing) {
        if (thing) {
            var name = state.resolveValue(assert(thing, "has", "Name"));
            var description = state.resolveValue(assert(thing, "has", "Description"));
            var image = state.resolveValue(assert(thing, "has", "Image"));
            if (image) {
                storyLog.thingImage(
                    script.resolveRelativeURI(image)
                );
            }
            if (name) storyLog.subHeading(name);
            if (description) storyLog.log(description);
        }
        return this;
    }

    // Describe where you are at the beginning
    function nothingHappened() {
        storyLog.log("Nothing happened!");
        return this;
    }

    // Describe where you are at the beginning
    function describeThingTakenInInventory(thing) {
        if (thing) {
            var name = state.resolveValue(assert(thing, "has", "Name"));
            if (name) storyLog.log("You took the " + name);
        }
        return this;
    }

    return {
        nothingHappened: nothingHappened,
        describeThingTakenInInventory: describeThingTakenInInventory,
        describeThing: describeThing,
        describeRoom: describeRoom,
        describeCoverpage: describeCoverpage,
        describeWhereYouAre: describeWhereYouAre
    };

});







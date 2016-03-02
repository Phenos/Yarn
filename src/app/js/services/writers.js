yarn.factory('writers', function (yarn,
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
        var storyIsCalled = state.resolveOne({
            subject: "Story",
            predicate: "isNamed"
        });
        if (storyIsCalled) {
            storyLog.heading(storyIsCalled);
        }

        // Set the scenery
        var scenery = state.resolveOne({
            subject: "Story",
            predicate: "hasScenery"
        });

        var coverpage = state.resolveOne({
            subject: "Story",
            predicate: "hasCoverpage"
        });


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

        var description = state.resolveOne({
            subject: "Story",
            predicate: "isDescribedAs"
        });
        if (description) {
            storyLog.log("“&nbsp;" + description + "&nbsp;”");
        }

        var author = state.resolveOne({
            subject: "Story",
            predicate: "isAuthoredBy"
        });
        if (author) {
            storyLog.log("by " + author);
        }

        return this;
    }

    function describeRoom() {
        storyLog.clear();

        var room = state.resolveOne({
            subject: "You",
            predicate: "isIn"
        });

        //console.log("describing room", room);

        //console.log("Your in room ", room);
        if (room) {
            var scenery = state.resolveOne({
                subject: room.id,
                predicate: "hasScenery"
            });
            var url = script.resolveRelativeURI(scenery);
            if (url) {
                sceneryService.change(url);
            } else {
                sceneryService.clear();
            }

            var label = state.resolveOne({
                subject: room.id,
                predicate: "isNamed"
            });
            storyLog.heading(label);

            var description = state.resolveOne({
                subject: room.id,
                predicate: "isDescribedAs"
            });
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
    function describeThing(thing) {
        if (thing) {
            var label = state.resolveOne({
                subject: thing.id,
                predicate: "isNamed"
            });
            var description = state.resolveOne({
                subject: thing.id,
                predicate: "isDescribedAs"
            });
            var image = state.resolveOne({
                subject: thing.id,
                predicate: "hasImage"
            });

            if (image) {
                storyLog.thingImage(
                    script.resolveRelativeURI(image)
                );
            }
            if (label) storyLog.subHeading(label);
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
            var label = state.resolveOne({
                subject: thing.id,
                predicate: "isNamed"
            });
            if (label) storyLog.log("You took the " + label);
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







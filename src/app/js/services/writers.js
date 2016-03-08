yarn.factory('writers', function (Prompt,
                                  assert,
                                  yConsole,
                                  storyLog,
                                  state,
                                  script,
                                  commands,
                                  sceneryService) {

    // Describe where you are at the beginning
    function describeWhereYouAre() {
        var returnFn;
        var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
        if (storyHasEnded) {
            returnFn = describeTheEnd();
        } else if (state.step() === 0) {
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

    function describeTheEnd() {

        storyLog.clear();

        // Show the story title
        var name = state.resolveValue(assert("TheEnd", "has", "Name"));
        if (name) {
            storyLog.heading(name);
        }

        // Set the scenery
        var scenery = state.resolveValue(assert("TheEnd", "has", "Scenery"));
        var coverpage = state.resolveValue(assert("TheEnd", "has", "Coverpage"));
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

        var description = state.resolveValue(assert("TheEnd", "has", "Description"));
        if (description) {
            storyLog.log("“&nbsp;" + description + "&nbsp;”");
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

    function objectMenu(thing) {
        if (thing) {

            var prompt = new Prompt();

            prompt.answer = function answer(promptLoop, option) {
                commands.command(option);
            };

            var name = state.resolveValue(assert(thing, "has", "Name"));

            var isUsable = state.resolveValue(assert(thing, "is", "Usable"));
            if (isUsable) {
                var option = prompt.option("Use " + name, "use " + thing.id);
                option.iconId = "use";
                option.iconSize = "small";
                option.iconOnly = true;
            }

            var isInventoryItem = state.resolveValue(assert(thing, "is", "InventoryItem"));
            if (isInventoryItem) {
                var option = prompt.option("Take " + name, "take " + thing.id);
                option.iconId = "inventory";
                option.iconSize = "small";
                option.iconOnly = true;
            }

            storyLog.prompt(prompt);
        }

        return this;
    }

    return {
        nothingHappened: nothingHappened,
        describeThingTakenInInventory: describeThingTakenInInventory,
        describeThing: describeThing,
        describeRoom: describeRoom,
        describeCoverpage: describeCoverpage,
        describeTheEnd: describeTheEnd,
        describeWhereYouAre: describeWhereYouAre,
        objectMenu: objectMenu
    };

});







yarn.factory('writers', function (Prompt,
                                  assert,
                                  yConsole,
                                  transcript,
                                  state,
                                  yarnScript,
                                  commands,
                                  currentTheme,
                                  wallpaper,
                                  defaultTexts) {


    function describeCoverpage() {

        currentTheme.refresh();

        // Set the wallpaper
        var coverpage = state.resolveValue(assert("Story", "has", "Coverpage"));
        var coverpage_url = coverpage && yarnScript.resolveRelativeURI(coverpage);

        if (coverpage) {
            transcript.image(coverpage_url);
        }

        // Show the story title
        var name = state.resolveValue(assert("Story", "has", "Name"));
        if (name) {
            transcript.heading(name);
        }

        // Show the headline title
        var headline = state.resolveValue(assert("Story", "has", "Headline"));
        var author = state.resolveValue(assert("Story", "has", "Author"));
        if (author || headline) {
            var headlineAndAuthor = [];
            if (headline) {
                headlineAndAuthor.push("“&nbsp;" + headline + "&nbsp;”");
            }
            if (headline && author) {
                headlineAndAuthor.push("<br/>");
            }
            if (author) {
                headlineAndAuthor.push("by " + author);
            }
            transcript.headline(headlineAndAuthor.join(""));
        }

        var description = state.resolveValue(assert("Story", "has", "Description"));
        if (description) {
            transcript.log(description);
        }


        return this;
    }

    function describeTheEnd() {
        transcript.markAsRead();

        currentTheme.refresh();

        // Show the story title
        var name = state.resolveValue(assert("TheEnd", "has", "Name"));
        if (name) {
            transcript.heading(name);
        }

        // Set the wallpaper
        var coverpage = state.resolveValue(assert("TheEnd", "has", "Coverpage"));
        var coverpage_url = coverpage && yarnScript.resolveRelativeURI(coverpage);

        if (coverpage) {
            transcript.image(coverpage_url);
        }

        var description = state.resolveValue(assert("TheEnd", "has", "Description"));
        if (description) {
            transcript.log("“&nbsp;" + description + "&nbsp;”");
        }

        return this;
    }

    function describeRoom() {
        console.log("describeRoom");

        transcript.markAsRead();

        var room = state.resolveOne(assert("Player", "is in"));

        currentTheme.refresh();

        if (room) {
            var defaultWallpaperValue = state.resolveValue(assert("Story", "has", "Wallpaper"));
            var wallpaperValue = state.resolveValue(assert(room, "has", "Wallpaper"));
            var url = yarnScript.resolveRelativeURI(wallpaperValue || defaultWallpaperValue);
            if (url) {
                wallpaper.change(url);
            } else {
                wallpaper.clear();
            }

            var name = state.resolveValue(assert(room, "has", "Name"));
            if (name) {
                transcript.heading(name);
            }

            var introduction = state.resolveValue(assert(room, "has", "Introduction"));
            var description = state.resolveValue(assert(room, "has", "Description"));

            if (introduction) {
                transcript.log(introduction);
            } else if (description) {
                transcript.log(description);
            }

        } else {
            transcript.log(defaultTexts.get("you-dont-know-where-you-are"));
//            yConsole.error("The player is nowhere to be found!");
            yConsole.tip(
                "For the story to start, you must place the player in a space.<br/>" +
                "Ex.: Player is in the Bedroom.");
        }

        // Before ending, flush the log from any buffered logs
        transcript.flushBuffers();

        return this;
    }

    // Describe where you are at the beginning

    function describeThing(thing) {
        if (thing) {
            var description = state.resolveValue(assert(thing, "has", "Description"));
            var image = state.resolveValue(assert(thing, "has", "Image"));
            if (image) {
                transcript.thingImage(
                    yarnScript.resolveRelativeURI(image)
                );
            }
            if (description) {
                transcript.log(description);
            } else {
                var defaultSeeNothingText =
                    state.resolveValue(assert("Default", "for", "YouSeeNothing"));
                transcript.log(defaultSeeNothingText || "Nothing interesting");
            }
        }
        return this;
    }

    // Describe where you are at the beginning
    function nothingHappened() {
        transcript.log(defaultTexts.get("nothing-happened"));
        return this;
    }

    // Describe where you are at the beginning
    function describeThingTakenInInventory(thing) {
        if (thing) {
            var name = state.resolveValue(assert(thing, "has", "Name"));
            if (name) {
                transcript.action("You take the " + name);
            }
        }
        return this;
    }

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

    function objectMenu(thing) {
        if (thing) {
            var option;
            var prompt = new Prompt();

            prompt.answer = function answer(promptLoop, _option) {
                commands.run(_option);
            };

            var name = state.resolveValue(assert(thing, "has", "Name"));

            var isUsable = state.resolveValue(assert(thing, "is", "Usable"));
            if (isUsable) {
                option = prompt.option("Use " + name, "use " + thing.id);
                option.iconId = "use";
                option.iconSize = "small";
                option.iconOnly = true;
            }

            var isInventoryItem = state.resolveValue(assert(thing, "is", "Inventory Item"));
            if (isInventoryItem) {
                option = prompt.option("Take " + name, "take " + thing.id);
                option.iconId = "inventory";
                option.iconSize = "small";
                option.iconOnly = true;
            }

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







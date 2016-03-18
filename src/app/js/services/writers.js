yarn.factory('writers', function (Prompt,
                                  assert,
                                  yConsole,
                                  storyLog,
                                  state,
                                  script,
                                  commands,
                                  themes,
                                  wallpaper) {

    // Describe where you are at the beginning
    function describeWhereYouAre() {
        var returnFn;
        var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
        if (storyHasEnded) {
            returnFn = describeTheEnd();
        } else if (state.step() === 0) {
            storyLog.clear();
            returnFn = describeCoverpage();
        } else {
            returnFn = describeRoom();
        }
        return returnFn;
    }

    function describeCoverpage() {

        refreshTheme();

        // Set the wallpaper
        var wallpaperValue = state.resolveValue(assert("Story", "has", "Wallpaper"));
        var coverpage = state.resolveValue(assert("Story", "has", "Coverpage"));
        var wallpaper_url = wallpaperValue && script.resolveRelativeURI(wallpaperValue);
        var coverpage_url = coverpage && script.resolveRelativeURI(coverpage);
        var url = wallpaper_url || coverpage_url || false;

        if (url) {
            wallpaper.change(url);
        } else {
            wallpaper.clear();
        }

        if (coverpage) {
            storyLog.image(coverpage_url);
        }

        // Show the story title
        var name = state.resolveValue(assert("Story", "has", "Name"));
        if (name) {
            storyLog.heading(name);
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
            storyLog.headline(headlineAndAuthor.join(""));
        }

        var description = state.resolveValue(assert("Story", "has", "Description"));
        if (description) {
            storyLog.log(description);
        }


        return this;
    }

    function describeTheEnd() {
        storyLog.markAsRead();

        refreshTheme();

        // Show the story title
        var name = state.resolveValue(assert("TheEnd", "has", "Name"));
        if (name) {
            storyLog.heading(name);
        }

        // Set the wallpaper
        var wallpaperValue = state.resolveValue(assert("TheEnd", "has", "Wallpaper"));
        var coverpage = state.resolveValue(assert("TheEnd", "has", "Coverpage"));
        var wallpaper_url = wallpaperValue && script.resolveRelativeURI(wallpaperValue);
        var coverpage_url = coverpage && script.resolveRelativeURI(coverpage);
        var url = wallpaper_url || coverpage_url || false;

        if (url) {
            wallpaper.change(url);
        } else {
            wallpaper.clear();
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

    function refreshTheme(room) {
        var themeId = null;

        if (room) {
            themeId = state.resolveValue(assert(room, "has", "Theme"));
        }
        if (!themeId) {
            themeId = state.resolveValue(assert("Story", "has", "Theme"));
        }
        if (themeId) {
            var theme = themes.select(themeId);
            if (theme && theme.id === themeId) {
                yConsole.log("Theme changed to : " + themeId);
            } else {
                yConsole.warning("Wanted theme not found: " + themeId);
            }
        }
    }

    function describeRoom() {
        storyLog.markAsRead();

        var room = state.resolveOne(assert("You", "is in"));

        refreshTheme(room);

        if (room) {
            var wallpaperValue = state.resolveValue(assert(room, "has", "Wallpaper"));
            var url = script.resolveRelativeURI(wallpaperValue);
            if (url) {
                wallpaper.change(url);
            } else {
                wallpaper.clear();
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
            var description = state.resolveValue(assert(thing, "has", "Description"));
            var image = state.resolveValue(assert(thing, "has", "Image"));
            if (image) {
                storyLog.thingImage(
                    script.resolveRelativeURI(image)
                );
            }
            if (description) {
                storyLog.log(description);
            } else {
                var defaultSeeNothingText = state.resolveValue(assert("Default", "for", "YouSeeNothing"));
                storyLog.log(defaultSeeNothingText || "Nothing interesting");
            }
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
            if (name) storyLog.action("You take the " + name);
        }
        return this;
    }

    function objectMenu(thing) {
        if (thing) {

            var prompt = new Prompt();

            prompt.answer = function answer(promptLoop, option) {
                commands.run(option);
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
        refreshTheme: refreshTheme,
        describeTheEnd: describeTheEnd,
        describeWhereYouAre: describeWhereYouAre,
        objectMenu: objectMenu
    };

});







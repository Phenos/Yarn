yarn.service("takePrompt", function (logic,
                                     writers,
                                     commands,
                                     state) {

    function takePrompt(context) {

        context.when = function () {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo && isAboutTo.id === "take";
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            var thingsThatAreInventory = [];

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isInventoryItem = false;
                var thingsThatAre = thing.resolve("isA");
                thingsThatAre.forEach(function (thing) {
                    if (thing === state.thing("InventoryItem")) isInventoryItem = true;
                });
                if (isInventoryItem) thingsThatAreInventory.push(thing);
            });


            //console.log('thingsInRoom', thingsInRoom);
            if (thingsThatAreInventory.length) {
                thingsThatAreInventory.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, "take " + thing.id);
                });
            }

            var backOption = prompt.option("Back", "back");
            backOption.iconId = "close";
            backOption.iconOnly = true;

        };

        context.answer = function answer(promptLoop, option) {
            logic.routines.aboutTo("");
            if (option) {
                if (option.value !== "back") {
                    commands.command(option.value);
                }
            } else {
                storyLog.error("Sorry, nothing to take here!");
            }

        };

    }

    return takePrompt;
});
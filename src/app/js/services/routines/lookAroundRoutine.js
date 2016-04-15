yarn.service("lookAroundRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            stateHelpers,
                                            yConsole) {

    events.on("Player did Look Around", "after dialogs", function () {
        lookAroundRoutine();
        state.negate(assert("Player", "did", "Look Around"));
    });

    function lookAroundRoutine() {
        var phrase = [];

        yConsole.log("Routine: lookAround");

        // TODO: Use the defaultTexts class for this
        var defaultText = state.resolveValue(assert("Default", "for", "NothingToLookAt"));
        defaultText = defaultText || "You see nothing else.";

        var space = state.resolveOne(assert("Player", "is in"));
        if (space) {
//            console.log("room", room);
            var roomName = state.resolveValue(assert(space, "has", "Name"));
            var roomDescription = state.resolveValue(assert(space, "has", "Description"));
            roomName = roomName || space.id;
            phrase.push("You are at the [" + roomName + ":" + space.id + "]. ");
            if (roomDescription) {
                phrase.push("<br/><br/>");
                phrase.push(roomDescription);
                phrase.push("<br/><br/>");
            }
        }

        var thingsInRoom = stateHelpers.thingsInRoom(space);

        if (thingsInRoom.length || space) {
            if (thingsInRoom.length) {

                phrase.push("You see a ");
                angular.forEach(thingsInRoom, function (thing, index) {
                    var thingName = state.resolveValue(assert(thing, "has", "Name"));
                    thingName = thingName || thing.id;
                    phrase.push("[" + thingName + ":" + thing.id + "]");
                    if (index === thingsInRoom.length - 1) {
                        phrase.push(".")
                    } else if (index === thingsInRoom.length - 2) {
                        phrase.push(" and a ");
                    } else {
                        phrase.push(", ")
                    }
                });

            } else {
                phrase.push(defaultText);
            }

            storyLog.log(phrase.join(""));

        } else {

            storyLog.log(defaultText);

        }

        events.trigger(assert("Player", "have looked at", "Things"));

    }

    return lookAroundRoutine;

});



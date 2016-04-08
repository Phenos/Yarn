yarn.service("lookAroundRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            stateHelpers,
                                            yConsole) {

    events.on("Player did LookAround", "afterDialogs", function () {
        lookAroundRoutine();
    });

    function lookAroundRoutine() {
        var phrase = [];

        yConsole.log("Routine: lookAround");

        // TODO: Use the defaultTexts class for this
        var defaultText = state.resolveValue(assert("Default", "for", "NothingToLookAt"));
        defaultText = defaultText || "You see nothing to look at";

        var room = state.resolveOne(assert("Player", "is in"));
        if (room) {
            var roomName = state.resolveValue(assert(room, "has", "Name"));
            roomName = roomName || room.id;
            phrase.push("You are at the [" + roomName + ":" + room.id + "]. ");
        }

        var thingsInRoom = stateHelpers.thingsInRoom();

        if (thingsInRoom.length || room) {
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

//        stepRoutine();

        return true;
    }

    return lookAroundRoutine;

});



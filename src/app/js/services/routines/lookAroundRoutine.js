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

        var space = state.resolveOne(assert("Player", "is in"));
        if (space) {
//            console.log("room", room);
            var roomName = state.resolveValue(assert(space, "has", "Name"));
            var roomDescription = state.resolveValue(assert(space, "has", "Description"));
            roomName = roomName || space.id;
            if (roomDescription) {
                phrase.push(roomDescription);
                phrase.push("<br/><br/>");
            } else {
                phrase.push("You are at the [" + roomName + ":" + space.id + "]. ");
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

            }

            storyLog.log(phrase.join(""));

        }

        events.trigger(assert("Player", "have looked at", "Things"));

    }

    return lookAroundRoutine;

});



yarn.service("lookAroundRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            stateHelpers,
                                            stepRoutine) {

    return function lookAroundRoutine() {
        var phrase = [];

        storyLog.action("You look around");

        var defaultText = state.resolveValue(assert("Default", "for", "NothingToLookAt"));
        defaultText = defaultText || "You see nothing to look at";

        var room = state.resolveOne(assert("You", "is in"));
        if (room) {
            var roomName = state.resolveValue(assert(room, "has", "Name"));
            roomName = roomName || room.id;
            phrase.push("You are at the [" + roomName + "]. ");
        }

        var thingsInRoom = stateHelpers.thingsInRoom();

        if (thingsInRoom.length || room) {
            if (thingsInRoom.length) {

                phrase.push("You see a ");
                angular.forEach(thingsInRoom, function (thing, index) {
                    var thingName = state.resolveValue(assert(thing, "has", "Name"));
                    thingName = thingName || thing.id;
                    phrase.push("[" + thingName + "]");
                    if (index === thingsInRoom.length - 1) {
                        phrase.push(" and a ");
                    } else if (index < thingsInRoom.length - 1) {
                        phrase.push(", ")
                    } else {
                        phrase.push(".")
                    }
                });

            } else {
                phrase.push(defaultText);
            }

            storyLog.log(phrase.join(""));

        } else {

            storyLog.log(defaultText);

        }

        events.trigger(assert("You", "have looked at", "Things"));

        stepRoutine();

        return true;
    };

});



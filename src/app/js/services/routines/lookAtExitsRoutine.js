yarn.service("lookAtExitsRoutine", function (events,
                                             writers,
                                             assert,
                                             state,
                                             transcript,
                                             stateHelpers) {

    return function lookAtExitsRoutine() {
        var phrase = [];

        transcript.action("You look around for exits");

        var defaultText = state.resolveValue(assert("Default", "for", "NowhereToGo"));
        defaultText = defaultText || "You see nowhere else to go";

        var room = state.resolveOne(assert("Player", "is in"));
        if (room) {
            var roomName = state.resolveValue(assert(room, "has", "Name"));
            roomName = roomName || room.id;
            phrase.push("You are at the [" + roomName + "]. ");
        }

        var doorsInRoom = stateHelpers.doorsInRoom(room);

        if (room) {
            if (doorsInRoom.length) {

                phrase.push("Exits are ");
                angular.forEach(doorsInRoom, function (thing, index) {
                    var doorName = state.resolveValue(assert(thing, "has", "Name"));
                    doorName = doorName || thing.id;
                    var replacement = "[" + doorName + ":" + thing.id + "]";
                    phrase.push(replacement);
                    if (index === doorsInRoom.length - 1) {
                        phrase.push(".")
                    } else if (index === doorsInRoom.length - 2) {
                        phrase.push(" and ");
                    } else {
                        phrase.push(", ")
                    }
                });

            } else {
                phrase.push(defaultText);
            }

            transcript.log(phrase.join(""));

        } else {

            transcript.log(defaultText);

        }

        events.trigger(assert("Player", "has looked at", "Doors"));

        return true;
    };

});



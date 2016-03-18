yarn.service("lookAtExitsRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            stateHelpers,
                                            stepRoutine) {

    return function lookAtExitsRoutine() {
        var phrase = [];

        storyLog.action("You look around for exits");

        var defaultText = state.resolveValue(assert("Default", "for", "NowhereToGo"));
        defaultText = defaultText || "Your see nowhere else to go";

        var room = state.resolveOne(assert("You", "is in"));
        if (room) {
            var roomName = state.resolveValue(assert(room, "has", "Name"));
            roomName = roomName || room.id;
            phrase.push("You are at the [" + roomName + "]. ");
        }

        var exitsInRoom = stateHelpers.exitsInRoom(room);

        if (room) {
            if (exitsInRoom.length) {

                phrase.push("Your can go to the ");
                angular.forEach(exitsInRoom, function (thing, index) {
                    var exitName = state.resolveValue(assert(thing, "has", "Name"));
                    exitName = exitName || thing.id;
                    phrase.push("[" + exitName + "]");
                    if (index === exitsInRoom.length - 1) {
                        phrase.push(".")
                    } else if (index === exitsInRoom.length - 2) {
                        phrase.push(" and the ");
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

        events.trigger(assert("You", "have looked at", "Exits"));

        stepRoutine();

        return true;
    };

});



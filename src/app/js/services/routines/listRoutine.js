yarn.service("listRoutine", function (writers,
                                      assert,
                                      state,
                                      events,
                                      things,
                                      predicates,
                                      storyLog) {

    events.on("Player lists *", "after dialogs", doListRoutine);
    events.on("Player lists *", "prompts", doListRoutine);

    function doListRoutine() {
        listRoutine();
        state.negate(assert("Player", "lists"));
    }


    function listRoutine() {

        var list = state.one("Player lists *");

        if (list) {
            state.createAssertion(
                things.get("Player"),
                predicates("has"),
                things.get("Latest Listing"), {
                    value: list.id
                });
        }

        var listItems = state.many("* is in List", {
            List: list
        });

        listItems = listItems.filter(function (item) {
            var isHidden = state.value("CurrentItem is Hidden", {
                CurrentItem: item
            });
            return !isHidden;
        });

        var label;

        if (listItems.length === 0) {
            label = state.value("List has Empty Label", {
                List: list
            })
        } else {
            label = state.value("List has Listing Label", {
                List: list
            })
        }

        storyLog.action(label);

        angular.forEach(listItems, function (item) {
            var label = state.value("Item has Label", {
                Item: item
            });
            var output = [
                "[", label, ":", item.id, ": Think About ]"
            ].join("");
            storyLog.topic(output);
        });


        return true;
    }

    return listRoutine;

});




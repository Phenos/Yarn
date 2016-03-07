yarn.service('gamePedicates', function (state) {

    return function () {

        var is = state
            .predicate("is")
            .syntax("is a")
            .syntax("is an")
            .syntax("are")
            .syntax("are a")
            .syntax("are an");

        state
            .predicate("isNot")
            .isNegativeOf("is")
            .syntax("is not")
            .syntax("is not a")
            .syntax("is not an")
            .syntax("are not")
            .syntax("are not a")
            .syntax("are not an");

        state
            .predicate("has")
            .syntax("has an")
            .syntax("have")
            .syntax("have a")
            .syntax("have an")
            .syntax("has a");

        state
            .predicate("hasNot")
            .isNegativeOf("has")
            .syntax("has not")
            .syntax("has not an")
            .syntax("have not")
            .syntax("dont have a")
            .syntax("dont have an")
            .syntax("does not have")
            .syntax("does not have a")
            .syntax("does not have an")
            .syntax("doesn't have")
            .syntax("doesn't have a")
            .syntax("doesn't have an")
            .syntax("do not have")
            .syntax("do not have a")
            .syntax("do not have an");

        state
            .predicate("isIn")
            .syntax("is in the")
            .syntax("is inside the")
            .syntax("is at the")
            .syntax("is inside")
            .syntax("is at")
            .syntax("are in the")
            .syntax("are inside the")
            .syntax("are at the")
            .syntax("are in")
            .syntax("are inside")
            .syntax("are at")
            .syntax("is in");

        state
            .predicate("isNotIn")
            .isNegativeOf("isIn")
            .syntax("is not in the")
            .syntax("is not inside the")
            .syntax("is not at the")
            .syntax("is not inside")
            .syntax("is not at")
            .syntax("are not in the")
            .syntax("are not inside the")
            .syntax("are not at the")
            .syntax("are not in")
            .syntax("are not inside")
            .syntax("are not at")
            .syntax("is not in");

        // When something has something else. Ex.: Kitchen has a Kitchen Table
        state
            .predicate("hasInInventory")
            .syntax("has in inventory a")
            .syntax("has in inventory")
            .syntax("has inventory")
            .syntax("have in inventory a")
            .syntax("have in inventory")
            .syntax("have inventory");

        // When a place is linked to another place
        state
            .predicate("linksTo")
            .syntax("goes to")
            .syntax("is open to")
            .syntax("goes to the")
            .syntax("is open to the")
            .syntax("links to the")
            .syntax("links to");

        state
            .predicate("doesNotLinkTo")
            .isNegativeOf("linksTo")
            .syntax("does not go to")
            .syntax("doesn't go to")
            .syntax("is open to")
            .syntax("is not open to")
            .syntax("does not go to the")
            .syntax("doesn't go to the")
            .syntax("is open to the")
            .syntax("is not open to the")
            .syntax("doesn't link to")
            .syntax("does not link to")
            .syntax("doesn't link to the")
            .syntax("does not link to the");


        // Something triggers something else
        state
            .predicate("trigger")
            .syntax("trigger")
            .syntax("triggers");

        // Something triggers something else
        state
            .predicate("doesNotTrigger")
            .isNegativeOf("trigger")
            .syntax("doesn't trigger")
            .syntax("does not trigger");

        /*
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         Create the Action predicates
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         */


        // Something uses something else
        state
            .predicate("use")
            .syntax("use")
            .syntax("uses")
            .syntax("use the")
            .syntax("uses the")
            .syntax("use a")
            .syntax("uses a");

        // Something uses something else
        state
            .predicate("movesTo")
            .syntax("moves to")
            .syntax("moves into")
            .syntax("goes to")
            .syntax("goes into")
            .syntax("moves")
            .syntax("goes")
            .syntax("enters")
            .syntax("enters the")
            .syntax("enters in")
            .syntax("enters into")
            .syntax("enter")
            .syntax("enter the")
            .syntax("enter in")
            .syntax("enter into");

        state
            .predicate("hasLookedAt")
            .syntax("looked at")
            .syntax("has looked at")
            .syntax("have looked at");

        state
            .predicate("take")
            .syntax("took")
            .syntax("has taken")
            .syntax("takes");

        state
            .predicate("say")
            .syntax("says");

    }
});
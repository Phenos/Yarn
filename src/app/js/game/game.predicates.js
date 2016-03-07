yarn.service('gamePedicates', function (state) {

    return function () {

        state
            .predicate("is")
            .syntax("is a")
            .syntax("is an")
            .syntax("are")
            .syntax("are a")
            .syntax("are an");

        state
            .predicate("has")
            .syntax("has an")
            .syntax("have")
            .syntax("have a")
            .syntax("have an")
            .syntax("has a");

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

        /*
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         Create the Action predicates
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         */


        // Something triggers something else
        state
            .predicate("trigger")
            .syntax("trigger")
            .syntax("triggers");

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
            .predicate("take")
            .syntax("took")
            .syntax("has taken")
            .syntax("takes");

        state
            .predicate("say")
            .syntax("says");

    }
});
yarn.service('gamePedicates', function (predicates) {

    return function () {

        predicates("is")
            .syntax("is an")
            .syntax("is a");

        predicates("isNot")
            .isNegativeOf("is")
            .syntax("is not")
            .syntax("is not an")
            .syntax("is not a");

        predicates("has")
            .syntax("has an")
            .syntax("has a");

        predicates("hasNot")
            .isNegativeOf("has")
            .syntax("has not")
            .syntax("has not an")
            .syntax("does not have")
            .syntax("does not have a")
            .syntax("does not have an")
            .syntax("doesn't have")
            .syntax("doesn't have a")
            .syntax("doesn't have an");

        predicates("isIn")
            .syntax("is in the")
            .syntax("is on the")
            .syntax("is inside the")
            .syntax("is at the")
            .syntax("is inside")
            .syntax("is at")
            .syntax("is on")
            .syntax("is in");

        predicates("isActing")
            .syntax("acts")
            .syntax("acts the")
            .syntax("is acting")
            .syntax("is acting the");

        predicates("talksAbout")
            .syntax("asks about")
            .syntax("talks")
            .syntax("asks")
            .syntax("talks about");

        predicates("isNotIn")
            .isNegativeOf("isIn")
            .syntax("is not at the")
            .syntax("is not in the")
            .syntax("is not on the")
            .syntax("is not inside the")
            .syntax("is not inside")
            .syntax("is not at")
            .syntax("is not on")
            .syntax("is not in");

        // When something has something else. Ex.: Kitchen has a Kitchen Table
        predicates("hasInInventory")
            .syntax("has in inventory the")
            .syntax("has in inventory a")
            .syntax("has in inventory")
            .syntax("has inventory");

        // When a place is linked to another place
        predicates("linksTo")
            .syntax("goes to")
            .syntax("is open to")
            .syntax("goes to the")
            .syntax("is open to the")
            .syntax("links to the")
            .syntax("links to");

        predicates("doesNotLinkTo")
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


        predicates("hasAction")
            .syntax("has the action")
            .syntax("has action");

        // Something triggers something else
        predicates("trigger")
            .syntax("trigger")
            .syntax("triggers");

        // Something triggers something else
        predicates("doesNotTrigger")
            .isNegativeOf("trigger")
            .syntax("doesn't trigger")
            .syntax("does not trigger");

        /*
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         Create the Action predicates
         =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
         */


        predicates("use")
            .syntax("use")
            .syntax("uses")
            .syntax("use the")
            .syntax("uses the")
            .syntax("use a")
            .syntax("uses a");

        predicates("movesTo")
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

        predicates("movedTo")
            .syntax("moved to")
            .syntax("moved into")
            .syntax("went to")
            .syntax("went into")
            .syntax("entered")
            .syntax("entered the")
            .syntax("entered in")
            .syntax("entered into");

        predicates("exited")
            .syntax("exited from")
            .syntax("exited from the")
            .syntax("moved out of")
            .syntax("moved out of the");

        predicates("hasLookedAt")
            .syntax("looked at")
            .syntax("has looked at");

        predicates("take")
            .syntax("took the")
            .syntax("has taken the")
            .syntax("takes the")
            .syntax("took")
            .syntax("has taken")
            .syntax("takes");

        predicates("say")
            .syntax("says");

    }
});
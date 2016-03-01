yarn.service('gamePedicates', function (state) {

    return function () {

        state
            .predicate("hasVersion")
            .syntax("has version")
            .syntax("version")
            .syntax("is version")
            .isUniqueSubject(true);
/*
// todo: Allow defining predicates in Yarn Script

HasVersion
    is a Predicate,
    is a UniqueSubject
    is titled "Version",
    is described as "Set a version number. Typically used on a Story.
    has syntax "has version",
    has syntax "version",
    has syntax "is version".

//todo: But ultimately, this should be an Attribute like so

Version
    is an Attribute,
    is titled "Version",
    is Mandatory,
    is described as "A version number. Typically used on a Story.

Story has a Version.

 */
        state
            .predicate("hasCoverpage")
            .syntax("has coverpage")
            .syntax("coverpage")
            .isUniqueSubject(true);

        state
            .predicate("isAuthoredBy")
            .syntax("is created by")
            .syntax("is authored by")
            .isUniqueSubject(true);

        // How many steps have been take (game cycle steps)
        state
            .predicate("hasStepped")
            .syntax("have stepped")
            .syntax("has stepped")
            .isUniqueSubject(true);

        // The Action the user what about to make (ex.: Move, Look, etc)
        state
            .predicate("isAboutTo")
            .syntax("are about to")
            .syntax("is about to")
            .isUniqueSubject(true);

        // What something is of a kind
        state
            .predicate("isA")
            .syntax("are an")
            .syntax("are a")
            .syntax("is an")
            .syntax("is a");
/*

IsA is a Predicate,
    has syntax "are an",
    has syntax "are a",
    has syntax "is an",
    has syntax "is a".

*/
        // What something is of a kind
        state
            .predicate("hasScenery")
            .syntax("has scenery")
            .isUniqueSubject(true);

        state
            .predicate("hasImage")
            .syntax("has image")
            .isUniqueSubject(true);

        // What something is called
        state
            .predicate("isNamed")
            .syntax("are titled")
            .syntax("are named")
            .syntax("are called")
            .syntax("is titled")
            .syntax("is named")
            .syntax("is called")
            .isUniqueSubject(true);

        // What something is described as when looked at
        state
            .predicate("isDescribedAs")
            .syntax("are described")
            .syntax("are described as")
            .syntax("is described")
            .syntax("is described as")
            .isUniqueSubject(true);

        state
            .predicate("isAlsoDescribedAs")
            .syntax("are also described")
            .syntax("are also described as")
            .syntax("is also described")
            .syntax("is also described as")
            .isUniqueSubject(true);

        // When something is in a place
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
            .syntax("is in")
            .isUniqueSubject(true);

        //todo: Bring back "contains" either when when "reverse" assertions are possible
        //      or with a better model for "what' in what"
        //      untile then user "is in"
        /*
        // When something has something else. Ex.: Kitchen has a Kitchen Table
        state
            .predicate("hasInIt")
            .syntax("contains")
            .syntax("contains a")
            .syntax("contains the")
            .syntax("has in it the")
            .syntax("has in it a")
            .syntax("has in it")
            .syntax("has a");
        */

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

        // When a place is linked to another place
        state
            .predicate("this")
            .syntax("that")
            .syntax("the");

        state
            .predicate("isUsable")
            .syntax("are usable")
            .syntax("are usable with")
            .syntax("is usable")
            .syntax("is usable with")
            .syntax("can be used")
            .syntax("can be used with");


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
            .syntax("enters into");

        state
            .predicate("take")
            .syntax("took")
            .syntax("has taken")
            .syntax("takes");

    }
});
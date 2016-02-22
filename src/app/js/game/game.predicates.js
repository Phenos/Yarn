"use strict";
angular.module('yarn').factory('gamePedicates', function () {
    return gamePedicates;
});

function gamePedicates(game) {
    var state = game.state;


    state
        .predicate("hasVersion")
        .syntax("has version")
        .syntax("version")
        .syntax("is version")
        .isUniqueSubject(true);

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
    var hasStepped = state
        .predicate("hasStepped")
        .syntax("has stepped")
        .isUniqueSubject(true);

    // The Action the user what about to make (ex.: Move, Look, etc)
    var isAboutTo = state
        .predicate("isAboutTo")
        .syntax("is about to")
        .isUniqueSubject(true);

    // What something is of a kind
    state
        .predicate("isA")
        .syntax("is an")
        .syntax("is a");

    // What something is of a kind
    state
        .predicate("hasScenery")
        .syntax("has scenery");

    state
        .predicate("hasImage")
        .syntax("has image");

    // What something has an attribute
    state
        .predicate("is")
        .syntax("is");

    // What something is called
    var isCalled = state
        .predicate("isNamed")
        .syntax("is titled")
        .syntax("is named")
        .syntax("is called");
    isCalled.uniqueSubject = true;

    // What something is described as when looked at
    var isDescribedAs = state
        .predicate("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");
    isDescribedAs.uniqueSubject = true;

    var isAlsoDescribedAs = state
        .predicate("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");
    isAlsoDescribedAs.uniqueSubject = true;

    // When something is in a place
    var isIn = state
        .predicate("isIn")
        .syntax("is in the")
        .syntax("is inside the")
        .syntax("is at the")
        .syntax("is in")
        .syntax("is inside")
        .syntax("is at")
        .syntax("are in the")
        .syntax("are inside the")
        .syntax("are at the")
        .syntax("are in")
        .syntax("are inside")
        .syntax("are at");
    isIn.uniqueSubject = true;

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInIt")
        .syntax("has in it the")
        .syntax("has in it a")
        .syntax("has a");

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInInventory")
        .syntax("has in inventory a")
        .syntax("has in inventoy")
        .syntax("has inventoy");

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


    /*
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     Create the Action predicates
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     */


    // Something uses something else
    state
        .predicate("use", "action")
        .syntax("use")
        .syntax("uses")
        .syntax("use the")
        .syntax("uses the")
        .syntax("use a")
        .syntax("uses a");

    // Something uses something else
    state
        .predicate("movesTo", "action")
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

}
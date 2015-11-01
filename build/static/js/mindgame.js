"use strict";

function MindGame () {

    this.bigMess = new BigMess();

    createDescriptivePredicates(this.bigMess.state);
    createActionPredicates(this.bigMess.state);
    defineKinds(this.bigMess.state);
}

MindGame.prototype.load = function (text) {
    return this.bigMess.load(text);
    //return this;
};

function defineKinds(state) {
    // Player
    state
        .thing("player");

    // Persons
    state
        .thing("person");

    // Places
    state
        .thing("room");

    // Objects (as in "object" in the game)
    state
        .thing("object");
}

function createDescriptivePredicates(state) {

    // What something is of a kind
    state
        .predicate("isAuthoredBy")
        .syntax("is created by")
        .syntax("is authored by");

    // The Action the user what about to make (ex.: Move, Look, etc)
    state
        .predicate("isAboutTo")
        .syntax("is about to");

    // What something is of a kind
    state
        .predicate("isA")
        .syntax("is an")
        .syntax("is a");

    // What something has an attribute
    state
        .predicate("is")
        .syntax("is");

    // What something is called
    state
        .predicate("isNamed")
        .syntax("is titled")
        .syntax("is named")
        .syntax("is called");

    // What something is described as when looked at
    state
        .predicate("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");

    state
        .predicate("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");

    // When something is in a place
    state
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
}

function createActionPredicates(state) {

    // Something uses something else
    state
        .predicate("use", "action")
        .syntax("use")
        .syntax("uses")
        .syntax("use the")
        .syntax("uses the")
        .syntax("use a")
        .syntax("uses a");

}
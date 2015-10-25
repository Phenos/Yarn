"use strict";

function MindGame () {

    this.bigMess = new BigMess();

    createPredicates(this.bigMess.state);
    defineKinds(this.bigMess.state);
}

MindGame.prototype.load = function (text) {
    return this.bigMess.load(text);
    //return this;
};

function defineKinds(state) {
    // Player
    state
        .t("player");

    // Persons
    state
        .t("person");

    // Places
    state
        .t("room");

    // Objects (as in "object" in the game)
    state
        .t("object");
}

function createPredicates(state) {

    // What something is of a kind
    state
        .p("isAuthoredBy")
        .syntax("is created by")
        .syntax("is authored by");

    // What something is of a kind
    state
        .p("isA")
        .syntax("is a")
        .syntax("is an");

    // What something has an attribute
    state
        .p("is")
        .syntax("is");

    // What something is called
    state
        .p("isNamed")
        .syntax("is titled")
        .syntax("is called")
        .syntax("is named");

    // What something is described as when looked at
    state
        .p("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");

    state
        .p("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");

    // When something is in a place
    state
        .p("isIn")
        .syntax("is in the")
        .syntax("is inside the")
        .syntax("is at the")
        .syntax("is in")
        .syntax("is inside")
        .syntax("is at");

    // When a place is linked to another place
    state
        .p("linksTo")
        .syntax("goes to")
        .syntax("is open to")
        .syntax("links to")
        .syntax("goes to the")
        .syntax("is open to the")
        .syntax("links to the");

    // When a place is linked to another place
    state
        .p("this")
        .syntax("that")
        .syntax("the");
}


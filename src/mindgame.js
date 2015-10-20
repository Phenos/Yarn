"use strict";

function MindGame () {

    this.bigMess = new BigMess();

    createPredicates(this.bigMess);
    defineKinds(this.bigMess);
}

MindGame.prototype.parse = function (text) {
    this.bigMess.parse(text);
    return this;
};

function defineKinds(bigMess) {
    // Player
    bigMess
        .t("player");

    // Persons
    bigMess
        .t("person");

    // Places
    bigMess
        .t("room");

    // Objects (as in "object" in the game)
    bigMess
        .t("object");
}

function createPredicates(bigMess) {

    // What something is of a kind
    bigMess
        .p("isAuthoredBy")
        .syntax("is created by")
        .syntax("is authored by");

    // What something is of a kind
    bigMess
        .p("isA")
        .syntax("is a");

    // What something has an attribute
    bigMess
        .p("is")
        .syntax("is");

    // What something is called
    bigMess
        .p("isNamed")
        .syntax("is titled")
        .syntax("is called")
        .syntax("is named");

    // What something is described as when looked at
    bigMess
        .p("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");

    bigMess
        .p("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");

    // When something is in a place
    bigMess
        .p("isIn")
        .syntax("is in the")
        .syntax("is inside the")
        .syntax("is at the")
        .syntax("is in")
        .syntax("is inside")
        .syntax("is at");

    // When a place is linked to another place
    bigMess
        .p("linksTo")
        .syntax("goes to")
        .syntax("is open to")
        .syntax("links to")
        .syntax("goes to the")
        .syntax("is open to the")
        .syntax("links to the");

}


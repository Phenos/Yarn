"use strict";

var theHouse = new MindGame();

var m = theHouse.bigMess;

var storyText = document.getElementById("TheHouse").innerText;
theHouse.parse(storyText);


var room = m.t("player").a("isIn");
log("You are in " + room.a("isNamed").text());
log("You look around: ");
log(room.a("isDescribedAs").text());
log(">");


function log(text) {
    console.log(text)
}

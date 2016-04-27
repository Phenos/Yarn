/*

 Generate a coherently eucledian maze using narrative notions without
 deterministic positions of rooms and passages

 */

var roomCounter = 0;

function Rooms() {
    this.rooms = [];
}

Rooms.prototype.generate = function (count) {
    var room;

    for (var i = 0; i < count; i++) {
        room = new Room();
        this.rooms.push(room)
    }
};

function Room() {
    this.id = roomCounter++;
    this.exits = [];
}


/*

 Generate and output a maze

 */
var rooms = new Rooms();
rooms.generate(7);

// Add cardinal constraints
rooms.rooms.forEach(function (room) {
    
});

// Output the rooms
rooms.rooms.forEach(function (room) {
    console.log("ROOM #" + room.id);
    console.log("");
});


yarn.service("things", function (Thing) {

    var allThings = {};

    function things(_id, dontAutoCreate) {
        var thing = null;
        if (_id) {
            var id = _id.toLowerCase();
            thing = allThings[id];
            if (!thing) {
                if (dontAutoCreate) {
                    thing = null;
                } else {
                    thing = new Thing(id);
                    thing.label(_id);
                    allThings[id] = thing;
                }
            }

        }

        return thing;
    }

    return things;
});
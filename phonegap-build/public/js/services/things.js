yarn.service("things", function (Thing) {

    function Things() {
        this.all = {};
    }

    Things.prototype.get = function (_id, dontAutoCreate) {
        var thing = null;
        if (_id) {
            // Sanitize the id
            var id = _id.toLowerCase().replace(/ /g, "_");
            thing = this.all[id];
            if (!thing) {
                if (dontAutoCreate) {
                    thing = null;
                } else {
                    thing = new Thing(id);
                    thing.label(_id);
                    this.all[id] = thing;
                }
            }

        }

        return thing;
    };

    return new Things();
});
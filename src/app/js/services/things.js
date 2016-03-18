yarn.service("things", function (Thing) {

    function Things() {
        this.all = {};
    }

    Things.prototype.get = function (_id, dontAutoCreate) {
        var thing = null;
        if (_id) {
            var id = _id.toLowerCase();
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
yarn.service('Thing', function ThingService() {

    /**
     * A "thing" in the graph
     * @param _id
     * @constructor
     */
    function Thing(_id) {
        this.id = _id.toLowerCase();
    }

    /**
     * Return this thing as text (string)
     * @returns {*}
     */
    Thing.prototype.text = function () {
        return this.id;
    };

    return Thing;
});

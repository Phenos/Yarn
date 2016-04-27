yarn.service('Thing', function ThingService() {

    /**
     * A "thing" in the graph
     * @param {String} id Unique Id of the object
     * @constructor
     */
    function Thing(id) {
        // Sanitize the id
        this.id = id.toLowerCase().replace(/ /g, "_");
        this._text = this.text();
    }

    Thing.prototype.label = function (value) {
        if (!angular.isUndefined(value)) {
            this._label = value;
            this._text = this.text();
        }
        return this._label;
    };

    /**
     * Return this thing as text (string)
     * @returns {String} A text representing the object (either the label or its Id)
     */
    Thing.prototype.text = function () {
        return this._label || this.id;
    };

    return Thing;
});

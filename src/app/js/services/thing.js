yarn.service('Thing', function ThingService() {

    /**
     * A "thing" in the graph
     * @param _id
     * @constructor
     */
    function Thing(_id) {
        this.id = _id.toLowerCase();
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
     * @returns {*}
     */
    Thing.prototype.text = function () {
        return this._label || this.id;
    };

    return Thing;
});

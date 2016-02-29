yarn.factory('Assertion', function (layerSetup, postal) {

    /**
     * An assertion about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @param layer
     * @param parent
     * @param value
     * @constructor
     */
    function Assertion(subject, predicate, object, options) {
        var options = options || {};
        this.subject = subject || null;
        this.predicate = predicate || null;
        this.object = object || null;
        this.layer = options.layer || null; // The id of a layer
        this._value = true; // A value (true, false)
        this.parent = options.parent || null; // A parent object

        this.value(options.value);
    }

    Assertion.prototype.id = function () {
        var obj = this.toJSON();
        return [obj.subject, obj.predicate, obj.object, obj.layer, obj.group].join("-");
    };

    /**
     * Output a assesions as JSON
     * @returns {{}}
     */
    Assertion.prototype.toJSON = function () {
        return {
            subject: (this.subject && this.subject.id) || "x",
            predicate: (this.predicate && this.predicate.id) || "x",
            object: (this.object && this.object.id) || "x",
            layer: this.layer || "x",
            group: (this.group && this.group.id) || "x"
        }
    };


    /**
     * Set and get the value of the assertion
     * @param value
     * @returns {Assertion}
     */
    Assertion.prototype.value = function (value) {
        if (!angular.isUndefined(this._value)) this.value = value;

        postal.publish({
            channel: "state",
            topic: "setAssertion",
            data: this
        });

        return this.value;
    };

    Assertion.prototype.isUniqueAndFalse = function () {
        var value;
        value = (
            this.predicate.uniqueSubject &&
            this.value(layerSetup) === false
        );
        return value;
    };

    return Assertion;
})
;


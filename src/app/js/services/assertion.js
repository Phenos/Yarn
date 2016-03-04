yarn.factory('Assertion', function (layerSetup,
                                    postal,
                                    weightAssertion) {

    /**
     * An assertion about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @param options
     * @constructor
     */
    function Assertion(subject, predicate, object, options) {
        var _options = options || {};
        this.subject = subject || null;
        this.predicate = predicate || null;
        this.object = object || null;
        this.layer = _options.layer || null; // The id of a layer
        this._value = true; // A value (true, false)
        this.parent = _options.parent || null; // A parent object

        this.value(options.value);

        //console.log("created Assertion", this);
    }

    Assertion.prototype.id = function () {
        var obj = this.toJSON();
        return [obj.subject, obj.predicate, obj.object, obj.layer, obj.parent].join("-");
    };

    /**
     * Output a assesions as JSON
     * @returns {{}}
     */
    Assertion.prototype.toJSON = function () {
        function idOrValue(obj) {
            var value = "";
            if (!angular.isUndefined(obj)) {
                if (typeof(obj) === "object" && obj !== null) {
                    value = "@id:" + obj.id;
                } else {
                    value = obj;
                }
            }
            return value;
        }

        return {
            subject: idOrValue(this.subject),
            predicate: idOrValue(this.predicate.id),
            object: idOrValue(this.object),
            layer: this.layer || "",
            parent: idOrValue(this.parent),
            value: this.value()
        }
    };


    /**
     * Set and get the value of the assertion
     * @param value
     * @returns {Assertion}
     */
    Assertion.prototype.value = function (value) {
        if (!angular.isUndefined(value)) {
            this._value = value;

            postal.publish({
                channel: "state",
                topic: "setAssertion",
                data: this
            });

        }
        return this._value;
    };

    Assertion.prototype.weight = function () {
        return weightAssertion(this);
    };

    Assertion.prototype.isUniqueAndFalse = function () {
        var value = (
            this.predicate.uniqueSubject &&
            this.value() === false
        );
        return value;
    };

    return Assertion;
})
;


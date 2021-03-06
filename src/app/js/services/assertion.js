yarn.service('Assertion', function (layerSetup,
                                    channel,
                                    weightAssertion) {

    var internalCounter = 0;

    /**
     * An assertion about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @param options
     * @constructor
     */
    function Assertion(subject, predicate, object, options) {
        //console.log("options.source", options.source);
        var _options = options || {};
        internalCounter = internalCounter + 1;
        this.source = _options.source || null;
        this.creationIndex = internalCounter;
        this.subject = subject || null;
        this.predicate = predicate || null;
        this.object = object || null;
        this.layer = _options.layer || null; // The id of a layer
        this._value = true; // A value (true, false)
        this.parent = _options.parent || null; // A parent object

        if (angular.isDefined(_options.evaluatedValue)) {
            console.log("=====evaluatedValue", _options.evaluatedValue);
            this.value(_options.evaluatedValue);
        } else {
            //console.log("=====standard", _options.value);
            this.value(_options.value);
        }

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

    Assertion.prototype.clone = function () {
        var clone = new Assertion(this.subject, this.predicate, this.object);
        clone.value(this.value());
        clone.layer = this.layer;
        clone.parent = this.parent;
        return clone;
    };

    /**
     * Set and get the value of the assertion
     * @param value
     * @returns {Assertion}
     */
    Assertion.prototype.value = function (value) {
        if (!angular.isUndefined(value)) {
            this._value = value;

            channel.publish("state.setAssertion", this);

        }
        return this._value;
    };

    Assertion.prototype.weight = function () {
        return weightAssertion(this);
    };

    Assertion.prototype.pojo = function () {
        return this.toJSON();
    };

    return Assertion;
})
;


yarn.service("assert", function (things,
                                 predicates) {

    function assert(subject, predicate, object, valueOrOptions) {
        var options;

        if (!angular.isObject(valueOrOptions)) {
            options = {
                value: valueOrOptions
            }
        } else {
            options = valueOrOptions
        }

        var c = {
            subject: subject,
            predicate: predicate,
            object: object
        };

        if (!options.hasOwnProperty("parent")) {
            c.parent = null;
        } else {
            c.parent = options.parent;
        }

        ensureIsThing(c, "subject");
        ensureIsPredicate(c, "predicate");
        ensureIsThing(c, "object");
        ensureIsThing(c, "parent");

        if (angular.isDefined(options.value)) {
            c.value = options.value;
        }
        if (angular.isDefined(options.layer)) {
            c.layer = options.layer;
        }

        return c;
    }

    function ensureIsThing(obj, attribute) {
        if (angular.isDefined(obj[attribute])) {
            if (typeof(obj[attribute]) === "string") {
                obj[attribute] = things.get(obj[attribute]);
            }
        }
        return obj[attribute];
    }

    function ensureIsPredicate(obj, attribute) {
        if (angular.isDefined(obj[attribute])) {
            if (typeof(obj[attribute]) === "string") {
                obj[attribute] = predicates(obj[attribute]);
            }
        }
        return obj[attribute];
    }

    return assert;
});
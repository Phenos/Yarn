yarn.service("assert", function(state) {

    function assert(subject, predicate, object, value) {
        var c = {
            subject: subject,
            predicate: predicate,
            object: object
        };
        if (angular.isDefined(value)) {
            c.value = value;
        }
        if (angular.isDefined(c.subject)) {
            if (typeof(c.subject) === "string") {
                c.subject = state.thing(c.subject);
            }
        }
        if (angular.isDefined(c.object)) {
            if (typeof(c.object) === "string") {
                c.object = state.thing(c.object);
            }
        }
        if (angular.isDefined(c.predicate)) {
            if (typeof(c.predicate) === "string") {
                c.predicate = state.predicate(c.predicate);
            }
        }
        return c;
    }

    return assert;

});
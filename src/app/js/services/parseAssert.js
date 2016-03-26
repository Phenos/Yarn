yarn.service("parseAssert", function (assert) {
    return function parseAssert(assertion, scope) {
        var _scope = scope || {};

        _scope["*"] = undefined;

        var tokens = assertion.split(" ");

        var subject = applyScope(tokens.shift());
        var object = applyScope(tokens.pop());
        var predicate = applyScope(tokens.join(" "));

        function applyScope(token) {
            var value = token;
            if (_scope.hasOwnProperty(token)) value = _scope[token];
            return value;
        }

        return assert(subject, predicate, object);
    }
});
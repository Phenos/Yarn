yarn.service("parseAssert", function (assert) {
    return function parseAssert(assertion, scope) {
        var newAssert = null;
        // First we check if the assertion argument is already an object
        if (angular.isObject(assertion)) {
            newAssert = assertion;
        } else {
            var _scope = scope || {};

            _scope["*"] = void 0; // Get undefined value

            var assertionParthRegEx = /(\*)|([@A-Z][a-z_A-Z0-9]*[\s]*)+|([a-z_0-9]*[\s]*)+/g;
            var tokens = assertion.match(assertionParthRegEx);
            tokens.pop(); // Remove an extra empty match (dont know why it there)

            var subject = applyScope(tokens.shift());
            var object = applyScope(tokens.pop());
            var predicate = applyScope(tokens.join(" "));


            function applyScope(token) {
                var _token = token.trim();
                var value = token.trim();
                if (_scope.hasOwnProperty(_token.trim())) {
                    value = _scope[_token];
                }
                return value;
            }
            newAssert = assert(subject, predicate, object)
        }

        return newAssert;
    }
});
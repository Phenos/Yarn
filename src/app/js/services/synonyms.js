yarn.service("synonyms", function (assert, things) {

    function Synonyms() {
        this.all = {};
    }

    Synonyms.prototype.add = function (object, text) {
        var self = this;
        if (angular.isString(text)) {
            var tokens = text.split(",");
            angular.forEach(tokens, function (token) {
                var _token = token.trim().toLowerCase();
                self.all[_token] = new Synonym(object, token);
            });
        }
    };

    Synonyms.prototype.match = function (text) {
        var self = this;
        var result = null;
        if (angular.isString(text)) {
            var token = text.trim().toLowerCase();
            var match = self.all[token];
            if (match) result = match;
        }
        return result;
    };

    Synonyms.prototype.update = function (state) {
        console.log("Synonyms.update()");
        var self = this;

        self.all = {};

        angular.forEach(things.all, function (thing) {
            self.add(thing, thing.id);
        });

        var synonymsAssertions = state.resolveAll(assert(undefined, "has", "Synonyms"), true);
        var nameAssertions = state.resolveAll(assert(undefined, "has", "Name"), true);
        var allAssertions = synonymsAssertions.concat(nameAssertions);

        console.log("synonymsAssertions", synonymsAssertions);
        console.log("nameAssertions", nameAssertions);
        console.log("allAssertions", allAssertions);

        angular.forEach(allAssertions, function (assertion) {
            var value = state.resolveValue(assert(
                assertion.subject,
                assertion.predicate,
                assertion.object));
            console.log("value", value);
            self.add(assertion.subject, value);
        });

        console.log("self.all", self.all);
    };

    function Synonym(object, text) {
        this.object = object;
        this.text = text;
    }

    return new Synonyms();

});
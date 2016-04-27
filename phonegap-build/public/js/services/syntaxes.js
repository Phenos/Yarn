yarn.service("syntaxes", function (Syntax) {

    var allSyntaxes = {};

    function _get(id) {
        return allSyntaxes[id];
    }

    function _set(text, predicate) {
        var syntax;

        if (!predicate)
            throw("Syntax must have a predicate");
        if (!text)
            throw("Syntax must have a text");
        syntax = allSyntaxes[text];
        if (!syntax) {
            syntax = new Syntax(text, predicate);
            allSyntaxes[text] = syntax;
        }
        return syntax;
    }

    function _for(predicate) {
        var matches = {
            positive: [],
            negative: []
        };
        angular.forEach(allSyntaxes, function (syntax, key) {
            if (syntax.predicate === predicate) {
                if (syntax.isPositive) {
                    matches.positive.push(syntax);
                } else {
                    matches.negative.push(syntax);
                }
            }
        });
        return matches;
    }

    return {
        for: _for,
        get: _get,
        set: _set
    };
});
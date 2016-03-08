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

    return {
        get: _get,
        set: _set
    };
});
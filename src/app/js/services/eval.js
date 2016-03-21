yarn.service("eval", function ($parse) {

    function eval(exp, scope) {
        var value;
        var base = {
            //todo: provide a richer context for expressions
        };
        var newScope = angular.extend(base, scope);
        if (angular.isString(exp)) {
            if (exp.substr(0,4) === "exp:") {
                var fn = $parse(exp.substring(4));
                value = fn(newScope);
            }
        }
        //console.log("evaluated value", value);
        return value;
    }

    return eval;

});
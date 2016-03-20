yarn.service("templating", function ($window, lodash) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    Templating.prototype.render = function (source, scope) {
        addScopeHelpers(scope);
        console.log("Rentering template: ", [source]);
        //console.log("Templating.render", [source, scope]);
        var output = nunjucks.renderString(source, scope);
        return output;
    };


    function addScopeHelpers(scope) {
        scope.lodash = lodash;
    }


    return new Templating();

});
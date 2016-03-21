yarn.service("templating", function ($window) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    Templating.prototype.render = function (source, scope) {
        var _scope = scope || {};
        //console.log("Templating.render", [source, scope]);
        var output = nunjucks.renderString(source, _scope);
        return output;
    };

    return new Templating();

});
yarn.service("templating", function ($window, yConsole) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    Templating.prototype.render = function (source, scope) {
        console.log("Templating.render", [source, scope]);
        var output = nunjucks.renderString(source, scope);
        return output;
    };

    return new Templating();

});
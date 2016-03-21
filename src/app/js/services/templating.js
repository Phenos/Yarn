yarn.service("templating", function ($window, yConsole) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    // TODO: Try to handle better detection of recursion during templating
    var recursion = 0;
    var maxRecursion = 100;
    Templating.prototype.render = function (source, scope) {
        recursion++;
        console.log("recursion", recursion);
        if (recursion > maxRecursion) {
            recursion = 0;
            throw new Error('Too much recursion during template rendering!');
        }
        var _scope = scope || {};
        console.log("Templating.render", [source, scope]);
        try {
            var output = nunjucks.renderString(source, _scope);
        } catch (e) {
            console.log({e:e});
            var msg = [
                "Templating Error:\n",
                e.message
            ];
            yConsole.error(msg.join(""));
        }
        recursion--;
        return output;
    };

    return new Templating();

});
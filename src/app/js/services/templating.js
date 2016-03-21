yarn.service("templating", function ($window, yConsole) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    // TODO: Try to handle better detection of recursion during templating
    var recursion = 0;
    var maxRecursion = 50;
    Templating.prototype.render = function (source, scope) {
        recursion++;
        //console.log("recursion", recursion);
        if (recursion > maxRecursion) {
            recursion = recursion - maxRecursion;
            yConsole.error('Too much recursion during template rendering!');
        } else {
            var _scope = scope || {};
            //console.log("Templating.render", [source, scope]);
            try {
                var output = nunjucks.renderString(source, _scope);
            } catch (e) {
                //console.log({e:e});
                var msg = [
                    e.name + "\n",
                    e.message
                ];
                yConsole.error(msg.join(""));
            }
            recursion--;
        }
        return output;
    };

    return new Templating();

});
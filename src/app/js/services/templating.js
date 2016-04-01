yarn.service("templating", function ($window, yConsole) {

    var nunjucks = $window.nunjucks;

    function Templating() {
    }

    // TODO: Try to handle better detection of recursion during templating
    var recursion = 0;
    var maxRecursion = 50;
    Templating.prototype.render = function (source, scope) {
        var output;
        recursion++;
        if (recursion > maxRecursion) {
            recursion = recursion - maxRecursion;
            yConsole.error('Too much recursion during template rendering!');
        } else {
            var _scope = scope || {};
            try {
                console.log("pre-output source : ", source);
                output = nunjucks.renderString(source, _scope);
                console.log("output:: ", output);

                // Coherce the value to a float if needed
                if (output[0] === "#") {
                    output = output.substring(1).trim();
                    if (output === "true") {
                        output = true;
                    } else if (output === "false") {
                        output === false;
                    } else {
                        //console.log("COHERCING FLOAT: ", output);
                        output = parseFloat(output.substring(1));
                    }
                }

            } catch (e) {
                var msg = [
                    e.name + "\n",
                    e.message
                ];
                output = new Error(msg);
                yConsole.error(msg.join(""));
            }
            recursion--;
        }

        return output;
    };

    return new Templating();

});
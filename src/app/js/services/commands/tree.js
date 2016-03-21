yarn.factory('treeCommand', function (yConsole,
                                      script) {

    function handler() {
        var html = script.ast.html();
        yConsole.debug("Outputing execution tree:");
        yConsole.debug(html);
    }

    return {
        name: "tree",
        shortDescription: "Show the <em>Abstract Syntax Tree</em> generated by the compiler",
        longDescription: "Show the <em>Abstract Syntax Tree</em> generated by the compiler",
        handler: handler
    };

});


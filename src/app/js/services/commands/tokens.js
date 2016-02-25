yarn.factory('tokensCommand', tokensCommand);

function tokensCommand(yConsole,
                       yarn) {

    function handler() {
        var html = yarn.scripts[0].pointer.html();
        yConsole.debug("Outputing script parsing tokens:");
        yConsole.debug(html);
    }

    return {
        name: "tokens",
        shortDescription: "Show how the compiler tokenized the source code (technical)",
        longDescription: "Show how the compiler tokenized the source code (technical)",
        handler: handler
    };

}
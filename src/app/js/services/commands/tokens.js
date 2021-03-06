yarn.factory('tokensCommand', tokensCommand);

function tokensCommand(yConsole,
                       yarnScript) {

    function handler() {
        var html = yarnScript.pointer.html();
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
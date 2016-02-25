yarn.factory('stateCommand', stateCommand);

function stateCommand(yConsole,
                      consoleHelper,
                      state) {

    function handler() {
        var html = stateToHTML(state);

        yConsole.debug(html);
    }

    function stateToHTML(state) {
        var html = [];
        var itemCount = 0;

        html.push("<div class='assertions'>");
        state.assertions.forEach(function (assertion) {
            itemCount++;
            var log = [];

            log.push("<div class='assertion'>");
            log.push(consoleHelper.assertion2log(assertion));

            log.push("</div>");
            html.push(log.join(""));
        });
        html.push("</div>");

        var output = "";
        if (itemCount) {
            output = html.join("");
        } else {
            output = "The state is empty!";
        }

        return output;
    }

    return {
        name: "state",
        shortDescription: "Show the current game state as a list of assertions",
        longDescription: "Show the current game state as a list of assertions",
        handler: handler
    };

}
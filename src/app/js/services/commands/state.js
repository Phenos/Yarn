angular.module('yarn').factory('stateCommand', stateCommand);

function stateCommand(yConsole,
                      game) {

    function handler() {
        var html = stateToHTML(game.state);

        yConsole.debug(html);
    }

    function stateToHTML(state) {
        var html = [];
        var itemCount = 0;

        html.push("<div class='assertions'>");
        state.assertions.forEach(function (assertion) {
            var topState = assertion.getTopState(state.layerSetup);
            if (topState) {
                itemCount++;
                html.push("<div class='assertion'>");
                html.push("<span class='subject " + getTypeFromThingOrValue(assertion.subject) + "'>");
                html.push(getStringFromThingOrValue(assertion.subject));
                html.push("</span><span class='predicate'>");
                html.push(getStringFromThingOrValue(assertion.predicate));
                html.push("</span><span class='object " + getTypeFromThingOrValue(assertion.object) + "'>");
                html.push(getStringFromThingOrValue(assertion.object));
                html.push("</span><span class='truth'>");
                html.push("=" + assertion.valueLayer(state.layerSetup) + ":" + assertion.value(state.layerSetup));
                html.push("</span></div>");
            }
        });
        html.push("</div><hr /><div>");
        state.actionHandlers.forEach(function (actionHandler) {
            itemCount++;
            html.push("<div class='assertion'>");
            html.push("<span class='subject " + getTypeFromThingOrValue(actionHandler.subject) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.subject));
            html.push("</span><span class='predicate'>");
            html.push(getStringFromThingOrValue(actionHandler.predicate));
            html.push("</span><span class='object " + getTypeFromThingOrValue(actionHandler.object) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.object));
            html.push("</span>+<span class='doReference " + getTypeFromThingOrValue(actionHandler.do) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.do));
            html.push("</span></div>");
        });
        html.push("</div>");

        function getStringFromThingOrValue(obj) {
            var value;
            if (typeof obj === "undefined") {
                value = "[undefined]";
            } else if (obj === null) {
                value = "[null]";
            } else if (typeof obj === "object") {
                value = obj.label || obj.id;
            } else {
                value = obj;
            }
            return value;
        }

        function getTypeFromThingOrValue(obj) {
            var value;
            var type;
            if (typeof obj === "undefined") {
                value = "isUndefined";
            } else if (typeof obj === "object") {
                value = "isThing"
            } else {
                type = typeof obj;
                type = "is" + type.substr(0, 1).toUpperCase() + type.substr(1);
                value = type;
            }
            return value;
        }

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
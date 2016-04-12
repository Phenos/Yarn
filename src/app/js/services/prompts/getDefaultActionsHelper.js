yarn.service("setDefaultOptionsHelper", function (state) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "normal";
        if (isSmall) size = "";
        var allowedActions = {};

        var space = state.one("Player is in *");

        var scope = {
            Space: space
        };

        // If the space is restricted, build a list of allowed actions
        var spaceIsRestricted = state.value("Space is Restricted", scope);
        console.log("spaceIsRestricted", spaceIsRestricted);
        if (spaceIsRestricted) {
            var allowedActionsObjs = state.many("Space allows *", scope);

            angular.forEach(allowedActionsObjs, function (obj) {
                allowedActions[obj.id] = obj;
            });
        }

        console.log("space", space);
        if (space) {

            // Add custom actions
            var customActions = state.many("* is an Action");
            angular.forEach(customActions, function (action) {
                var isAllowed = true;
                if (spaceIsRestricted && !allowedActions[action.id]) {
                    isAllowed = false;
                }
                if (isAllowed) {

                    var scope = { Action: action };
                    var isActive = state.value("Action is Active", scope);
                    var icon = state.value("Action has Icon", scope);
                    var name = state.value("Action has Name", scope);
                    var iconSize = state.value("Action has IconSize", scope);
                    var isIntransitive = state.value("Action is Intransitive", scope);
                    console.log("isIntransitive", isIntransitive);
                    if (isIntransitive && isActive) {
                        option = prompt.option(name, "do " + action.id);
                        option.iconId = icon;
                        option.iconSize = iconSize || size;
                        option.iconOnly = true;
                        console.log("option", option);
                    }
                }
            });

        }

    }

});
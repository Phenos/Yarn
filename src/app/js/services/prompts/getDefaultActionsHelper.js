yarn.service("setDefaultOptionsHelper", function (state) {

    return function setDefaultOptionsHelper(prompt, isSmall) {
        var option;
        var size = "normal";
        if (isSmall) size = "";
        var allowedActions = {};

        var space = state.one("You is in *");

        var scope = {
            Space: space
        };

        // If the space is restricted, build a list of allowed actions
        var spaceIsRestricted = state.value("Space is Restricted", scope);
        if (spaceIsRestricted) {
            var allowedActionsObjs = state.many("Space allows *", scope);

            angular.forEach(allowedActionsObjs, function (obj) {
                allowedActions[obj.id] = obj;
            });
        }

        if (space) {

            // Add custom actions
            var customActions = state.many("* is an Action");
            angular.forEach(customActions, function (action) {
                if (!(spaceIsRestricted && !allowedActions[action.id])) {

                    var scope = { Action: action };
                    var isActive = state.value("Action is Active", scope);
                    var icon = state.value("Action has Icon", scope);
                    var name = state.value("Action has Name", scope);
                    var iconSize = state.value("Action has IconSize", scope);
                    var isIntransitive = state.value("Action is Intransitive", scope);
                    if (isIntransitive && (isActive || allowedActions[action.id])) {
                        option = prompt.option(name, "do " + action.id);
                        option.iconId = icon;
                        option.iconSize = iconSize || size;
                        option.iconOnly = true;
                    }
                }
            });

        }

    }

});
yarn.service("contextActions", function (state) {

    function contextActions(object) {
        var allowedActions = {};
        var actions = [];

        var space = state.one("Player is in *");

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
        //console.log("getContextActions");

        if (space) {

            actions.push(new Action(object, {
                icon: "close",
                iconSize: "small",
                label: "Close",
                labelOnly: true,
                name: "close"
            }));

            var customActions = state.many("* is an Action");
            angular.forEach(customActions, function (action) {
                var actionDoesApply = true;
                //console.log("hu??", !(spaceIsRestricted && !allowedActions[action.id]));
                if (!(spaceIsRestricted && !allowedActions[action.id])) {
                    var scope = {
                        CurrentAction: action,
                        ActionObject: object
                    };
                    var isTransitive = state.value("CurrentAction is Transitive", scope);
                    if (isTransitive) {
                        var isActive = state.value("CurrentAction is Active", scope);
                        var icon = state.value("CurrentAction has Icon", scope);
                        var iconSize = state.value("CurrentAction has IconSize", scope);
                        var name = state.value("CurrentAction has Name", scope);
                        var label = state.value("CurrentAction has Label", scope);
                        var unlessConditions = state.manyAssertions("CurrentAction unless *", scope);

                        if (isActive || allowedActions[action.id]) {

                            angular.forEach(unlessConditions, function (assertion) {
                                var expression = assertion.value();
                                var value = state.render(expression, scope);
                                if (!value) {
                                    actionDoesApply = false;
                                }
                                //console.log("---expression", expression);
                                //console.log("---assertion", assertion);
                                //console.log(">>VALUE", value);
                            });
                            //console.log("unlessConditions", unlessConditions);
                            if (actionDoesApply) {
                                var action = new Action(object, {
                                    icon: icon,
                                    name: name,
                                    label: label,
                                    iconSize: iconSize
                                });
                                actions.push(action);
                            }

                        }
                    }
                }
            });

        }

        return actions;

    }

    function Action(object, options) {
        this.object = object;
        this.icon = options.icon || null;
        this.iconSize = options.iconSize || "";
        this.labelOnly = options.labelOnly || false;
        this.name = options.name || "Unknown action!";
        this.label = options.label || null;
    }

    return contextActions;

});
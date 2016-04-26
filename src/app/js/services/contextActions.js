yarn.service("contextActions", function (state, things) {

    /**
     * Return the list of contextual/transitive actions that can be done for
     * a specific action. Optionnaly restric to a single action.
     * @param {String} object Find all action for this object
     * @param {String} restrictTo Constrain result to this action
     * @returns {Array} Returns a list of contextual actions
     */
    function contextActions(object, restrictTo) {
        var allowedActions = {};
        var actions = [];

        var space = state.one("Player is in *");
        var currentAct = state.one("Player is acting  *");

        var scope = {
            Space: space
        };

        var restrictToAction = things.get(restrictTo, true);

        // If the space is restricted, build a list of allowed actions
        var spaceIsRestricted = state.value("Space is Restricted", scope);
        if (spaceIsRestricted) {
            var allowedActionsObjs = state.many("Space allows *", scope);

            angular.forEach(allowedActionsObjs, function (obj) {
                allowedActions[obj.id] = obj;
            });
        }
//        console.log("getContextActions");

        actions.push(new Action(object, {
            icon: "close",
            iconSize: "small",
            label: "Close",
            labelOnly: true,
            name: "close"
        }));

        var customActions = state.many("* is an Action");
        angular.forEach(customActions, function (actionObj) {
            var actionDoesApply = true;
//            console.log("actionScope", [actionScope]);
//                console.log("hu??", !(spaceIsRestricted && !allowedActions[action.id]));
            if (!(spaceIsRestricted && !allowedActions[actionObj.id])) {
                var actionScope = {
                    CurrentAct: currentAct,
                    CurrentSpace: space,
                    CurrentAction: actionObj,
                    ActionObject: object
                };

                if (restrictToAction && actionObj !== restrictToAction) {
                    actionDoesApply = false;
                }

                var isTransitive = state.value("CurrentAction is Transitive", actionScope);
                if (isTransitive) {
                    var isActive = state.value("CurrentAction is Active", actionScope);
                    var icon = state.value("CurrentAction has Icon", actionScope);
                    var iconSize = state.value("CurrentAction has IconSize", actionScope);
                    var name = state.value("CurrentAction has Name", actionScope);
                    var command = state.value("CurrentAction has Command", actionScope);
                    var label = state.value("CurrentAction has Label", actionScope);

                    var unlessConditions =
                        state.manyAssertions("CurrentAction unless *", actionScope);

                    var onlyIfConditions =
                        state.manyAssertions("CurrentAction only if *", actionScope);

                    if (isActive || allowedActions[actionObj.id]) {

                        angular.forEach(unlessConditions, function (assertion) {
                            var expression = assertion.value();
                            var value = state.render(expression, actionScope);
                            if (value) {
                                actionDoesApply = false;
                            }
                        });
                        angular.forEach(onlyIfConditions, function (assertion) {
                            var expression = assertion.value();
                            var value = state.render(expression, actionScope);
                            if (!value) {
                                actionDoesApply = false;
                            }
                        });

//                        console.log("unlessConditions", unlessConditions);
//                        console.log("actionDoesApply", actionDoesApply);
                        if (actionDoesApply) {
                            var action = new Action(object, {
                                icon: icon,
                                name: name,
                                label: label,
                                command: command,
                                iconSize: iconSize
                            });
                            actions.push(action);
                        }

                    }
                }
            }
        });

        return actions;

    }

    function Action(object, options) {
        this.object = object;
        this.icon = options.icon || null;
        this.iconSize = options.iconSize || "";
        this.labelOnly = options.labelOnly || false;
        this.name = options.name || "Unknown action!";
        this.command = options.command || "unknown_command";
        this.label = options.label || null;
    }

    return contextActions;

});
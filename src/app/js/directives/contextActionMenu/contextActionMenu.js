yarn.directive('contextActionMenu', function ContextActionMenuDirective($timeout,
                                                                        contextActionMenu,
                                                                        state,
                                                                        thingsLinks) {
    return {
        restrict: 'E',
        bindToController: {},
        scope: true,
        replace: true,
        controllerAs: 'menu',
        templateUrl: './html/contextActionMenu.html',
        controller: ContextActionMenuController
    };

    function ContextActionMenuController($element) {
        var self = this;
        this.visible = false;
        this.object = null;
        this.actions = [];
        this.objectName = null;
        this.label = null;

        contextActionMenu.register(this);

        this.show = function () {
            console.log(".show");
            self.visible = true;
        };

        this.hide = function (onDelay) {
            if (self.visible) {
                self.visible = false;
                thingsLinks.unselectAll();
                $timeout(function () {
                    if (onDelay) onDelay();
                }, 200)
            } else {
                onDelay();
            }
        };


        this.choose = function (action) {
            if (action.name === "close") {
                this.hide();
            }
            console.log("CHOSEN", action)
        };

        this.mouseover = function (action) {
            var label;
            if (action.label) {
                label = action.label;
            } else {
                label = action.name;
                console.log("action.labelOnly", action.labelOnly);
                if (!action.labelOnly) {
                    if (this.objectName) {
                        label = label + " " + this.objectName;
                    }
                }
            }
            this.label = label;
        };

        this.mouseout = function (action) {
            this.label = this.defaultLabel;
        };

        this.update = function (object) {
            if (object) {
                this.objectName = state.value("Object has Name", {
                    Object: object
                });

                this.object = object;
                this.actions = [];
                var newActions = getContextActions(object);
                if (newActions.length > 1) {
                    this.defaultLabel = "Do something with the " + this.objectName || object.text() + "?";
                } else {
                    this.defaultLabel = "You see nothing to do with the " + this.objectName || object.text() + "!";
                }
                this.label = this.defaultLabel;

                this.actions = this.actions.concat(newActions);
            }
            console.log("contextActionMenu.update");
        };


        this.position = function (targetElement) {
            // We wait for the previously selected item to collapse before reading
            // the new position
            $timeout(function () {
                var top = targetElement[0].offsetTop;
                top = top + targetElement[0].clientHeight;
                console.log("targetElement", targetElement);
                $element.css({
                    top: top
                });
            }, 300);
        }

    }


    function getContextActions(object) {
        var allowedActions = {};
        var actions = [];

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
        console.log("getContextActions");

        if (space) {

            if (!(spaceIsRestricted && !allowedActions.hint)) {
                actions.push(new Action(object, {
                    icon: "close",
                    iconSize: "small",
                    label: "Close",
                    labelOnly: true,
                    name: "close"
                }));
            }

            var customActions = state.many("* is an Action");
            angular.forEach(customActions, function (action) {
                var actionDoesApply = true;
                if (!(spaceIsRestricted && !allowedActions[action.id])) {
                    var scope = {
                        CurrentAction: action,
                        ActionObject: object
                    };
                    var isTransitive = state.value("CurrentAction is Transitive", scope);
                    if (isTransitive) {
                        var icon = state.value("CurrentAction has Icon", scope);
                        var iconSize = state.value("CurrentAction has IconSize", scope);
                        var name = state.value("CurrentAction has Name", scope);
                        var label = state.value("CurrentAction has Label", scope);
                        var unlessConditions = state.manyAssertions("CurrentAction unless *", scope);
                        angular.forEach(unlessConditions, function (assertion) {
                            var expression = assertion.value();
                            var value = state.render(expression, scope);
                            if (!value) {
                                actionDoesApply = false;
                            }
                            console.log("---expression", expression);
                            console.log("---assertion", assertion);
                            console.log(">>VALUE", value);
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
            });

        }

        return actions;

    }

    function Action(object, options) {
        this.object = object;
        this.icon = options.icon || "unknown";
        this.iconSize = options.iconSize || "";
        this.labelOnly = options.labelOnly || false;
        this.name = options.name || "Unknown action!";
        this.label = options.label || null;
    }


});

yarn.service('contextActionMenu', function contextActionMenuService() {

    var service = {
        controller: null
    };

    service.register = function (controller) {
        service.controller = controller;
    };

    service.hide = function (onDelay) {
        service.controller && service.controller.hide(onDelay);
    };

    service.show = function () {
        service.controller && service.controller.show();
    };

    service.update = function (object) {
        service.controller && service.controller.update(object);
    };

    service.position = function (targetElement) {
        service.controller && service.controller.position(targetElement);
    };


    return service;
});

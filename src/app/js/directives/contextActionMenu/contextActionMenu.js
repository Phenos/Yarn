yarn.directive('contextActionMenu', function ContextActionMenuDirective($timeout,
                                                                        contextActionMenu,
                                                                        state) {
    return {
        restrict: 'E',
        bindToController: {
        },
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

        contextActionMenu.register(this);

        this.show = function () {
            console.log(".show");
            self.visible = true;
        };

        this.choose = function (action) {
            console.log("CHOSEN", action)
        };

        this.mouseover = function (action) {
            var label = action.label;
            console.log("action.labelOnly", action.labelOnly);
            if (!action.labelOnly) {
                if (this.objectName) {
                    label = label + " " + this.objectName;
                }
            }
            this.label = label;
        };

        this.mouseout = function (action) {
            this.label = "";
        };

        this.update = function (object) {
            if (object) {
                this.objectName = state.value("Object has Name", {
                    Object: object
                });

                this.object = object;
                this.actions = [];
                var newActions = getContextActions(object);
                this.actions = this.actions.concat(newActions);
            }
            console.log("contextActionMenu.update");
        };

        this.hide = function () {
            self.visible = false;
        };


        this.position = function (targetElement) {
            // We wait for the previously selected item to collapse before reading
            // the new position
            $timeout(function () {
                var top = targetElement[0].offsetTop;
                top = top + targetElement[0].offsetParent.offsetTop;
                top = top + targetElement[0].clientHeight;
                console.log("targetElement", targetElement);
                $element.css({
                    top: top
                });
            }, 50);
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
                if (!(spaceIsRestricted && !allowedActions[action.id])) {
                    var isTransitive = state.value("Action is Transitive", { Action: action });
                    if (isTransitive) {
                        var icon = state.value("Action has Icon", { Action: action });
                        var name = state.value("Action has Name", { Action: action });
                        var action = new Action(object, {
                            icon: icon,
                            name: name
                        });
                        actions.push(action);
                    }
                }
            });


            if (!(spaceIsRestricted && !allowedActions.hint)) {
                actions.push(new Action(object, {
                    icon: "question-mark",
                    iconSize: "small",
                    label: "Hint",
                    name: "Hint"
                }));
            }
        }

        return actions;

    }

    function Action(object, options) {
        this.object = object;
        this.icon = options.icon || "unknown";
        this.iconSize = options.iconSize || "";
        this.labelOnly = options.labelOnly || false;
        this.name = options.name || "Unknown action!";
    }


});

yarn.service('contextActionMenu', function contextActionMenuService() {

    var service = {
        controller: null
    };

    service.register = function (controller) {
        service.controller = controller;
    };

    service.hide = function () {
        service.controller && service.controller.hide();
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

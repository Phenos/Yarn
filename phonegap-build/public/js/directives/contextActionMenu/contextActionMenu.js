yarn.directive('contextActionMenu', function ContextActionMenuDirective($timeout,
                                                                        contextActionMenu,
                                                                        state,
                                                                        thingsLinks,
                                                                        commands,
                                                                        contextActions) {
    return {
        restrict: 'E',
        bindToController: {},
        scope: true,
        replace: true,
        controllerAs: 'menu',
        template:'<div layout=column layout-align="top center" class=context-action-menu ng-class="{ \'is-visible\' : menu.visible, \'is-invisible\' : !menu.visible }"><div class=context-action-menu-inner layout=column layout-align="top center"><div layout=row layout-align="center center"><md-button ng-repeat="action in menu.actions" ng-class="{ \'md-fab\' : action.icon, \'is-size-small\': action.iconSize === \'small\' }" ng-click="$event.preventDefault(); menu.choose(action);" ng-mouseover=menu.mouseover(action) ng-mouseout=menu.mouseout(action) aria-label=action.name><p ng-if=!action.icon ng-bind=action.name></p><md-icon ng-if=action.icon md-svg-icon="/svg-icons/{{ action.icon }}.svg"></md-icon></md-button></div><div class=label><span ng-bind="menu.label || \' \'"></span></div></div></div>',
        controller: ContextActionMenuController
    };

    function ContextActionMenuController($element, $rootElement) {
        var self = this;
        this.visible = false;
        this.object = null;
        this.actions = [];
        this.objectName = null;
        this.label = null;

        contextActionMenu.register(this);

        $rootElement.on("click", function () {
            self.hide();
//            self.unselectAll();
        });

        this.show = function () {
//            console.log(".show");
            self.visible = true;
        };

        this.hide = function (onDelay) {
            if (self.visible) {
                self.visible = false;
                thingsLinks.unselectAll();
                $timeout(function () {
                    if (onDelay) {
                        onDelay();
                    }
                }, 0)
            } else {
                if (onDelay) {
                    onDelay();
                }
            }
        };


        this.choose = function (action) {
            if (action.name === "close") {
                this.hide();
            } else {
                var cmd = [
                    "do",
                    action.command,
                    this.object.id
                ].join(" ");
                commands.run(cmd)
            }
        };

        this.mouseover = function (action) {
            var label;
            if (action.label) {
                label = action.label;
            } else {
                label = action.name;
//                console.log("action.labelOnly", action.labelOnly);
                if (!action.labelOnly) {
                    if (this.objectName) {
                        label = label + " " + this.objectName;
                    }
                }
            }
            this.label = label;
        };

        this.mouseout = function () {
            this.label = this.defaultLabel;
        };

        this.update = function (object) {
            if (object) {
                this.objectName = state.value("Object has Name", {
                    Object: object
                });

                this.object = object;
                this.actions = [];
                var newActions = contextActions(object);
                if (newActions.length > 1) {
                    this.defaultLabel = "Do something with the " +
                        this.objectName || object.text() + "?";
                } else {
                    this.defaultLabel = "You see nothing to do with the " +
                        this.objectName || object.text() + "!";
                }
                this.label = this.defaultLabel;

                this.actions = this.actions.concat(newActions);
            }
//            console.log("contextActionMenu.update");
        };


        this.position = function (targetElement) {
            // We wait for the previously selected item to collapse before reading
            // the new position
            var top = targetElement[0].offsetTop;
            top = top + targetElement[0].clientHeight;
//            console.log("targetElement", targetElement);
            $element.css({
                top: top
            });
        }

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

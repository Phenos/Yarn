yarn.service('thingsLinks', function () {

    function ThingsLinks() {
        this.all = [];

    }

    ThingsLinks.prototype.register = function(thing) {
        this.all.push(thing);
    };

    ThingsLinks.prototype.unselectAll = function() {
//        console.log("unselect!");
        angular.forEach(this.all, function (thing) {
            thing.unselect();
        });
    };

    return new ThingsLinks();

});

yarn.directive('thing', function ThingDirective(things,
                                                synonyms,
                                                yConsole,
                                                contextActionMenu,
                                                thingsLinks,
                                                commands,
                                                contextActions) {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        replace: true,
        controllerAs: 'thing',
        template:'<a class="thing {{::thing.unrecognizedClass}}" ng-href={{::thing.token}} ng-click=thing.click($event) ng-mouseover=thing.hover() ng-mouseout=thing.out()><span>{{::thing.text }}</span><md-tooltip ng-if=thing.tooltipVisible md-delay=200 md-visible=true md-direction=bottom ng-bind=thing.tooltip></md-tooltip></a>',
        controller: ThingController
    };

    function ThingController($element, $attrs) {
        var self = this;

        this.unrecognized = false;
        this.unrecognizedClass = this.unrecognized ? 'unrecognized' : '';
        this.token = $attrs.token.trim();
        this.text = $attrs.text;
        this.selected = false;
        this.tooltip = null;

        var synonym = synonyms.match(this.token);
        if (synonym) {
            this.thing = synonym.object;
        }

        thingsLinks.register(this);

        this.hover = function hover() {
            self.update();
            self.tooltipVisible = true;
        };

        this.out = function out() {
            self.tooltipVisible = false;
        };

        this.update = function update() {

            if (!angular.isObject(self.thing)) {
                self.unrecognized = true;
                self.text = self.token;
            } else {
                self.actions = contextActions(self.thing);
                self.actions.shift();

                if (self.actions.length === 0) {
                    self.tooltip = "Nothing to do!";
                } else if (self.actions.length === 1) {
//                    console.log("--->>>");
                    self.tooltip = self.actions[0].label;
                } else {
                    var actions = [];
                    angular.forEach(self.actions, function (action) {
                        actions.push(action.name);
                    });
                    self.tooltip = actions.join(", ");
                }
            }
//            console.log("--actions", self.tooltip);
        };

        this.unselect = function () {
            this.selected = false;
        };

        this.select = function () {
            this.update();
            thingsLinks.unselectAll();
            this.selected = true;
        };

        this.click = function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.update();

//            thingsLinks.unselectAll();
            if (this.actions.length === 0) {
                yConsole.warning("Clicking this link did nothing: " + self.text);
            } else if (this.actions.length === 1) {
                var cmd = [
                    "do",
                    this.actions[0].command,
                    this.thing.id
                ].join(" ");
                commands.run(cmd)

            } else {
                self.tooltipVisible = false;
                if (self.thing) {
                    contextActionMenu.hide(function () {
                        contextActionMenu.update(self.thing);
                        contextActionMenu.position($element);
                        contextActionMenu.show();
                    });
                    self.select();
//                    promptLoop.useThing(this.thing);
                } else {
                    yConsole.warning("Clicking this link did nothing: " + self.text);
                }
            }
        };

    }

});




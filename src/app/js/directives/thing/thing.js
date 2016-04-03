yarn.service('thingsLinks', function () {

    function ThingsLinks() {
        var self = this;
        this.all = [];

    }

    ThingsLinks.prototype.register = function(thing) {
        this.all.push(thing);
    };

    ThingsLinks.prototype.unselectAll = function() {
        console.log("unselect!");
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
        templateUrl: './html/thing.html',
        controller: ThingController
    };

    function ThingController($element, $attrs, $timeout) {
        var self = this;
        this.unrecognized = false;
        this.token = $attrs.token;
        this.text = $attrs.text;
        this.selected = false;
        this.tooltip = null;

        var synonym = synonyms.match(this.token);
        if (synonym) {
            this.thing = synonym.object;
        }

        thingsLinks.register(this);

        if (!angular.isObject(this.thing)) {
            this.unrecognized = true;
        } else {
            this.actions = contextActions(this.thing);
            this.actions.shift();

            if (this.actions.length === 0) {
                this.tooltip = "Nothing to do!";
            } else if (this.actions.length === 1) {
                this.tooltip = this.actions[0].name;
            } else {
                var actions = [];
                angular.forEach(this.actions, function (action) {
                    actions.push(action.name);
                });
                this.tooltip = actions.join(", ");
            }
        }

        this.unselect = function () {
            this.selected = false;
        };

        this.select = function () {
            thingsLinks.unselectAll();
            this.selected = true;
        };

        this.click = function (e) {
            var self = this;
            console.log("e", e);
            e.preventDefault();
            e.stopPropagation();
            //thingsLinks.unselectAll();
            if (this.actions.length === 0) {
                yConsole.warning("Clicking this link did nothing: " + self.text);
            } else if (this.actions.length === 1) {
                var cmd = [
                    "do",
                    this.actions[0].name,
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
                    //promptLoop.useThing(this.thing);
                } else {
                    yConsole.warning("Clicking this link did nothing: " + self.text);
                }
            }
        }
    }

});




yarn.service('thingsLinks', function ($rootElement) {

    function ThingsLinks() {
        var self = this;
        this.all = [];

        //$rootElement.on("click", function () {
        //    contextActionMenu.hide();
        //    self.unselectAll();
        //});
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
                                                promptLoop) {
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

        var synonym = synonyms.match(this.token);
        if (synonym) {
            this.thing = synonym.object;
        }

        thingsLinks.register(this);

        if (!angular.isObject(this.thing)) {
            this.unrecognized = true;
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
            //thingsLinks.unselectAll();
            $timeout(function () {
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
                //console.log("thing: ", self.thing);
            });
        }
    }

});




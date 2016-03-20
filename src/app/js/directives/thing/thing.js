yarn.directive('thing', function ThingDirective(things,
                                                synonyms,
                                                yConsole,
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

    function ThingController($attrs) {
        var self = this;

        this.unrecognized = false;
        this.token = $attrs.token;
        this.text = this.token;

        var synonym = synonyms.match(this.token);
        if (synonym) {
            this.thing = synonym.object;
        }

        if (!angular.isObject(this.thing)) {
            this.unrecognized = true;
        }

        this.click = function (e) {
            e.preventDefault();
            if (this.thing) {
                promptLoop.useThing(this.thing);
            } else {
                yConsole.warning("Clicking this link did nothing: " + this.text);
            }
            //console.log("thing: ", self.thing);
        }
    }

});




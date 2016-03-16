yarn.directive('thing', function ThingDirective(things) {
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

        this.thing = things(this.token, true);
        if (!angular.isObject(this.thing)) {
            this.unrecognized = true;
        }

        this.click = function (e) {
            e.preventDefault();
            console.log("thing: ", self.thing);
        }
    }

});




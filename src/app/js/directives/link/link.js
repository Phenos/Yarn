yarn.directive('thing', function LinkDirective(things) {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        replace: true,
        controllerAs: 'link',
        templateUrl: './html/link.html',
        controller: LinkController
    };

    function LinkController($attrs) {

        this.token = $attrs.token;
        this.text = this.token;

        var thing = things(this.token, true);

    }

});




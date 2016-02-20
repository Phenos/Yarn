(function () {

    angular.module('yarn').directive('command', CommandDirective);

    function CommandDirective(commands) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs, controller) {
            element.on('click', function (e) {
                e.preventDefault();
                commands.command(element.text());
            });
        }
    }
})();
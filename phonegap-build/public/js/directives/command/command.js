yarn.directive('command', function CommandDirective(commands) {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs, controller) {
        element.on('click', function (e) {
            e.preventDefault();
            var cmd = attrs.command || element.text();
            commands.run(cmd);
        });
    }
});
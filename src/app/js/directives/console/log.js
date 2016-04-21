(function() {

yarn.directive('log', LogDirective);

function LogDirective($sce, editorFiles, openFileFromAbsoluteURL) {
    return {
        restrict: 'E',
        scope: {
            line: '='
        },
        replace: true,
        templateUrl: './html/log.html',
        link: Link
    };

    function Link(scope, element) {
        var _options = scope.line.options || {};

        var _time = new Date(scope.line.timestamp);
        if (_options.source) {
            scope.source = _options.source;
        }
        scope.time = _time.getHours() + ":" + _time.getMinutes();
//        element.addClass("is-" + scope.line.type);

        scope.text2html = function() {
            return $sce.trustAsHtml(scope.line.text);
        };
        scope._text2html = scope.text2html();

        scope.goToSource = function (source) {
            if (source) {
                openFileFromAbsoluteURL(source.uri, source.line);
            }
        };

    }

}

})();

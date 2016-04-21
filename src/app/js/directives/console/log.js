(function() {

yarn.directive('log', LogDirective);

function LogDirective($sce, $parse, editorFiles, openFileFromAbsoluteURL) {
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

        scope.text2htmlRaw = function() {
            return $sce.getTrustedHtml(scope.line.text) || '';
        };

        scope._text2htmlRaw = scope.text2htmlRaw();
        element.find("text").html(scope._text2htmlRaw);
//        console.log("scope._text2htmlRaw", scope._text2htmlRaw);


        scope.goToSource = function (source) {
            if (source) {
                openFileFromAbsoluteURL(source.uri, source.line);
            }
        };

    }

}

})();

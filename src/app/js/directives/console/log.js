(function() {

yarn.directive('log', LogDirective);

function LogDirective($sce, editorFiles, openFileFromAbsoluteURL) {
    return {
        restrict: 'E',
        scope: {
            type: '=',
            text: '=',
            options: '=',
            step: '=',
            isNewStep: '=',
            timestamp: '='
        },
        templateUrl: './html/log.html',
        link: Link
    };

    function Link(scope, element) {
        var _options = scope.options || {};

        var _time = new Date(scope.timestamp);
        if (_options.source) scope.source = _options.source;
        scope.time = _time.getHours() + ":" + _time.getMinutes();
        element.addClass("is-" + scope.type);

        if (scope.isNewStep) {
            element.addClass("isNewStep");
        }

        scope.text2html = function() {
            return $sce.trustAsHtml(scope.text);
        };

        scope.goToSource = function (source) {
            if (source) {
                openFileFromAbsoluteURL(source.uri, source.line);
            }
        };

    }

}

})();

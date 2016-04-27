(function() {

yarn.directive('log', LogDirective);

function LogDirective($sce, $parse, editorFiles, openFileFromAbsoluteURL) {
    return {
        restrict: 'E',
        scope: {
            line: '='
        },
        replace: true,
        template:'<div class="log {{::line.isNewStepClass}} is-{{::line.type}}"><span class=step ng-bind=::line.step>#</span> <span class=timestamp>{{::time }}</span><text class=text></text><span ng-if=::source ng-click=goToSource(source) class=source>[<span class=url>{{::source.file }} <span class=line>:{{::source.line }}</span><md-tooltip md-direction=left>{{::source.uri }}</md-tooltip></span>]</span></div>',
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

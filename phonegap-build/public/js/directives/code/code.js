yarn.directive('code', function CodeDirective(soundEffects) {
    return {
        restrict: 'E',
        scope: {},
        repace: true,
        transclude: true,
        template:'<div class=code-inner md-whiteframe=5><div ng-style="{ \'height\': height }" ui-ace=options ng-readonly=true ng-model=source></div></div>',
        controller: CodeController,
        link: function (scope, element, attrs, ctrl, transclude) {
            transclude(function(clone) {
                scope.source = clone.text().trim();
            });
        }
    };

    function CodeController($scope, $element, $attrs, tools) {
        var aceEditor;
        var session;

//        $scope.source = "kahsjfkhaslkhfl";

        function aceChanged() {
            // Adjust height
            var doc = session.getDocument();
            $scope.height = 16 * doc.getLength();
        }

        function aceLoaded(editor) {
            editor.$blockScrolling = Infinity;
            aceEditor = editor;
            session = editor.getSession();

//            aceEditor.on("click", clickHandler);

            var matchChars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz" +
                "\t !@#$%ˆ*_+{}[]:''\".,<>/\\" +
                "()1234567890-=";

            $element.on("keypress", function(e) {
                if (matchChars.indexOf(String.fromCharCode(e.keyCode)) > -1) {
                    soundEffects.error()
                }
            });
//            aceEditor.getSession().selection.on('changeCursor', changeCursorHandler);

        }

        $scope.options = {
            showGutter: false,
            useWrapMode: false,
            useWorker: false,
            mode: 'javascript',
            theme: 'tomorrow',
            onLoad: aceLoaded,
            onChange: aceChanged
        };

    }
});

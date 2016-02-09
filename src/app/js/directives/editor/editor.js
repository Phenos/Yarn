(function () {

    angular.module('yarn').directive('editor', EditorDirective);

    function EditorDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&",
                source: "="
            },
            scope: {},
            controllerAs: 'editor',
            templateUrl: './html/editor.html',
            controller: EditorController
        };

        function EditorController(Story, $scope) {
            var self = this;
            var aceEditor;

            Story.potato({}, function(err, data) {
                self.text = data;
                console.log("story : ", data);
            });


            function aceLoaded(_editor) {
                console.log("Editor loaded");
                aceEditor = _editor;
                aceEditor.setValue("...");
            }

            function aceChanged(e) {
                //console.log("aceChanged");
            }

            this.options = {
                require: [
                    'ace/ext/language_tools',
                    'ace/theme/tomorrow',
                    'ace/mode/javascript'
                ],
                useWrapMode : false,
                mode: 'javascript',
                theme: 'tomorrow',
                advanced: {
                    enableSnippets: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true
                },
                onLoad: aceLoaded,
                onChange: aceChanged
            }

        }
    }

})();

(function () {

    angular.module('yarn').directive('editor', EditorDirective);

    function EditorDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'editor',
            templateUrl: './html/editor.html',
            controller: EditorController
        };

        function EditorController(Story) {
            var self = this;

            Story.potato({}, function(err, data) {
                self.text = data;
                console.log("story : ", data);
            });

            this.text = "";

            var aceEditor;
            function aceLoaded(_editor) {
                console.log("aceLoaded");
                aceEditor = _editor;
            }

            function aceChanged(e) {
                console.log("aceChanged");
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

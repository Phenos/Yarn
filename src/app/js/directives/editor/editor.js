(function () {

    angular.module('yarn').directive('editor', EditorDirective);

    function EditorDirective() {
        return {
            restrict: 'E',
            bindToController: {
                saveAndRun: "&",
                ready: "&",
                source: "="
            },
            scope: {},
            controllerAs: 'editor',
            templateUrl: './html/editor.html',
            controller: EditorController
        };

        function EditorController() {
            var aceEditor;

            function aceLoaded(_editor) {
                console.log("Editor loaded");
                aceEditor = _editor;
                //aceEditor.getSession().setUseWorker(false);
            }

            function aceChanged(e) {
            }

            this.options = {
                require: [
                    'ace/ext/language_tools',
                    'ace/theme/tomorrow',
                    'ace/mode/javascript'
                ],
                workerPath: './bower_components/ace-builds/src-noconflict/',
                useWrapMode : false,
                useWorker: false,
                mode: 'javascript',
                theme: 'tomorrow',
                advanced: {
                    enableSnippets: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true
                },
                //useWorker
                onLoad: aceLoaded,
                onChange: aceChanged
            }

        }
    }

})();

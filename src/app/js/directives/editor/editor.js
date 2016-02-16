(function () {

    angular.module('yarn').directive('editor', EditorDirective);
    angular.module('yarn').factory('editorService', editorService);

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

        function EditorController(editorService) {
            var aceEditor;

            editorService.register(this);

            this.focus = function() {
                aceEditor.textInput.focus();
            };

            function aceLoaded(_editor) {
                console.log("Editor loaded");
                aceEditor = _editor;
                //console.log("aceEditor", aceEditor);
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
                useWrapMode : true,
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

    function editorService() {
        var controller;

        function focus() {
            console.log(".focus");
            if (controller) controller.focus();
        }

        function register(ctrl) {
            controller = ctrl;
        }

        return {
            register: register,
            focus: focus
        }
    }
})();

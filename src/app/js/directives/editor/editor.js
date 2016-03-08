(function () {

    yarn.directive('editor', EditorDirective);
    yarn.factory('editorService', editorService);

    function EditorDirective() {
        return {
            restrict: 'E',
            bindToController: {
                readOnly: "=",
                status: "=",
                saveAndRun: "&",
                ready: "&",
                source: "="
            },
            scope: {},
            controllerAs: 'editor',
            templateUrl: './html/editor.html',
            controller: EditorController
        };

        function EditorController(editorService,
                                  commands,
                                  IDE) {
            var aceEditor;

            editorService.register(this);

            this.validate = function() {
                commands.command("validate");
            };

            this.run = function() {
                IDE.run();
            };

            this.save = function() {
            };

            this.reload = function() {
            };

            this.search = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Sorry!')
                    .textContent('The search feature is not implemented yet.')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function() {
                    console.log("ok");
                }, function() {
                    console.log("cancel");
                });
            };

            this.close = function() {
                console.log("Close!");
            };

            this.focus = function() {
                aceEditor.textInput.focus();
            };

            function aceLoaded(_editor) {
                console.log("Editor loaded");
                aceEditor = _editor;
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

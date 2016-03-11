(function () {

    yarn.directive('editor', EditorDirective);
    yarn.factory('editorService', editorService);

    function EditorDirective($mdDialog,
                             editorService,
                             editorFiles,
                             commands,
                             IDE,
                             confirmAction) {
        return {
            restrict: 'E',
            bindToController: {
                readOnly: "=",
                file: "=",
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
            var self = this;
            var aceEditor;

            editorService.register(this);

            this.validate = function() {
                commands.command("validate");
            };

            this.saveAndRun = function() {
                editorFiles.save(this.file, function (err, file) {
                    if (!err) {
                        IDE.runFile(file);
                    }
                });
            };

            this.setAsMain = function() {
                var currentMainFile = editorFiles.mainFile();
                if (currentMainFile === this.file) {
                    editorFiles.mainFile(null);
                } else {
                    editorFiles.mainFile(this.file);
                }
            };

            this.save = function() {
                editorFiles.save(this.file);
            };

            this.reload = function() {
                confirmAction(
                    "Unsaved changes",
                    "You have unsaved changes in this file.<br/> Are you sure you want to " +
                    "close it and <br/><strong>loose those changes</strong> ?",
                    function () {
                        this.file.load();
                    })
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
                editorFiles.close(this.file);
            };

            this.focus = function() {
                aceEditor.textInput.focus();
            };

            function aceLoaded(_editor) {
                _editor.$blockScrolling = Infinity;
                console.log("Editor loaded");
                aceEditor = _editor;
            }

            function aceChanged(e) {
                if (self.file) {
                    self.file.updateStatus();
                }
            }

            this.options = {
                require: [
                    'ace/ext/language_tools',
                    'ace/theme/tomorrow',
                    'ace/mode/javascript'
                ],
                workerPath: '/ace/js/',
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

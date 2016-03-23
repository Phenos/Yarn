yarn.directive('editor', function EditorDirective(editorFiles,
                                                  editors,
                                                  inspector,
                                                  IDE,
                                                  globalContextMenu,
                                                  confirmAction,
                                                  $timeout,
                                                  $throttle,
                                                  $debounce) {
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

    function EditorController(tools) {
        var self = this;
        var aceEditor;

        this.saveAllAndRun = function () {
            IDE.saveAllAndRun();
        };

        this.setAsMain = function () {
            var currentMainFile = editorFiles.mainFile();
            if (currentMainFile === this.file) {
                editorFiles.mainFile(null);
            } else {
                editorFiles.mainFile(this.file);
            }
        };

        this.save = function () {
            IDE.working(true);
            editorFiles.save(this.file, function () {
                IDE.working(false);
            });
        };

        this.reload = function () {
            confirmAction(
                "Unsaved changes",
                "You have unsaved changes in this file.<br/> Are you sure you want to " +
                "close it and <br/><strong>loose those changes</strong> ?",
                function () {
                    this.file.load();
                })
        };

        this.close = function () {
            editorFiles.close(this.file);
        };

        this.focus = function () {
            this.file.isFocused = true;
            if (aceEditor) {
                aceEditor.focus();
            }
        };

        this.blur = function () {
            this.file.isFocused = false;
        };

        this.search = function () {
            if (aceEditor) {
                aceEditor.execCommand("find");
            }
        };

        function aceLoaded(_editor) {
            _editor.$blockScrolling = Infinity;
            aceEditor = _editor;

            aceEditor.on("click", clickHandler);
            aceEditor.on("focus", function() {
                checkGoToLine();
            });
            aceEditor.getSession().selection.on('changeCursor', changeCursorHandler);

            angular.element(aceEditor.container).on("contextmenu", function () {
                globalContextMenu.add("Inspector", "inspector.svg", function () {
                    tools.focus("inspector");
                });
            });

        }

        function changeCursorHandler() {
            updateInspection();
        }

        function aceChanged() {
            updateInspection();
            if (self.file) {
                self.file.updateStatus();
            }
            checkGoToLine();


        }

        function checkGoToLine() {
                $timeout(function () {
                    if (self.file && self.file.goToLine) {
                        console.log("checkGoToLine", self.file.goToLine);
                        //console.log("goToLine", self.file.goToLine);
                        //aceEditor.resize(true);
                        aceEditor.gotoLine(self.file.goToLine, 0, true);
                        self.file.goToLine = null;
                    }
                }, 500);
        }

        this.options = {
            useWrapMode: false,
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
        };

        editors.add(this);

        function clickHandler() {
            updateInspection();
        }

        var updateInspection = $debounce($throttle(slowUpdateInspection, 200), 200);

        function slowUpdateInspection() {
            if (aceEditor) {
                var pos = aceEditor.getCursorPosition();
                var token = aceEditor.session.getTokenAt(pos.row, pos.column);
                // Also check if the inspection is not just for whitespace
                if (token && token.value.trim().length) {
                    token.file = self.file;
                    inspector.inspect(token);
                }
            }
        }

    }
});

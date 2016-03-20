(function () {

    yarn.directive('getContextMenu', function (globalContextMenu) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.on("contextmenu", function (e) {
                    if (globalContextMenu.menuItems.length) {
                        e.preventDefault();
                        $scope.contextMenuItems = globalContextMenu.flush();
                        //console.log("contextmenuexists!!!");
                        var event = new Event('contextmenuexists');
                        event.clientX = e.clientX;
                        event.clientY = e.clientY;
                        $element[0].dispatchEvent(event);
                    }
                });
            }
        };
    });


    yarn.service("globalContextMenu", function () {
        var service = {
            menuItems: []
        };

        service.flush = function () {
            var menuItems = service.menuItems;
            service.menuItems = [];
            return menuItems;
        };

        service.add = function (label, icon, callback) {
            service.menuItems.push({
                label: label,
                icon: icon,
                click: callback
            });
        };

        return service;
    });

    yarn.directive('editor', EditorDirective);

    function EditorDirective($mdDialog,
                             editorFiles,
                             root,
                             editors,
                             commands,
                             inspector,
                             IDE,
                             globalContextMenu,
                             confirmAction,
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
                IDE.isWorking = true;
                editorFiles.save(this.file, function () {
                    IDE.isWorking = false;
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

            this.search = function (ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Sorry!')
                    .textContent('The search feature is not implemented yet.')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function () {
                    console.log("ok");
                }, function () {
                    console.log("cancel");
                });
            };

            this.close = function () {
                editorFiles.close(this.file);
            };

            this.focus = function () {
                if (aceEditor) {
                    aceEditor.focus();
                }
            };

            function aceLoaded(_editor) {
                _editor.$blockScrolling = Infinity;
                aceEditor = _editor;

                aceEditor.on("click", clickHandler);
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
                    //console.log("token", token);
                    if (token) {
                        token.file = self.file;
                        inspector.inspect(token);
                    }
                }
            }

        }
    }
})();

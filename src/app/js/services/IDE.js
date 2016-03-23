/**
 * Service for handling IDE/editor operations
 */
yarn.service('IDE', function IDEService(hotkeys,
                                        rememberLastStory,
                                        $mdDialog,
                                        yConsole,
                                        loader,
                                        storage,
                                        commands,
                                        editorFiles,
                                        editors,
                                        tools,
                                        preventCloseWhenUnsaved) {

    function IDE() {
        this.isWorking = false;
    }

    IDE.prototype.working = function (newValue) {
        if (angular.isDefined(newValue)) {
            this.isWorking = newValue;
        }
        return this.isWorking;
    };


    // Prevent closing if the are unsaved files
    preventCloseWhenUnsaved.check(function () {
        var confirmationMessage;
        if (editorFiles.hasUnsaved()) {
            confirmationMessage =
                'You have UNSAVED files. If you leave this page you will loose these changes.';
        }
        return confirmationMessage;
    });


    /**
     * Register the service to a scope to allow binding keystrokes
     * @param $scope
     */
    IDE.prototype.register = function ($scope) {
        var self = this;
        hotkeys
            .bindTo($scope)
            .add({
                combo: 'mod+enter',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Save and run the story',
                callback: function (event) {
                    event.preventDefault();
                    self.saveAllAndRun();
                }
            })
            .add({
                combo: 'mod+o',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Open file...',
                callback: function (event) {
                    event.preventDefault();
                    self.openFromStorage();
                }
            })
            .add({
                combo: 'mod+s',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Save the story',
                callback: function (event) {
                    event.preventDefault();

                    self.working(true);
                    self.saveAll(function () {
                        self.working(false);
                    });
                }
            })
            .add({
                combo: 'mod+shift+enter',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Run the story',
                callback: function (event) {
                    event.preventDefault();
                    self.run();
                }
            })
            .add({
                combo: 'mod+shift+v',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Validate Current State',
                callback: function (event) {
                    event.preventDefault();
                    tools.focus("validator");
                    self.validate();
                }
            });
    };


    IDE.prototype.saveAllAndRun = function () {
        var self = this;
        console.log(".saveAllAndRun()");
        this.working(true);
        self.saveAll(function (story) {
            self.run(story);
            self.working(false);
        }, function () {
            $mdDialog.show(
                $mdDialog
                    .alert()
                    .clickOutsideToClose(true)
                    .title('Oups!')
                    .textContent('A problem occured while saving your story. Your changes were not saved.')
                    .ok('Ok')
            );
        })
    };

    IDE.prototype.saveAll = function (success, failure) {
        editorFiles.saveAll(success, failure);

        console.log("IDE.save");
    };

    IDE.prototype.openFromStorage = function (ev) {
        var self = this;

        storage.refresh();

        $mdDialog.show({
            controller: OpenFromStorageController,
            templateUrl: './html/openFromStorage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        });

        function OpenFromStorageController($scope) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.open = function (file) {
                self.working(true);
                //console.log("open", file);
                $mdDialog.cancel();
                editorFiles.open(file, true);
                editors.focus(file.uri.toString());
                self.working(false);
            };
        }
    };

    IDE.prototype.validate = function () {
        commands.run("validate");
    };

    IDE.prototype.run = function (fallback) {
        var mainFile = editorFiles.mainFile();
        if (mainFile) {
            var uri = mainFile.absoluteURI().toString();
            rememberLastStory.forget();
            loader.fromURL(uri, true);
        } else {
            if (fallback) {
                console.info("Could not find which story should be run, calling up the fallback");
                fallback();
            } else {
                yConsole.warning("Could not find which story should be run");
            }
        }
    };

    return new IDE();
});







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
                                        tools) {

    var service = {
        isWorking: false
    };

    /**
     * Register the service to a scope to allow binding keystrokes
     * @param $scope
     */
    service.register = function ($scope) {
        hotkeys
            .bindTo($scope)
            .add({
                combo: 'mod+enter',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Save and run the story',
                callback: function (event) {
                    event.preventDefault();
                    service.saveAllAndRun();
                }
            })
            .add({
                combo: 'mod+o',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Open file...',
                callback: function (event) {
                    event.preventDefault();
                    service.openFromStorage();
                }
            })
            .add({
                combo: 'mod+s',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Save the story',
                callback: function (event) {
                    event.preventDefault();

                    service.isWorking = true;
                    service.saveAll(function () {
                        service.isWorking = false;
                    });
                }
            })
            .add({
                combo: 'mod+shift+r',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Run the story',
                callback: function (event) {
                    event.preventDefault();
                    service.run();
                }
            })
            .add({
                combo: 'mod+shift+v',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Validate Current State',
                callback: function (event) {
                    event.preventDefault();
                    tools.focus("validator");
                    service.validate();
                }
            });
    };


    service.saveAllAndRun = function () {
        var self = this;
        console.log(".saveAllAndRun()");
        this.isWorking = true;
        service.saveAll(function (story) {
            service.run(story);
            self.isWorking = false;
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

    service.saveAll = function (success, failure) {
        editorFiles.saveAll(success, failure);

        console.log("IDE.save");
    };

    service.openFromStorage = function (ev) {

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
            var self = this;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.open = function (file) {
                self.isWorking = true;
                //console.log("open", file);
                $mdDialog.cancel();
                editorFiles.open(file);
                editors.focus(file.uri.toString());
                self.isWorking = false;
            };
        }
    };

    service.validate = function () {
        commands.run("validate");
    };

    service.run = function (fallback) {
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

    service.runFile = function (file) {
        if (file) {
            this.isWorking = true;
            rememberLastStory.forget();
            loader.fromURL(file.absoluteURI().toString());
            this.isWorking = false;
        }
    };


    service.loadRememberedStory = function () {
        // Reload the story that was previously loaded
        var rememberedStory = rememberLastStory.get();
        if (rememberedStory) {
            yConsole.log("Story address found in memory");
            loader.fromURL(rememberedStory);
        } else {
            yConsole.log("No story to load from either memory or url");
            yConsole.tip("To load a story you can use the LOAD command. Ex.: LOAD http://somtehing.com/yourStoryFile.txt");
        }
    };

    return service;
});







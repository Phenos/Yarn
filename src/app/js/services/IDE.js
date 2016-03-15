/**
 * Service for handling IDE/editor operations
 */
yarn.service('IDE', function IDEService(hotkeys,
                                        rememberLastStory,
                                        $mdDialog,
                                        yConsole,
                                        loader,
                                        storage,
                                        editorFiles) {

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
                    service.saveAll();
                }
            })
            .add({
                combo: 'mod+r',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Run the story',
                callback: function (event) {
                    event.preventDefault();
                    service.run();
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
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.open = function(file) {
                self.isWorking = true;
                console.log("open", file);
                $mdDialog.cancel();
                editorFiles.open(file);
                self.isWorking = false;
            };
        }
    };

    service.run = function () {
        var mainFile = editorFiles.mainFile();
        if (mainFile) {
            var uri = mainFile.absoluteURI;
            rememberLastStory.forget();
            loader.fromURL(uri);
        } else {
            yConsole.log("Could not find which story should be run");
        }
    };

    service.runFile = function (file) {
        if (file) {
            this.isWorking = true;
            rememberLastStory.forget();
            loader.fromURL(file.absoluteURI);
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







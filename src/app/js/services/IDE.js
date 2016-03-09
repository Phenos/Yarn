/**
 * Service for handling IDE/editor operations
 */
yarn.service('IDE', function IDEService(stories,
                                        hotkeys,
                                        rememberLastStory,
                                        $mdDialog,
                                        yConsole,
                                        loader,
                                        storage,
                                        editorFiles) {

    var service = {};

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
                    service.saveAndRun();
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
                    service.save();
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


    service.saveAndRun = function () {
        console.log(".saveAndRun()");
        service.save(function (story) {
            service.run(story);
        }, function () {
            $mdDialog.show(
                $mdDialog
                    .alert()
                    //.parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Oups!')
                    .textContent('A problem occured while saving your story. Your changes were not saved.')
                    .ok('Ok')
                //.targetEvent(ev)
            );
        })
    };

    service.save = function (success, failure) {
        console.log(stories.currentStory);
        stories.save(success, failure);
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
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.open = function(file) {
                $mdDialog.cancel();
                editorFiles.open(file);
            };
        }
    };



    service.run = function () {
        var url = "http://storage.yarnstudio.io/" + stories.currentUser.username + "/story.yarn.txt";
        rememberLastStory.forget();
        loader.fromSource(stories.currentStory.content, url);
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







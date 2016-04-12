/**
 * Service for handling IDE/editor operations
 */
yarn.service('IDE', function IDEService(rememberLastStory,
                                        $mdDialog,
                                        yConsole,
                                        loader,
                                        commands,
                                        editorFiles,
                                        editors,
                                        tools,
                                        profiles,
                                        state,
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
     */
    IDE.prototype.register = function () {
    };


    IDE.prototype.saveAllAndRun = function () {
        var self = this;
        console.log(".saveAllAndRun()");
        this.working(true);
        self.saveAll(function (story) {
            self.run(story);
            self.working(false);
        }, function () {
            self.working(false);
            // todo: put this in generic error popup handler
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
        //console.log("IDE.save");
    };

    IDE.prototype.validate = function () {
        commands.run("validate");
    };

    IDE.prototype.newFile = function (event) {
        var confirm = $mdDialog.prompt()
            .title('Create a new file')
            .textContent('Choose a name for this new file (ideally ends with .txt):')
            .placeholder("optionnal-folder/some-filename.txt")
            .ariaLabel('New file')
            .ok('Create')
            .cancel('Cancel');

        if (event) {
            confirm.targetEvent(event);
        }

        $mdDialog.show(confirm).then(function(newFilename) {
//            console.log("Renaming", newName);
            var profile = profiles.authenticated();
            var newFile = editorFiles.open(profile, newFilename, true);
            editorFiles.save(newFile);

        }, function() {
//            $scope.status = 'You didn\'t name your dog.';
        });
    };

    IDE.prototype.run = function () {
        if (state.story) {
            var mainFile = editorFiles.open(state.story.profile, state.story.url.toString());
            if (mainFile) {
                var uri = mainFile.absoluteURI().toString();
                loader.fromURL(uri, true);
            }
        }
    };

    return new IDE();
});







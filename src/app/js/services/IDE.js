/**
 * Service for handling IDE/editor operations
 */
yarn.service('IDE', function IDEService(rememberLastStory,
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
        var self = this;
        var confirm = $mdDialog.prompt()
            .title('Create a new file')
            .textContent('Choose a name for this new file (ideally ends with .txt):')
            .placeholder("optionnal-folder/some-filename.txt")
            .ariaLabel('New file')
            .ok('Create')
            .cancel('Cancel');

        if (event) confirm.targetEvent(event);

        $mdDialog.show(confirm).then(function(newFilename) {
            //console.log("Renaming", newName);
            var newFile = editorFiles.open(newFilename, true);
            editorFiles.save(newFile);

        }, function() {
            //$scope.status = 'You didn\'t name your dog.';
        });
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







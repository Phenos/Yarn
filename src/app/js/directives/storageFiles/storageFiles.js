yarn.directive('storageFiles', function StorageFilesDirective(channel,
                                                              profiles,
                                                              state,
                                                              confirmAction) {

    var directive = {
        restrict: 'E',
        bindToController: {
            select: "&",
            onSearch: "="
        },
        scope: {},
        controllerAs: 'storageFiles',
        templateUrl: './html/storageFiles.html',
        controller: StorageFilesController
    };

    function StorageFilesController($element, $scope) {
        var self = this;
//        console.log("StorageFilesController", storage);

        this.$element = $element;
        this.profiles = profiles;
        this.files = [];
        this.directories = [];

//        this.directories = storage.directories();

//        console.log("directories", this.directories);
        this.selection = [];
        this.search = "";
        this.selectedFolder = null;
        this.selectedStorage = null;

        channel.subscribe("storage.refresh", function (storage) {
//            console.log("what", storage);
            if (storage === self.selectedStorage) {
                updateList();
            }
        });

        function updateList() {
//            console.log("updateList", self);
            if (self.selectedStorage) {
                self.directories = self.selectedStorage.directories(self.selectedFolder);
                angular.forEach(self.directories, function (directory) {
                    var matchCount = 0;
                    angular.forEach(directory.files, function (file) {
                        var filterOut = false;
                        if (self.search && file._uri.indexOf(self.search) === -1) {
//                            console.log("Filtered out", file);
                            filterOut = true;
                        } else {
                            matchCount++;
                        }
                        file.filterOut = filterOut;
                    });
                    directory.matches = matchCount;
                });
            }

            if (self.selectedStorage && self.selectedFolder === null) {
//                console.log("Pre-selecting folder", self.selectedStorage.allProjectFolders);
                angular.forEach(self.selectedStorage.allProjectFolders, function (folder) {
//                    console.log(" state.story >> ", state.story);
                    if (state.story) {
                        if (folder.name === state.story.id) {
                            self.openProjectFolder(folder);
                        }
                    }
                });
            }

        }

        $scope.$watch('storageFiles.search', function (searchTerm) {
//            console.log("storageFiles.search", searchTerm);
            self.search = searchTerm;
            updateList();
        });

        if (profiles.visited()) {
            this.selectProfile(profiles.visited());
        } else if (profiles.authenticated()) {
            this.selectProfile(profiles.authenticated());
        }

        // Refresh All profiles
        angular.forEach(profiles.all(), function (profile) {
            profile.storage.refresh();
        });

        updateList();

    }

    StorageFilesController.prototype.selectAll = function () {
        var self = this;
        angular.forEach(self.selectedStorage.files, function (file) {
            file.isSelected = true;
        });
        this.updateSelection();
    };

    StorageFilesController.prototype.selectProfile = function (profile) {
        var self = this;
        if (profile) {
            self.selectedStorage = profile.storage;
            profile.storage.refresh();
        } else {
            console.error("Profile does not exist!");
        }
    };

    StorageFilesController.prototype.openProjectFolder = function (folder) {
        var self = this;
        if (self.selectedStorage) {
            self.selectedFolder = folder;
            self.directories = self.selectedStorage.directories(self.selectedFolder);
        }
    };

    StorageFilesController.prototype.unselectAll = function () {
        var self = this;
        angular.forEach(self.selectedStorage.files, function (file) {
            file.isSelected = false;
        });
        this.updateSelection();
    };

    StorageFilesController.prototype.updateSelection = function () {
        var self = this;

        self.selection = self.selectedStorage.selection();
    };

    StorageFilesController.prototype.deleteSelection = function (event) {
        var self = this;
        var text = "Are you sure you want to delete <br/>the <strong>" +
            self.selection.length + " files</strong> you have selected?" +
            "<br/>This action cannot be undone";

        confirmAction("Delete selection", text, ok, cancel, event, this.$element);

        function ok() {
//                console.log("DELETING FILES!!!!!");
            self.updateSelection();
            self.selectedStorage.delete(self.selection, function success() {
                self.selectedStorage.refresh();
                self.updateSelection();
            }, function fail() {
                self.selectedStorage.refresh();
                self.updateSelection();
            });
        }

        function cancel() {
        }
    };

    StorageFilesController.prototype.refresh = function () {
        var self = this;
//        console.log("Refresh");
        if (self.selectedStorage) {
            self.selectedStorage.refresh();
        }
    };

    return directive;

});
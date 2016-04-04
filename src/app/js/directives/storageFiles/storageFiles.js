yarn.directive('storageFiles', function StorageFilesDirective() {
    return {
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

    function StorageFilesController($element, $scope, profiles, confirmAction, channel) {
        var self = this;
        //console.log("StorageFilesController", storage);

        this.profiles = profiles;
        this.files = [];
        this.directories = [];

        //this.directories = storage.directories();

        //console.log("directories", this.directories);
        this.selection = [];
        this.search = "";
        this.selectedFolder = null;
        this.selectedStorage = null;

        channel.subscribe("storage.refresh", function (storage) {
            //console.log("what", storage);
            if (storage === self.selectedStorage) {
                updateList();
            }
        });

        $scope.selectAll = function () {
            angular.forEach(self.files, function (file) {
                file.isSelected = true;
            });
            this.updateSelection();
        };

        $scope.selectProfile = function (profile) {
            if (profile) {
                self.selectedStorage = profile.storage;
                profile.storage.refresh();
            } else {
                console.error("Profile does not exist!");
            }
        };

        $scope.openProjectFolder = function (folder) {
            if (self.selectedStorage) {
                self.selectedFolder = folder;
                self.directories = self.selectedStorage.directories(self.selectedFolder);
            }
        };

        $scope.refresh = function () {
            if (self.selectedStorage) {
                self.selectedStorage.refresh();
            }
        };

        $scope.unselectAll = function () {
            angular.forEach(self.files, function (file) {
                file.isSelected = false;
            });
            this.updateSelection();
        };

        $scope.updateSelection = function () {
            self.selection = self.selectedStorage.selection();
        };

        $scope.deleteSelection = function (event) {
            var text = "Are you sure you want to delete <br/>the <strong>" +
                self.selection.length + " files</strong> you have selected?" +
                "<br/>This action cannot be undone";
            confirmAction("Delete selection", text, ok, cancel, event, $element);
            function ok() {
                console.log("DELETING FILES!!!!!");
                $scope.updateSelection();
                self.selectedStorage.delete(self.selection, function success() {
                    self.selectedStorage.refresh();
                    $scope.updateSelection();
                }, function fail() {
                    self.selectedStorage.refresh();
                    $scope.updateSelection();
                });
            }

            function cancel() {
            }
        };

        function updateList() {

            //console.log("updateList", self);
            if (self.selectedStorage) {
                self.directories = self.selectedStorage.directories(self.selectedFolder);
                angular.forEach(self.files, function (file) {
                    var filterOut = false;
                    if (self.search && file._uri.indexOf(self.search) === -1) {
                        filterOut = true;
                    }
                    file.filterOut = filterOut;
                });
            }
        }

        $scope.$watch('storageFiles.search', function (searchTerm) {
            self.search = searchTerm;
            updateList();
        });

        if (profiles.visited()) {
            $scope.selectProfile(profiles.visited());
        } else if (profiles.authenticated()) {
            $scope.selectProfile(profiles.authenticated());
        }

        // Refresh All profiles
        angular.forEach(profiles.all(), function (profile) {
            profile.storage.refresh();
        });

        updateList();

    }
});
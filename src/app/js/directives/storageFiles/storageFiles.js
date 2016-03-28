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

    function StorageFilesController($element, $scope, profiles, confirmAction, postal) {
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

        postal.subscribe({
            channel: "storage",
            topic: "refresh",
            callback: function () {
                updateList();
            }
        });

        $scope.selectAll = function() {
            angular.forEach(self.files, function (file) {
                file.isSelected = true;
            });
            this.updateSelection();
        };

        $scope.selectProfile = function(profile) {
            self.selectedStorage = profile.storage;
            profile.storage.refresh();
        };

        $scope.openProjectFolder = function(folder) {
            if (self.selectedStorage) {
                self.directories = self.selectedStorage.directories(folder);
                self.selectedFolder = folder;
            }
        };

        $scope.refresh = function() {
            self.selectedStorage.refresh();
        };

        $scope.unselectAll = function() {
            angular.forEach(self.files, function (file) {
                file.isSelected = false;
            });
            this.updateSelection();
        };

        $scope.updateSelection = function() {
            self.selection = self.selectedStorage.selection();
        };

        $scope.deleteSelection = function(event) {
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
            function cancel() {}
        };

        function updateList() {
            //console.log("updateList", self);
            if (self.selectedStorage) {
                self.directories = self.selectedStorage.directories();
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
        } else {
            $scope.selectProfile(profiles.authenticated());
        }

        updateList();


    }
});
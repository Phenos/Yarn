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
        template:'<div class=project-tool flex=grow layout=row><md-content flex=40 class=list-of-folders md-whiteframe=10><md-button class="md-fab md-mini" ng-click=storageFiles.refresh() aria-label=Refresh><md-icon md-svg-icon=./svg-icons/refresh.svg></md-icon></md-button><div ng-repeat="profile in storageFiles.profiles._all | orderBy : \'priority\' : true"><section><md-subheader class=md-primary><img alt="{{ profile.shortUsername }}" ng-src="{{ profile.twitterProfile.profile_image_url | biggerProfileImage }}" class=avatar> {{ profile.shortUsername }}</md-subheader></section><md-list><md-list-item ng-class="{ selected: (storageFiles.selectedStorage === profile.storage && storageFiles.selectedFolder === false) }" ng-click="storageFiles.selectProfile(profile); storageFiles.openProjectFolder(false)">ALL PROJECTS FILES</md-list-item><md-list-item ng-repeat="folder in profile.storage.allProjectFolders" ng-class="{selected: (storageFiles.selectedFolder === folder)}" ng-click="storageFiles.selectProfile(profile); storageFiles.openProjectFolder(folder)"><md-icon md-svg-icon=./svg-icons/project.svg></md-icon><p>{{::folder.name }}</p></md-list-item><md-list-item ng-if="profile.username === storageFiles.profiles.authenticated().username" ui-sref=storageFiles.createNewProject()><md-icon md-svg-icon=./svg-icons/add.svg></md-icon><p>Create a new project...</p></md-list-item></md-list></div></md-content><div class=storageFiles md-whiteframe=10 flex=60 layout=column><header layout=row md-whiteframe=4><div flex=grow><md-input-container flex=grow md-no-float class=md-block><md-icon md-svg-src=/svg-icons/search.svg></md-icon><input ng-model=storageFiles.search type=text autocomplete=off placeholder="Enter search term"></md-input-container></div><div flex=noshrink ng-if=storageFiles.storage.isLoading layout=row layout-align="center center" style=min-width:50px><md-progress-circular md-mode=indeterminate md-diameter=30></md-progress-circular></div><div flex=auto style="white-space: nowrap;" ng-if=!storageFiles.storage.isLoading><span ng-if="storageFiles.selectedStorage.files.length > 0 && storageFiles.selection.length === 0"><md-button ng-click=storageFiles.selectAll()>Select all</md-button></span> <span ng-if="storageFiles.selection.length > 0"><md-button ng-click=storageFiles.deleteSelection($event)>Delete {{ storageFiles.selection.length }} files</md-button><md-button ng-click=storageFiles.unselectAll()>Unselect</md-button></span></div></header><md-content flex=grow><section ng-repeat="directory in storageFiles.directories | orderObjectBy:\'uri\'"><md-subheader ng-if=::directory.matches class=md-primary><md-icon md-svg-icon=./svg-icons/folder.svg></md-icon>/&nbsp;{{::directory.uri }}</md-subheader><md-list ng-if=::directory.matches class=list-of-files><md-list-item class="noright md-with-secondary" ng-if="::directory.files.length > 0" ng-click="storageFiles.select({ file: file })" ng-repeat="file in directory.files | filter: { filterOut: false }"><md-icon md-svg-icon=./svg-icons/storyFile.svg></md-icon><p><span class=filename>{{::file._filename }}</span> <span class=filesize>{{::file._sizeInKB }}kb</span></p><md-checkbox class=md-secondary ng-click=storageFiles.updateSelection() ng-model=file.isSelected aria-label=Select></md-checkbox></md-list-item></md-list></section></md-content></div></div>',
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
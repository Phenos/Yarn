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

    function StorageFilesController($element, $scope, storage, confirmAction) {
        var self = this;
        //console.log("StorageFilesController", storage);
        this.storage = storage;
        this.files = storage.files;
        this.selection = [];
        this.search = "";

        updateList();

        $scope.updateSelection = function() {
            self.selection = self.storage.selection();
            console.log("selection", self.selection);
        };

        $scope.deleteSelection = function(event) {
            var text = "Are you sure you want to delete <br/>the <strong>" +
                    self.selection.length + " files</strong> you have selected?" +
                    "<br/>This action cannot be undone";
            confirmAction("Delete selection", text, ok, cancel, event, $element);
            function ok() {
                console.log("DELETING FILES!!!!!")
            }
            function cancel() {}
        };

        function updateList() {
            //console.log(self.files);
            angular.forEach(self.files, function (file) {
                var filterOut = false;
                if (self.search && file._uri.indexOf(self.search) === -1) {
                    filterOut = true;
                }
                file.filterOut = filterOut;
            });
        }

        $scope.$watch('storageFiles.search', function (searchTerm) {
            self.search = searchTerm;
            updateList();
        });
    }
});
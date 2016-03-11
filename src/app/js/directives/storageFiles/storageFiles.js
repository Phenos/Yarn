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

    function StorageFilesController($scope, storage) {
        var self = this;
        //console.log("StorageFilesController", storage);
        this.storage = storage;
        this.files = storage.files;
        this.search = "";

        updateList();

        function updateList() {
            //console.log(self.files);
            angular.forEach(self.files, function (file) {
                var filterOut = false;
                if (self.search && file._uri.indexOf(self.search) === -1) {
                    filterOut = true;
                    console.log("no match")

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
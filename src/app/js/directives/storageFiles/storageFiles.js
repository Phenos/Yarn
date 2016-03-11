yarn.directive('storageFiles', function StorageFilesDirective() {
    return {
        restrict: 'E',
        bindToController: {
            select: "&"
        },
        scope: {},
        controllerAs: 'storageFiles',
        templateUrl: './html/storageFiles.html',
        controller: StorageFilesController
    };

    function StorageFilesController(storage) {
        console.log("StorageFilesController", storage);
        this.storage = storage;

        this.onSelect = function (file) {
            console.log("onSelect", file);
            this.select({file: file});
        }
    }
});
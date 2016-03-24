yarn.directive('projectTool', function ProjectTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/project.html',
        controller: function ProjectToolController($scope, editorFiles, editors, storage, IDE) {
            var self = this;

            $scope.open = function (file) {
                IDE.working(true);
                editorFiles.open(file, true);
                IDE.working(false);
            };

            $scope.update = function () {
                storage.refresh();
            };

            $scope.update();
        }
    };

});

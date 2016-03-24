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
                //console.log("open", file);
                editorFiles.open(file, true);
                editors.focus(file.uri.toString());
                IDE.working(false);
            };

            $scope.update = function () {
                console.log("what?");
                storage.refresh();
            };

            $scope.update();
        }
    };

});

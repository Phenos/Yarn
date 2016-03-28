yarn.directive('projectTool', function ProjectTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/project.html',
        controller: function ProjectToolController($scope, editorFiles, editors, profiles, IDE) {
            var self = this;

            $scope.open = function (file) {
                console.log("$scope.open", file);
                IDE.working(true);
                editorFiles.open(file.profile, file, true);
                IDE.working(false);
            };

            $scope.update = function () {
                if (profiles.authenticated()) {
                    if (profiles.authenticated().storage)
                        profiles.authenticated().storage.refresh();
                }
                if (profiles.visited()) {
                    if (profiles.visited().storage)
                        profiles.visited().storage.refresh();
                }
            };

            $scope.update();
        }
    };

});

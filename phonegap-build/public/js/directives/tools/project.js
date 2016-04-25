yarn.directive('projectTool', function ProjectTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div layout-fill layout=column><div layout-fill flex=100 layout=column><storage-files flex=100 layout=column select=open(file)></storage-files></div></div>',
        controller: function ProjectToolController($scope,
                                                   editorFiles,
                                                   editors,
                                                   profiles,
                                                   IDE) {

            $scope.open = function (file) {
//                console.log("$scope.open", file);
                IDE.working(true);
                editorFiles.open(file.profile, file, true);
                IDE.working(false);
            };

            $scope.update = function () {
                if (profiles.authenticated()) {
                    if (profiles.authenticated().storage) {
                        profiles.authenticated().storage.refresh();
                    }
                }
                if (profiles.visited()) {
                    if (profiles.visited().storage) {
                        profiles.visited().storage.refresh();
                    }
                }
            };

            $scope.update();
        }
    };

});

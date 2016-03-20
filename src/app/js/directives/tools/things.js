yarn.directive('thingsTool', function CommandsTool(things, state) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/things.html',
        controller: Controller
    };

    function Controller($scope) {


        $scope.update = function () {
            $scope.types = [];
            $scope.typesIndex = {};
            $scope.things = [];
            $scope.thingsIndex = {};
            $scope.assertions = [];

            var allAssertions = state.assertions.all();
            $scope.assertions = allAssertions.filter(function (assertion) {
                var keep = false;
                var type = $scope.typesIndex[assertion.object.id];
                var thing = $scope.thingsIndex[assertion.subject.id];
                if (assertion.predicate.id === "is") {
                    if (!thing) {
                        thing = {
                            object: assertion.subject,
                            count: 1
                        };
                        $scope.thingsIndex[assertion.subject.id] = thing;
                        $scope.things.push(thing);
                    } else {

                    }
                    if (!type) {
                        type = {
                            object: assertion.object,
                            selected: true,
                            count: 1
                        };
                        $scope.typesIndex[assertion.object.id] = type;
                        $scope.types.push(type);
                    } else {
                        type.count++;
                    }
                    keep = true;
                }
                return keep;
            });

            $scope.types.sort(function (A, B) {
                return (A.object.id > B.object.id) ? 1 : -1;
            });
            $scope.things.sort(function (A, B) {
                return (A.object.id > B.object.id) ? 1 : -1;
            });
        };

        $scope.update();
    }

});


yarn.directive('inspectorTool', function CommandsTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/inspector.html',
        controller: function Controller($scope, inspector, state, channel) {

            $scope.thingsFiltered = [];
            $scope.inspector = inspector;

            channel.subscribe("runtime.afterRun", function () {
                $scope.update();
            });

            $scope.filterByType = function (type) {
//                console.log("filterByType", type);
                if (type && type.object) {
                    $scope.filter = type.object.id;
                } else {
                    $scope.filter = null;
                }
                $scope.thingsFiltered = $scope.applyFilter();
            };

            $scope.selectThing = function (thing) {
                var token = {
                    value: thing.object.text(),
                    type: "camelcase"
                };
//                console.log("thing", thing);
                inspector.inspect(token);
            };

            $scope.applyFilter = function () {
                var results;
                if ($scope.filter) {
                    results = $scope.things.filter(function (thing) {
                        return thing.types.indexOf($scope.filter) > -1;
                    });
                } else {
                    results = $scope.things;
                }
                return results;
            };

            $scope.update = function () {
                $scope.types = [];
                $scope.typesIndex = {};
                $scope.things = [];
                $scope.thingsIndex = {};
                $scope.assertions = [];

                var allAssertions = state.assertions.all();
                $scope.assertions = allAssertions.filter(function (assertion) {
                    var type = $scope.typesIndex[assertion.object.id];
                    var thing = $scope.thingsIndex[assertion.subject.id];
                    if (assertion.predicate.id === "is") {
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
                    }
                    if (!thing) {
                        thing = {
                            object: assertion.subject,
                            types: []
                        };
                        $scope.thingsIndex[assertion.subject.id] = thing;
                        $scope.things.push(thing);
                    }
                    if (type) {
                        thing.types.push(type.object.id);
                    }
                });

                $scope.types.sort(function (A, B) {
                    return A.object.id.localeCompare(B.object.id);
                });

                $scope.things.sort(function (A, B) {
                    var value;
                    if (A.object.id) {
                        value = A.object.id.localeCompare(B.object.id);
                    }
                    return value;
                });

                $scope.thingsFiltered = $scope.applyFilter();
            };

            $scope.update();
        }
    };



});


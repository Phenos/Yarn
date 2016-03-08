
(function () {

    yarn.directive('graph', GraphDirective);

    function GraphDirective(state) {
        return {
            restrict: 'E',
            bindToController: {
                width: "=",
                height: "=",
                thingIsA: "=",
                predicate: "="
            },
            scope: true,
            controllerAs: 'graph',
            template: '',
            controller: GraphController
        };

        function GraphController($element, $timeout) {
            var width = this.width || 500;
            var height = this.height || 500;
            var thingIsA = this.thingIsA || "room";
            var predicate = this.predicate || "linksto";
            var force = d3.layout.force();
            var svg = d3.select($element[0]).append("svg")
                .attr("width", width)
                .attr("height", height);

            $timeout(buildGraph, 100);
            function buildGraph() {

                var things = state.things;
                var assertions = state.assertions;
                var nodes = [];
                var nodesIndex = {};
                var links = [];
                var radius = 140;
/*
                angular.forEach(things, function (thing) {
                    throw "Unrefactored";
                    //todo: This has not been refactored yet!
                    var isARoom = false;
                    var ThingsItIs = thing.resolve("is");
                    var label = thing.resolveValue("isNamed");
                    angular.forEach(ThingsItIs, function (thingItIs) {
                        if (thingItIs.id === thingIsA) isARoom = true;
                    });
                    if (isARoom) {
                        var index = nodes.length;
                        nodesIndex[thing.id] = index;
                        nodes.push({
                            id: thing.id,
                            name: label || thing.id,
                            group: index
                        })
                    }
                });

                //console.log("THINGS: ", things);
                //console.log("ASSERTIONS: ", assertions);

                angular.forEach(assertions, function (assertion) {
                    var sourceIndex = null;
                    var targetIndex = null;
                    if (assertion.predicate.id === predicate) {
                        if (angular.isObject(assertion.subject)) {
                            sourceIndex = nodesIndex[assertion.subject.id];
                        }
                        if (angular.isObject(assertion.object)) {
                            targetIndex = nodesIndex[assertion.object.id];
                        }
                        if (sourceIndex !== null && targetIndex !== null) {
                            links.push({
                                "source": sourceIndex,
                                "target": targetIndex,
                                "value": 1,
                                "predicate": assertion.predicate
                            });
                        }
                    }
                });

                force
                    .nodes(nodes)
                    .links(links)
                    .size([width, height])
                    .gravity(0)
                    .linkDistance(radius)
                    //.chargeDistance(120)
                    .charge(-500)
                    .start();

                var link = svg
                    .selectAll(".link")
                    .data(links)
                    .enter()
                    .append("line")
                    .attr("class", "link")
                    .attr("x1", function (d) {
                        return bound(d.source.x, 0, width);
                    })
                    .attr("y1", function (d) {
                        return bound(d.source.y, 0, height);
                    })
                    .attr("x2", function (d) {
                        return bound(d.target.x, 0, width);
                    })
                    .attr("y2", function (d) {
                        return bound(d.target.y, 0, height);
                    })
                    .attr("transform", "scale(1)");

                //var link = svg
                //    .selectAll(".link")
                //    .data(links)
                //    .enter()
                //    .append("line")
                //    .attr("class", "link");
                //
                var linkLabel = svg
                    .append("svg:g")
                    .selectAll("g.linklabelholder")
                    .data(force.links());


                linkLabel.enter()
                    .append("text")
                    .attr("class", "linklabel")
                    .text(function (d) {
                        return d.predicate.id;
                    });

                var node = svg.selectAll(".node")
                    .data(nodes)
                    .enter()
                    .append("g")
                    .attr("class", "node")
                    .call(force.drag);

                node
                    .append("circle")
                    .attr("r", 40);

                node
                    .append("text")
                    .text(function (d) {
                        return d.name.substring(0, 16);
                    });

                function bound(val, min, max) {
                    return Math.max(min + (radius/4), Math.min(max - (radius/4), val))
                }

                force.on("tick", function () {
                    linkLabel
                        .attr("y", function(d) { return (d.source.y + d.target.y) / 2; })
                        .attr("x", function(d) { return (d.source.x + d.target.x) / 2; });

                    link
                        .attr("x1", function (d) {
                            return bound(d.source.x, 0, width);
                        })
                        .attr("y1", function (d) {
                            return bound(d.source.y, 0, height);
                        })
                        .attr("x2", function (d) {
                            return bound(d.target.x, 0, width);
                        })
                        .attr("y2", function (d) {
                            return bound(d.target.y, 0, height);
                        })
                        .attr("transform", "scale(1)");

                    node
                        .attr("transform", function (d) {
                            var x = bound(d.x, 0, width);
                            var y = bound(d.y, 0, height);
                            d.x = x;
                            d.y = y;
                            return "scale(1)translate(" + x + "," + y + ")";
                        });

                    //debugger;

                });
*/
            }
        }
    }
})();
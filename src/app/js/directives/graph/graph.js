yarn.directive('graph', function GraphDirective(state, assert) {
    return {
        restrict: 'E',
        bindToController: {
            thingIsA: "=",
            predicate: "="
        },
        scope: true,
        controllerAs: 'graph',
        template: '',
        controller: GraphController
    };

    function GraphController($element, $timeout, graph) {
        var self = this;
        var thingIsA = this.thingIsA || "room";
        var predicate = this.predicate.toLowerCase() || "linksto";
        var force = d3.layout.force();


        var onZoom = function() {};
        var doZoom = function () {
            onZoom();
        };
        var zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(10)
            .scaleExtent([1,20])
            .on("zoom", doZoom);


        var svg = d3
            .select($element[0])
            .append("svg")
            .call(zoom);


        var currentModel;
        //console.log("svg", svg);

        graph.register(this);
        postal.subscribe({
            channel: "runtime",
            topic: "afterRun",
            callback: function () {
                self.update();
            }
        });

        this.update = function (newModel) {
            var model = newModel || currentModel;
            currentModel = model;
            var self = this;
            svg.selectAll("*").remove();
            $timeout(function () {
                var _model = model || self.models.containers;
                buildGraph(_model);
            }, 100);
        };

        this.model = function (id) {
            var model = this.models[id];
            if (model) {
                this.update(model)
            }
            //console.log("id", id);
        };

        this.models = {
            rooms: roomsModel,
            containers: containerModel,
            events: eventsModel
        };

        function roomsModel() {
            var links = [];
            var nodes = [];
            var nodesIndex = {};
            var assertions = state.assertions.all();

            var thingsOfThatSort = state.resolveAll(assert(undefined, "is", thingIsA));
            angular.forEach(thingsOfThatSort, function (thing) {
                var label = thing.label();
                var index = nodes.length;
                nodesIndex[thing.id] = index;
                nodes.push({
                    id: thing.id,
                    name: label || thing.id,
                    group: index
                })
            });

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

            return {
                nodes: nodes,
                links: links
            }
        }

        function containerModel() {
            var links = [];
            var nodes = [];
            var nodesIndex = {};
            var assertions = state.assertions.all();

            function setOrGetNode(thing) {
                var node = nodesIndex[thing.id];
                if (!node) {
                    var label = thing.label();
                    var group = nodes.length;
                    node = {
                        id: thing.id,
                        name: label || thing.id,
                        group: group,
                        weight: 1
                    };
                    nodesIndex[thing.id] = node;
                    nodes.push(node);
                }
                return node.group;
            }

            angular.forEach(assertions, function (assertion) {
                var sourceIndex = null;
                var targetIndex = null;
                if (assertion.predicate.id === "isin") {
                    sourceIndex = setOrGetNode(assertion.subject);
                    targetIndex = setOrGetNode(assertion.object);
                    links.push({
                        "source": sourceIndex,
                        "target": targetIndex,
                        "value": 1,
                        "predicate": "is in"
                    });
                }
            });

            //console.log(nodes, links, nodesIndex);

            return {
                nodes: nodes,
                links: links
            }
        }

        function eventsModel() {

        }

        function buildGraph(model) {
            var modelData;
            if (model) modelData = model();
            if (modelData.nodes.length) {

                var nodes = modelData.nodes;
                var links = modelData.links;

                onZoom = function zoomed() {
                    node.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    link.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    linkLabel.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    //features.select(".state-border").style("stroke-width", 1.5 / d3.event.scale + "px");
                    //features.select(".county-border").style("stroke-width", .5 / d3.event.scale + "px");
                };

                var radius = 140;

                var width = svg[0][0].clientWidth;
                var height = svg[0][0].clientHeight;

                //responsive SVG needs these 2 attributes and no width and height attr
                svg.attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 " + width + " " + height);

                //console.log("width, height", width, height);
                //console.log("thingIsA", thingIsA);

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
                        return d.source.x;
                        //return bound(d.source.x, 0, width);
                    })
                    .attr("y1", function (d) {
                        return d.source.y;
                        //return bound(d.source.y, 0, height);
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                        //return bound(d.target.x, 0, width);
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                        //return bound(d.target.y, 0, height);
                    })
                    //.attr("transform", "scale(0.5)");
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
                    return Math.max(min + (radius / 4), Math.min(max - (radius / 4), val))
                }

                force.on("tick", function () {
                    linkLabel
                        .attr("y", function (d) {
                            return (d.source.y + d.target.y) / 2;
                        })
                        .attr("x", function (d) {
                            return (d.source.x + d.target.x) / 2;
                        });

                    link
                        .attr("x1", function (d) {
                            return d.source.x;
                            //return bound(d.source.x, 0, width);
                        })
                        .attr("y1", function (d) {
                            return d.source.y;
                            //return bound(d.source.y, 0, height);
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                            //return bound(d.target.x, 0, width);
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                            //return bound(d.target.y, 0, height);
                        })
                        .attr("transform", "scale(1)");
                        //.attr("transform", "scale(0.5)");

                    node
                        .attr("transform", function (d) {
                            var x = d.x;
                            var y = d.y;
                            //var x = bound(d.x, 0, width);
                            //var y = bound(d.y, 0, height);
                            d.x = x;
                            d.y = y;
                            return "scale(1)translate(" + x + "," + y + ")";
                            //return "scale(0.5)translate(" + x + "," + y + ")";
                        });

                    // soft-center the root node
                    //var k = .01;
                    var k = .09;
                    var nodes = force.nodes();
                    nodes[0].y += (height / 2 - nodes[0].y) * k;
                    nodes[0].x += (width / 2 - nodes[0].x) * k;

                });
            }
        }
    }
});

yarn.service('graph', function graphService() {

    var service = {
        controller: null
    };

    service.register = function (controller) {
        service.controller = controller;
    };

    service.update = function () {
        service.controller && service.controller.update();
    };

    service.model = function (id) {
        service.controller && service.controller.model(id);
    };


    return service;
});

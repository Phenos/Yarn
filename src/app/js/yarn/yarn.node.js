(function () {
    "use strict";
    angular.module('yarn').factory('Node', NodeService);

    function NodeService() {
        function Node(type, value, variant) {
            this.type = type;
            this.variant = variant;
            this.value = value;
            this.set = new Set();
            this.resolvedTo = null; // To which object or predicate the node has resolved to
        }

        Node.prototype.html = function () {
            var html = [];
            html.push("<div class='node'>");
            html.push(
                "<span class='label'><span class='value'>" +
                this.value.substr(0, 80) +
                "</span> <span class='type'>"
                + this.type +
                "</span>");
            if (this.variant) html.push("<span class='variant'>" + this.variant + "</span>");
            html.push("</span>");
            html.push(this.set.html());
            html.push("</div>");
            return html.join("");
        };


        // todo: Put Set in its own service
        function Set() {
            this.nodes = [];
        }

        Set.prototype.html = function () {
            var html = [];
            html.push("<div class='set'>");
            this.nodes.forEach(function (node) {
                html.push(node.html());
            });
            html.push("</div>");
            return html.join("");
        };

        Set.prototype.add = function (node) {
            this.nodes.push(node);
            return this;
        };

        Set.prototype.last = function () {
            return this.nodes[this.nodes.length - 1];
        };


        return Node;
    }


})();


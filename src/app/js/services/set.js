yarn.service("Set", function () {

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

    return Set;
});
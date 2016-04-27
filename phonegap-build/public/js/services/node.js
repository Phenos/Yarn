yarn.service('Node', function NodeService(Set) {

    function Node(type, value, variant) {
        this.type = type;
        this.variant = variant;
        this.value = value;
        this.set = new Set();
        this.source = null;
        this.resolvedTo = null; // To which object or predicate the node has resolved to
    }

    Node.prototype.html = function () {
        var html = [];
        var value = this.value.toString().substr(0, 80) || "-";
        html.push("<div class='node'>");
        html.push(
            "<span class='label'><span class='value'>" +
            value +
            "</span> <span class='type'>"
            + this.type +
            "</span>");
        if (this.variant) {
            html.push("<span class='variant'>" + this.variant + "</span>");
        }
        html.push("</span>");
        html.push(this.set.html());
        html.push("</div>");
        return html.join("");
    };

    return Node;
});


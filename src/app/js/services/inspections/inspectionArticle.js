yarn.service("InspectionArticle", function () {

    function InspectionArticle(title, type, directive, scope) {
        this.title = title;
        this.type = type;
        this.directive = directive;
        this.scope = scope;
        this.actions = [];
    }

    InspectionArticle.prototype.addAction = function (label, icon, callback) {
        var action = new InspectorAction(label, icon, callback);
        this.actions.push(action);
    };

    function InspectorAction(label, icon, callback) {
        this.label = label;
        this.icon = icon;
        this.callback = callback;
    }

    return InspectionArticle;

});


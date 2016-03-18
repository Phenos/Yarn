yarn.service("InspectionArticle", function () {

    function InspectionArticle(title, type, directive, scope) {
        this.title = title;
        this.type = type;
        this.directive = directive;
        this.scope = scope;
    }
    return InspectionArticle;

});


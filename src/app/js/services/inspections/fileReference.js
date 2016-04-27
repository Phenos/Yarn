yarn.service("fileReferenceInspection", function fileReferenceInspection(InspectionArticle,
                                                                         URI,
                                                                         editorFiles,
                                                                         editors,
                                                                         $window) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {
        if (token && token.type === "string") {
            var txt = token.value.substring(1, token.value.length - 1);
            if (
                txt.substring(0, 1) === "/" ||
                txt.substring(0, 2) === "./" ||
                txt.substring(0, 3) === "../" ||
                txt.substring(0, 5) === "http:" ||
                txt.substring(0, 6) === "https:"
            ) {

                var scope = {};

                if (token && token.value) {
                    scope.title = "File Reference";
                    scope.type = "fileReference";
                    scope.openInBrowser = openInBrowser;
                    scope.openInEditor = openInEditor;
                    scope.url = txt;
                }

                var article = new InspectionArticle("File Reference", "fileReference", "file-reference-inspection", scope);
                article.addAction("Open in editor", "load", function () {
                    openInEditor();
                });
                article.addAction("Open in browser", "browser", function () {
                    openInBrowser();
                });
                //console.log("article", article);

                yeld(article);
            }
        }

        function openInBrowser() {
            var absoluteURI = URI(txt).absoluteTo(token.file.uri).toString();
            $window.open(absoluteURI, "_blank");
        }

        function openInEditor() {
            var absoluteURI = URI(txt).absoluteTo(token.file.uri).toString();
            //console.log(absoluteURI);
            editorFiles.open(token.file.profile, absoluteURI, true);
            editors.focus(absoluteURI);

        }
    }

});

yarn.directive('fileReferenceInspection', function fileReference() {
    return {
        replace: true,
        templateUrl: "./html/inspections/fileReference.html",
        controller: function ($scope) {
        }
    };
});

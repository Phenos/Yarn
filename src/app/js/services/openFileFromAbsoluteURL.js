yarn.service("openFileFromAbsoluteURL", function (URI, profiles, yConsole, editorFiles) {

    function openFileFromAbsoluteURL(_uri, line) {
        var uri = new URI(_uri);
        if (uri.hostname() === "storage.yarnstudio.io") {
            var path = uri.path().split("/");
            path.shift(); //Remove the first slash
            var username = path.shift();
            var profile = profiles.get(username);
            var newPath = new URI(path.join("/"));
            console.log("username", username);

            editorFiles.open(profile, newPath.toString(), true, line);
        } else {
            yConsole.error("This files cannot be open from the cloud storage : " + _uri)
        }
    }

    return openFileFromAbsoluteURL;
});
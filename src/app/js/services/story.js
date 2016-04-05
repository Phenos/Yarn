yarn.service("Story", function (URI) {


    function Story(id, profile) {
        this.id = id;
        this.profile = profile;

        var uri = [
            "/",
            this.profile.username,
            "/",
            this.id,
            "/story.txt"
        ].join("");

        this.url = new URI(uri);

    }

    return Story;

});
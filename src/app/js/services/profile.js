yarn.service("Profile", function (Storage) {

    function Profile(username, user) {
        this.username = username;
        this.user = user || null;
        this.storage = new Storage(this);
    }

    return Profile;

});
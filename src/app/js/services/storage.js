yarn.service("storage", function (EditorFile) {

    function Storage() {
        this.files = [];
    }

    Storage.prototype.add = function (uri) {
        var file = new EditorFile(uri);
        this.files.push(file);
        return file;
    };

    Storage.prototype.clear = function (uri) {
        this.files = [];
        return this;
    };

    Storage.prototype.refresh = function (uri) {
        this.clear();

        this.add("./story.yarn.txt");
        this.add("./chapters/rooms.yarn.txt");
        this.add("./chapters/things.yarn.txt");
        this.add("./chapters/the-unflushed-toilet.yarn.txt");
        this.add("./chapters/dialogs.yarn.txt");
        this.add("./chapters/kitchen.yarn.txt");
        this.add("./chapters/lorem.yarn.txt");
        this.add("./chapters/ipsum.yarn.txt");
        this.add("./POTATOT/dolor.yarn.txt");
        this.add("./chapters/sit.yarn.txt");
        this.add("./asd/amet.yarn.txt");
        this.add("./chapters/inni.yarn.txt");
        this.add("./chapters/mini.yarn.txt");
        this.add("./092384/minie.yarn.txt");
        this.add("./zxc/moe.yarn.txt");

        return this;
    };

    return new Storage();
});
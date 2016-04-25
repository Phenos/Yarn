yarn.service("storyLocalStorage", function ($localStorage) {

    function StoryLocalStorage() {
        this._uid = "anonymous";
    }

    StoryLocalStorage.prototype.uid = function (value) {
        if (angular.isString(value)) {
            this._uid = value;
        }
        return this._uid;
    };

    StoryLocalStorage.prototype.get = function (key) {
//        console.log("=== StoryLocalStorage ===>", this.uid());
        var storyKey = this.uid();
        var storyStorage = $localStorage[storyKey];
        if (angular.isUndefined(storyStorage)) {
            storyStorage = $localStorage[storyKey] = {};
        }
        if (angular.isString(key)) {
            if (angular.isUndefined(storyStorage[key])) {
                storyStorage[key] = {};
            }
            storyStorage = storyStorage[key];
        }
        return storyStorage;
    };

    return new StoryLocalStorage();

});
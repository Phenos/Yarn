yarn.factory('rememberLastStory', rememberLastStory);

function rememberLastStory($localStorage) {

    function RememberLastStory () {

        this.init = function () {
            if (!$localStorage.rememberedLastStory) {
                $localStorage.rememberedLastStory = {
                    lastStory: null
                }
            }
        };

        this.get = function () {
            if (!$localStorage.rememberedLastStory) this.init();
            return $localStorage.rememberedLastStory.lastStoryURL;
        };

        this.remember = function (url) {
            if (!$localStorage.rememberedLastStory) this.init();
            $localStorage.rememberedLastStory.lastStoryURL = url;
        };

        this.forget = function () {
            if (!$localStorage.rememberedLastStory) this.init();
            $localStorage.rememberedLastStory.lastStoryURL = "";
        };

        this.init();

    }


    return new RememberLastStory();
}

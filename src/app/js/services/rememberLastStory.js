angular.module('yarn').factory('rememberLastStory', rememberLastStory);

function rememberLastStory($localStorage) {

    function RememberLastStory () {

        if (!$localStorage.rememberedLastStory) {
            $localStorage.rememberedLastStory = {
                lastStory: null
            }
        }


        this.get = function () {
            return $localStorage.rememberedLastStory.lastStoryURL;
        };

        this.remember = function (url) {
            $localStorage.rememberedLastStory.lastStoryURL = url;
        };

        this.forget = function () {
            $localStorage.rememberedLastStory.lastStoryURL = "";
        };

    }


    return new RememberLastStory();
}

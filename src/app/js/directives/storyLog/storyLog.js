(function() {

angular.module('mindgame').directive('storyLog', StoryLogDirective);

function StoryLogDirective() {
    return {
        restrict: 'E',
        bindToController: {
            ready: "&"
        },
        scope: {},
        controllerAs: 'storyLog',
        //template: '<div class="logItems">{{ userInput.text }}</div>',
        controller: StoryLogController
    };

    function StoryLogController($scope, $element, $compile) {

        this.log = function (text) {
            this.write(text, "log");
        };

        this.debug = function (text) {
            this.write(text, "debug");
        };

        this.error = function (text) {
            this.write(text, "error");
        };

        this.heading = function (text) {
            this.write(text, "heading");
        };

        this.subHeading = function (text) {
            this.write(text, "subHeading");
        };

        this.divider = function (text) {
            this.write(text, "divider");
        };

        this.write = function (text, type) {
            var scope = $scope.$new();
            scope.text = text;
            scope.type = type;
            var logItemEl = $compile('<log-item type="type" text="text"></log-item>')(scope);
            $element.append(logItemEl);
        };
        this.ready({storyLog: this});

    }
}

})();

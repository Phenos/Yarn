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
            var scope = $scope.$new();
            scope.text = text;
            var logItemEl = $compile('<log-item text="text"></log-item>')(scope);
            console.log("storyLog.log", text);
            $element.append(logItemEl);
        };

        this.ready({storyLog: this});

    }
}

})();

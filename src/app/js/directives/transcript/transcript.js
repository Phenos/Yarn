(function () {

    yarn.directive('transcript', transcriptDirective);

    function transcriptDirective(transcript) {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            replace: false,
            controllerAs: 'transcript',
            templateUrl: './html/transcript.html',
            controller: transcriptController
        };

        function transcriptController($scope, $element) {

            this.items = transcript.items;

        }
    }

})();

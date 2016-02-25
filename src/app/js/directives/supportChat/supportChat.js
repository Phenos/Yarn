(function () {

    yarn.directive('supportChat', SupportChatDirective);

    function SupportChatDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'supportChat',
            templateUrl: './html/supportChat.html',
            controller: SupportChatController
        };

        function SupportChatController() {
        }
    }

})();

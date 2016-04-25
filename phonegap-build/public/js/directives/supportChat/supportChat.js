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
            template:'',
            controller: SupportChatController
        };

        function SupportChatController() {
        }
    }

})();

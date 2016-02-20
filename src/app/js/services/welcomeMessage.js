"use strict";
angular.module('yarn').factory('welcomeMessage', WelcomeMessageService);

function WelcomeMessageService($mdDialog,
                               sidebarService,
                               $localStorage) {

    var numberOfTimeToOpen = 3;
    var useFullScreen = false;

    var service = {};

    service.open = function (ev) {

        sidebarService.close();

        $mdDialog.show({
            controller: WelcomeMessageController,
            templateUrl: './html/aboutPrototypeDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });

    };

    service.openIfNew = function () {
        if (!$localStorage.welcomeMessageService_NumberOfOpens) {
            $localStorage.welcomeMessageService_NumberOfOpens = 1;
        } else {
            $localStorage.welcomeMessageService_NumberOfOpens++;
        }
        if ($localStorage.welcomeMessageService_NumberOfOpens <= numberOfTimeToOpen) {
            service.open();
        }
    };

    function WelcomeMessageController($scope, $mdDialog) {
        $scope.close = function () {
            $mdDialog.cancel();
        };
    }

    return service;
}

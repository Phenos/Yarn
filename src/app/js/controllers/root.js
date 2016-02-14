"use strict";
angular.module('yarn').controller('root', rootController);


function rootController(Story,
                        user,
                        metadata,
                        gameController,
                        $scope,
                        $window,
                        $mdDialog,
                        $mdSidenav,
                        $mdMedia,
                        yConsole,
                        rememberLastStory,
                        $localStorage,
                        electronDevTools) {

    function runStory(story) {
        var url = "http://storage.yarnstudio.io/" + user.username + "/story.yarn.txt";
        rememberLastStory.forget();
        gameController.loadFromSource(story.content, url);
    }

    if (user && user.username) {
        $scope.avatar = user.profiles[0].profile.photos[0].value;
        $scope.username = user.profiles[0].profile.displayName;
    }
    $scope.metadata = metadata;


    function redirectToLogin() {
        $window.location.href = "/login";
    }


    $scope.openProfileMenu = function () {

    }

    $scope.openSidenav = function () {
        $mdSidenav("leftSidebar").open();
    };
    $scope.closeSidenav = function () {
        $mdSidenav("leftSidebar").close();
    };

    $scope.logout = function () {
        $window.location.href = "/auth/logout";
    };

    $scope.openAboutPrototypeDialog = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdSidenav("leftSidebar").close();

        $mdDialog.show({
                controller: aboutPrototypeDialogController,
                templateUrl: './html/aboutPrototypeDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });

        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });

        function aboutPrototypeDialogController($scope, $mdDialog) {
            $scope.close = function() {
                $mdDialog.cancel();
            };
        }
    };


    openAboutDialogIfFirstTime();

    function openAboutDialogIfFirstTime() {
        var maxCount = 3;
        if (!$localStorage.numberOfTimeAboutDialogIsOpened) {
            $localStorage.numberOfTimeAboutDialogIsOpened = 1;
        } else {
            $localStorage.numberOfTimeAboutDialogIsOpened ++;
        }
        if ($localStorage.numberOfTimeAboutDialogIsOpened <= maxCount) {
            $scope.openAboutPrototypeDialog();
        }

    }

}

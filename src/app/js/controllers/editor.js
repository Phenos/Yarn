"use strict";
angular.module('yarn').controller('webIDE', WebIDEController);


function WebIDEController(Story,
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
                          editorService,
                          electronDevTools) {

    $scope.user = user;

    $scope.editorFlexHeight = 75;
    $scope.consoleFlexHeight = 25;

    // todo: Put menu setup in separate service

    if (typeof require !== "undefined") {

        var remote = require('remote');
        var Menu = remote.Menu;
        var app = remote.app;

        var mainMenuTemplate = [
            {
                label: "Files",
                submenu: [
                    {
                        label: 'Load Script', click: menuItemLoadScript
                    }
                ]
            }, {
                label: "View",
                submenu: [
                    {
                        label: 'Developer Tools', click: menuItemDevTools
                    }
                ]
            }, {
                label: 'Window',
                role: 'window',
                submenu: [
                    {
                        label: 'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        role: 'minimize'
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+W',
                        role: 'close'
                    }
                ]
            }
        ];

        if (process.platform == 'darwin') {
            var name = remote.app.getName();
            mainMenuTemplate.unshift({
                label: "Yarn",
                submenu: [
                    {
                        label: 'About Yarn',
                        role: 'about'
                    },
                    {
                        type: 'separator'
                    },
                    //{
                    //    label: 'Services',
                    //    role: 'services',
                    //    submenu: []
                    //},
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Hide ' + name,
                        accelerator: 'Command+H',
                        role: 'hide'
                    },
                    {
                        label: 'Hide Others',
                        accelerator: 'Command+Shift+H',
                        role: 'hideothers'
                    },
                    {
                        label: 'Show All',
                        role: 'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: function () {
                            app.quit();
                        }
                    }
                ]
            });
            // Window menu.
            mainMenuTemplate[3].submenu.push(
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    role: 'front'
                }
            );
        }

        var menu = Menu.buildFromTemplate(mainMenuTemplate);
        Menu.setApplicationMenu(menu);

        function menuItemLoadScript() {
            // todo: This code is duplicated... make common
            var url = dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                    {name: 'Yarn script', extensions: ['yarn']}
                    //{ name: 'All Files', extensions: ['*'] }
                ]
            });

            if (url) {
                // Replace windows back slashes to forward slashes
                url = "file://" + url;
                rememberLastStory.remember(url);
                gameController.loadFromURL(url);
            }
        }

        function menuItemDevTools() {
            electronDevTools.toggle();
        }

    }


    // Try to load a story for the current user...
    // if non exists, a default one is created
    function findOrCreateUserStory(user, success, failure) {
        if (user) {
            Story.findOne({where: {user: user.username}}, function (story) {
                success(story);
            }, function (err) {
                console.log("No story found", err);
                createDefaultStory(user, success, failure);
            });
        } else {
            console.log("No user found. No story will be loaded by default.")
        }
    }

    function createDefaultStory(user, success, failure) {
        console.log("Creating default story for user");
        Story.create({
            guid: "123456789",
            username: user.username,
            content: "!!!POTATOE!!!"
        }, function (story) {
            console.log("Default story created: ", story);
            success(story);
        }, failure);
    }


    findOrCreateUserStory(user, function (story) {
        console.log("Default story found", story);
        $scope.currentStory = story;
    }, function (error) {
        console.log("Failed while getting the default user story", error);
    });

    $scope.saveAndRun = function () {
        saveStory(function (story) {
            runStory(story);
        }, function () {
            $mdDialog.show(
                $mdDialog
                    .alert()
                    //.parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Oups!')
                    .textContent('A problem occured while saving your story. Your changes were not saved.')
                    .ok('Ok')
                //.targetEvent(ev)
            );
        })
    };

    function saveStory(success, failure) {
        console.log($scope.currentStory);
        $scope.currentStory.$save(
            function (story) {
                console.log("Story saved!");
                if (success) success(story);
            },
            function (error) {
                console.error("Problem while saving the story", error);
                if (failure) failure(error);
            }
        )
    }


    function runStory(story) {
        var url = "http://storage.yarnstudio.io/" + user.username + "/story.yarn.txt";
        rememberLastStory.forget();
        gameController.loadFromSource(story.content, url);
    }

    $scope.avatar = user.profiles[0].profile.photos[0].value;
    $scope.username = user.profiles[0].profile.displayName;

    $scope.metadata = metadata;


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
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });

        function aboutPrototypeDialogController($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.cancel();
            };
        }
    };


    doWelcomeMessage(metadata);
    doLoadRememberedStory();
    openAboutDialogIfFirstTime();

    function openAboutDialogIfFirstTime() {
        var maxCount = 3;
        if (!$localStorage.numberOfTimeAboutDialogIsOpened) {
            $localStorage.numberOfTimeAboutDialogIsOpened = 1;
        } else {
            $localStorage.numberOfTimeAboutDialogIsOpened++;
        }
        if ($localStorage.numberOfTimeAboutDialogIsOpened <= maxCount) {
            $scope.openAboutPrototypeDialog();
        }

    }

    $scope.onConsoleEscapeFocus = function () {
        $scope.editorFlexHeight = 75;
        $scope.consoleFlexHeight = 25;
        editorService.focus();
    };

    $scope.onConsoleFocus = function () {
        $scope.editorFlexHeight = 25;
        $scope.consoleFlexHeight = 75;
    };

    function doWelcomeMessage(metadata) {

        yConsole.log("Welcome to <strong>Yarn!</strong> <em>v" + metadata.version + "</em>");
        yConsole.hint('Type <strong>CTRL+H</strong> or enter "<strong>help</strong>" in the command-line bellow to see available commands!')
    }

    function doLoadRememberedStory() {
        // Reload the story that was previously loaded
        var rememberedStory = rememberLastStory.get();
        if (rememberedStory) {
            yConsole.log("Story address found in memory");
            gameController.loadFromURL(rememberedStory);
        } else {
            yConsole.log("No story to load from either memory or url");
            yConsole.hint("To load a story you can use the LOAD command. Ex.: LOAD http://somtehing.com/yourStoryFile.txt");
        }
        electronDevTools.remember();
    }


}

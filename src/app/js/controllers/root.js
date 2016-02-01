"use strict";
angular.module('yarn').controller('root', rootController);


function rootController(User,
                        Story,
                        metadata,
                        gameController,
                        $http,
                        $scope,
                        yConsole,
                        loadMetadata,
                        rememberLastStory,
                        electronDevTools) {


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

    $scope.metadata = metadata;
    loadMetadata().then(onGameReady);

    function onGameReady(metadata) {
        doWelcomeMessage(metadata);
        doLoadRememberedStory();
    }

    function doWelcomeMessage(metadata) {


        console.log("------------------------");
        console.log("User.isAuthenticated()", User.isAuthenticated());
        console.log("User.getCurrentId()", User.getCurrentId());
        console.log("User.email", User.email);
        console.log("User", User);

        //$http({
        //    method: 'GET',
        //    url: '/auth/account/json'
        //}).then(function (res) {
        //
        //    console.log("USER: JSON FOUND!");
        //    if (res.data.username) {
        //        console.log("USER: FOUND: ", res.data.username);
        //        console.log("USER: Data ", res);
        //        credentials = res.data.profiles[0].credentials;
        //        console.log("USER: Using credentials: ", credentials);
        //    } else {
        //        console.log("USER: No user logged in", res);
        //    }
        //}, function (res) {
        //    console.log("USER: JSON NOT FOUND! FAIL!", res);
        //});


        //var filter = {filter: {where: {/* id: 0 */}}};
        //var story = Story.find(
        //    filter,
        //    function (list) {
        //        console.log("RESULT: list", list);
        //    },
        //    function (errorResponse) {
        //        console.log("RESULT: errorResponse", errorResponse);
        //    }
        //);
        //console.log("story: ", story.$promise);
        //story.$promise.then(function (a, b) {
        //    console.log("story2: ", a, b);
        //});


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

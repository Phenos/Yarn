
/*
TEMPORARY LOCATION FOR UNUSED MENU CODE
 */
//
//if (typeof require !== "undefined") {
//
//    var remote = require('remote');
//    var Menu = remote.Menu;
//    var app = remote.app;
//
//    var mainMenuTemplate = [
//        {
//            label: "Files",
//            submenu: [
//                {
//                    label: 'Load Script', click: menuItemLoadScript
//                }
//            ]
//        }, {
//            label: "View",
//            submenu: [
//                {
//                    label: 'Developer Tools', click: menuItemDevTools
//                }
//            ]
//        }, {
//            label: 'Window',
//            role: 'window',
//            submenu: [
//                {
//                    label: 'Minimize',
//                    accelerator: 'CmdOrCtrl+M',
//                    role: 'minimize'
//                },
//                {
//                    label: 'Close',
//                    accelerator: 'CmdOrCtrl+W',
//                    role: 'close'
//                }
//            ]
//        }
//    ];
//
//    if (process.platform == 'darwin') {
//        var name = remote.app.getName();
//        mainMenuTemplate.unshift({
//            label: "Yarn",
//            submenu: [
//                {
//                    label: 'About Yarn',
//                    role: 'about'
//                },
//                {
//                    type: 'separator'
//                },
//                //{
//                //    label: 'Services',
//                //    role: 'services',
//                //    submenu: []
//                //},
//                {
//                    type: 'separator'
//                },
//                {
//                    label: 'Hide ' + name,
//                    accelerator: 'Command+H',
//                    role: 'hide'
//                },
//                {
//                    label: 'Hide Others',
//                    accelerator: 'Command+Shift+H',
//                    role: 'hideothers'
//                },
//                {
//                    label: 'Show All',
//                    role: 'unhide'
//                },
//                {
//                    type: 'separator'
//                },
//                {
//                    label: 'Quit',
//                    accelerator: 'Command+Q',
//                    click: function () {
//                        app.quit();
//                    }
//                }
//            ]
//        });
//        // Window menu.
//        mainMenuTemplate[3].submenu.push(
//            {
//                type: 'separator'
//            },
//            {
//                label: 'Bring All to Front',
//                role: 'front'
//            }
//        );
//    }
//
//    var menu = Menu.buildFromTemplate(mainMenuTemplate);
//    Menu.setApplicationMenu(menu);
//
//    function menuItemLoadScript() {
//        // todo: This code is duplicated... make common
//        var url = dialog.showOpenDialog({
//            properties: ['openFile'],
//            filters: [
//                {name: 'Yarn script', extensions: ['yarn']}
//                //{ name: 'All Files', extensions: ['*'] }
//            ]
//        });
//
//        if (url) {
//            // Replace windows back slashes to forward slashes
//            url = "file://" + url;
//            rememberLastStory.remember(url);
//            gameController.loadFromURL(url);
//        }
//    }
//
//    function menuItemDevTools() {
//        electronDevTools.toggle();
//    }
//
//}

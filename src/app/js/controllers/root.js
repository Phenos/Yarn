yarn.controller('root', function rootController(user,
                                                $localStorage,
                                                $scope,
                                                $element,
                                                IDE,
                                                yConsole,
                                                welcomeMessage,
                                                editorFiles,
                                                root,
                                                wallpaper,
                                                tools,
                                                $timeout,
                                                fireOnResizeEvent,
                                                globalContextMenu,
                                                $state,
                                                state,
                                                session,
                                                profiles,
                                                Profile,
                                                Story) {

//    console.log("state.params:", $state);
    $scope.IDE = IDE;
    // TODO: Move theme dependency in "player" directive
    $scope.state = state;
    $scope.editorFiles = editorFiles;

    if (user) {
        $scope.user = user; // Note: User not yet in a service, resolved in route instead
        profiles.authenticated(new Profile(user.username, user));
    }


    // Used by the global context menu
    globalContextMenu.register($scope, $element);

    // Restore previously openned files
    state.reloadFromLocalStorage();

    $scope.toolTabs = {
        selected: 0
    };

    wallpaper.change({
        image: "/images/splash/splash-bg.jpg",
        layout: "fullscreen"
    });

    IDE.register($scope);

    // Register with the service
    root.register($scope);

    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line" +' +
        '"bellow to see available commands!');

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

    // TODO: Move openMain and dependency on "editorFiles" into an IDE directive
    $scope.openMain = function () {
        if (state.story) {
            editorFiles.open(state.story.profile, state.story.url.toString(), true);
        }
    };

    /*

     Height permutation between Console and Editor on focus events

     */
    $scope.editorFlexHeight_default = 100;
    $scope.consoleFlexHeight_default = 0;
    $scope.editorFlexHeight = $scope.editorFlexHeight_default;
    $scope.consoleFlexHeight = $scope.consoleFlexHeight_default;
    $scope.onConsoleEscapeFocus = function () {
        $scope.editorFlexHeight = 100;
        $scope.consoleFlexHeight = 0;
    };
    $scope.onConsoleFocus = function () {
        $scope.editorFlexHeight = 50;
        $scope.consoleFlexHeight = 50;
    };

    $scope.focusInspector = function () {
//        console.log($scope.toolTabs.selected);
        $scope.toolTabs.selected = 1;
    };

    $scope.focusConsole = function () {
        $scope.toolTabs.selected = 0;
    };


    $scope.toggleTools = function (value) {
        // Trigger window resize to fix a glitch with the grid resize
        $timeout(function () {
            fireOnResizeEvent();
        }, 500);
        if (angular.isDefined(value)) {
            $scope.toolsAreVisible = value;
            if ($scope.toolsAreVisible) {
                $scope.onConsoleFocus();
            } else {
                $scope.onConsoleEscapeFocus();
            }
        } else {
            if ($scope.toolsAreVisible) {
                $scope.toolsAreVisible = false;
                $scope.onConsoleEscapeFocus();
            } else {
                $scope.toolsAreVisible = true;
                $scope.onConsoleFocus();
            }
        }
        $localStorage.toolsAreVisible = $scope.toolsAreVisible;
    };

    $scope.openProjectTool = function () {
        tools.focus("project");
    };

    $scope.toggleTools($localStorage.toolsAreVisible);
    tools.focusFromMemory();

    if (profiles.authenticated()) {
        root.IDEisVisible($localStorage.IDEisVisible);
    }

    if ($state.params.profile) {
        var visitedProfile = new Profile("twitter." + $state.params.profile);
        profiles.visited(visitedProfile);
        if ($state.params.story) {
            state.story = new Story($state.params.story, visitedProfile);
//            console.log("-------- before iExists");
            state.story.ifExists(function () {
//                console.log("STORY EXISTS!");
                state.ready(true, "ready", "");
                IDE.run();
            }, function () {
//                console.log("STORY DOESNT EXIST!");
                state.ready(false, "nostory", "");
            });

        } else {
            state.ready(false, "choosestory", "");
        }
    } else {
        if (profiles.authenticated()) {
            $state.go("profile", {
                profile: profiles.authenticated().username.split(".")[1]
            })
        } else {
            state.ready(false, "loginfirst",
                "You must <strong>first login</strong> with your twitter account" +
                "or visit someone else's profile.");
        }
    }
});


yarn.service('root', function rootService($localStorage, consoleService, player) {
    var service = {
        scope: null
    };

    service.register = function (scope) {
        service.scope = scope;
        scope._IDEisVisible = service._IDEisVisible;
        scope._helpIsVisible = service._helpIsVisible;
    };

    /*
     Console visibility
     */
    service._IDEisVisible = false;
    service._helpIsVisible = false;

    service.IDEisVisible = function _IDEisVisible(value) {
        if (!angular.isUndefined(value)) {
            service._IDEisVisible = value;
            if (service.scope) {
                service.scope._IDEisVisible = value;
            }
        }
        return service._IDEisVisible;
    };


    service.helpIsVisible = function _helpIsVisible(value) {
//        console.log("helpIsVisible", value);
        if (!angular.isUndefined(value)) {
            service._helpIsVisible = value;
            if (service.scope) {
                service.scope._helpIsVisible = value;
            }
        }
        return service._helpIsVisible;
    };

    service.helpIsVisible($localStorage._helpIsVisible);

    service.toggleConsole = function () {
        if (service._IDEisVisible) {
            service.hideConsole();
        } else {
            service.showConsole();
        }
    };

    service.toggleHelp = function () {
        if (service.helpIsVisible) {
            service.hideHelp();
        } else {
            service.showHelp();
        }
    };

    service.toggleTools = function (value) {
        service.scope.toggleTools(value);
    };

    /*

     Mechanics for console panel layout

     */
    service.showConsole = function () {
        player.closeSidenav();
        $localStorage.IDEisVisible = service.IDEisVisible(true);
        consoleService.focus();
    };
    service.hideConsole = function () {
        $localStorage.IDEisVisible = service.IDEisVisible(false);
    };


    /*

     Mechanics for help panel layout

     */
    service.showHelp = function () {
        player.closeSidenav();
        $localStorage._helpIsVisible = service.helpIsVisible(true);
    };
    service.hideHelp = function () {
        $localStorage._helpIsVisible = service.helpIsVisible(false);
    };

    service.focusConsole = function () {
        service.scope.focusConsole();
    };

    service.focusInspector = function () {
        service.scope.focusInspector();
    };

    return service;
});





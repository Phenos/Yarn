"use strict";
yarn.controller('editorMode', editorModeController);


function editorModeController(stories,
                          user,
                          $scope,
                          IDE,
                          yConsole,
                          editorService,
                          welcomeMessage) {

    $scope.IDE = IDE;
    $scope.user = user; // Note: User not yet in a service, resolved in route instead

    // Show a welcome message in the yarn console
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    IDE.register($scope);

    // We load the story from the user, or ensure that a default one exists
    stories.findOrCreateUserStory(user, function (story) {
        yConsole.log("Loaded a story in the editor");
        $scope.currentStory = story;
    }, function (err) {
        yConsole.log("No story can be loaded in the editor. You can only edit your own stories when you are logged in.");
        yConsole.log("Until then you can still use the console to enter commands and affect your game session.");
        $scope.currentStory = null;
    });

    // Check if a previously opened story should be loaded
    IDE.loadRememberedStory();

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

    /*

    Height permutation between Console and Editor on focus events

     */
    $scope.editorFlexHeight_default = 65;
    $scope.consoleFlexHeight_default = 35;
    $scope.editorFlexHeight = $scope.editorFlexHeight_default ;
    $scope.consoleFlexHeight = $scope.consoleFlexHeight_default;
    $scope.onConsoleEscapeFocus = function () {
        $scope.editorFlexHeight = 65;
        $scope.consoleFlexHeight = 35;
        editorService.focus();
    };
    $scope.onConsoleFocus = function () {
        $scope.editorFlexHeight = 35;
        $scope.consoleFlexHeight = 65;
    };

}

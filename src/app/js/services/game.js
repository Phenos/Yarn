"use strict";

angular.module('mindgame').factory('game', gameService);

function gameService(Yarn,
                     gamePedicates,
                     gameRoutines,
                     gameThings) {

    var game = new Yarn();

    // Load various configuration modules
    gamePedicates(game);
    gameRoutines(game);
    gameThings(game);

    return game;

}


/*

 This lib was tweaked to use Screen width instead of window width temporariblly

 */
// TODO: Make a pull request? Put into a /patched-vendors folder ?
var breakpointApp = angular.module('breakpointApp', []);

breakpointApp.directive('breakpoint', ['$window', '$rootScope', function ($window, $rootScope) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            scope.breakpoint = {class: '', windowSize: $window.innerWidth}; // Initialise Values

            var breakpoints = (scope.$eval(attr.breakpoint));

            angular.element($window).bind('resize', setWindowSize);
            angular.element($window).bind('load', setWindowSize);
            //console.log("YEAG!");

            scope.$watch('breakpoint.windowSize', function (windowWidth, oldValue) {
                setClass(windowWidth);
            });

            scope.$watch('breakpoint.class', function (newClass, oldClass) {
                if (newClass != oldClass) broadcastEvent(oldClass);
            });

            function broadcastEvent(oldClass) {
                $rootScope.$broadcast('breakpointChange', scope.breakpoint, oldClass);
            }

            function setWindowSize() {
                scope.breakpoint.windowSize = $window.innerWidth;

                // This lib was tweaked to use Screen width instead of window width temporariblly
                //if (screen && screen.width) scope.breakpoint.windowSize = screen.width;

                if (!scope.$$phase) scope.$apply();
            }

            function setClass(windowWidth) {
                var breakpointClass = breakpoints[Object.keys(breakpoints)[0]];
                for (var breakpoint in breakpoints) {
                    if (breakpoint < windowWidth) breakpointClass = breakpoints[breakpoint];
                    element.removeClass(breakpoints[breakpoint]);
                }
                element.addClass(breakpointClass);
                scope.breakpoint.class = breakpointClass;
                if (!scope.$$phase) scope.$apply();
            }
        }
    };
}]);



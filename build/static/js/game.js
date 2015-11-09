angular.module('mindgame').factory('game', game);

function game(loadScript,
              gamePedicates,
              gameRoutines,
              gameThings,
              $timeout) {

    // todo: rename "BigMess" to Yarn
    var game = new BigMess(scriptLoader);

    // Load various configuration modules
    gamePedicates(game);
    gameRoutines(game);
    gameThings(game);

    // todo: put scriptLoader into a service
    function scriptLoader(url) {
        console.log("URL: ---> ", url);
        loadScript(url, onLoad);
        function onLoad(source) {
            var script = game.load(source);
            script.run(game.state);
        }
    }

    $timeout(function () {

        //$window.resizeTo(100, 100);
        //
        //$window.scrollTo(0, 100);
    }, 2000);



    return game;

}


/*

This lib was tweaked to use Screen width instead of window width temporariblly

*/
// TODO: Make a pull request? Put into a /patched-vendors folder ?
var breakpointApp = angular.module('breakpointApp',[]);

breakpointApp.directive('breakpoint', ['$window', '$rootScope', function($window, $rootScope){
    return {
        restrict:"A",
        link:function(scope, element, attr){
            scope.breakpoint = {class:'', windowSize:$window.innerWidth }; // Initialise Values

            var breakpoints = (scope.$eval(attr.breakpoint));

            angular.element($window).bind('resize', setWindowSize);
            angular.element($window).bind('load', setWindowSize);
            //console.log("YEAG!");

            scope.$watch('breakpoint.windowSize', function(windowWidth, oldValue){
                setClass(windowWidth);
            });

            scope.$watch('breakpoint.class', function(newClass, oldClass) {
                if (newClass != oldClass) broadcastEvent(oldClass);
            });

            function broadcastEvent (oldClass) {
                $rootScope.$broadcast('breakpointChange', scope.breakpoint, oldClass);
            }

            function setWindowSize (){
                scope.breakpoint.windowSize = $window.innerWidth;

                // This lib was tweaked to use Screen width instead of window width temporariblly
                //if (screen && screen.width) scope.breakpoint.windowSize = screen.width;

                if(!scope.$$phase) scope.$apply();
            }

            function setClass(windowWidth){
                var breakpointClass = breakpoints[Object.keys(breakpoints)[0]];
                for (var breakpoint in breakpoints){
                    if (breakpoint < windowWidth) breakpointClass = breakpoints[breakpoint];
                    element.removeClass(breakpoints[breakpoint]);
                }
                element.addClass(breakpointClass);
                scope.breakpoint.class  = breakpointClass;
                if(!scope.$$phase) scope.$apply();
            }
        }
    };
}]);



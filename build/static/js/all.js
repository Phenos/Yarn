angular.module('mindgame', [
    'ui.router',
    'luegg.directives',
    'cfp.hotkeys',
    'breakpointApp'
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJywgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICdsdWVnZy5kaXJlY3RpdmVzJyxcbiAgICAnY2ZwLmhvdGtleXMnLFxuICAgICdicmVha3BvaW50QXBwJ1xuXSk7Il0sImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function () {
    'use strict';


    angular.module('mindgame').config(app);

    angular.module('mindgame').run(function($rootScope) {
        $rootScope.breakpoints = {
            0: 'isMobileWidth',
            480: 'isMobileLandscapeWidth',
            641: 'isTabletWidth',
            1025: 'isDesktopWidth',
            1281: 'isWidescreenLayout'
            };
        });

    function app($stateProvider,
                 $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

    }
})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyb3V0ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmNvbmZpZyhhcHApO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICAgICAgJHJvb3RTY29wZS5icmVha3BvaW50cyA9IHtcbiAgICAgICAgICAgIDA6ICdpc01vYmlsZVdpZHRoJyxcbiAgICAgICAgICAgIDQ4MDogJ2lzTW9iaWxlTGFuZHNjYXBlV2lkdGgnLFxuICAgICAgICAgICAgNjQxOiAnaXNUYWJsZXRXaWR0aCcsXG4gICAgICAgICAgICAxMDI1OiAnaXNEZXNrdG9wV2lkdGgnLFxuICAgICAgICAgICAgMTI4MTogJ2lzV2lkZXNjcmVlbkxheW91dCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYXBwKCRzdGF0ZVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncm9vdCcsIHtcbiAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncm9vdCcsXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7fSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9odG1sL2FwcC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyb290J1xuICAgICAgICB9KTtcblxuICAgIH1cbn0pKCk7XG5cbiJdLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

"use strict";
angular.module('mindgame').factory('gamePedicates', function() {
    return gamePedicates;
});

function gamePedicates(game) {
    var state = game.state;

    // What something is of a kind
    state
        .predicate("isAuthoredBy")
        .syntax("is created by")
        .syntax("is authored by");

    // The Action the user what about to make (ex.: Move, Look, etc)
    state
        .predicate("isAboutTo")
        .syntax("is about to");

    // What something is of a kind
    state
        .predicate("isA")
        .syntax("is an")
        .syntax("is a");

    // What something is of a kind
    state
        .predicate("hasScenery")
        .syntax("has scenery");

    state
        .predicate("hasImage")
        .syntax("has image");

    // What something has an attribute
    state
        .predicate("is")
        .syntax("is");

    // What something is called
    state
        .predicate("isNamed")
        .syntax("is titled")
        .syntax("is named")
        .syntax("is called");

    // What something is described as when looked at
    state
        .predicate("isDescribedAs")
        .syntax("is described")
        .syntax("is described as");

    state
        .predicate("isAlsoDescribedAs")
        .syntax("is also described")
        .syntax("is also described as");

    // When something is in a place
    state
        .predicate("isIn")
        .syntax("is in the")
        .syntax("is inside the")
        .syntax("is at the")
        .syntax("is in")
        .syntax("is inside")
        .syntax("is at")
        .syntax("are in the")
        .syntax("are inside the")
        .syntax("are at the")
        .syntax("are in")
        .syntax("are inside")
        .syntax("are at");

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInIt")
        .syntax("has in it the")
        .syntax("has in it a")
        .syntax("has a");

    // When something has something else. Ex.: Kitchen has a Kitchen Table
    state
        .predicate("hasInInventory")
        .syntax("has in inventory a")
        .syntax("has in inventoy")
        .syntax("has inventoy");

    // When a place is linked to another place
    state
        .predicate("linksTo")
        .syntax("goes to")
        .syntax("is open to")
        .syntax("goes to the")
        .syntax("is open to the")
        .syntax("links to the")
        .syntax("links to");

    // When a place is linked to another place
    state
        .predicate("this")
        .syntax("that")
        .syntax("the");


    /*
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     Create the Action predicates
     =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
     */



    // Something uses something else
    state
        .predicate("use", "action")
        .syntax("use")
        .syntax("uses")
        .syntax("use the")
        .syntax("uses the")
        .syntax("use a")
        .syntax("uses a");

    // Something uses something else
    state
        .predicate("movesTo", "action")
        .syntax("moves to")
        .syntax("moves into")
        .syntax("goes to")
        .syntax("goes into")
        .syntax("moves")
        .syntax("goes")
        .syntax("enters")
        .syntax("enters the")
        .syntax("enters in")
        .syntax("enters into");

}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnByZWRpY2F0ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5hbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdnYW1lUGVkaWNhdGVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdhbWVQZWRpY2F0ZXM7XG59KTtcblxuZnVuY3Rpb24gZ2FtZVBlZGljYXRlcyhnYW1lKSB7XG4gICAgdmFyIHN0YXRlID0gZ2FtZS5zdGF0ZTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIG9mIGEga2luZFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0F1dGhvcmVkQnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGNyZWF0ZWQgYnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF1dGhvcmVkIGJ5XCIpO1xuXG4gICAgLy8gVGhlIEFjdGlvbiB0aGUgdXNlciB3aGF0IGFib3V0IHRvIG1ha2UgKGV4LjogTW92ZSwgTG9vaywgZXRjKVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFib3V0IHRvXCIpO1xuXG4gICAgLy8gV2hhdCBzb21ldGhpbmcgaXMgb2YgYSBraW5kXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzQVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYW5cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFcIik7XG5cbiAgICAvLyBXaGF0IHNvbWV0aGluZyBpcyBvZiBhIGtpbmRcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzU2NlbmVyeVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIHNjZW5lcnlcIik7XG5cbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzSW1hZ2VcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBpbWFnZVwiKTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGhhcyBhbiBhdHRyaWJ1dGVcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaXNcIilcbiAgICAgICAgLnN5bnRheChcImlzXCIpO1xuXG4gICAgLy8gV2hhdCBzb21ldGhpbmcgaXMgY2FsbGVkXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzTmFtZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIHRpdGxlZFwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgbmFtZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGNhbGxlZFwiKTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIGRlc2NyaWJlZCBhcyB3aGVuIGxvb2tlZCBhdFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Rlc2NyaWJlZEFzXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBkZXNjcmliZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGRlc2NyaWJlZCBhc1wiKTtcblxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Fsc29EZXNjcmliZWRBc1wiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYWxzbyBkZXNjcmliZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIGFsc28gZGVzY3JpYmVkIGFzXCIpO1xuXG4gICAgLy8gV2hlbiBzb21ldGhpbmcgaXMgaW4gYSBwbGFjZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0luXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBpbiB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGluc2lkZSB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF0IHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgaW5cIilcbiAgICAgICAgLnN5bnRheChcImlzIGluc2lkZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYXRcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbiB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbnNpZGUgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJhcmUgYXQgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJhcmUgaW5cIilcbiAgICAgICAgLnN5bnRheChcImFyZSBpbnNpZGVcIilcbiAgICAgICAgLnN5bnRheChcImFyZSBhdFwiKTtcblxuICAgIC8vIFdoZW4gc29tZXRoaW5nIGhhcyBzb21ldGhpbmcgZWxzZS4gRXguOiBLaXRjaGVuIGhhcyBhIEtpdGNoZW4gVGFibGVcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaGFzSW5JdFwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGl0IHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGl0IGFcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBhXCIpO1xuXG4gICAgLy8gV2hlbiBzb21ldGhpbmcgaGFzIHNvbWV0aGluZyBlbHNlLiBFeC46IEtpdGNoZW4gaGFzIGEgS2l0Y2hlbiBUYWJsZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJoYXNJbkludmVudG9yeVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGluIGludmVudG9yeSBhXCIpXG4gICAgICAgIC5zeW50YXgoXCJoYXMgaW4gaW52ZW50b3lcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBpbnZlbnRveVwiKTtcblxuICAgIC8vIFdoZW4gYSBwbGFjZSBpcyBsaW5rZWQgdG8gYW5vdGhlciBwbGFjZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJsaW5rc1RvXCIpXG4gICAgICAgIC5zeW50YXgoXCJnb2VzIHRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBvcGVuIHRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJnb2VzIHRvIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgb3BlbiB0byB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImxpbmtzIHRvIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwibGlua3MgdG9cIik7XG5cbiAgICAvLyBXaGVuIGEgcGxhY2UgaXMgbGlua2VkIHRvIGFub3RoZXIgcGxhY2VcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwidGhpc1wiKVxuICAgICAgICAuc3ludGF4KFwidGhhdFwiKVxuICAgICAgICAuc3ludGF4KFwidGhlXCIpO1xuXG5cbiAgICAvKlxuICAgICA9LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cbiAgICAgQ3JlYXRlIHRoZSBBY3Rpb24gcHJlZGljYXRlc1xuICAgICA9LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cbiAgICAgKi9cblxuXG5cbiAgICAvLyBTb21ldGhpbmcgdXNlcyBzb21ldGhpbmcgZWxzZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJ1c2VcIiwgXCJhY3Rpb25cIilcbiAgICAgICAgLnN5bnRheChcInVzZVwiKVxuICAgICAgICAuc3ludGF4KFwidXNlc1wiKVxuICAgICAgICAuc3ludGF4KFwidXNlIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwidXNlcyB0aGVcIilcbiAgICAgICAgLnN5bnRheChcInVzZSBhXCIpXG4gICAgICAgIC5zeW50YXgoXCJ1c2VzIGFcIik7XG5cbiAgICAvLyBTb21ldGhpbmcgdXNlcyBzb21ldGhpbmcgZWxzZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJtb3Zlc1RvXCIsIFwiYWN0aW9uXCIpXG4gICAgICAgIC5zeW50YXgoXCJtb3ZlcyB0b1wiKVxuICAgICAgICAuc3ludGF4KFwibW92ZXMgaW50b1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lcyB0b1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lcyBpbnRvXCIpXG4gICAgICAgIC5zeW50YXgoXCJtb3Zlc1wiKVxuICAgICAgICAuc3ludGF4KFwiZ29lc1wiKVxuICAgICAgICAuc3ludGF4KFwiZW50ZXJzXCIpXG4gICAgICAgIC5zeW50YXgoXCJlbnRlcnMgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJlbnRlcnMgaW5cIilcbiAgICAgICAgLnN5bnRheChcImVudGVycyBpbnRvXCIpO1xuXG59Il0sImZpbGUiOiJnYW1lLnByZWRpY2F0ZXMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

"use strict";
angular.module('mindgame').factory('gameRoutines', function() {
    return gameRoutines;
});

function gameRoutines(game) {

    // Move the player to another room
    game.logic.register("move", move);
    function move(roomId) {
        var room = game.state.thing(roomId);
        var isIn = game.state.predicate("isIn");
        var you = game.state.thing("You");
        if (room) {
            you
                .removeAssertions(isIn)
                .setAssertion(isIn, room);
        }
        // TODO : Trigger movesFrom
        game.logic.trigger(you, "movesTo", room);
        return room;
    }

    // Set what action the player is "about to do"
    game.logic.register("aboutTo", aboutTo);
    function aboutTo(aboutToId) {
        var isAboutTo = game.state.predicate("isAboutTo");
        game.state.thing("You").removeAssertions(isAboutTo);
        if (aboutToId) {
            game.state.thing("You").setAssertion(isAboutTo, aboutToId);
        }
        return true;
    }

}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnJvdXRpbmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnZ2FtZVJvdXRpbmVzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdhbWVSb3V0aW5lcztcbn0pO1xuXG5mdW5jdGlvbiBnYW1lUm91dGluZXMoZ2FtZSkge1xuXG4gICAgLy8gTW92ZSB0aGUgcGxheWVyIHRvIGFub3RoZXIgcm9vbVxuICAgIGdhbWUubG9naWMucmVnaXN0ZXIoXCJtb3ZlXCIsIG1vdmUpO1xuICAgIGZ1bmN0aW9uIG1vdmUocm9vbUlkKSB7XG4gICAgICAgIHZhciByb29tID0gZ2FtZS5zdGF0ZS50aGluZyhyb29tSWQpO1xuICAgICAgICB2YXIgaXNJbiA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNJblwiKTtcbiAgICAgICAgdmFyIHlvdSA9IGdhbWUuc3RhdGUudGhpbmcoXCJZb3VcIik7XG4gICAgICAgIGlmIChyb29tKSB7XG4gICAgICAgICAgICB5b3VcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXNzZXJ0aW9ucyhpc0luKVxuICAgICAgICAgICAgICAgIC5zZXRBc3NlcnRpb24oaXNJbiwgcm9vbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyA6IFRyaWdnZXIgbW92ZXNGcm9tXG4gICAgICAgIGdhbWUubG9naWMudHJpZ2dlcih5b3UsIFwibW92ZXNUb1wiLCByb29tKTtcbiAgICAgICAgcmV0dXJuIHJvb207XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoYXQgYWN0aW9uIHRoZSBwbGF5ZXIgaXMgXCJhYm91dCB0byBkb1wiXG4gICAgZ2FtZS5sb2dpYy5yZWdpc3RlcihcImFib3V0VG9cIiwgYWJvdXRUbyk7XG4gICAgZnVuY3Rpb24gYWJvdXRUbyhhYm91dFRvSWQpIHtcbiAgICAgICAgdmFyIGlzQWJvdXRUbyA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICBnYW1lLnN0YXRlLnRoaW5nKFwiWW91XCIpLnJlbW92ZUFzc2VydGlvbnMoaXNBYm91dFRvKTtcbiAgICAgICAgaWYgKGFib3V0VG9JZCkge1xuICAgICAgICAgICAgZ2FtZS5zdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaXNBYm91dFRvLCBhYm91dFRvSWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuIl0sImZpbGUiOiJnYW1lLnJvdXRpbmVzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

"use strict";
angular.module('mindgame').factory('gameThings', function() {
    return gameThings;
});

function gameThings(game) {
    // Player
    game.state
        .thing("player");

    // Persons
    game.state
        .thing("person");

    // Places
    game.state
        .thing("room");

    // Objects (as in "object" in the game)
    game.state
        .thing("object");
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLnRoaW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2dhbWVUaGluZ3MnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2FtZVRoaW5ncztcbn0pO1xuXG5mdW5jdGlvbiBnYW1lVGhpbmdzKGdhbWUpIHtcbiAgICAvLyBQbGF5ZXJcbiAgICBnYW1lLnN0YXRlXG4gICAgICAgIC50aGluZyhcInBsYXllclwiKTtcblxuICAgIC8vIFBlcnNvbnNcbiAgICBnYW1lLnN0YXRlXG4gICAgICAgIC50aGluZyhcInBlcnNvblwiKTtcblxuICAgIC8vIFBsYWNlc1xuICAgIGdhbWUuc3RhdGVcbiAgICAgICAgLnRoaW5nKFwicm9vbVwiKTtcblxuICAgIC8vIE9iamVjdHMgKGFzIGluIFwib2JqZWN0XCIgaW4gdGhlIGdhbWUpXG4gICAgZ2FtZS5zdGF0ZVxuICAgICAgICAudGhpbmcoXCJvYmplY3RcIik7XG59XG4iXSwiZmlsZSI6ImdhbWUudGhpbmdzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').controller('root', rootController);

function rootController(loadGameScripts) {
    console.log("Game started!");
    loadGameScripts();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyb290LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmNvbnRyb2xsZXIoJ3Jvb3QnLCByb290Q29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIHJvb3RDb250cm9sbGVyKGxvYWRHYW1lU2NyaXB0cykge1xuICAgIGNvbnNvbGUubG9nKFwiR2FtZSBzdGFydGVkIVwiKTtcbiAgICBsb2FkR2FtZVNjcmlwdHMoKTtcbn0iXSwiZmlsZSI6InJvb3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').factory('commands', commands);

function commands(storyLogService,
                  hotkeys,
                  game) {

    var storyLog = storyLogService;
    var state = game.state;

    var commands = {
        move: moveCommand,
        look: lookCommand,
        take: takeCommand,
        inventory: inventoryCommand,
        state: stateCommand,
        tree: treeCommand,
        tokens: tokensCommand
    };

    // todo: Move commands into a separate directive
    var command = function (text) {
        var command = commands[text];
        if (command) {
            command();
        } else {
            storyLog.error("Sorry... unknown command : " + text);
        }
    };

    // todo: Move hotkey into a separate directive
    hotkeys.add({
        combo: 'ctrl+1',
        description: 'Output the current state',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("state");
        }
    });
    hotkeys.add({
        combo: 'ctrl+2',
        description: 'Output the execution tree',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tree");
        }
    });
    hotkeys.add({
        combo: 'ctrl+3',
        description: 'Outputing script parsing',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tokens");
        }
    });

    //todo: Create a class for commands

    function stateCommand() {
        var html = game.state.html();
        storyLog.debug("Outputing current game state:");
        storyLog.debug(html);
    }

    function treeCommand() {
        var html = game.bigMess.script.ast.html();
        storyLog.debug("Outputing execution tree:");
        storyLog.debug(html);
    }

    function tokensCommand() {
        var html = game.bigMess.script.pointer.html();
        storyLog.debug("Outputing script parsing:");
        storyLog.debug(html);
    }

    function moveCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "move");
    }

    function takeCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "take");
    }

    function lookCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "look");
    }

    function inventoryCommand() {
        var itemList;
        var thingsInInventory = game.state.resolve("You.hasInInventory");
        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = thing.resolveValue("isNamed");
                itemList.push(label);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            storyLog.log(message.join(""));
        } else {
            storyLog.error("You have nothing in inventory!");
        }
    }

    return {
        command: command
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tYW5kcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdjb21tYW5kcycsIGNvbW1hbmRzKTtcblxuZnVuY3Rpb24gY29tbWFuZHMoc3RvcnlMb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgaG90a2V5cyxcbiAgICAgICAgICAgICAgICAgIGdhbWUpIHtcblxuICAgIHZhciBzdG9yeUxvZyA9IHN0b3J5TG9nU2VydmljZTtcbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuXG4gICAgdmFyIGNvbW1hbmRzID0ge1xuICAgICAgICBtb3ZlOiBtb3ZlQ29tbWFuZCxcbiAgICAgICAgbG9vazogbG9va0NvbW1hbmQsXG4gICAgICAgIHRha2U6IHRha2VDb21tYW5kLFxuICAgICAgICBpbnZlbnRvcnk6IGludmVudG9yeUNvbW1hbmQsXG4gICAgICAgIHN0YXRlOiBzdGF0ZUNvbW1hbmQsXG4gICAgICAgIHRyZWU6IHRyZWVDb21tYW5kLFxuICAgICAgICB0b2tlbnM6IHRva2Vuc0NvbW1hbmRcbiAgICB9O1xuXG4gICAgLy8gdG9kbzogTW92ZSBjb21tYW5kcyBpbnRvIGEgc2VwYXJhdGUgZGlyZWN0aXZlXG4gICAgdmFyIGNvbW1hbmQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgY29tbWFuZCA9IGNvbW1hbmRzW3RleHRdO1xuICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJTb3JyeS4uLiB1bmtub3duIGNvbW1hbmQgOiBcIiArIHRleHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIHRvZG86IE1vdmUgaG90a2V5IGludG8gYSBzZXBhcmF0ZSBkaXJlY3RpdmVcbiAgICBob3RrZXlzLmFkZCh7XG4gICAgICAgIGNvbWJvOiAnY3RybCsxJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPdXRwdXQgdGhlIGN1cnJlbnQgc3RhdGUnLFxuICAgICAgICBhbGxvd0luOiBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29tbWFuZChcInN0YXRlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaG90a2V5cy5hZGQoe1xuICAgICAgICBjb21ibzogJ2N0cmwrMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnT3V0cHV0IHRoZSBleGVjdXRpb24gdHJlZScsXG4gICAgICAgIGFsbG93SW46IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ10sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb21tYW5kKFwidHJlZVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGhvdGtleXMuYWRkKHtcbiAgICAgICAgY29tYm86ICdjdHJsKzMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ091dHB1dGluZyBzY3JpcHQgcGFyc2luZycsXG4gICAgICAgIGFsbG93SW46IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ10sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb21tYW5kKFwidG9rZW5zXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL3RvZG86IENyZWF0ZSBhIGNsYXNzIGZvciBjb21tYW5kc1xuXG4gICAgZnVuY3Rpb24gc3RhdGVDb21tYW5kKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGdhbWUuc3RhdGUuaHRtbCgpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhcIk91dHB1dGluZyBjdXJyZW50IGdhbWUgc3RhdGU6XCIpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhodG1sKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmVlQ29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBnYW1lLmJpZ01lc3Muc2NyaXB0LmFzdC5odG1sKCk7XG4gICAgICAgIHN0b3J5TG9nLmRlYnVnKFwiT3V0cHV0aW5nIGV4ZWN1dGlvbiB0cmVlOlwiKTtcbiAgICAgICAgc3RvcnlMb2cuZGVidWcoaHRtbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9rZW5zQ29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBnYW1lLmJpZ01lc3Muc2NyaXB0LnBvaW50ZXIuaHRtbCgpO1xuICAgICAgICBzdG9yeUxvZy5kZWJ1ZyhcIk91dHB1dGluZyBzY3JpcHQgcGFyc2luZzpcIik7XG4gICAgICAgIHN0b3J5TG9nLmRlYnVnKGh0bWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVDb21tYW5kKCkge1xuICAgICAgICB2YXIgaXNBYm91dFRvID0gZ2FtZS5zdGF0ZS5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIik7XG4gICAgICAgIHN0YXRlLnRoaW5nKFwiWW91XCIpLnNldEFzc2VydGlvbihpc0Fib3V0VG8sIFwibW92ZVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0YWtlQ29tbWFuZCgpIHtcbiAgICAgICAgdmFyIGlzQWJvdXRUbyA9IGdhbWUuc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaXNBYm91dFRvLCBcInRha2VcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9va0NvbW1hbmQoKSB7XG4gICAgICAgIHZhciBpc0Fib3V0VG8gPSBnYW1lLnN0YXRlLnByZWRpY2F0ZShcImlzQWJvdXRUb1wiKTtcbiAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikuc2V0QXNzZXJ0aW9uKGlzQWJvdXRUbywgXCJsb29rXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludmVudG9yeUNvbW1hbmQoKSB7XG4gICAgICAgIHZhciBpdGVtTGlzdDtcbiAgICAgICAgdmFyIHRoaW5nc0luSW52ZW50b3J5ID0gZ2FtZS5zdGF0ZS5yZXNvbHZlKFwiWW91Lmhhc0luSW52ZW50b3J5XCIpO1xuICAgICAgICBpZiAodGhpbmdzSW5JbnZlbnRvcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtTGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpbmdzSW5JbnZlbnRvcnkuZm9yRWFjaChmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2gobGFiZWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFtcbiAgICAgICAgICAgICAgICBcIllvdSBoYXZlIFwiLFxuICAgICAgICAgICAgICAgIHRoaW5nc0luSW52ZW50b3J5Lmxlbmd0aCxcbiAgICAgICAgICAgICAgICBcIiBpdGVtIGluIGludmVudG9yeTogPGEgaHJlZj0nIyc+XCIsXG4gICAgICAgICAgICAgICAgaXRlbUxpc3Quam9pbihcIjwvYT4sIDxhIGhyZWY9JyMnPlwiKSxcbiAgICAgICAgICAgICAgICBcIjwvYT4uXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdG9yeUxvZy5sb2cobWVzc2FnZS5qb2luKFwiXCIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLmVycm9yKFwiWW91IGhhdmUgbm90aGluZyBpbiBpbnZlbnRvcnkhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29tbWFuZDogY29tbWFuZFxuICAgIH07XG5cbn1cblxuXG5cbiJdLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').factory('game', game);

function game(gamePedicates,
              gameRoutines,
              gameThings,
              $window,
              $timeout) {

    var game = new BigMess();

    // Load various configuration modules
    gamePedicates(game);
    gameRoutines(game);
    gameThings(game);


    $timeout(function () {

        //$window.resizeTo(100, 100);
        //
        //$window.scrollTo(0, 100);
    }, 2000);



    return game;

}


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
                if (screen.width) scope.breakpoint.windowSize = screen.width;
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2dhbWUnLCBnYW1lKTtcblxuZnVuY3Rpb24gZ2FtZShnYW1lUGVkaWNhdGVzLFxuICAgICAgICAgICAgICBnYW1lUm91dGluZXMsXG4gICAgICAgICAgICAgIGdhbWVUaGluZ3MsXG4gICAgICAgICAgICAgICR3aW5kb3csXG4gICAgICAgICAgICAgICR0aW1lb3V0KSB7XG5cbiAgICB2YXIgZ2FtZSA9IG5ldyBCaWdNZXNzKCk7XG5cbiAgICAvLyBMb2FkIHZhcmlvdXMgY29uZmlndXJhdGlvbiBtb2R1bGVzXG4gICAgZ2FtZVBlZGljYXRlcyhnYW1lKTtcbiAgICBnYW1lUm91dGluZXMoZ2FtZSk7XG4gICAgZ2FtZVRoaW5ncyhnYW1lKTtcblxuXG4gICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vJHdpbmRvdy5yZXNpemVUbygxMDAsIDEwMCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vJHdpbmRvdy5zY3JvbGxUbygwLCAxMDApO1xuICAgIH0sIDIwMDApO1xuXG5cblxuICAgIHJldHVybiBnYW1lO1xuXG59XG5cblxuLy8gVE9ETzogTWFrZSBhIHB1bGwgcmVxdWVzdD8gUHV0IGludG8gYSAvcGF0Y2hlZC12ZW5kb3JzIGZvbGRlciA/XG52YXIgYnJlYWtwb2ludEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdicmVha3BvaW50QXBwJyxbXSk7XG5cbmJyZWFrcG9pbnRBcHAuZGlyZWN0aXZlKCdicmVha3BvaW50JywgWyckd2luZG93JywgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkd2luZG93LCAkcm9vdFNjb3BlKXtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDpcIkFcIixcbiAgICAgICAgbGluazpmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cil7XG4gICAgICAgICAgICBzY29wZS5icmVha3BvaW50ID0ge2NsYXNzOicnLCB3aW5kb3dTaXplOiR3aW5kb3cuaW5uZXJXaWR0aCB9OyAvLyBJbml0aWFsaXNlIFZhbHVlc1xuXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSAoc2NvcGUuJGV2YWwoYXR0ci5icmVha3BvaW50KSk7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdyZXNpemUnLCBzZXRXaW5kb3dTaXplKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdsb2FkJywgc2V0V2luZG93U2l6ZSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiWUVBRyFcIik7XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnYnJlYWtwb2ludC53aW5kb3dTaXplJywgZnVuY3Rpb24od2luZG93V2lkdGgsIG9sZFZhbHVlKXtcbiAgICAgICAgICAgICAgICBzZXRDbGFzcyh3aW5kb3dXaWR0aCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdicmVha3BvaW50LmNsYXNzJywgZnVuY3Rpb24obmV3Q2xhc3MsIG9sZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0NsYXNzICE9IG9sZENsYXNzKSBicm9hZGNhc3RFdmVudChvbGRDbGFzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYnJvYWRjYXN0RXZlbnQgKG9sZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdicmVha3BvaW50Q2hhbmdlJywgc2NvcGUuYnJlYWtwb2ludCwgb2xkQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRXaW5kb3dTaXplICgpe1xuICAgICAgICAgICAgICAgIHNjb3BlLmJyZWFrcG9pbnQud2luZG93U2l6ZSA9ICR3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoc2NyZWVuLndpZHRoKSBzY29wZS5icmVha3BvaW50LndpbmRvd1NpemUgPSBzY3JlZW4ud2lkdGg7XG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLiQkcGhhc2UpIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRDbGFzcyh3aW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgdmFyIGJyZWFrcG9pbnRDbGFzcyA9IGJyZWFrcG9pbnRzW09iamVjdC5rZXlzKGJyZWFrcG9pbnRzKVswXV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChicmVha3BvaW50IDwgd2luZG93V2lkdGgpIGJyZWFrcG9pbnRDbGFzcyA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhicmVha3BvaW50Q2xhc3MpO1xuICAgICAgICAgICAgICAgIHNjb3BlLmJyZWFrcG9pbnQuY2xhc3MgID0gYnJlYWtwb2ludENsYXNzO1xuICAgICAgICAgICAgICAgIGlmKCFzY29wZS4kJHBoYXNlKSBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XSk7XG5cblxuIl0sImZpbGUiOiJnYW1lLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('loadGameScripts', loadGameScripts);

function loadGameScripts(game,
                         loadPageScripts,
                         writers,
                         promptLoop) {

    function loadGameScripts() {
        // Load all game scipts
        loadPageScripts('BigMess', onLoadScript).then(onLoadComplete);
    }

    function onLoadComplete() {
        writers
            .LogStoryIntroduction()
            .DescribeWhereYouAre();
        promptLoop.update();
    }

    function onLoadScript(source) {
        // TODO: game.game ????? UGLY!
        game.load(source).run();
    }

    return loadGameScripts;

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkR2FtZVNjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZEdhbWVTY3JpcHRzJywgbG9hZEdhbWVTY3JpcHRzKTtcblxuZnVuY3Rpb24gbG9hZEdhbWVTY3JpcHRzKGdhbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VTY3JpcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0TG9vcCkge1xuXG4gICAgZnVuY3Rpb24gbG9hZEdhbWVTY3JpcHRzKCkge1xuICAgICAgICAvLyBMb2FkIGFsbCBnYW1lIHNjaXB0c1xuICAgICAgICBsb2FkUGFnZVNjcmlwdHMoJ0JpZ01lc3MnLCBvbkxvYWRTY3JpcHQpLnRoZW4ob25Mb2FkQ29tcGxldGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTG9hZENvbXBsZXRlKCkge1xuICAgICAgICB3cml0ZXJzXG4gICAgICAgICAgICAuTG9nU3RvcnlJbnRyb2R1Y3Rpb24oKVxuICAgICAgICAgICAgLkRlc2NyaWJlV2hlcmVZb3VBcmUoKTtcbiAgICAgICAgcHJvbXB0TG9vcC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWRTY3JpcHQoc291cmNlKSB7XG4gICAgICAgIC8vIFRPRE86IGdhbWUuZ2FtZSA/Pz8/PyBVR0xZIVxuICAgICAgICBnYW1lLmxvYWQoc291cmNlKS5ydW4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9hZEdhbWVTY3JpcHRzO1xuXG59XG5cblxuXG4iXSwiZmlsZSI6ImxvYWRHYW1lU2NyaXB0cy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('loadPageScripts', loadPageScripts);

function loadPageScripts($document,
                         $http,
                         $q) {

    function loadScripts(scriptType, onLoad) {
        var promise;

        promise = $q(function (success) {
            success();
        });

        angular.forEach($document.find("script"), function (scriptTag) {
            if (scriptTag.type.toLowerCase() === "bigmess") {
                promise = promise.then(function () {
                    return loadScript(scriptTag.src, onLoad);
                });
            }
        });

        return promise;
    }

    function loadScript (src, onLoad) {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: src
        };
        function then(response) {
            console.info("Loaded script ", response.config.url);
            onLoad(response.data);
        }
        return $http(config)
            .then(then);
    }

    return loadScripts;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkUGFnZVNjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZFBhZ2VTY3JpcHRzJywgbG9hZFBhZ2VTY3JpcHRzKTtcblxuZnVuY3Rpb24gbG9hZFBhZ2VTY3JpcHRzKCRkb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAkcSkge1xuXG4gICAgZnVuY3Rpb24gbG9hZFNjcmlwdHMoc2NyaXB0VHlwZSwgb25Mb2FkKSB7XG4gICAgICAgIHZhciBwcm9taXNlO1xuXG4gICAgICAgIHByb21pc2UgPSAkcShmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgc3VjY2VzcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJGRvY3VtZW50LmZpbmQoXCJzY3JpcHRcIiksIGZ1bmN0aW9uIChzY3JpcHRUYWcpIHtcbiAgICAgICAgICAgIGlmIChzY3JpcHRUYWcudHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImJpZ21lc3NcIikge1xuICAgICAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9hZFNjcmlwdChzY3JpcHRUYWcuc3JjLCBvbkxvYWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkU2NyaXB0IChzcmMsIG9uTG9hZCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHNjcmlwdFRhZyk7XG4gICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBzcmNcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gdGhlbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiTG9hZGVkIHNjcmlwdCBcIiwgcmVzcG9uc2UuY29uZmlnLnVybCk7XG4gICAgICAgICAgICBvbkxvYWQocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRodHRwKGNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKHRoZW4pO1xuICAgIH1cblxuICAgIHJldHVybiBsb2FkU2NyaXB0cztcbn1cbiJdLCJmaWxlIjoibG9hZFBhZ2VTY3JpcHRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('promptLoop', promptLoop);

function promptLoop(storyLogService,
                    commands,
                    game,
                    writers) {

    var storyLog = storyLogService;

    var state = game.state;
    var logic = game.logic;

    function WhereToGo(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "move";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "Where do you want to go ?";
            var rooms = state.resolve("you.isIn.linksTo");
            //console.log('rooms', rooms);
            rooms.forEach(function (room) {
                var label = room.resolveValue("isNamed");
                prompt.option(label, room.id);
            });
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhereToDo");
            // todo: this should be injected instead of taken from parent scope
            logic.routines.aboutTo("");
            if (logic.routines.move(option.value)) {
                writers.DescribeWhereYouAre(true);
            } else {
                storyLog.error("Failed to find this room [%s]", option.value);
            }
        };
        return promptLoop;
    }

    function WhatToLookAt(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "look";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to look at ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            //console.log('thingsInRoom', thingsInRoom);
            if (thingsInRoom.length) {
                thingsInRoom.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            logic.routines.aboutTo("");
            if (option) {
                var thing = state.thing(option.value);
                writers.DescribeThing(thing);
            } else {
                storyLog.error("Nothing to look at here!");
            }
        };
    }

    function WhatToTake(context) {
        context.when = function (state) {
            var isAboutTo = state.resolveValue("You.isAboutTo");
            return isAboutTo === "take";
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to take ?";
            var thingsInRoom = state.resolve("You.isIn.hasInIt");
            var thingsThatAreInventory = [];
            console.trace("thingsInRoom", thingsInRoom);

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                console.trace("thing", thing.id);
                // Check if item is an InventoryItem
                var isInventoryItem = false;
                var thingsThatAre = thing.resolve("isA");
                thingsThatAre.forEach(function (thing) {
                    console.trace("is a", thing.id);
                    if (thing === state.thing("InventoryItem")) isInventoryItem = true;
                });
                if (isInventoryItem) thingsThatAreInventory.push(thing);
            });


            //console.log('thingsInRoom', thingsInRoom);
            if (thingsThatAreInventory.length) {
                thingsThatAreInventory.forEach(function (thing) {
                    var label = thing.resolveValue("isNamed");
                    prompt.option(label, thing.id);
                });
            }
        };
        context.answer = function answer(promptLoop, option) {
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);

            if (option) {
                // todo: Find sexier api for removing an assertion
                // todo: Implement "unique" assertions... such as when someone is
                var thing = state.thing(option.value);
                var hasInInventory = state.predicate("hasInInventory");
                state.thing("You").setAssertion(hasInInventory, thing);
                writers.DescribeThingTakenInInventory(thing);
            } else {
                storyLog.error("Sorry, nothing to take here!");
            }

        };
    }

    function WhatToDo(context) {
        context.when = function (state) {
            return true;
        };
        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do ?";
            prompt.option("Move", "move");
            prompt.option("Look", "look");
            prompt.option("Take", "take");
            prompt.option("Inventory", "inventory");
        };
        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            commands.command(option.value);
        };
    }

    // Create an instant of the promptLoop
    var promptLoop = new PromptLoop(state);

    promptLoop.addContext("WhereToDo", WhereToGo);
    promptLoop.addContext("WhatToLookAt", WhatToLookAt);
    promptLoop.addContext("WhatToTake", WhatToTake);
    promptLoop.addContext("WhatToDo", WhatToDo);
    promptLoop.update();

    return promptLoop;
}




function PromptLoop(state) {
    this.state = state;
    this.contexts = [];
    this.contextsRef = [];
    this.currentPrompt = null;
    this.updatePromptUI = function() {};
}

PromptLoop.prototype.onUpdate = function (onUpdatePrompt) {
    this.updatePromptUI = onUpdatePrompt;
};

PromptLoop.prototype.update = function (dontUpdateUI) {
    var prompt;
    var self = this;
    var context = this.contexts.find(findContext);

    function findContext(context) {
        var found;
        if (context.when(self.state)) found = context;
        return found;
    }

    // Setup the prompt if a context was found
    if (context) {
        prompt = new Prompt();
        this.currentPrompt = prompt;
        context.question(this, prompt);
        if (prompt.options.length) {
            prompt.answer = function (promptLoop, value) {
                var option = prompt.optionsRef[value];
                context.answer(self, option);
                self.update();
            };
        } else {
            // No choices available... simply process a null answer
            // And update the state afterward
            context.answer(self, null);
            //self.updatePromptUI(self);
        }
        if (!dontUpdateUI) this.updatePromptUI(this);
    } else {
        console.log("No context found!");
    }
};

PromptLoop.prototype.addContext = function (id, config) {
    var context = new Context(id);
    config(context);
    this.contexts.push(context);
    this.contextsRef[id] = context;
};

function Context(id) {
    this.id = id;
    this.question = null;
    this.when = null;
    this.answer = null;
}

function Prompt() {
    this.question = "";
    this.options = [];
    this.optionsRef = {};
}

Prompt.prototype.option = function (label, value) {
    var option = new Option(label, value);
    this.options.push(option);
    this.optionsRef[value] = option;
};

function Option(label, value) {
    this.label = label;
    this.value = value;
}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwcm9tcHRMb29wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3Byb21wdExvb3AnLCBwcm9tcHRMb29wKTtcblxuZnVuY3Rpb24gcHJvbXB0TG9vcChzdG9yeUxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICB3cml0ZXJzKSB7XG5cbiAgICB2YXIgc3RvcnlMb2cgPSBzdG9yeUxvZ1NlcnZpY2U7XG5cbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuICAgIHZhciBsb2dpYyA9IGdhbWUubG9naWM7XG5cbiAgICBmdW5jdGlvbiBXaGVyZVRvR28oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LndoZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBpc0Fib3V0VG8gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJZb3UuaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGlzQWJvdXRUbyA9PT0gXCJtb3ZlXCI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQucXVlc3Rpb24gPSBmdW5jdGlvbiAocHJvbXB0TG9vcCwgcHJvbXB0KSB7XG4gICAgICAgICAgICBwcm9tcHQucXVlc3Rpb24gPSBcIldoZXJlIGRvIHlvdSB3YW50IHRvIGdvID9cIjtcbiAgICAgICAgICAgIHZhciByb29tcyA9IHN0YXRlLnJlc29sdmUoXCJ5b3UuaXNJbi5saW5rc1RvXCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncm9vbXMnLCByb29tcyk7XG4gICAgICAgICAgICByb29tcy5mb3JFYWNoKGZ1bmN0aW9uIChyb29tKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gcm9vbS5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHJvb20uaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuYW5zd2VyID0gZnVuY3Rpb24gYW5zd2VyKHByb21wdExvb3AsIG9wdGlvbikge1xuICAgICAgICAgICAgLy9jb25zb2xlLnRyYWNlKFwiLmFuc3dlciBmb3IgV2hlcmVUb0RvXCIpO1xuICAgICAgICAgICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgaW5qZWN0ZWQgaW5zdGVhZCBvZiB0YWtlbiBmcm9tIHBhcmVudCBzY29wZVxuICAgICAgICAgICAgbG9naWMucm91dGluZXMuYWJvdXRUbyhcIlwiKTtcbiAgICAgICAgICAgIGlmIChsb2dpYy5yb3V0aW5lcy5tb3ZlKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJzLkRlc2NyaWJlV2hlcmVZb3VBcmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3J5TG9nLmVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGhpcyByb29tIFslc11cIiwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHByb21wdExvb3A7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvTG9va0F0KGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC53aGVuID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucmVzb2x2ZVZhbHVlKFwiWW91LmlzQWJvdXRUb1wiKTtcbiAgICAgICAgICAgIHJldHVybiBpc0Fib3V0VG8gPT09IFwibG9va1wiO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGxvb2sgYXQgP1wiO1xuICAgICAgICAgICAgdmFyIHRoaW5nc0luUm9vbSA9IHN0YXRlLnJlc29sdmUoXCJZb3UuaXNJbi5oYXNJbkl0XCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndGhpbmdzSW5Sb29tJywgdGhpbmdzSW5Sb29tKTtcbiAgICAgICAgICAgIGlmICh0aGluZ3NJblJvb20ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpbmdzSW5Sb29tLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICBsb2dpYy5yb3V0aW5lcy5hYm91dFRvKFwiXCIpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGluZyA9IHN0YXRlLnRoaW5nKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgd3JpdGVycy5EZXNjcmliZVRoaW5nKHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJOb3RoaW5nIHRvIGxvb2sgYXQgaGVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvVGFrZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQud2hlbiA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGlzQWJvdXRUbyA9IHN0YXRlLnJlc29sdmVWYWx1ZShcIllvdS5pc0Fib3V0VG9cIik7XG4gICAgICAgICAgICByZXR1cm4gaXNBYm91dFRvID09PSBcInRha2VcIjtcbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbiA9IGZ1bmN0aW9uIChwcm9tcHRMb29wLCBwcm9tcHQpIHtcbiAgICAgICAgICAgIHByb21wdC5xdWVzdGlvbiA9IFwiV2hhdCBkbyB5b3Ugd2FudCB0byB0YWtlID9cIjtcbiAgICAgICAgICAgIHZhciB0aGluZ3NJblJvb20gPSBzdGF0ZS5yZXNvbHZlKFwiWW91LmlzSW4uaGFzSW5JdFwiKTtcbiAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlSW52ZW50b3J5ID0gW107XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKFwidGhpbmdzSW5Sb29tXCIsIHRoaW5nc0luUm9vbSk7XG5cbiAgICAgICAgICAgIC8vIFRvZG86IFlVQ0suLi4gRmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhlc2UgY2hlY2tzISEhISFcbiAgICAgICAgICAgIHRoaW5nc0luUm9vbS5mb3JFYWNoKGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJ0aGluZ1wiLCB0aGluZy5pZCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXRlbSBpcyBhbiBJbnZlbnRvcnlJdGVtXG4gICAgICAgICAgICAgICAgdmFyIGlzSW52ZW50b3J5SXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlID0gdGhpbmcucmVzb2x2ZShcImlzQVwiKTtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJpcyBhXCIsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nID09PSBzdGF0ZS50aGluZyhcIkludmVudG9yeUl0ZW1cIikpIGlzSW52ZW50b3J5SXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzSW52ZW50b3J5SXRlbSkgdGhpbmdzVGhhdEFyZUludmVudG9yeS5wdXNoKHRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoaW5nc0luUm9vbScsIHRoaW5nc0luUm9vbSk7XG4gICAgICAgICAgICBpZiAodGhpbmdzVGhhdEFyZUludmVudG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlSW52ZW50b3J5LmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikucmVtb3ZlQXNzZXJ0aW9ucyhpc0Fib3V0VG8pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9kbzogRmluZCBzZXhpZXIgYXBpIGZvciByZW1vdmluZyBhbiBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAvLyB0b2RvOiBJbXBsZW1lbnQgXCJ1bmlxdWVcIiBhc3NlcnRpb25zLi4uIHN1Y2ggYXMgd2hlbiBzb21lb25lIGlzXG4gICAgICAgICAgICAgICAgdmFyIHRoaW5nID0gc3RhdGUudGhpbmcob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzSW5JbnZlbnRvcnkgPSBzdGF0ZS5wcmVkaWNhdGUoXCJoYXNJbkludmVudG9yeVwiKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaGFzSW5JbnZlbnRvcnksIHRoaW5nKTtcbiAgICAgICAgICAgICAgICB3cml0ZXJzLkRlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5KHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJTb3JyeSwgbm90aGluZyB0byB0YWtlIGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvRG8oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LndoZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGRvID9cIjtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJNb3ZlXCIsIFwibW92ZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJMb29rXCIsIFwibG9va1wiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJUYWtlXCIsIFwidGFrZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJJbnZlbnRvcnlcIiwgXCJpbnZlbnRvcnlcIik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuYW5zd2VyID0gZnVuY3Rpb24gYW5zd2VyKHByb21wdExvb3AsIG9wdGlvbikge1xuICAgICAgICAgICAgLy9jb25zb2xlLnRyYWNlKFwiLmFuc3dlciBmb3IgV2hhdFRvRG9cIik7XG4gICAgICAgICAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBpbmplY3RlZCBpbnN0ZWFkIG9mIHRha2VuIGZyb20gcGFyZW50IHNjb3BlXG4gICAgICAgICAgICBjb21tYW5kcy5jb21tYW5kKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIGluc3RhbnQgb2YgdGhlIHByb21wdExvb3BcbiAgICB2YXIgcHJvbXB0TG9vcCA9IG5ldyBQcm9tcHRMb29wKHN0YXRlKTtcblxuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoZXJlVG9Eb1wiLCBXaGVyZVRvR28pO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb0xvb2tBdFwiLCBXaGF0VG9Mb29rQXQpO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb1Rha2VcIiwgV2hhdFRvVGFrZSk7XG4gICAgcHJvbXB0TG9vcC5hZGRDb250ZXh0KFwiV2hhdFRvRG9cIiwgV2hhdFRvRG8pO1xuICAgIHByb21wdExvb3AudXBkYXRlKCk7XG5cbiAgICByZXR1cm4gcHJvbXB0TG9vcDtcbn1cblxuXG5cblxuZnVuY3Rpb24gUHJvbXB0TG9vcChzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmNvbnRleHRzID0gW107XG4gICAgdGhpcy5jb250ZXh0c1JlZiA9IFtdO1xuICAgIHRoaXMuY3VycmVudFByb21wdCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IGZ1bmN0aW9uKCkge307XG59XG5cblByb21wdExvb3AucHJvdG90eXBlLm9uVXBkYXRlID0gZnVuY3Rpb24gKG9uVXBkYXRlUHJvbXB0KSB7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IG9uVXBkYXRlUHJvbXB0O1xufTtcblxuUHJvbXB0TG9vcC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbnRVcGRhdGVVSSkge1xuICAgIHZhciBwcm9tcHQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0cy5maW5kKGZpbmRDb250ZXh0KTtcblxuICAgIGZ1bmN0aW9uIGZpbmRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGZvdW5kO1xuICAgICAgICBpZiAoY29udGV4dC53aGVuKHNlbGYuc3RhdGUpKSBmb3VuZCA9IGNvbnRleHQ7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCB0aGUgcHJvbXB0IGlmIGEgY29udGV4dCB3YXMgZm91bmRcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICBwcm9tcHQgPSBuZXcgUHJvbXB0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFByb21wdCA9IHByb21wdDtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbih0aGlzLCBwcm9tcHQpO1xuICAgICAgICBpZiAocHJvbXB0Lm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcm9tcHQuYW5zd2VyID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHByb21wdC5vcHRpb25zUmVmW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBvcHRpb24pO1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gY2hvaWNlcyBhdmFpbGFibGUuLi4gc2ltcGx5IHByb2Nlc3MgYSBudWxsIGFuc3dlclxuICAgICAgICAgICAgLy8gQW5kIHVwZGF0ZSB0aGUgc3RhdGUgYWZ0ZXJ3YXJkXG4gICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBudWxsKTtcbiAgICAgICAgICAgIC8vc2VsZi51cGRhdGVQcm9tcHRVSShzZWxmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRvbnRVcGRhdGVVSSkgdGhpcy51cGRhdGVQcm9tcHRVSSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNvbnRleHQgZm91bmQhXCIpO1xuICAgIH1cbn07XG5cblByb21wdExvb3AucHJvdG90eXBlLmFkZENvbnRleHQgPSBmdW5jdGlvbiAoaWQsIGNvbmZpZykge1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoaWQpO1xuICAgIGNvbmZpZyhjb250ZXh0KTtcbiAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgdGhpcy5jb250ZXh0c1JlZltpZF0gPSBjb250ZXh0O1xufTtcblxuZnVuY3Rpb24gQ29udGV4dChpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnF1ZXN0aW9uID0gbnVsbDtcbiAgICB0aGlzLndoZW4gPSBudWxsO1xuICAgIHRoaXMuYW5zd2VyID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gUHJvbXB0KCkge1xuICAgIHRoaXMucXVlc3Rpb24gPSBcIlwiO1xuICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgIHRoaXMub3B0aW9uc1JlZiA9IHt9O1xufVxuXG5Qcm9tcHQucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCwgdmFsdWUpIHtcbiAgICB2YXIgb3B0aW9uID0gbmV3IE9wdGlvbihsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMub3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgdGhpcy5vcHRpb25zUmVmW3ZhbHVlXSA9IG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIE9wdGlvbihsYWJlbCwgdmFsdWUpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG5cblxuIl0sImZpbGUiOiJwcm9tcHRMb29wLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('sceneryService', sceneryService);

function sceneryService() {
    console.log("screnery service loader!");

    var image = "";
    var onChangeFn = function () {};

    // todo: allo more flexible event hooks with a true "bind" syntax
    function onChange(fn) {
        onChangeFn = fn;
    }

    function change(_image) {
        console.log("scenery change: ", _image);
        image = _image;
        onChangeFn(image);
    }

    return {
        change: change,
        onChange: onChange
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3NjZW5lcnlTZXJ2aWNlJywgc2NlbmVyeVNlcnZpY2UpO1xuXG5mdW5jdGlvbiBzY2VuZXJ5U2VydmljZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcInNjcmVuZXJ5IHNlcnZpY2UgbG9hZGVyIVwiKTtcblxuICAgIHZhciBpbWFnZSA9IFwiXCI7XG4gICAgdmFyIG9uQ2hhbmdlRm4gPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIHRvZG86IGFsbG8gbW9yZSBmbGV4aWJsZSBldmVudCBob29rcyB3aXRoIGEgdHJ1ZSBcImJpbmRcIiBzeW50YXhcbiAgICBmdW5jdGlvbiBvbkNoYW5nZShmbikge1xuICAgICAgICBvbkNoYW5nZUZuID0gZm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlKF9pbWFnZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjZW5lcnkgY2hhbmdlOiBcIiwgX2ltYWdlKTtcbiAgICAgICAgaW1hZ2UgPSBfaW1hZ2U7XG4gICAgICAgIG9uQ2hhbmdlRm4oaW1hZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5nZTogY2hhbmdlLFxuICAgICAgICBvbkNoYW5nZTogb25DaGFuZ2VcbiAgICB9O1xuXG59XG5cblxuXG4iXSwiZmlsZSI6InNjZW5lcnkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').factory('storyLogService', storyLogService);

function storyLogService() {

    function Logger() {

        var storyLog = {
            write: mockFunction,
            clear: mockFunction
        };

        function mockFunction() {
            console.error("storyLog not ready yet...");
        }

        this.register = function (directive) {
            storyLog = directive;
        };

        this.log = function (text) {
            storyLog.write(text, "log");
        };

        this.debug = function (text) {
            storyLog.write(text, "debug");
        };

        this.error = function (text) {
            storyLog.write(text, "error");
        };

        this.heading = function (text) {
            storyLog.write(text, "heading");
        };

        this.subHeading = function (text) {
            storyLog.write(text, "subHeading");
        };

        this.divider = function (text) {
            storyLog.write('<div class="divider"><svg viewBox="0 100 600 160" xmlns="http://www.w3.org/2000/svg"><g>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m130.424789,192.484528c5.347214,-7.567429 3.672729,-18.679031 -0.897858,-21.884766c-8.063118,-5.856277 -16.876259,6.366287 -12.837143,18.526962c4.031113,12.517319 14.122147,21.267746 27.859741,23.769913c29.803345,5.265564 88.753922,-27.178055 126.139771,-37.105835c27.772552,-7.374985 44.737732,3.70697 53.891937,15.980652c-18.814636,-13.327133 -35.962769,-8.691956 -53.610626,-5.4198c-40.492233,7.507782 -82.376175,39.384064 -126.758072,34.370102c-20.720802,-3.09549 -35.239151,-23.671143 -34.04528,-39.805344c0.106049,-1.433762 0.336189,-2.832489 0.697144,-4.180801c2.727554,-9.561676 7.519974,-13.483307 11.765518,-14.646454c11.540581,-3.161896 22.972786,17.871918 7.794868,30.39537z" id="path2383"/>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m487.119385,189.199921c-5.671265,7.631012 -3.895264,18.836304 0.952271,22.069031c8.551758,5.905624 17.89917,-6.419983 13.615234,-18.682968c-4.275269,-12.622757 -14.978088,-21.446869 -29.548309,-23.969986c-31.609894,-5.309998 -94.133331,27.406815 -133.785309,37.418243c-29.45575,7.437042 -47.449219,-3.73822 -57.158203,-16.115265c19.954956,13.439377 38.142334,8.765167 56.859802,5.465454c42.946655,-7.570999 87.369202,-39.715729 134.441101,-34.659546c21.976685,3.121552 37.375,23.870499 36.108826,40.140549c-0.112488,1.445938 -0.356628,2.856339 -0.739441,4.216019c-2.892883,9.642197 -7.975769,13.596756 -12.478638,14.769791c-12.240051,3.188507 -24.365143,-18.0224 -8.267334,-30.651321z" id="path2479"/>' +
                '</g></svg></div>', "divider");
        };

        this.thingImage = function (url) {
            storyLog.write('<img src="' + url + '">', "thingImage");
        };

        this.clear = function () {
            storyLog.clear();
        };

    }

    var logger = new Logger();

    return logger;
}





//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdzdG9yeUxvZ1NlcnZpY2UnLCBzdG9yeUxvZ1NlcnZpY2UpO1xuXG5mdW5jdGlvbiBzdG9yeUxvZ1NlcnZpY2UoKSB7XG5cbiAgICBmdW5jdGlvbiBMb2dnZXIoKSB7XG5cbiAgICAgICAgdmFyIHN0b3J5TG9nID0ge1xuICAgICAgICAgICAgd3JpdGU6IG1vY2tGdW5jdGlvbixcbiAgICAgICAgICAgIGNsZWFyOiBtb2NrRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBtb2NrRnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic3RvcnlMb2cgbm90IHJlYWR5IHlldC4uLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICBzdG9yeUxvZyA9IGRpcmVjdGl2ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImxvZ1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlYnVnID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLndyaXRlKHRleHQsIFwiZGVidWdcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImVycm9yXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaGVhZGluZyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBzdG9yeUxvZy53cml0ZSh0ZXh0LCBcImhlYWRpbmdcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdWJIZWFkaW5nID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLndyaXRlKHRleHQsIFwic3ViSGVhZGluZ1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRpdmlkZXIgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgc3RvcnlMb2cud3JpdGUoJzxkaXYgY2xhc3M9XCJkaXZpZGVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAxMDAgNjAwIDE2MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48Zz4nICtcbiAgICAgICAgICAgICAgICAnPHBhdGggZmlsbD1cIiMwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCIgZD1cIm0xMzAuNDI0Nzg5LDE5Mi40ODQ1MjhjNS4zNDcyMTQsLTcuNTY3NDI5IDMuNjcyNzI5LC0xOC42NzkwMzEgLTAuODk3ODU4LC0yMS44ODQ3NjZjLTguMDYzMTE4LC01Ljg1NjI3NyAtMTYuODc2MjU5LDYuMzY2Mjg3IC0xMi44MzcxNDMsMTguNTI2OTYyYzQuMDMxMTEzLDEyLjUxNzMxOSAxNC4xMjIxNDcsMjEuMjY3NzQ2IDI3Ljg1OTc0MSwyMy43Njk5MTNjMjkuODAzMzQ1LDUuMjY1NTY0IDg4Ljc1MzkyMiwtMjcuMTc4MDU1IDEyNi4xMzk3NzEsLTM3LjEwNTgzNWMyNy43NzI1NTIsLTcuMzc0OTg1IDQ0LjczNzczMiwzLjcwNjk3IDUzLjg5MTkzNywxNS45ODA2NTJjLTE4LjgxNDYzNiwtMTMuMzI3MTMzIC0zNS45NjI3NjksLTguNjkxOTU2IC01My42MTA2MjYsLTUuNDE5OGMtNDAuNDkyMjMzLDcuNTA3NzgyIC04Mi4zNzYxNzUsMzkuMzg0MDY0IC0xMjYuNzU4MDcyLDM0LjM3MDEwMmMtMjAuNzIwODAyLC0zLjA5NTQ5IC0zNS4yMzkxNTEsLTIzLjY3MTE0MyAtMzQuMDQ1MjgsLTM5LjgwNTM0NGMwLjEwNjA0OSwtMS40MzM3NjIgMC4zMzYxODksLTIuODMyNDg5IDAuNjk3MTQ0LC00LjE4MDgwMWMyLjcyNzU1NCwtOS41NjE2NzYgNy41MTk5NzQsLTEzLjQ4MzMwNyAxMS43NjU1MTgsLTE0LjY0NjQ1NGMxMS41NDA1ODEsLTMuMTYxODk2IDIyLjk3Mjc4NiwxNy44NzE5MTggNy43OTQ4NjgsMzAuMzk1Mzd6XCIgaWQ9XCJwYXRoMjM4M1wiLz4nICtcbiAgICAgICAgICAgICAgICAnPHBhdGggZmlsbD1cIiMwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCIgZD1cIm00ODcuMTE5Mzg1LDE4OS4xOTk5MjFjLTUuNjcxMjY1LDcuNjMxMDEyIC0zLjg5NTI2NCwxOC44MzYzMDQgMC45NTIyNzEsMjIuMDY5MDMxYzguNTUxNzU4LDUuOTA1NjI0IDE3Ljg5OTE3LC02LjQxOTk4MyAxMy42MTUyMzQsLTE4LjY4Mjk2OGMtNC4yNzUyNjksLTEyLjYyMjc1NyAtMTQuOTc4MDg4LC0yMS40NDY4NjkgLTI5LjU0ODMwOSwtMjMuOTY5OTg2Yy0zMS42MDk4OTQsLTUuMzA5OTk4IC05NC4xMzMzMzEsMjcuNDA2ODE1IC0xMzMuNzg1MzA5LDM3LjQxODI0M2MtMjkuNDU1NzUsNy40MzcwNDIgLTQ3LjQ0OTIxOSwtMy43MzgyMiAtNTcuMTU4MjAzLC0xNi4xMTUyNjVjMTkuOTU0OTU2LDEzLjQzOTM3NyAzOC4xNDIzMzQsOC43NjUxNjcgNTYuODU5ODAyLDUuNDY1NDU0YzQyLjk0NjY1NSwtNy41NzA5OTkgODcuMzY5MjAyLC0zOS43MTU3MjkgMTM0LjQ0MTEwMSwtMzQuNjU5NTQ2YzIxLjk3NjY4NSwzLjEyMTU1MiAzNy4zNzUsMjMuODcwNDk5IDM2LjEwODgyNiw0MC4xNDA1NDljLTAuMTEyNDg4LDEuNDQ1OTM4IC0wLjM1NjYyOCwyLjg1NjMzOSAtMC43Mzk0NDEsNC4yMTYwMTljLTIuODkyODgzLDkuNjQyMTk3IC03Ljk3NTc2OSwxMy41OTY3NTYgLTEyLjQ3ODYzOCwxNC43Njk3OTFjLTEyLjI0MDA1MSwzLjE4ODUwNyAtMjQuMzY1MTQzLC0xOC4wMjI0IC04LjI2NzMzNCwtMzAuNjUxMzIxelwiIGlkPVwicGF0aDI0NzlcIi8+JyArXG4gICAgICAgICAgICAgICAgJzwvZz48L3N2Zz48L2Rpdj4nLCBcImRpdmlkZXJcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy50aGluZ0ltYWdlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgc3RvcnlMb2cud3JpdGUoJzxpbWcgc3JjPVwiJyArIHVybCArICdcIj4nLCBcInRoaW5nSW1hZ2VcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3J5TG9nLmNsZWFyKCk7XG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICB2YXIgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG4gICAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuXG5cblxuIl0sImZpbGUiOiJzdG9yeUxvZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').factory('writers', writers);

// TODO:  storyLog and state are ASYNC ????

function writers(storyLogService,
                 game,
                 sceneryService) {

    var storyLog = storyLogService;
    var state = game.state;

    // Story welcome message and introduction
    // todo: Output specially styled titles for story and chapters
    function LogStoryIntroduction() {
        var story = state.thing("story");
        var storyTitle = state.resolveValue("story.isNamed");

        if (storyTitle) storyLog.heading(storyTitle);

        var storyDescription = state.resolveValue("story.isDescribedAs");
        if (storyDescription) storyLog.subHeading(storyDescription);
        // todo: Output specially styled separators
        storyLog.divider();
        return this;
    }


    // Describe where you are at the beginning
    function DescribeWhereYouAre(justMoved) {
        storyLog.clear();
        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var scenery = room.resolveValue("hasScenery");
            if (scenery) sceneryService.change(scenery);

            var label = room.resolveValue("isNamed");
            storyLog.heading(label);
            var description = room.resolveValue("isDescribedAs");
            if (description) storyLog.log(description);
        } else {
            storyLog.log("You are nowhere to be found! Place your hero somewhere");
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThing(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            var description = thing.resolveValue("isDescribedAs");
            var image = thing.resolveValue("hasImage");
            if (image) storyLog.thingImage(image);
            if (label) storyLog.subHeading(label);
            if (description) storyLog.log(description);
        }
        return this;
    }

    // Describe where you are at the beginning
    function DescribeThingTakenInInventory(thing) {
        if (thing) {
            var label = thing.resolveValue("isNamed");
            if (label) storyLog.log("You took the " + label);
        }
        return this;
    }

    return {
        DescribeThingTakenInInventory: DescribeThingTakenInInventory,
        DescribeThing:DescribeThing,
        DescribeWhereYouAre:DescribeWhereYouAre,
        LogStoryIntroduction:LogStoryIntroduction
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ3cml0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3dyaXRlcnMnLCB3cml0ZXJzKTtcblxuLy8gVE9ETzogIHN0b3J5TG9nIGFuZCBzdGF0ZSBhcmUgQVNZTkMgPz8/P1xuXG5mdW5jdGlvbiB3cml0ZXJzKHN0b3J5TG9nU2VydmljZSxcbiAgICAgICAgICAgICAgICAgZ2FtZSxcbiAgICAgICAgICAgICAgICAgc2NlbmVyeVNlcnZpY2UpIHtcblxuICAgIHZhciBzdG9yeUxvZyA9IHN0b3J5TG9nU2VydmljZTtcbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuXG4gICAgLy8gU3Rvcnkgd2VsY29tZSBtZXNzYWdlIGFuZCBpbnRyb2R1Y3Rpb25cbiAgICAvLyB0b2RvOiBPdXRwdXQgc3BlY2lhbGx5IHN0eWxlZCB0aXRsZXMgZm9yIHN0b3J5IGFuZCBjaGFwdGVyc1xuICAgIGZ1bmN0aW9uIExvZ1N0b3J5SW50cm9kdWN0aW9uKCkge1xuICAgICAgICB2YXIgc3RvcnkgPSBzdGF0ZS50aGluZyhcInN0b3J5XCIpO1xuICAgICAgICB2YXIgc3RvcnlUaXRsZSA9IHN0YXRlLnJlc29sdmVWYWx1ZShcInN0b3J5LmlzTmFtZWRcIik7XG5cbiAgICAgICAgaWYgKHN0b3J5VGl0bGUpIHN0b3J5TG9nLmhlYWRpbmcoc3RvcnlUaXRsZSk7XG5cbiAgICAgICAgdmFyIHN0b3J5RGVzY3JpcHRpb24gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJzdG9yeS5pc0Rlc2NyaWJlZEFzXCIpO1xuICAgICAgICBpZiAoc3RvcnlEZXNjcmlwdGlvbikgc3RvcnlMb2cuc3ViSGVhZGluZyhzdG9yeURlc2NyaXB0aW9uKTtcbiAgICAgICAgLy8gdG9kbzogT3V0cHV0IHNwZWNpYWxseSBzdHlsZWQgc2VwYXJhdG9yc1xuICAgICAgICBzdG9yeUxvZy5kaXZpZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVXaGVyZVlvdUFyZShqdXN0TW92ZWQpIHtcbiAgICAgICAgc3RvcnlMb2cuY2xlYXIoKTtcbiAgICAgICAgdmFyIHJvb20gPSBzdGF0ZS5yZXNvbHZlVmFsdWUoXCJ5b3UuaXNJblwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIllvdXIgaW4gcm9vbSBcIiwgcm9vbSk7XG4gICAgICAgIGlmIChyb29tKSB7XG4gICAgICAgICAgICB2YXIgc2NlbmVyeSA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaGFzU2NlbmVyeVwiKTtcbiAgICAgICAgICAgIGlmIChzY2VuZXJ5KSBzY2VuZXJ5U2VydmljZS5jaGFuZ2Uoc2NlbmVyeSk7XG5cbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaXNOYW1lZFwiKTtcbiAgICAgICAgICAgIHN0b3J5TG9nLmhlYWRpbmcobGFiZWwpO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcm9vbS5yZXNvbHZlVmFsdWUoXCJpc0Rlc2NyaWJlZEFzXCIpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSBzdG9yeUxvZy5sb2coZGVzY3JpcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcnlMb2cubG9nKFwiWW91IGFyZSBub3doZXJlIHRvIGJlIGZvdW5kISBQbGFjZSB5b3VyIGhlcm8gc29tZXdoZXJlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIERlc2NyaWJlIHdoZXJlIHlvdSBhcmUgYXQgdGhlIGJlZ2lubmluZ1xuICAgIGZ1bmN0aW9uIERlc2NyaWJlVGhpbmcodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpbmcucmVzb2x2ZVZhbHVlKFwiaXNEZXNjcmliZWRBc1wiKTtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImhhc0ltYWdlXCIpO1xuICAgICAgICAgICAgaWYgKGltYWdlKSBzdG9yeUxvZy50aGluZ0ltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGlmIChsYWJlbCkgc3RvcnlMb2cuc3ViSGVhZGluZyhsYWJlbCk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHN0b3J5TG9nLmxvZyhkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnkodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSBzdG9yeUxvZy5sb2coXCJZb3UgdG9vayB0aGUgXCIgKyBsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnk6IERlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5LFxuICAgICAgICBEZXNjcmliZVRoaW5nOkRlc2NyaWJlVGhpbmcsXG4gICAgICAgIERlc2NyaWJlV2hlcmVZb3VBcmU6RGVzY3JpYmVXaGVyZVlvdUFyZSxcbiAgICAgICAgTG9nU3RvcnlJbnRyb2R1Y3Rpb246TG9nU3RvcnlJbnRyb2R1Y3Rpb25cbiAgICB9O1xuXG59XG5cblxuXG4iXSwiZmlsZSI6IndyaXRlcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function() {

angular.module('mindgame').directive('logItem', LogItemDirective);

function LogItemDirective($sce) {
    return {
        restrict: 'E',
        bindToController: {
            type: '=',
            text: '='
        },
        scope: {},
        controllerAs: 'logItem',
        template: '<div class="logItem"></div>',
        controller: LogItemController
    };

    function LogItemController($scope, $element) {
        var self = this;

        $scope.$watch('logItem.text', function(value) {
            $element[0].innerHTML = "<div class='logItem is-" + self.type + "'>" + value + "<div>";
        });

    }
}

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy9sb2dJdGVtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdsb2dJdGVtJywgTG9nSXRlbURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIExvZ0l0ZW1EaXJlY3RpdmUoJHNjZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICc9JyxcbiAgICAgICAgICAgIHRleHQ6ICc9J1xuICAgICAgICB9LFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2xvZ0l0ZW0nLFxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJsb2dJdGVtXCI+PC9kaXY+JyxcbiAgICAgICAgY29udHJvbGxlcjogTG9nSXRlbUNvbnRyb2xsZXJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gTG9nSXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnbG9nSXRlbS50ZXh0JywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICRlbGVtZW50WzBdLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nbG9nSXRlbSBpcy1cIiArIHNlbGYudHlwZSArIFwiJz5cIiArIHZhbHVlICsgXCI8ZGl2PlwiO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxufSkoKTtcbiJdLCJmaWxlIjoic3RvcnlMb2cvbG9nSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {

    angular.module('mindgame').directive('storyLog', StoryLogDirective);

    function StoryLogDirective() {
        return {
            restrict: 'E',
            bindToController: {
                ready: "&"
            },
            scope: {},
            controllerAs: 'storyLog',
            //template: '<div class="logItems">{{ userInput.text }}</div>',
            controller: StoryLogController
        };

        function StoryLogController(storyLogService, $scope, $element, $compile, $window) {

            this.clear = function () {
                $element.empty();
                $window.scroll(0, 0);
            };

            this.write = function (text, type) {
                var scope = $scope.$new();
                scope.text = text;
                scope.type = type;
                var logItemEl = $compile('<log-item type="type" text="text"></log-item>')(scope);
                $element.append(logItemEl);
            };

            storyLogService.register(this);

        }
    }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy9zdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdzdG9yeUxvZycsIFN0b3J5TG9nRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIFN0b3J5TG9nRGlyZWN0aXZlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgICAgICByZWFkeTogXCImXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdzdG9yeUxvZycsXG4gICAgICAgICAgICAvL3RlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxvZ0l0ZW1zXCI+e3sgdXNlcklucHV0LnRleHQgfX08L2Rpdj4nLFxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RvcnlMb2dDb250cm9sbGVyXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gU3RvcnlMb2dDb250cm9sbGVyKHN0b3J5TG9nU2VydmljZSwgJHNjb3BlLCAkZWxlbWVudCwgJGNvbXBpbGUsICR3aW5kb3cpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKDAsIDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uICh0ZXh0LCB0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgICAgICBzY29wZS50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICBzY29wZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgbG9nSXRlbUVsID0gJGNvbXBpbGUoJzxsb2ctaXRlbSB0eXBlPVwidHlwZVwiIHRleHQ9XCJ0ZXh0XCI+PC9sb2ctaXRlbT4nKShzY29wZSk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGxvZ0l0ZW1FbCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzdG9yeUxvZ1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiJdLCJmaWxlIjoic3RvcnlMb2cvc3RvcnlMb2cuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').directive('scenery', SceneryDirective);

function SceneryDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        controllerAs: 'scenery',
        templateUrl: './html/scenery.html',
        controller: SceneryController
    };

    function SceneryController(sceneryService, $element) {
        console.log("screnery directive loader!");

        sceneryService.onChange( function (image) {
            console.log("Changing the scenere: ", image);
            $element.css("background-image", "url(" + image + ")");
            console.log($element);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZXJ5L3NjZW5lcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdzY2VuZXJ5JywgU2NlbmVyeURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIFNjZW5lcnlEaXJlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICB9LFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3NjZW5lcnknLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy4vaHRtbC9zY2VuZXJ5Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBTY2VuZXJ5Q29udHJvbGxlclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBTY2VuZXJ5Q29udHJvbGxlcihzY2VuZXJ5U2VydmljZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY3JlbmVyeSBkaXJlY3RpdmUgbG9hZGVyIVwiKTtcblxuICAgICAgICBzY2VuZXJ5U2VydmljZS5vbkNoYW5nZSggZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5naW5nIHRoZSBzY2VuZXJlOiBcIiwgaW1hZ2UpO1xuICAgICAgICAgICAgJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcInVybChcIiArIGltYWdlICsgXCIpXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il0sImZpbGUiOiJzY2VuZXJ5L3NjZW5lcnkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module('mindgame').directive('userChoice', UserChoiceDirective);

function UserChoiceDirective() {
    return {
        restrict: 'E',
        bindToController: {
            question: '=',
            options: '=',
            onChoose: '&'
        },
        scope: {},
        controllerAs: 'userChoice',
        templateUrl: './html/userChoice.html',
        controller: UserChoiceController
    };

    function UserChoiceController(promptLoop) {
        var self = this;

        promptLoop.onUpdate( function (promptLoop) {
            // Load the appropriate prompt and setup the ui with the prompt
            var prompt = promptLoop.currentPrompt;
            if (prompt) {
                // Prompt the user with a question
                // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                self.question = prompt.question;
                self.options = prompt.options;
                self.choose = function (value) {
                    prompt.answer(promptLoop, value);
                    promptLoop.update();
                };
            } else {
                console.error("OUPS!!!... no prompt were found!!!");
            }
        });

        this.choose = function (value) {
            //console.log("this.submit!!!", this.text);
            self.onChoose({value: value});
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VyQ2hvaWNlL3VzZXJDaG9pY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCd1c2VyQ2hvaWNlJywgVXNlckNob2ljZURpcmVjdGl2ZSk7XG5cbmZ1bmN0aW9uIFVzZXJDaG9pY2VEaXJlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgcXVlc3Rpb246ICc9JyxcbiAgICAgICAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICAgICAgICAgIG9uQ2hvb3NlOiAnJidcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VyQ2hvaWNlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2h0bWwvdXNlckNob2ljZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogVXNlckNob2ljZUNvbnRyb2xsZXJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gVXNlckNob2ljZUNvbnRyb2xsZXIocHJvbXB0TG9vcCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcHJvbXB0TG9vcC5vblVwZGF0ZSggZnVuY3Rpb24gKHByb21wdExvb3ApIHtcbiAgICAgICAgICAgIC8vIExvYWQgdGhlIGFwcHJvcHJpYXRlIHByb21wdCBhbmQgc2V0dXAgdGhlIHVpIHdpdGggdGhlIHByb21wdFxuICAgICAgICAgICAgdmFyIHByb21wdCA9IHByb21wdExvb3AuY3VycmVudFByb21wdDtcbiAgICAgICAgICAgIGlmIChwcm9tcHQpIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9tcHQgdGhlIHVzZXIgd2l0aCBhIHF1ZXN0aW9uXG4gICAgICAgICAgICAgICAgLy8gdG9kbzogVGhpcyBzaG91bGQgYmUgaW5zaWRlIGEgc29ydCBvZiBSRVBMIHBhdHRlcm4gd2l0aCBhIGhhbmRsZXIgZm9yIGVhY2ggdHlwZXMgb2YgY29udGV4dFxuICAgICAgICAgICAgICAgIHNlbGYucXVlc3Rpb24gPSBwcm9tcHQucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zID0gcHJvbXB0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgc2VsZi5jaG9vc2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0LmFuc3dlcihwcm9tcHRMb29wLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdExvb3AudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9VUFMhISEuLi4gbm8gcHJvbXB0IHdlcmUgZm91bmQhISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hvb3NlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5zdWJtaXQhISFcIiwgdGhpcy50ZXh0KTtcbiAgICAgICAgICAgIHNlbGYub25DaG9vc2Uoe3ZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9O1xuICAgIH1cbn0iXSwiZmlsZSI6InVzZXJDaG9pY2UvdXNlckNob2ljZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

angular.module('mindgame').directive('userInput', UserInputDirective);

function UserInputDirective() {
    return {
        restrict: 'E',
        bindToController: {
            text: '=',
            onSubmit: '&'
        },
        scope: {},
        controllerAs: 'userInput',
        template: '<form><input ng-keypress="userInput.keypress($event)" ng-model="userInput.text" type="text" /><button ng-click="userInput.submit()">Go</button></form>',
        controller: UserInputController
    };

    function UserInputController($scope, $element) {
        var self = this;

        this.keypress = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.submit();
            }
        };

        this.submit = function () {
            //console.log("this.submit!!!", this.text);
            this.onSubmit({text: this.text});
            this.text = "";
            $element.find("input")[0].focus();
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VySW5wdXQvdXNlcklucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmRpcmVjdGl2ZSgndXNlcklucHV0JywgVXNlcklucHV0RGlyZWN0aXZlKTtcblxuZnVuY3Rpb24gVXNlcklucHV0RGlyZWN0aXZlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIHRleHQ6ICc9JyxcbiAgICAgICAgICAgIG9uU3VibWl0OiAnJidcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VySW5wdXQnLFxuICAgICAgICB0ZW1wbGF0ZTogJzxmb3JtPjxpbnB1dCBuZy1rZXlwcmVzcz1cInVzZXJJbnB1dC5rZXlwcmVzcygkZXZlbnQpXCIgbmctbW9kZWw9XCJ1c2VySW5wdXQudGV4dFwiIHR5cGU9XCJ0ZXh0XCIgLz48YnV0dG9uIG5nLWNsaWNrPVwidXNlcklucHV0LnN1Ym1pdCgpXCI+R288L2J1dHRvbj48L2Zvcm0+JyxcbiAgICAgICAgY29udHJvbGxlcjogVXNlcklucHV0Q29udHJvbGxlclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBVc2VySW5wdXRDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMua2V5cHJlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLnN1Ym1pdCEhIVwiLCB0aGlzLnRleHQpO1xuICAgICAgICAgICAgdGhpcy5vblN1Ym1pdCh7dGV4dDogdGhpcy50ZXh0fSk7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgJGVsZW1lbnQuZmluZChcImlucHV0XCIpWzBdLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgfVxufSJdLCJmaWxlIjoidXNlcklucHV0L3VzZXJJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


function BigMess() {
    this.script = new BigMess.Script();
    this.state = new BigMess.State();
    this.logic = new BigMess.Logic(this.state, this.script);
}

(function () {
    "use strict";

    BigMess.prototype.run = function () {
        this.script.run(this.state);
        return this;
    };

    /**
     * Parse a text into various semantic parts to be consumed by BigMess
     * @param text
     */
    BigMess.prototype.load = function (text) {
        this.script.load(text);
        return this;
    };

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gQmlnTWVzcygpIHtcbiAgICB0aGlzLnNjcmlwdCA9IG5ldyBCaWdNZXNzLlNjcmlwdCgpO1xuICAgIHRoaXMuc3RhdGUgPSBuZXcgQmlnTWVzcy5TdGF0ZSgpO1xuICAgIHRoaXMubG9naWMgPSBuZXcgQmlnTWVzcy5Mb2dpYyh0aGlzLnN0YXRlLCB0aGlzLnNjcmlwdCk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBCaWdNZXNzLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NyaXB0LnJ1bih0aGlzLnN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGEgdGV4dCBpbnRvIHZhcmlvdXMgc2VtYW50aWMgcGFydHMgdG8gYmUgY29uc3VtZWQgYnkgQmlnTWVzc1xuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICovXG4gICAgQmlnTWVzcy5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHRoaXMuc2NyaXB0LmxvYWQodGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbn0pKCk7XG4iXSwiZmlsZSI6ImJpZ21lc3MuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function(){
"use strict";

// Todo: Token should be an object not an array
// Todo: Move all method functions into the prototype
BigMess.Pointer = Pointer;
function Pointer() {

    this._state = "default";

    this.start = function () {
        this.text = "";
        this.chr = "";
        this.pos = 0;
        this.buffer = [];
        this.rawBuffer = [];
        this.tokens = [];
        this._state = "default";
        this.chr = this.text[this.pos];
    };

    this.peek = function (len) {
        return this.text.substr(this.pos + 1, len);
    };

    this.state = function (id) {
        if (id || id === "") this._state = id;
        return this._state;
    };

    this.step = function () {
        this.buffer.push(this.chr);
        this.rawBuffer.push(this.chr);
        this.pos++;
        this.read();
        return this;
    };

    this.skip = function () {
        this.rawBuffer.push(this.chr);
        this.pos++;
        this.read();
        return this;
    };

    this.read = function () {
        this.chr = this.text[this.pos];
        return this;
    };

    this.flush = function () {
        var txt;
        var txtRaw;
        var token;
        var previousToken;
        txtRaw = this.rawBuffer.join("");
        txt = this.buffer.join("").trim();
        if (txtRaw !== "") {
            if (txt === "" && this.state() === "default") {
                // Ignore whitespace here!

            } else {
                // Collapse line-breaks into multiLinebreak
                previousToken = this.tokens[this.tokens.length - 1];
                if (previousToken && this.state() === "linebreak" &&
                    (previousToken[0] === "linebreak" || previousToken[0] === "multiLinebreak")
                ) {
                    previousToken[0] = "multiLinebreak";
                    previousToken[2] = previousToken[2] + txtRaw;
                } else {
                    token = [this.state(), txt, txtRaw];
                    this.tokens.push(token);
                }
                // Reset the state
                this.state("default");
                this.buffer = [];
                this.rawBuffer = [];
            }
        }
        return this;
    };

    this.startSingleCharBlock = function (stateId) {
        this.flush()
            .skip()
            .state(stateId);
    };

    this.endSingleCharBlock = function () {
        this.skip()
            .flush();
    };

    this.endPunctuationToken = function (type) {
        this.flush().state(type);
        this.step().flush();
    };

    this.isEnded = function () {
        return this.pos > this.text.length;
    };

    this.start();
}

Pointer.prototype.tokenize = function (text) {
    var pointer = this;
    var cycle = 0;
    var maxCycle = 10000;

    var numeric = "0123456789";
    var numericExtended = numeric + ".";
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var alphaNum = alpha + numeric;
    var alphaNumExtended = alphaNum + "-_";

    pointer.text = text;

    while (!pointer.isEnded()) {

        cycle++;
        if (cycle > maxCycle) {
            console.log(pointer);
            throw("Too many cycles!");
        }

        if (pointer.state() === "default") {
            if (pointer.chr === '"') {
                pointer.startSingleCharBlock("doubleQuote");
                continue;
            } else if (pointer.chr === "'") {
                pointer.startSingleCharBlock("singleQuote");
                continue;
            } else if (pointer.chr === "{") {
                pointer.startSingleCharBlock("mustache");
                continue;
            } else if (pointer.chr === "[") {
                pointer.startSingleCharBlock("bracket");
                continue;
            } else if (numeric.indexOf(pointer.chr) >= 0) {
                pointer
                    .flush()
                    .state("numeric");
                continue;
            } else if (pointer.chr === '@') {
                pointer.startSingleCharBlock("at");
                continue;
            } else if (pointer.chr === '#') {
                pointer.startSingleCharBlock("hash");
                continue;
            } else if (pointer.chr === '$') {
                pointer.startSingleCharBlock("dollar");
                continue;
            } else if (pointer.chr === '/') {
                if (pointer.peek(1) === '/') {
                    pointer
                        .flush()
                        .skip()
                        .skip()
                        .state("lineComment");
                    continue;
                } else if (pointer.peek(1) === '*') {
                    pointer
                        .flush()
                        .skip()
                        .skip()
                        .state("blockComment");
                    continue;
                }
            } else if (pointer.chr === '\n') {
                pointer.endPunctuationToken("linebreak");
                continue;
            } else if (pointer.chr === '.') {
                pointer.endPunctuationToken("period");
                continue;
            } else if (pointer.chr === ',') {
                pointer.endPunctuationToken("comma");
                continue;
            } else if (pointer.chr === ':') {
                pointer.endPunctuationToken("colon");
                continue;
            }
        } else if (pointer.state() === "lineComment") {
            if (pointer.chr === "\n") {
                pointer.endSingleCharBlock();
                continue;
            }
        } else if (pointer.state() === "blockComment") {
            if (pointer.chr === "*") {
                if (pointer.peek(1) === "/") {
                    pointer
                        .skip()
                        .skip()
                        .flush();
                    continue;
                }
            }
        } else if (pointer.state() === "doubleQuote") {
            if (pointer.chr === '"') {
                pointer.endSingleCharBlock();
                continue;
            }
        } else if (pointer.state() === "singleQuote") {
            if (pointer.chr === "'") {
                pointer.endSingleCharBlock();
                continue;
            }
        } else if (pointer.state() === "mustache") {
            if (pointer.chr === "}") {
                pointer.endSingleCharBlock();
                continue;
            }
        } else if (pointer.state() === "bracket") {
            if (pointer.chr === "]") {
                pointer.endSingleCharBlock();
                continue;
            }
        } else if (pointer.state() === "numeric") {
            if (numericExtended.indexOf(pointer.chr) < 0) {
                pointer
                    .flush(pointer.state());
                continue;
            }
        } else if (
            pointer.state() === "hash" ||
            pointer.state() === "at" ||
            pointer.state() === "dollar"
        ) {
            if (alphaNumExtended.indexOf(pointer.chr) < 0) {
                pointer
                    .flush(pointer.state());
                continue;
            }
        }
        // Otherwise
        pointer.step();
    }
};


Pointer.prototype.html = function () {
    var tokens = this.tokens;
    var grid = ["<table class='testGrid'><thead><tr><td>Type</td><td>AST Operation</td><td>Token</td><td>Raw</td></tr></thead>"];
    tokens.forEach(function (token, index, tokens) {
        grid.push("<tr><td>");
        grid.push(token[0]);
        grid.push("</td><td>");
        grid.push(token[3]);
        grid.push("</td><td>");
        grid.push(token[1]);
        grid.push("</td><td>[");
        grid.push(token[2]);
        grid.push("]</td></tr>");
    });
    grid.push("</table>");
    return grid.join("");
};


})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnBvaW50ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG5cInVzZSBzdHJpY3RcIjtcblxuLy8gVG9kbzogVG9rZW4gc2hvdWxkIGJlIGFuIG9iamVjdCBub3QgYW4gYXJyYXlcbi8vIFRvZG86IE1vdmUgYWxsIG1ldGhvZCBmdW5jdGlvbnMgaW50byB0aGUgcHJvdG90eXBlXG5CaWdNZXNzLlBvaW50ZXIgPSBQb2ludGVyO1xuZnVuY3Rpb24gUG9pbnRlcigpIHtcblxuICAgIHRoaXMuX3N0YXRlID0gXCJkZWZhdWx0XCI7XG5cbiAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLmNociA9IFwiXCI7XG4gICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5yYXdCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcImRlZmF1bHRcIjtcbiAgICAgICAgdGhpcy5jaHIgPSB0aGlzLnRleHRbdGhpcy5wb3NdO1xuICAgIH07XG5cbiAgICB0aGlzLnBlZWsgPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQuc3Vic3RyKHRoaXMucG9zICsgMSwgbGVuKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0ZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBpZiAoaWQgfHwgaWQgPT09IFwiXCIpIHRoaXMuX3N0YXRlID0gaWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuY2hyKTtcbiAgICAgICAgdGhpcy5yYXdCdWZmZXIucHVzaCh0aGlzLmNocik7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgICAgIHRoaXMucmVhZCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5za2lwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJhd0J1ZmZlci5wdXNoKHRoaXMuY2hyKTtcbiAgICAgICAgdGhpcy5wb3MrKztcbiAgICAgICAgdGhpcy5yZWFkKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLnJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2hyID0gdGhpcy50ZXh0W3RoaXMucG9zXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eHQ7XG4gICAgICAgIHZhciB0eHRSYXc7XG4gICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgdmFyIHByZXZpb3VzVG9rZW47XG4gICAgICAgIHR4dFJhdyA9IHRoaXMucmF3QnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgIHR4dCA9IHRoaXMuYnVmZmVyLmpvaW4oXCJcIikudHJpbSgpO1xuICAgICAgICBpZiAodHh0UmF3ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBpZiAodHh0ID09PSBcIlwiICYmIHRoaXMuc3RhdGUoKSA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgd2hpdGVzcGFjZSBoZXJlIVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENvbGxhcHNlIGxpbmUtYnJlYWtzIGludG8gbXVsdGlMaW5lYnJlYWtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1Rva2VuID0gdGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgdGhpcy5zdGF0ZSgpID09PSBcImxpbmVicmVha1wiICYmXG4gICAgICAgICAgICAgICAgICAgIChwcmV2aW91c1Rva2VuWzBdID09PSBcImxpbmVicmVha1wiIHx8IHByZXZpb3VzVG9rZW5bMF0gPT09IFwibXVsdGlMaW5lYnJlYWtcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUb2tlblswXSA9IFwibXVsdGlMaW5lYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUb2tlblsyXSA9IHByZXZpb3VzVG9rZW5bMl0gKyB0eHRSYXc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBbdGhpcy5zdGF0ZSgpLCB0eHQsIHR4dFJhd107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgc3RhdGVcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucmF3QnVmZmVyID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhcnRTaW5nbGVDaGFyQmxvY2sgPSBmdW5jdGlvbiAoc3RhdGVJZCkge1xuICAgICAgICB0aGlzLmZsdXNoKClcbiAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgIC5zdGF0ZShzdGF0ZUlkKTtcbiAgICB9O1xuXG4gICAgdGhpcy5lbmRTaW5nbGVDaGFyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2tpcCgpXG4gICAgICAgICAgICAuZmx1c2goKTtcbiAgICB9O1xuXG4gICAgdGhpcy5lbmRQdW5jdHVhdGlvblRva2VuID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdGhpcy5mbHVzaCgpLnN0YXRlKHR5cGUpO1xuICAgICAgICB0aGlzLnN0ZXAoKS5mbHVzaCgpO1xuICAgIH07XG5cbiAgICB0aGlzLmlzRW5kZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcyA+IHRoaXMudGV4dC5sZW5ndGg7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhcnQoKTtcbn1cblxuUG9pbnRlci5wcm90b3R5cGUudG9rZW5pemUgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBwb2ludGVyID0gdGhpcztcbiAgICB2YXIgY3ljbGUgPSAwO1xuICAgIHZhciBtYXhDeWNsZSA9IDEwMDAwO1xuXG4gICAgdmFyIG51bWVyaWMgPSBcIjAxMjM0NTY3ODlcIjtcbiAgICB2YXIgbnVtZXJpY0V4dGVuZGVkID0gbnVtZXJpYyArIFwiLlwiO1xuICAgIHZhciBhbHBoYSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiO1xuICAgIHZhciBhbHBoYU51bSA9IGFscGhhICsgbnVtZXJpYztcbiAgICB2YXIgYWxwaGFOdW1FeHRlbmRlZCA9IGFscGhhTnVtICsgXCItX1wiO1xuXG4gICAgcG9pbnRlci50ZXh0ID0gdGV4dDtcblxuICAgIHdoaWxlICghcG9pbnRlci5pc0VuZGVkKCkpIHtcblxuICAgICAgICBjeWNsZSsrO1xuICAgICAgICBpZiAoY3ljbGUgPiBtYXhDeWNsZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocG9pbnRlcik7XG4gICAgICAgICAgICB0aHJvdyhcIlRvbyBtYW55IGN5Y2xlcyFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9pbnRlci5zdGF0ZSgpID09PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlci5zdGFydFNpbmdsZUNoYXJCbG9jayhcImRvdWJsZVF1b3RlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLmNociA9PT0gXCInXCIpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLnN0YXJ0U2luZ2xlQ2hhckJsb2NrKFwic2luZ2xlUXVvdGVcIik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSBcIntcIikge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJtdXN0YWNoZVwiKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09IFwiW1wiKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlci5zdGFydFNpbmdsZUNoYXJCbG9jayhcImJyYWNrZXRcIik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bWVyaWMuaW5kZXhPZihwb2ludGVyLmNocikgPj0gMCkge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgLmZsdXNoKClcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRlKFwibnVtZXJpY1wiKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICdAJykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJhdFwiKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICcjJykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRTaW5nbGVDaGFyQmxvY2soXCJoYXNoXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLmNociA9PT0gJyQnKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlci5zdGFydFNpbmdsZUNoYXJCbG9jayhcImRvbGxhclwiKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICcvJykge1xuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyLnBlZWsoMSkgPT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmx1c2goKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNraXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNraXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXRlKFwibGluZUNvbW1lbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5wZWVrKDEpID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZsdXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGF0ZShcImJsb2NrQ29tbWVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLmNociA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFB1bmN0dWF0aW9uVG9rZW4oXCJsaW5lYnJlYWtcIik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFB1bmN0dWF0aW9uVG9rZW4oXCJwZXJpb2RcIik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuY2hyID09PSAnLCcpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFB1bmN0dWF0aW9uVG9rZW4oXCJjb21tYVwiKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5jaHIgPT09ICc6Jykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kUHVuY3R1YXRpb25Ub2tlbihcImNvbG9uXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJsaW5lQ29tbWVudFwiKSB7XG4gICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFNpbmdsZUNoYXJCbG9jaygpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJibG9ja0NvbW1lbnRcIikge1xuICAgICAgICAgICAgaWYgKHBvaW50ZXIuY2hyID09PSBcIipcIikge1xuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyLnBlZWsoMSkgPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5za2lwKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5zdGF0ZSgpID09PSBcImRvdWJsZVF1b3RlXCIpIHtcbiAgICAgICAgICAgIGlmIChwb2ludGVyLmNociA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIuZW5kU2luZ2xlQ2hhckJsb2NrKCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlci5zdGF0ZSgpID09PSBcInNpbmdsZVF1b3RlXCIpIHtcbiAgICAgICAgICAgIGlmIChwb2ludGVyLmNociA9PT0gXCInXCIpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmVuZFNpbmdsZUNoYXJCbG9jaygpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIuc3RhdGUoKSA9PT0gXCJtdXN0YWNoZVwiKSB7XG4gICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlci5lbmRTaW5nbGVDaGFyQmxvY2soKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnN0YXRlKCkgPT09IFwiYnJhY2tldFwiKSB7XG4gICAgICAgICAgICBpZiAocG9pbnRlci5jaHIgPT09IFwiXVwiKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlci5lbmRTaW5nbGVDaGFyQmxvY2soKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyLnN0YXRlKCkgPT09IFwibnVtZXJpY1wiKSB7XG4gICAgICAgICAgICBpZiAobnVtZXJpY0V4dGVuZGVkLmluZGV4T2YocG9pbnRlci5jaHIpIDwgMCkge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgLmZsdXNoKHBvaW50ZXIuc3RhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb2ludGVyLnN0YXRlKCkgPT09IFwiaGFzaFwiIHx8XG4gICAgICAgICAgICBwb2ludGVyLnN0YXRlKCkgPT09IFwiYXRcIiB8fFxuICAgICAgICAgICAgcG9pbnRlci5zdGF0ZSgpID09PSBcImRvbGxhclwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGFscGhhTnVtRXh0ZW5kZWQuaW5kZXhPZihwb2ludGVyLmNocikgPCAwKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAuZmx1c2gocG9pbnRlci5zdGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2VcbiAgICAgICAgcG9pbnRlci5zdGVwKCk7XG4gICAgfVxufTtcblxuXG5Qb2ludGVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnRva2VucztcbiAgICB2YXIgZ3JpZCA9IFtcIjx0YWJsZSBjbGFzcz0ndGVzdEdyaWQnPjx0aGVhZD48dHI+PHRkPlR5cGU8L3RkPjx0ZD5BU1QgT3BlcmF0aW9uPC90ZD48dGQ+VG9rZW48L3RkPjx0ZD5SYXc8L3RkPjwvdHI+PC90aGVhZD5cIl07XG4gICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpbmRleCwgdG9rZW5zKSB7XG4gICAgICAgIGdyaWQucHVzaChcIjx0cj48dGQ+XCIpO1xuICAgICAgICBncmlkLnB1c2godG9rZW5bMF0pO1xuICAgICAgICBncmlkLnB1c2goXCI8L3RkPjx0ZD5cIik7XG4gICAgICAgIGdyaWQucHVzaCh0b2tlblszXSk7XG4gICAgICAgIGdyaWQucHVzaChcIjwvdGQ+PHRkPlwiKTtcbiAgICAgICAgZ3JpZC5wdXNoKHRva2VuWzFdKTtcbiAgICAgICAgZ3JpZC5wdXNoKFwiPC90ZD48dGQ+W1wiKTtcbiAgICAgICAgZ3JpZC5wdXNoKHRva2VuWzJdKTtcbiAgICAgICAgZ3JpZC5wdXNoKFwiXTwvdGQ+PC90cj5cIik7XG4gICAgfSk7XG4gICAgZ3JpZC5wdXNoKFwiPC90YWJsZT5cIik7XG4gICAgcmV0dXJuIGdyaWQuam9pbihcIlwiKTtcbn07XG5cblxufSkoKTtcbiJdLCJmaWxlIjoiYmlnbWVzcy5wb2ludGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    "use strict";

    BigMess.Node = Node;
    function Node(type, value, variant) {
        this.type = type;
        this.variant = variant;
        this.value = value;
        this.set = new Set();
    }

    Node.prototype.html = function () {
        var html = [];
        html.push("<div class='node'>");
        html.push(
            "<span class='label'><span class='value'>" +
            this.value.substr(0, 80) +
            "</span> <span class='type'>"
            + this.type +
            "</span>");
        if (this.variant) html.push("<span class='variant'>" + this.variant + "</span>");
        html.push("</span>");
        html.push(this.set.html());
        html.push("</div>");
        return html.join("");
    };

    BigMess.Set = Set;
    function Set() {
        this.nodes = [];
    }

    Set.prototype.html = function () {
        var html = [];
        html.push("<div class='set'>");
        this.nodes.forEach(function (node) {
            html.push(node.html());
        });
        html.push("</div>");
        return html.join("");
    };

    Set.prototype.add = function (node) {
        this.nodes.push(node);
        return this;
    };

    Set.prototype.last = function () {
        return this.nodes[this.nodes.length - 1];
    };


})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLm5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIEJpZ01lc3MuTm9kZSA9IE5vZGU7XG4gICAgZnVuY3Rpb24gTm9kZSh0eXBlLCB2YWx1ZSwgdmFyaWFudCkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnZhcmlhbnQgPSB2YXJpYW50O1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0ID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIE5vZGUucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J25vZGUnPlwiKTtcbiAgICAgICAgaHRtbC5wdXNoKFxuICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nbGFiZWwnPjxzcGFuIGNsYXNzPSd2YWx1ZSc+XCIgK1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5zdWJzdHIoMCwgODApICtcbiAgICAgICAgICAgIFwiPC9zcGFuPiA8c3BhbiBjbGFzcz0ndHlwZSc+XCJcbiAgICAgICAgICAgICsgdGhpcy50eXBlICtcbiAgICAgICAgICAgIFwiPC9zcGFuPlwiKTtcbiAgICAgICAgaWYgKHRoaXMudmFyaWFudCkgaHRtbC5wdXNoKFwiPHNwYW4gY2xhc3M9J3ZhcmlhbnQnPlwiICsgdGhpcy52YXJpYW50ICsgXCI8L3NwYW4+XCIpO1xuICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+XCIpO1xuICAgICAgICBodG1sLnB1c2godGhpcy5zZXQuaHRtbCgpKTtcbiAgICAgICAgaHRtbC5wdXNoKFwiPC9kaXY+XCIpO1xuICAgICAgICByZXR1cm4gaHRtbC5qb2luKFwiXCIpO1xuICAgIH07XG5cbiAgICBCaWdNZXNzLlNldCA9IFNldDtcbiAgICBmdW5jdGlvbiBTZXQoKSB7XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBTZXQucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J3NldCc+XCIpO1xuICAgICAgICB0aGlzLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGh0bWwucHVzaChub2RlLmh0bWwoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBodG1sLnB1c2goXCI8L2Rpdj5cIik7XG4gICAgICAgIHJldHVybiBodG1sLmpvaW4oXCJcIik7XG4gICAgfTtcblxuICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgU2V0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aCAtIDFdO1xuICAgIH07XG5cblxufSkoKTtcblxuIl0sImZpbGUiOiJiaWdtZXNzLm5vZGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function (Node) {
    "use strict";

    BigMess.Cursor = Cursor;
    function Cursor() {
        this.stack = [];
        this.sequenceBroken = false;
    }

    Cursor.prototype.size = function () {
        return this.stack.length;
    };

    Cursor.prototype.start = function (node) {
        this.stack = [node];
        return this;
    };

    Cursor.prototype.push = function (node) {
        this.stack.push(node);
        return this;
    };

    Cursor.prototype.pop = function () {
        this.stack.pop();
        return this;
    };

    Cursor.prototype.head = function () {
        return this.stack[this.stack.length - 1];
    };

    Cursor.prototype.parent = function () {
        var offset = (this.stack.length > 2) ? -2 : -1;
        return this.stack[this.stack.length - offset];
    };

    Cursor.prototype.root = function () {
        return this.stack[0];
    };

    Cursor.prototype.appendInstruction = function (value) {
        var node = new Node("instruction", value);

        if (this.head().set.last() &&
            this.head().set.last().type === 'symbol' && !this.sequenceBroken) {
            // If the instruction follows a symbol, the instruction is considered to be "absorbed" as
            // a unique argument by the symble (and vice versa)

            this.sequenceBroken = false;
            this.push(this.head().set.last());
            this.head().set.add(node);
            //this.pop();
        } else {
            this.sequenceBroken = false;
            this.head().set.add(node);
        }
        return this;
    };

    Cursor.prototype.endSequence = function () {
        while (this.size() > 1) {
            this.pop();
        }
        // if the next sequence starts with a value following an instruction
        // this will prevent the value from being "absorbed" by the instruction
        this.sequenceBroken = true;
        return this;
    };

    Cursor.prototype.appendSymbol = function (variant, value) {
        var node = new Node("symbol", value, variant);

        if (this.head().set.last() &&
            this.head().set.last().type === 'instruction' && !this.sequenceBroken) {
            // If the value follows an instruction, the value is considered to be "absorbed" as
            // a unique argument by the instruction

            this.sequenceBroken = false;
            this.push(this.head().set.last());
            this.head().set.add(node);
            //this.pop();
        } else {
            this.sequenceBroken = false;
            this.head().set.add(node);
        }
        return this;
    };

    Cursor.prototype.startArguments = function () {
        this.sequenceBroken = false;
        var node = this.head().set.last();
        this.push(node);
        return this;
    };

    Cursor.prototype.nextArgument = function () {
        this.sequenceBroken = true;
        if (this.size() > 1) {
            this.pop();
        }
        return this;
    };

})(BigMess.Node);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLmN1cnNvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKE5vZGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIEJpZ01lc3MuQ3Vyc29yID0gQ3Vyc29yO1xuICAgIGZ1bmN0aW9uIEN1cnNvcigpIHtcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgICAgICB0aGlzLnNlcXVlbmNlQnJva2VuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgQ3Vyc29yLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgfTtcblxuICAgIEN1cnNvci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aGlzLnN0YWNrID0gW25vZGVdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgQ3Vyc29yLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKG5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgQ3Vyc29yLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBDdXJzb3IucHJvdG90eXBlLmhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XG4gICAgfTtcblxuICAgIEN1cnNvci5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMuc3RhY2subGVuZ3RoID4gMikgPyAtMiA6IC0xO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIG9mZnNldF07XG4gICAgfTtcblxuICAgIEN1cnNvci5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbMF07XG4gICAgfTtcblxuICAgIEN1cnNvci5wcm90b3R5cGUuYXBwZW5kSW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZShcImluc3RydWN0aW9uXCIsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkKCkuc2V0Lmxhc3QoKSAmJlxuICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0Lmxhc3QoKS50eXBlID09PSAnc3ltYm9sJyAmJiAhdGhpcy5zZXF1ZW5jZUJyb2tlbikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGluc3RydWN0aW9uIGZvbGxvd3MgYSBzeW1ib2wsIHRoZSBpbnN0cnVjdGlvbiBpcyBjb25zaWRlcmVkIHRvIGJlIFwiYWJzb3JiZWRcIiBhc1xuICAgICAgICAgICAgLy8gYSB1bmlxdWUgYXJndW1lbnQgYnkgdGhlIHN5bWJsZSAoYW5kIHZpY2UgdmVyc2EpXG5cbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucHVzaCh0aGlzLmhlYWQoKS5zZXQubGFzdCgpKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZCgpLnNldC5hZGQobm9kZSk7XG4gICAgICAgICAgICAvL3RoaXMucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlcXVlbmNlQnJva2VuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhlYWQoKS5zZXQuYWRkKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBDdXJzb3IucHJvdG90eXBlLmVuZFNlcXVlbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5zaXplKCkgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBuZXh0IHNlcXVlbmNlIHN0YXJ0cyB3aXRoIGEgdmFsdWUgZm9sbG93aW5nIGFuIGluc3RydWN0aW9uXG4gICAgICAgIC8vIHRoaXMgd2lsbCBwcmV2ZW50IHRoZSB2YWx1ZSBmcm9tIGJlaW5nIFwiYWJzb3JiZWRcIiBieSB0aGUgaW5zdHJ1Y3Rpb25cbiAgICAgICAgdGhpcy5zZXF1ZW5jZUJyb2tlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBDdXJzb3IucHJvdG90eXBlLmFwcGVuZFN5bWJvbCA9IGZ1bmN0aW9uICh2YXJpYW50LCB2YWx1ZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKFwic3ltYm9sXCIsIHZhbHVlLCB2YXJpYW50KTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkKCkuc2V0Lmxhc3QoKSAmJlxuICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0Lmxhc3QoKS50eXBlID09PSAnaW5zdHJ1Y3Rpb24nICYmICF0aGlzLnNlcXVlbmNlQnJva2VuKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgZm9sbG93cyBhbiBpbnN0cnVjdGlvbiwgdGhlIHZhbHVlIGlzIGNvbnNpZGVyZWQgdG8gYmUgXCJhYnNvcmJlZFwiIGFzXG4gICAgICAgICAgICAvLyBhIHVuaXF1ZSBhcmd1bWVudCBieSB0aGUgaW5zdHJ1Y3Rpb25cblxuICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZUJyb2tlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wdXNoKHRoaXMuaGVhZCgpLnNldC5sYXN0KCkpO1xuICAgICAgICAgICAgdGhpcy5oZWFkKCkuc2V0LmFkZChub2RlKTtcbiAgICAgICAgICAgIC8vdGhpcy5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGVhZCgpLnNldC5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEN1cnNvci5wcm90b3R5cGUuc3RhcnRBcmd1bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2VxdWVuY2VCcm9rZW4gPSBmYWxzZTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmhlYWQoKS5zZXQubGFzdCgpO1xuICAgICAgICB0aGlzLnB1c2gobm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBDdXJzb3IucHJvdG90eXBlLm5leHRBcmd1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZUJyb2tlbiA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNpemUoKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxufSkoQmlnTWVzcy5Ob2RlKTtcbiJdLCJmaWxlIjoiYmlnbWVzcy5jdXJzb3IuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function () {
    "use strict";

    BigMess.Logic = Logic;

    function Logic(state, script) {
        this.state = state;
        this.script = script;
        this.routines = {};
    }

    Logic.prototype.register = function (id, fn) {
        var self = this;
        function routine() {
            return fn.apply(self, arguments);
        }
        this.routines[id] = routine;
    };

    Logic.prototype.trigger = function (subject, event, object) {
        console.log("Triggering events : ", event);
        // Get the propper predicate
        var predicate = this.state.predicate(event);
        if (predicate) {
            // Find any existing ActionHandles
            var actionHandler = this.state.getActionHandler(subject, predicate, object);

            if (actionHandler) {

                // Find the script node which is child of the "do" operator
                var referenceNode = this.script.references[actionHandler.do.id];
                if (referenceNode) {
                    this.script.runtime.runNode(referenceNode);
                    // TODO Execute the node found
                    console.log("FOUND!!!!!", referenceNode);
                } else {
                    console.log("No 'on' node reference found for " + actionHandler.do.id);
                }
            }





            console.log("actionHandler", actionHandler);
        } else {
            console.log("Unknown action predicate: ", event);
        }
    };

    Logic.prototype.routine = function (id) {
        return this.routines[id];
    };



})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLmxvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBCaWdNZXNzLkxvZ2ljID0gTG9naWM7XG5cbiAgICBmdW5jdGlvbiBMb2dpYyhzdGF0ZSwgc2NyaXB0KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgIHRoaXMucm91dGluZXMgPSB7fTtcbiAgICB9XG5cbiAgICBMb2dpYy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIGZuKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gcm91dGluZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGluZXNbaWRdID0gcm91dGluZTtcbiAgICB9O1xuXG4gICAgTG9naWMucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoc3ViamVjdCwgZXZlbnQsIG9iamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRyaWdnZXJpbmcgZXZlbnRzIDogXCIsIGV2ZW50KTtcbiAgICAgICAgLy8gR2V0IHRoZSBwcm9wcGVyIHByZWRpY2F0ZVxuICAgICAgICB2YXIgcHJlZGljYXRlID0gdGhpcy5zdGF0ZS5wcmVkaWNhdGUoZXZlbnQpO1xuICAgICAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAvLyBGaW5kIGFueSBleGlzdGluZyBBY3Rpb25IYW5kbGVzXG4gICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlciA9IHRoaXMuc3RhdGUuZ2V0QWN0aW9uSGFuZGxlcihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCk7XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb25IYW5kbGVyKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBzY3JpcHQgbm9kZSB3aGljaCBpcyBjaGlsZCBvZiB0aGUgXCJkb1wiIG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZU5vZGUgPSB0aGlzLnNjcmlwdC5yZWZlcmVuY2VzW2FjdGlvbkhhbmRsZXIuZG8uaWRdO1xuICAgICAgICAgICAgICAgIGlmIChyZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0LnJ1bnRpbWUucnVuTm9kZShyZWZlcmVuY2VOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBFeGVjdXRlIHRoZSBub2RlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9VTkQhISEhIVwiLCByZWZlcmVuY2VOb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vICdvbicgbm9kZSByZWZlcmVuY2UgZm91bmQgZm9yIFwiICsgYWN0aW9uSGFuZGxlci5kby5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0aW9uSGFuZGxlclwiLCBhY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBhY3Rpb24gcHJlZGljYXRlOiBcIiwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIExvZ2ljLnByb3RvdHlwZS5yb3V0aW5lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRpbmVzW2lkXTtcbiAgICB9O1xuXG5cblxufSkoKTtcblxuIl0sImZpbGUiOiJiaWdtZXNzLmxvZ2ljLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function (Cursor, Node) {
    "use strict";

    BigMess.AST = AST;
    function AST() {
        this.root = new Node("symbol", "root");
        this.cursor = new Cursor().start(this.root);
    }

    AST.prototype.qualifyTokens = function (tokens) {

        tokens.forEach(function (token, index, tokens) {
            var command = "";
            var type = token[0];
            if (type === "default") {
                command = "appendInstruction"
            } else if (type === "period") {
                command = "endSequence"
            } else if (type === "multiLinebreak") {
                command = "endSequence"
            } else if (type === "numeric") {
                command = "appendValue"
            } else if (type === "singleQuote") {
                command = "appendValue"
            } else if (type === "doubleQuote") {
                command = "appendValue"
            } else if (type === "colon") {
                command = "startArguments"
            } else if (type === "hash") {
                command = "appendReference"
            } else if (type === "at") {
                command = "appendConstant"
            } else if (type === "comma") {
                command = "nextArgument"
            } else if (type === "linebreak") {
                command = "ignore"
            } else if (type === "lineComment") {
                command = "ignore"
            } else if (type === "blockComment") {
                command = "ignore"
            }
            token[3] = command;
        });
    };

    AST.prototype.html = function () {
        var html = ["<div class='tree'>"];
        html.push(this.root.html());
        html.push("</div>");
        return html.join("");
    };

    /**
     * Compile an Abstract Syntax Tree from a series of tokens
     * @param tokens
     * @returns {*}
     */
    AST.prototype.compile = function (tokens) {
        var cursor = this.cursor;

        this.qualifyTokens(tokens);

        tokens.forEach(function (token) {
            var command = token[3];
            var tokenString = token[1];
            switch (command) {
                case "appendInstruction":
                    cursor.appendInstruction(tokenString);
                    break;
                case "endSequence":
                    cursor.endSequence();
                    break;
                case "appendValue":
                    cursor.appendSymbol("value", tokenString);
                    break;
                case "appendReference":
                    cursor.appendSymbol("reference", tokenString);
                    break;
                case "appendConstant":
                    cursor.appendSymbol("constant", tokenString);
                    break;
                case "startArguments":
                    cursor.startArguments();
                    break;
                case "nextArgument":
                    cursor.nextArgument();
                    break;
                case "ignore":
                    break;
            }
        });
    };

})(BigMess.Cursor, BigMess.Node);



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLmFzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKEN1cnNvciwgTm9kZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgQmlnTWVzcy5BU1QgPSBBU1Q7XG4gICAgZnVuY3Rpb24gQVNUKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShcInN5bWJvbFwiLCBcInJvb3RcIik7XG4gICAgICAgIHRoaXMuY3Vyc29yID0gbmV3IEN1cnNvcigpLnN0YXJ0KHRoaXMucm9vdCk7XG4gICAgfVxuXG4gICAgQVNULnByb3RvdHlwZS5xdWFsaWZ5VG9rZW5zID0gZnVuY3Rpb24gKHRva2Vucykge1xuXG4gICAgICAgIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbiwgaW5kZXgsIHRva2Vucykge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0b2tlblswXTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBcImFwcGVuZEluc3RydWN0aW9uXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJwZXJpb2RcIikge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBcImVuZFNlcXVlbmNlXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJtdWx0aUxpbmVicmVha1wiKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFwiZW5kU2VxdWVuY2VcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIm51bWVyaWNcIikge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBcImFwcGVuZFZhbHVlXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJzaW5nbGVRdW90ZVwiKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFwiYXBwZW5kVmFsdWVcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImRvdWJsZVF1b3RlXCIpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gXCJhcHBlbmRWYWx1ZVwiXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29sb25cIikge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBcInN0YXJ0QXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJoYXNoXCIpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gXCJhcHBlbmRSZWZlcmVuY2VcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImF0XCIpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gXCJhcHBlbmRDb25zdGFudFwiXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY29tbWFcIikge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBcIm5leHRBcmd1bWVudFwiXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwibGluZWJyZWFrXCIpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gXCJpZ25vcmVcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImxpbmVDb21tZW50XCIpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gXCJpZ25vcmVcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImJsb2NrQ29tbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFwiaWdub3JlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuWzNdID0gY29tbWFuZDtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIEFTVC5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBbXCI8ZGl2IGNsYXNzPSd0cmVlJz5cIl07XG4gICAgICAgIGh0bWwucHVzaCh0aGlzLnJvb3QuaHRtbCgpKTtcbiAgICAgICAgaHRtbC5wdXNoKFwiPC9kaXY+XCIpO1xuICAgICAgICByZXR1cm4gaHRtbC5qb2luKFwiXCIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb21waWxlIGFuIEFic3RyYWN0IFN5bnRheCBUcmVlIGZyb20gYSBzZXJpZXMgb2YgdG9rZW5zXG4gICAgICogQHBhcmFtIHRva2Vuc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIEFTVC5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IHRoaXMuY3Vyc29yO1xuXG4gICAgICAgIHRoaXMucXVhbGlmeVRva2Vucyh0b2tlbnMpO1xuXG4gICAgICAgIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSB0b2tlblszXTtcbiAgICAgICAgICAgIHZhciB0b2tlblN0cmluZyA9IHRva2VuWzFdO1xuICAgICAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFwcGVuZEluc3RydWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5hcHBlbmRJbnN0cnVjdGlvbih0b2tlblN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRTZXF1ZW5jZVwiOlxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZW5kU2VxdWVuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFwcGVuZFZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5hcHBlbmRTeW1ib2woXCJ2YWx1ZVwiLCB0b2tlblN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBlbmRSZWZlcmVuY2VcIjpcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmFwcGVuZFN5bWJvbChcInJlZmVyZW5jZVwiLCB0b2tlblN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBlbmRDb25zdGFudFwiOlxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuYXBwZW5kU3ltYm9sKFwiY29uc3RhbnRcIiwgdG9rZW5TdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RhcnRBcmd1bWVudHNcIjpcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0YXJ0QXJndW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJuZXh0QXJndW1lbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLm5leHRBcmd1bWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWdub3JlXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG59KShCaWdNZXNzLkN1cnNvciwgQmlnTWVzcy5Ob2RlKTtcblxuXG4iXSwiZmlsZSI6ImJpZ21lc3MuYXN0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function (Cursor) {
    "use strict";

    var runtimeModes = {
        "when": true,
        "do": true,
        "on": true
    };


    BigMess.Runtime = Runtime;
    /**
     * Runtime class user to execute the ast with the state
     * @param ast
     * @param state
     * @constructor
     */
    function Runtime(ast, state, onModeChange) {
        this.ast = ast;
        this.state = state;
        this.cursor = new Cursor();
        this.stack = new Stack();
        // Allows the logic class to keep track on special key nodes
        this.onModeChange = onModeChange || function(){};
    }

    // todo: See if code should be generalized between Stack/Pointer/Cursor
    function Stack() {
        this.scopes = [];
    }

    Stack.prototype.size = function () {
        return this.scopes.length;
    };

    Stack.prototype.head = function () {
        return this.scopes[this.scopes.length - 1];
    };

    Stack.prototype.parent = function () {
        var offset = (this.scopes.length > 2) ? 2 : 1;
        return this.scopes[this.scopes.length - offset];
    };

    Stack.prototype.root = function () {
        return this.scopes[0];
    };

    Stack.prototype.push = function (mode, obj) {
        //console.log("Pushed : ", obj);
        var head = this.head();
        this.scopes.push(new Scope(mode, obj, head));
    };

    Stack.prototype.pop = function () {
        //console.log("pop!");
        this.scopes.pop();
    };

    function Scope(mode, obj, parent) {
        this.values = obj;
        this.parent = parent;
        this.values["$mode"] = mode;
    }

    /**
     * Start to execute the AST
     */
    Runtime.prototype.run = function () {
        this.cursor.start(this.ast.root);
        this.runNode(this.ast.root);
    };

    Runtime.prototype.runNode = function (node) {
        var returnValue;

        var defaultMode = {
            "root": function (runtime, node) {
                // Nothing to do really with the root instruction!
                runtime.stack.push("default", {
                    "this": "root"
                });
                runtime.runSet(node.set);
                runtime.stack.pop();
            },
            "symbol": function (runtime, node) {
                console.log("symbole ", node.value);
                // Get or create a new thing according to that symbol
                if (node.variant === "value") {
                    returnValue = node.value;
                    //console.log("VALUE variant:", node.value);
                } else if (node.variant === "reference") {
                    returnValue = runtime.state.thing(node.value);
                } else if (node.variant === "constant") {
                    returnValue = runtime.state.thing(node.value);
                } else {
                    console.warn("Unknown node variant [" + node.variant + "]");
                }
                runtime.stack.push("default", {
                    "this": returnValue
                });
                runtime.runSet(node.set);
                runtime.stack.pop();
                return returnValue;
            },
            "value": function (runtime, node) {
                returnValue = node.value;
                runtime.stack.push("default", {
                    "this": node.value
                });
                runtime.runSet(node.set);
                runtime.stack.pop();
                return returnValue;
            },
            "instruction": function (runtime, node) {
                console.log("instruction ", node.value);
                var predicate;
                var args;
                var mode;
                // First, test if the instruction is for a mode change or a predicate
                var modeHandler = modes[node.value];
                if (modeHandler) {
                    mode = node.value;
                    runtime.stack.push(mode, {
                    });
                    runtime.runSet(node.set);
                    runtime.stack.pop();

                } else {

                    // Identify which predicate corresponds to this instruction
                    predicate = runtime.state.predicate(node.value);
                    // Run the child set of node to be used by the predicate
                    args = runtime.runSet(node.set);
                    // Create assertion from predicate
                    if (args.length) {
                        args.forEach(function (arg) {
                            //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                            var currentThis = runtime.stack.head().values.this;
                            var assertion = runtime.state.setAssertion(currentThis, predicate, arg);
                            console.log("created assetion: ", assertion);
                        });
                    } else {
                        var currentThis = runtime.stack.head().values.this;
                        runtime.state.setAssertion(currentThis, predicate);
                    }
                }
                return null;
            },
            "fallback": function (runtime, node) {
                console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                return null;
            }
        };

        var whenMode = {
            "root": function (runtime, node) {
                // Nothing to do really with the root instruction!

                //runtime.stack.push("default", {
                //    "this": "root"
                //});
                //runtime.runSet(node.set);
                //runtime.stack.pop();
            },
            "symbol": function (runtime, node) {
                // whenMode: Get or create a new thing according to that symbol
                if (node.variant === "value") {
                    returnValue = node.value;
                    //console.log("VALUE variant:", node.value);
                } else if (node.variant === "reference") {
                    returnValue = runtime.state.thing(node.value);
                } else if (node.variant === "constant") {
                    returnValue = runtime.state.thing(node.value);
                } else {
                    console.warn("Unknown node variant [" + node.variant + "]");
                }
                runtime.stack.push("when", {
                    "this": returnValue
                });
                runtime.runSet(node.set);
                runtime.stack.pop();
                return returnValue;
            },
            "value": function (runtime, node) {
                runtime.stack.push("when", {
                    "this": node.value
                });
                returnValue = node.value;
                runtime.runSet(node.set);
                runtime.stack.pop();
                return returnValue;
            },
            "instruction": function (runtime, node) {
                var predicate;
                var args;

                if (node.value === "do" ) {


                    var parent = runtime.stack.parent();
                    //debugger;
                    args = runtime.runSet(node.set);
                    parent.values["$do"] = args;

                } else {

                    // Identify which predicate corresponds to this instruction
                    predicate = runtime.state.predicate(node.value);
                    // Run the child set of node to be used by the predicate
                    args = runtime.runSet(node.set);

                    var head = runtime.stack.head();
                    // Add a collection of action handler to add the "do" to then afterward
                    var actionHandlers = head.values.actionHandlers = [];

                    var doReferences = head.values["$do"] || [];

                    // Create assertion from predicate
                    //TODO: Instead of an "if", simply prefil the args with [undefined] if no args
                    if (args.length) {
                        args.forEach(function (arg) {
                            //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                            var currentThis = runtime.stack.head().values.this;
                            //console.log("runtime.stack.head().values", runtime.stack.head().values);
                            doReferences.forEach(function (doReference) {
                                var actionHandler = runtime.state.setActionHandler(currentThis, predicate, arg, doReference);
                                actionHandlers.push(actionHandler);
                            });
                            //console.log("created assetion: ", arg);
                        });
                    } else {
                        var currentThis = runtime.stack.head().values.this;
                        doReferences.forEach(function (doReference) {
                            var actionHandler = runtime.state.setActionHandler(currentThis, predicate, null, doReference);
                            actionHandlers.push(actionHandler);
                        });
                    }

                    //debugger;

                }
                return null;
            },
            "fallback": function (runtime, node) {
                console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
                return null;
            }
        };

        // Dont execute enything from a "on" node
        var onMode = {
            "root": function (runtime, node) {
            },
            "symbol": function (runtime, node) {
            },
            "value": function (runtime, node) {
            },
            "instruction": function (runtime, node) {
            },
            "fallback": function (runtime, node) {
            }
        };

        var modes = {
            "default": defaultMode,
            "when": whenMode,
            "do": {}, //TODO: Not yet implement... really needed ?
            "on": onMode
        };


        this.cursor.push(node);

        var mode;
        var head = this.stack.head();
        if (!head) {
            mode = "default";
        } else {
            mode = head.values["$mode"];
            //console.log('-----head.values', mode, node.type, head.values);
            if (!mode) mode = "default";

            // Detect a mode change from parent node. Ex: when, on
            var parent = head.parent;
            if (parent) {
                var parentMode = head.parent.values["$mode"];
                if (!parentMode) parentMode = "default";
                if (mode !== parentMode) this.onModeChange(mode, node);
            }

        }


        var nodeHandler = modes[mode][node.type];
        //console.log("  nodeHandler :   ", nodeHandler);

        if (!nodeHandler) {
            nodeHandler = modes.default.fallback;
        }


        returnValue = nodeHandler(this, node);


        this.cursor.pop();

        return returnValue;
    };

    Runtime.prototype.runSet = function (set) {
        var self = this;
        var args = [];

        set.nodes.forEach(function (node) {
            // Return the node value as an argument to be consumed
            args.push(self.runNode(node));
        });
        return args;
    };

})(BigMess.Cursor);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnJ1bnRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChDdXJzb3IpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBydW50aW1lTW9kZXMgPSB7XG4gICAgICAgIFwid2hlblwiOiB0cnVlLFxuICAgICAgICBcImRvXCI6IHRydWUsXG4gICAgICAgIFwib25cIjogdHJ1ZVxuICAgIH07XG5cblxuICAgIEJpZ01lc3MuUnVudGltZSA9IFJ1bnRpbWU7XG4gICAgLyoqXG4gICAgICogUnVudGltZSBjbGFzcyB1c2VyIHRvIGV4ZWN1dGUgdGhlIGFzdCB3aXRoIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSBhc3RcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSdW50aW1lKGFzdCwgc3RhdGUsIG9uTW9kZUNoYW5nZSkge1xuICAgICAgICB0aGlzLmFzdCA9IGFzdDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKTtcbiAgICAgICAgdGhpcy5zdGFjayA9IG5ldyBTdGFjaygpO1xuICAgICAgICAvLyBBbGxvd3MgdGhlIGxvZ2ljIGNsYXNzIHRvIGtlZXAgdHJhY2sgb24gc3BlY2lhbCBrZXkgbm9kZXNcbiAgICAgICAgdGhpcy5vbk1vZGVDaGFuZ2UgPSBvbk1vZGVDaGFuZ2UgfHwgZnVuY3Rpb24oKXt9O1xuICAgIH1cblxuICAgIC8vIHRvZG86IFNlZSBpZiBjb2RlIHNob3VsZCBiZSBnZW5lcmFsaXplZCBiZXR3ZWVuIFN0YWNrL1BvaW50ZXIvQ3Vyc29yXG4gICAgZnVuY3Rpb24gU3RhY2soKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzID0gW107XG4gICAgfVxuXG4gICAgU3RhY2sucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Blcy5sZW5ndGg7XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5oZWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXNbdGhpcy5zY29wZXMubGVuZ3RoIC0gMV07XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAodGhpcy5zY29wZXMubGVuZ3RoID4gMikgPyAyIDogMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzW3RoaXMuc2NvcGVzLmxlbmd0aCAtIG9mZnNldF07XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXNbMF07XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG1vZGUsIG9iaikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUHVzaGVkIDogXCIsIG9iaik7XG4gICAgICAgIHZhciBoZWFkID0gdGhpcy5oZWFkKCk7XG4gICAgICAgIHRoaXMuc2NvcGVzLnB1c2gobmV3IFNjb3BlKG1vZGUsIG9iaiwgaGVhZCkpO1xuICAgIH07XG5cbiAgICBTdGFjay5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicG9wIVwiKTtcbiAgICAgICAgdGhpcy5zY29wZXMucG9wKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFNjb3BlKG1vZGUsIG9iaiwgcGFyZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWVzID0gb2JqO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy52YWx1ZXNbXCIkbW9kZVwiXSA9IG1vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdG8gZXhlY3V0ZSB0aGUgQVNUXG4gICAgICovXG4gICAgUnVudGltZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnNvci5zdGFydCh0aGlzLmFzdC5yb290KTtcbiAgICAgICAgdGhpcy5ydW5Ob2RlKHRoaXMuYXN0LnJvb3QpO1xuICAgIH07XG5cbiAgICBSdW50aW1lLnByb3RvdHlwZS5ydW5Ob2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlO1xuXG4gICAgICAgIHZhciBkZWZhdWx0TW9kZSA9IHtcbiAgICAgICAgICAgIFwicm9vdFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcgdG8gZG8gcmVhbGx5IHdpdGggdGhlIHJvb3QgaW5zdHJ1Y3Rpb24hXG4gICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wdXNoKFwiZGVmYXVsdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIFwidGhpc1wiOiBcInJvb3RcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJ1bnRpbWUucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic3ltYm9sXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzeW1ib2xlIFwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgb3IgY3JlYXRlIGEgbmV3IHRoaW5nIGFjY29yZGluZyB0byB0aGF0IHN5bWJvbFxuICAgICAgICAgICAgICAgIGlmIChub2RlLnZhcmlhbnQgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWQUxVRSB2YXJpYW50OlwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudmFyaWFudCA9PT0gXCJyZWZlcmVuY2VcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJ1bnRpbWUuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwiY29uc3RhbnRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJ1bnRpbWUuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biBub2RlIHZhcmlhbnQgW1wiICsgbm9kZS52YXJpYW50ICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IHJldHVyblZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wdXNoKFwiZGVmYXVsdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIFwidGhpc1wiOiBub2RlLnZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc3RydWN0aW9uIFwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlZGljYXRlO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzO1xuICAgICAgICAgICAgICAgIHZhciBtb2RlO1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0LCB0ZXN0IGlmIHRoZSBpbnN0cnVjdGlvbiBpcyBmb3IgYSBtb2RlIGNoYW5nZSBvciBhIHByZWRpY2F0ZVxuICAgICAgICAgICAgICAgIHZhciBtb2RlSGFuZGxlciA9IG1vZGVzW25vZGUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wdXNoKG1vZGUsIHtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bnRpbWUucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGFjay5wb3AoKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWRlbnRpZnkgd2hpY2ggcHJlZGljYXRlIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlID0gcnVudGltZS5zdGF0ZS5wcmVkaWNhdGUobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJ1biB0aGUgY2hpbGQgc2V0IG9mIG5vZGUgdG8gYmUgdXNlZCBieSB0aGUgcHJlZGljYXRlXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhc3NlcnRpb24gZnJvbSBwcmVkaWNhdGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogSGFuZGxlIFwibm9uIHByZWRpY2F0ZVwiIGluc3RydWN0aW9ucyBzdWNoIGFzIFwidGhpcy90aGF0XCIsIHdpdGhvdXQgY3JlYXRpbmcgbmV3IGFzc2VydGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGhpcyA9IHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcy50aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NlcnRpb24gPSBydW50aW1lLnN0YXRlLnNldEFzc2VydGlvbihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBhcmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBhc3NldGlvbjogXCIsIGFzc2VydGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGhpcyA9IHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcy50aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVudGltZS5zdGF0ZS5zZXRBc3NlcnRpb24oY3VycmVudFRoaXMsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJmYWxsYmFja1wiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlNldCBpZ25vcmVkLCB1bnJlY29nbmlzZWQgbm9kZSB0eXBlIFtcIiArIG5vZGUudHlwZSArIFwiXVwiLCBub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgd2hlbk1vZGUgPSB7XG4gICAgICAgICAgICBcInJvb3RcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RoaW5nIHRvIGRvIHJlYWxseSB3aXRoIHRoZSByb290IGluc3RydWN0aW9uIVxuXG4gICAgICAgICAgICAgICAgLy9ydW50aW1lLnN0YWNrLnB1c2goXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgICAgICAvLyAgICBcInRoaXNcIjogXCJyb290XCJcbiAgICAgICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgICAgIC8vcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgIC8vcnVudGltZS5zdGFjay5wb3AoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInN5bWJvbFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIHdoZW5Nb2RlOiBHZXQgb3IgY3JlYXRlIGEgbmV3IHRoaW5nIGFjY29yZGluZyB0byB0aGF0IHN5bWJvbFxuICAgICAgICAgICAgICAgIGlmIChub2RlLnZhcmlhbnQgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJWQUxVRSB2YXJpYW50OlwiLCBub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudmFyaWFudCA9PT0gXCJyZWZlcmVuY2VcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJ1bnRpbWUuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZhcmlhbnQgPT09IFwiY29uc3RhbnRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJ1bnRpbWUuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biBub2RlIHZhcmlhbnQgW1wiICsgbm9kZS52YXJpYW50ICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJ3aGVuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IHJldHVyblZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBydW50aW1lLnN0YWNrLnB1c2goXCJ3aGVuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aGlzXCI6IG5vZGUudmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgIHJ1bnRpbWUuc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJlZGljYXRlO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmFsdWUgPT09IFwiZG9cIiApIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBydW50aW1lLnN0YWNrLnBhcmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gcnVudGltZS5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQudmFsdWVzW1wiJGRvXCJdID0gYXJncztcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWRlbnRpZnkgd2hpY2ggcHJlZGljYXRlIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlID0gcnVudGltZS5zdGF0ZS5wcmVkaWNhdGUobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJ1biB0aGUgY2hpbGQgc2V0IG9mIG5vZGUgdG8gYmUgdXNlZCBieSB0aGUgcHJlZGljYXRlXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBydW50aW1lLnJ1blNldChub2RlLnNldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWQgPSBydW50aW1lLnN0YWNrLmhlYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGEgY29sbGVjdGlvbiBvZiBhY3Rpb24gaGFuZGxlciB0byBhZGQgdGhlIFwiZG9cIiB0byB0aGVuIGFmdGVyd2FyZFxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlcnMgPSBoZWFkLnZhbHVlcy5hY3Rpb25IYW5kbGVycyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb1JlZmVyZW5jZXMgPSBoZWFkLnZhbHVlc1tcIiRkb1wiXSB8fCBbXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYXNzZXJ0aW9uIGZyb20gcHJlZGljYXRlXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogSW5zdGVhZCBvZiBhbiBcImlmXCIsIHNpbXBseSBwcmVmaWwgdGhlIGFyZ3Mgd2l0aCBbdW5kZWZpbmVkXSBpZiBubyBhcmdzXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IEhhbmRsZSBcIm5vbiBwcmVkaWNhdGVcIiBpbnN0cnVjdGlvbnMgc3VjaCBhcyBcInRoaXMvdGhhdFwiLCB3aXRob3V0IGNyZWF0aW5nIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRoaXMgPSBydW50aW1lLnN0YWNrLmhlYWQoKS52YWx1ZXMudGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzXCIsIHJ1bnRpbWUuc3RhY2suaGVhZCgpLnZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9SZWZlcmVuY2VzLmZvckVhY2goZnVuY3Rpb24gKGRvUmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25IYW5kbGVyID0gcnVudGltZS5zdGF0ZS5zZXRBY3Rpb25IYW5kbGVyKGN1cnJlbnRUaGlzLCBwcmVkaWNhdGUsIGFyZywgZG9SZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVycy5wdXNoKGFjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjcmVhdGVkIGFzc2V0aW9uOiBcIiwgYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaGlzID0gcnVudGltZS5zdGFjay5oZWFkKCkudmFsdWVzLnRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb1JlZmVyZW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoZG9SZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSGFuZGxlciA9IHJ1bnRpbWUuc3RhdGUuc2V0QWN0aW9uSGFuZGxlcihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBudWxsLCBkb1JlZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSGFuZGxlcnMucHVzaChhY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImZhbGxiYWNrXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiU2V0IGlnbm9yZWQsIHVucmVjb2duaXNlZCBub2RlIHR5cGUgW1wiICsgbm9kZS50eXBlICsgXCJdXCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIERvbnQgZXhlY3V0ZSBlbnl0aGluZyBmcm9tIGEgXCJvblwiIG5vZGVcbiAgICAgICAgdmFyIG9uTW9kZSA9IHtcbiAgICAgICAgICAgIFwicm9vdFwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic3ltYm9sXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAocnVudGltZSwgbm9kZSkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaW5zdHJ1Y3Rpb25cIjogZnVuY3Rpb24gKHJ1bnRpbWUsIG5vZGUpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImZhbGxiYWNrXCI6IGZ1bmN0aW9uIChydW50aW1lLCBub2RlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vZGVzID0ge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IGRlZmF1bHRNb2RlLFxuICAgICAgICAgICAgXCJ3aGVuXCI6IHdoZW5Nb2RlLFxuICAgICAgICAgICAgXCJkb1wiOiB7fSwgLy9UT0RPOiBOb3QgeWV0IGltcGxlbWVudC4uLiByZWFsbHkgbmVlZGVkID9cbiAgICAgICAgICAgIFwib25cIjogb25Nb2RlXG4gICAgICAgIH07XG5cblxuICAgICAgICB0aGlzLmN1cnNvci5wdXNoKG5vZGUpO1xuXG4gICAgICAgIHZhciBtb2RlO1xuICAgICAgICB2YXIgaGVhZCA9IHRoaXMuc3RhY2suaGVhZCgpO1xuICAgICAgICBpZiAoIWhlYWQpIHtcbiAgICAgICAgICAgIG1vZGUgPSBcImRlZmF1bHRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGUgPSBoZWFkLnZhbHVlc1tcIiRtb2RlXCJdO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnLS0tLS1oZWFkLnZhbHVlcycsIG1vZGUsIG5vZGUudHlwZSwgaGVhZC52YWx1ZXMpO1xuICAgICAgICAgICAgaWYgKCFtb2RlKSBtb2RlID0gXCJkZWZhdWx0XCI7XG5cbiAgICAgICAgICAgIC8vIERldGVjdCBhIG1vZGUgY2hhbmdlIGZyb20gcGFyZW50IG5vZGUuIEV4OiB3aGVuLCBvblxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGhlYWQucGFyZW50O1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRNb2RlID0gaGVhZC5wYXJlbnQudmFsdWVzW1wiJG1vZGVcIl07XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJlbnRNb2RlKSBwYXJlbnRNb2RlID0gXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGUgIT09IHBhcmVudE1vZGUpIHRoaXMub25Nb2RlQ2hhbmdlKG1vZGUsIG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBub2RlSGFuZGxlciA9IG1vZGVzW21vZGVdW25vZGUudHlwZV07XG4gICAgICAgIC8vY29uc29sZS5sb2coXCIgIG5vZGVIYW5kbGVyIDogICBcIiwgbm9kZUhhbmRsZXIpO1xuXG4gICAgICAgIGlmICghbm9kZUhhbmRsZXIpIHtcbiAgICAgICAgICAgIG5vZGVIYW5kbGVyID0gbW9kZXMuZGVmYXVsdC5mYWxsYmFjaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuVmFsdWUgPSBub2RlSGFuZGxlcih0aGlzLCBub2RlKTtcblxuXG4gICAgICAgIHRoaXMuY3Vyc29yLnBvcCgpO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9O1xuXG4gICAgUnVudGltZS5wcm90b3R5cGUucnVuU2V0ID0gZnVuY3Rpb24gKHNldCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gW107XG5cbiAgICAgICAgc2V0Lm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbm9kZSB2YWx1ZSBhcyBhbiBhcmd1bWVudCB0byBiZSBjb25zdW1lZFxuICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYucnVuTm9kZShub2RlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJncztcbiAgICB9O1xuXG59KShCaWdNZXNzLkN1cnNvcik7XG5cbiJdLCJmaWxlIjoiYmlnbWVzcy5ydW50aW1lLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function (Pointer, AST, Runtime) {
    "use strict";

    BigMess.Script = Script;
    function Script() {
        this.pointer = new Pointer();
        this.ast = new AST();
        // Keep a reference t key named nodes
        this.references = {};
        this.runtime;
    }

    Script.prototype.load = function (text) {
        this.pointer.tokenize(text);
        this.compile(this.pointer.tokens); // Todo.. this should not be compile
        return this;
    };

    Script.prototype.run = function (state) {
        var self = this;
        this.runtime = new Runtime(this.ast, state, onModeChange);
        this.runtime.run();

        function onModeChange(mode, node){
            console.log("Keeping reference to [" + node.value + "]", mode, node);
            var nodeReferenceId = node.value;
            self.references[nodeReferenceId.toLowerCase()] = node;
        }
    };

    Script.prototype.compile = function (tokens) {
        this.ast.compile(tokens);
        return this;
    };

})(BigMess.Pointer, BigMess.AST, BigMess.Runtime);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKFBvaW50ZXIsIEFTVCwgUnVudGltZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgQmlnTWVzcy5TY3JpcHQgPSBTY3JpcHQ7XG4gICAgZnVuY3Rpb24gU2NyaXB0KCkge1xuICAgICAgICB0aGlzLnBvaW50ZXIgPSBuZXcgUG9pbnRlcigpO1xuICAgICAgICB0aGlzLmFzdCA9IG5ldyBBU1QoKTtcbiAgICAgICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0IGtleSBuYW1lZCBub2Rlc1xuICAgICAgICB0aGlzLnJlZmVyZW5jZXMgPSB7fTtcbiAgICAgICAgdGhpcy5ydW50aW1lO1xuICAgIH1cblxuICAgIFNjcmlwdC5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHRoaXMucG9pbnRlci50b2tlbml6ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5jb21waWxlKHRoaXMucG9pbnRlci50b2tlbnMpOyAvLyBUb2RvLi4gdGhpcyBzaG91bGQgbm90IGJlIGNvbXBpbGVcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFNjcmlwdC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5ydW50aW1lID0gbmV3IFJ1bnRpbWUodGhpcy5hc3QsIHN0YXRlLCBvbk1vZGVDaGFuZ2UpO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucnVuKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25Nb2RlQ2hhbmdlKG1vZGUsIG5vZGUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZWVwaW5nIHJlZmVyZW5jZSB0byBbXCIgKyBub2RlLnZhbHVlICsgXCJdXCIsIG1vZGUsIG5vZGUpO1xuICAgICAgICAgICAgdmFyIG5vZGVSZWZlcmVuY2VJZCA9IG5vZGUudmFsdWU7XG4gICAgICAgICAgICBzZWxmLnJlZmVyZW5jZXNbbm9kZVJlZmVyZW5jZUlkLnRvTG93ZXJDYXNlKCldID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTY3JpcHQucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gICAgICAgIHRoaXMuYXN0LmNvbXBpbGUodG9rZW5zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxufSkoQmlnTWVzcy5Qb2ludGVyLCBCaWdNZXNzLkFTVCwgQmlnTWVzcy5SdW50aW1lKTtcblxuIl0sImZpbGUiOiJiaWdtZXNzLnNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

(function () {
    "use strict";

    BigMess.State = State;
    function State() {
        this.assertions = [];
        this.actionHandlers = [];
        this.things = {};
        this.predicates = {};
        this.syntaxes = {};
    }

    State.prototype.getPredicates = function(tokens) {
        var self = this;
        var predicates = [];
        tokens.forEach(function (token) {
            var predicate = self.predicate(token);
            if (!predicate) throw "Unknown predicate [" + token + "] in expression [" + expression + "]";
            predicates.push(predicate);
        });
        return predicates;
    };

    State.prototype.resolve = function (expression, _thing) {
        var thing = _thing;
        var allResolved = [];
        // If a thing was not supplied as a starting point, use the first token as the thing id
        if (!thing) {
            var tokens = expression.split(".");
            var thingId = tokens.shift();
            if (thingId) thing = this.thing(thingId);
        }
        if (thing && tokens.length) {
            allResolved = thing.resolve(tokens.join("."));
        }
        return allResolved;
    };


    State.prototype.resolveValue = function (expression) {
        var value;
        var resolved = this.resolve(expression);
        //console.log('State.resolved', resolved);
        if (resolved.length) value = resolved[0];
        return value;
    };

    State.prototype.html = function () {
        var html = [];

        html.push("<div class='assertions'>");
        this.assertions.forEach(function (assertion) {
            html.push("<div class='assertion'>");
            html.push("<span class='subject " + getTypeFromThingOrValue(assertion.subject) + "'>");
            html.push(getStringFromThingOrValue(assertion.subject));
            html.push("</span><span class='predicate'>");
            html.push(getStringFromThingOrValue(assertion.predicate));
            html.push("</span><span class='object " + getTypeFromThingOrValue(assertion.object) + "'>");
            html.push(getStringFromThingOrValue(assertion.object));
            html.push("</span></div>");
        });
        html.push("</div><hr /><div>");
        this.actionHandlers.forEach(function (actionHandler) {
            html.push("<div class='assertion'>");
            html.push("<span class='subject " + getTypeFromThingOrValue(actionHandler.subject) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.subject));
            html.push("</span><span class='predicate'>");
            html.push(getStringFromThingOrValue(actionHandler.predicate));
            html.push("</span><span class='object " + getTypeFromThingOrValue(actionHandler.object) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.object));
            html.push("</span>+<span class='doReference " + getTypeFromThingOrValue(actionHandler.do) + "'>");
            html.push(getStringFromThingOrValue(actionHandler.do));
            html.push("</span></div>");
        });
        html.push("</div>");

        function getStringFromThingOrValue(obj) {
            var value;
            if (typeof obj === "undefined") {
                value = "[undefined]";
            } else if (typeof obj === "object") {
                value = obj.label || obj.id;
                console.log('--------->>>>-', value, obj);
            } else {
                value = obj;
            }
            return value;
        }

        function getTypeFromThingOrValue(obj) {
            var value;
            var type;
            if (typeof obj === "undefined") {
                value = "isUndefined";
            } else if (typeof obj === "object") {
                value = "isThing"
            } else {
                type = typeof obj;
                type = "is" + type.substr(0,1).toUpperCase() + type.substr(1);
                value = type;
            }
            return value;
        }

        return html.join("");
    };

    /**
     * Get or create a new thing
     * @param _id
     */
    State.prototype.thing = function (_id) {
        var thing;
        var id = _id.toLowerCase();

        if (!id)
            throw("Things must have an id");
        thing = this.things[id];
        if (!thing) {
            thing = new Thing(id, this);
            this.things[id] = thing;
        }
        return thing;
    };

    /**
     * Get or create a new thing
     * @param predicate
     * @param text
     * @returns {*}
     */
    State.prototype.syntax = function (predicate, text) {
        var syntax;

        if (!predicate)
            throw("Syntax must have a predicate");
        if (!text)
            throw("Syntax must have a text");
        syntax = this.syntaxes[text];
        if (!syntax) {
            syntax = new Syntax(text, predicate);
            this.syntaxes[text] = syntax;
        }
        return syntax;
    };

    /**
     * Get a new Action Handler
     * @param subject
     * @param predicate
     * @param object
     * @param doReference
     * @returns {*}
     */
    State.prototype.setActionHandler = function (subject, predicate, object, doReference) {
        var actionHandler;
        var foundActionHandler;

        if (predicate && subject) {
            // Look for an existing assertion
            foundActionHandler = [];
            // todo: use built indexes instead of itterating trough all predicates
            this.actionHandlers.forEach(function (actionHandler) {
                if (actionHandler.subject === subject &&
                    actionHandler.predicate === predicate &&
                    actionHandler.object === object) {
                    foundActionHandler.push(actionHandler);
                }
            });
            if (foundActionHandler[0]) {
                actionHandler = foundActionHandler[0].object;
            } else {
                // Create a new assertion
                actionHandler = new ActionHandler(subject, predicate, object, doReference);
                this.actionHandlers.push(actionHandler);
            }
        } else {
            console.warn("Impossible to create an Action Handler' type of assertion without at least a subject and a predicate.")
        }

        return actionHandler;
    };

    /**
     * Get a new assertion
     * @param subject
     * @param predicate
     * @param object
     * @returns {*}
     */
    State.prototype.setAssertion = function (subject, predicate, object) {
        var assertion;
        var foundAssertions;

        if (predicate && subject) {
            // Look for an existing assertion
            foundAssertions = [];
            // todo: use built indexes instead of itterating trough all predicates
            this.assertions.forEach(function (assertion) {
                if (assertion.subject === subject &&
                    assertion.predicate === predicate &&
                    assertion.object === object) {
                    foundAssertions.push(assertion);
                }
            });
            if (foundAssertions[0]) {
                assertion = foundAssertions[0].object;
            } else {
                // Create a new assertion
                assertion = new Assertion(subject, predicate, object, this);
                this.assertions.push(assertion);
            }
        } else {
            console.warn("Impossible to create assertion without at least a subject and a predicate.")
        }

        return assertion;
    };

    State.prototype.removeAssertions = function (subject, predicate, object) {
        // Look for matching assertions
        // todo: use built indexes instead of itterating trough all predicates
        this.assertions = this.assertions.filter(function (assertion) {
            var keep = true;
            if (subject && Object.is(object, assertion.subject)) keep = false;
            if (predicate && Object.is(predicate, assertion.predicate)) keep = false;
            if (object && Object.is(object, assertion.object)) keep = false;
            return keep;
        });
        return this;
    };


    // TODO: Rename to getAssertions and have a version that return 1 item and need an objet argument
    State.prototype.getAssertion = function (subject, predicate) {
        var assertion;
        var foundAssertions;

        if (predicate && subject) {
            // Look for an existing assertion
            foundAssertions = [];
            // todo: use built indexes instead of itterating trough all predicates
            this.assertions.forEach(function (assertion) {
                if (assertion.subject === subject &&
                    assertion.predicate === predicate) {
                    foundAssertions.push(assertion);
                }
            });
        } else {
            console.warn("Impossible to find assertion without at least a subject and a predicate.")
        }

        return foundAssertions;
    };

    State.prototype.getActionHandler = function (subject, predicate, object) {
        var foundActionHandler;

        if (predicate && subject && object) {
            // Look for an existing assertion
            // todo: use built indexes instead of itterating trough all predicates
            this.actionHandlers.forEach(function (actionHandler) {
                if (actionHandler.subject === subject &&
                    actionHandler.predicate === predicate &&
                    actionHandler.object === object) {
                    foundActionHandler = actionHandler;
                }
            });
        } else {
            console.warn("Impossible to ensure a single actionHandler without at least a subject, predicate and object.")
        }

        return foundActionHandler;
    };



    /**
     * Get or create a new type of predicate
     * @param _id
     */
    State.prototype.predicate = function (_id, type) {
        var id = _id.toLowerCase();
        var predicate;
        var syntax;

        if (!id)
            throw("Assertions must have an id");

        // Resolve the predicate from the syntax
        syntax = this.syntaxes[id];
        if (syntax) predicate = syntax.predicate;

        if (!predicate) {
            predicate = new Predicate(id, type, this);
            //console.log("Created new predicate", predicate);
            this.predicates[id] = predicate;
            this.syntaxes[id] = new Syntax(id, predicate);
        }
        return predicate;
    };

    /**
     * An assertion about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @constructor
     */
    BigMess.Assertion = Assertion;
    function Assertion(subject, predicate, object) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
    }

    /**
     * An assertion of an action or an event about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @constructor
     */
    BigMess.ActionHandler = ActionHandler;
    function ActionHandler(subject, predicate, object, doReference) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.do = doReference;
    }

    /**
     * A "thing" in the graph
     * @param _id
     * @constructor
     */
    BigMess.Thing = Thing;
    function Thing(_id, state) {
        this.id =_id.toLowerCase();
        this.state = state;
    }

    /**
     * Get an assertion, returns itself or the object of the assertion found.
     * @type {Function}
     */
    Thing.prototype.getAssertion = function (predicate) {
        return this.state.getAssertion(this, predicate);
    };

    Thing.prototype.setAssertion = function (predicate, object) {
        this.state.setAssertion(this, predicate, object);
        return this;
    };

    Thing.prototype.removeAssertions = function (predicate, object) {
        this.state.removeAssertions(this, predicate, object);
        return this;
    };

    /**
     * Return this thing as text (string)
     * @returns {*}
     */
    Thing.prototype.text = function () {
        return this.id;
    };

    Thing.prototype.resolve = function (expression) {
        var thingInContext = this;
        var tokens = expression.split(".");
        var predicates = this.state.getPredicates(tokens);
        var allResolved = [];
        predicates.forEach(function (predicate, index, predicates) {
            //console.log('context', context);
            var assertions;
            //console.log('predicate', predicate);
            if (thingInContext) {
                assertions = thingInContext.getAssertion(predicate);
                if (assertions.length) {
                    //console.log('assertion', assertion[0].object);
                    // If it is the last predicate, return multiple value
                    // todo: allow to broader search (not just collection on the last branch)
                    if (predicates.length === index + 1) {
                        assertions.forEach(function (assertion) {
                            allResolved.push(assertion.object);
                        });
                        thingInContext = assertions[0];
                    } else {
                        thingInContext = assertions[0].object;
                    }
                } else {
                    //console.log('context nulled');
                    thingInContext = null;
                }
            }
        });
        return allResolved;
    };

    Thing.prototype.resolveValue = function (expression) {
        this.resolve(expression);

        var value;
        var context = this;
        var tokens = expression.split(".");
        var predicates = this.state.getPredicates(tokens);
        predicates.forEach(function (predicate) {
            //console.log('context', context);
            var assertion;
            //console.log('predicate', predicate);
            if (context) {
                assertion = context.getAssertion(predicate);
                if (assertion.length) {
                    //console.log('assertion', assertion[0].object);
                    context = assertion[0].object;
                } else {
                    //console.log('context nulled');
                    context = null;
                }
            }
        });
        if (context) value = context;
        return value;
    };


    /**
     * A syntax of natural language that be use to define a predicate
     * @param text
     * @param predicate
     * @constructor
     */
    BigMess.Syntax = Syntax;
    function Syntax(text, predicate) {
        this.text = text;
        this.predicate = predicate;
    }

    /**
     * A type of predicate used to make assertions
     * @param id
     * @constructor
     */
    BigMess.Predicate = Predicate;
    function Predicate(_id, type, bigMess) {
        var id = _id.toLowerCase();
        this.id = id;
        this.label = id;
        this.type = type;

        /**
         * Define a new syntax for this predicate
         * @param text
         * @returns {Predicate}
         */
        this.syntax = function (text) {
            this.label = text;
            bigMess.syntax(this, text);
            return this;
        }
    }

})();


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnN0YXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBCaWdNZXNzLlN0YXRlID0gU3RhdGU7XG4gICAgZnVuY3Rpb24gU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXJzID0gW107XG4gICAgICAgIHRoaXMudGhpbmdzID0ge307XG4gICAgICAgIHRoaXMucHJlZGljYXRlcyA9IHt9O1xuICAgICAgICB0aGlzLnN5bnRheGVzID0ge307XG4gICAgfVxuXG4gICAgU3RhdGUucHJvdG90eXBlLmdldFByZWRpY2F0ZXMgPSBmdW5jdGlvbih0b2tlbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcHJlZGljYXRlcyA9IFtdO1xuICAgICAgICB0b2tlbnMuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBwcmVkaWNhdGUgPSBzZWxmLnByZWRpY2F0ZSh0b2tlbik7XG4gICAgICAgICAgICBpZiAoIXByZWRpY2F0ZSkgdGhyb3cgXCJVbmtub3duIHByZWRpY2F0ZSBbXCIgKyB0b2tlbiArIFwiXSBpbiBleHByZXNzaW9uIFtcIiArIGV4cHJlc3Npb24gKyBcIl1cIjtcbiAgICAgICAgICAgIHByZWRpY2F0ZXMucHVzaChwcmVkaWNhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZXM7XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24sIF90aGluZykge1xuICAgICAgICB2YXIgdGhpbmcgPSBfdGhpbmc7XG4gICAgICAgIHZhciBhbGxSZXNvbHZlZCA9IFtdO1xuICAgICAgICAvLyBJZiBhIHRoaW5nIHdhcyBub3Qgc3VwcGxpZWQgYXMgYSBzdGFydGluZyBwb2ludCwgdXNlIHRoZSBmaXJzdCB0b2tlbiBhcyB0aGUgdGhpbmcgaWRcbiAgICAgICAgaWYgKCF0aGluZykge1xuICAgICAgICAgICAgdmFyIHRva2VucyA9IGV4cHJlc3Npb24uc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgdmFyIHRoaW5nSWQgPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICh0aGluZ0lkKSB0aGluZyA9IHRoaXMudGhpbmcodGhpbmdJZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaW5nICYmIHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbFJlc29sdmVkID0gdGhpbmcucmVzb2x2ZSh0b2tlbnMuam9pbihcIi5cIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbGxSZXNvbHZlZDtcbiAgICB9O1xuXG5cbiAgICBTdGF0ZS5wcm90b3R5cGUucmVzb2x2ZVZhbHVlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgcmVzb2x2ZWQgPSB0aGlzLnJlc29sdmUoZXhwcmVzc2lvbik7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1N0YXRlLnJlc29sdmVkJywgcmVzb2x2ZWQpO1xuICAgICAgICBpZiAocmVzb2x2ZWQubGVuZ3RoKSB2YWx1ZSA9IHJlc29sdmVkWzBdO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHRtbCA9IFtdO1xuXG4gICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J2Fzc2VydGlvbnMnPlwiKTtcbiAgICAgICAgdGhpcy5hc3NlcnRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFzc2VydGlvbikge1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPGRpdiBjbGFzcz0nYXNzZXJ0aW9uJz5cIik7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8c3BhbiBjbGFzcz0nc3ViamVjdCBcIiArIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKGFzc2VydGlvbi5zdWJqZWN0KSArIFwiJz5cIik7XG4gICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhc3NlcnRpb24uc3ViamVjdCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPjxzcGFuIGNsYXNzPSdwcmVkaWNhdGUnPlwiKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFzc2VydGlvbi5wcmVkaWNhdGUpKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48c3BhbiBjbGFzcz0nb2JqZWN0IFwiICsgZ2V0VHlwZUZyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLm9iamVjdCkgKyBcIic+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLm9iamVjdCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPjwvZGl2PlwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWwucHVzaChcIjwvZGl2PjxociAvPjxkaXY+XCIpO1xuICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J2Fzc2VydGlvbic+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPHNwYW4gY2xhc3M9J3N1YmplY3QgXCIgKyBnZXRUeXBlRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLnN1YmplY3QpICsgXCInPlwiKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFjdGlvbkhhbmRsZXIuc3ViamVjdCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPjxzcGFuIGNsYXNzPSdwcmVkaWNhdGUnPlwiKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFjdGlvbkhhbmRsZXIucHJlZGljYXRlKSk7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+PHNwYW4gY2xhc3M9J29iamVjdCBcIiArIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKGFjdGlvbkhhbmRsZXIub2JqZWN0KSArIFwiJz5cIik7XG4gICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLm9iamVjdCkpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPC9zcGFuPis8c3BhbiBjbGFzcz0nZG9SZWZlcmVuY2UgXCIgKyBnZXRUeXBlRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLmRvKSArIFwiJz5cIik7XG4gICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhY3Rpb25IYW5kbGVyLmRvKSk7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+PC9kaXY+XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaHRtbC5wdXNoKFwiPC9kaXY+XCIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUob2JqKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJbdW5kZWZpbmVkXVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvYmoubGFiZWwgfHwgb2JqLmlkO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0+Pj4+LScsIHZhbHVlLCBvYmopO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKG9iaikge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJpc1VuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcImlzVGhpbmdcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIG9iajtcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJpc1wiICsgdHlwZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWwuam9pbihcIlwiKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZ1xuICAgICAqIEBwYXJhbSBfaWRcbiAgICAgKi9cbiAgICBTdGF0ZS5wcm90b3R5cGUudGhpbmcgPSBmdW5jdGlvbiAoX2lkKSB7XG4gICAgICAgIHZhciB0aGluZztcbiAgICAgICAgdmFyIGlkID0gX2lkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHRocm93KFwiVGhpbmdzIG11c3QgaGF2ZSBhbiBpZFwiKTtcbiAgICAgICAgdGhpbmcgPSB0aGlzLnRoaW5nc1tpZF07XG4gICAgICAgIGlmICghdGhpbmcpIHtcbiAgICAgICAgICAgIHRoaW5nID0gbmV3IFRoaW5nKGlkLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudGhpbmdzW2lkXSA9IHRoaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZ1xuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIFN0YXRlLnByb3RvdHlwZS5zeW50YXggPSBmdW5jdGlvbiAocHJlZGljYXRlLCB0ZXh0KSB7XG4gICAgICAgIHZhciBzeW50YXg7XG5cbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyhcIlN5bnRheCBtdXN0IGhhdmUgYSBwcmVkaWNhdGVcIik7XG4gICAgICAgIGlmICghdGV4dClcbiAgICAgICAgICAgIHRocm93KFwiU3ludGF4IG11c3QgaGF2ZSBhIHRleHRcIik7XG4gICAgICAgIHN5bnRheCA9IHRoaXMuc3ludGF4ZXNbdGV4dF07XG4gICAgICAgIGlmICghc3ludGF4KSB7XG4gICAgICAgICAgICBzeW50YXggPSBuZXcgU3ludGF4KHRleHQsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICB0aGlzLnN5bnRheGVzW3RleHRdID0gc3ludGF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzeW50YXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIG5ldyBBY3Rpb24gSGFuZGxlclxuICAgICAqIEBwYXJhbSBzdWJqZWN0XG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgKiBAcGFyYW0gZG9SZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBTdGF0ZS5wcm90b3R5cGUuc2V0QWN0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZG9SZWZlcmVuY2UpIHtcbiAgICAgICAgdmFyIGFjdGlvbkhhbmRsZXI7XG4gICAgICAgIHZhciBmb3VuZEFjdGlvbkhhbmRsZXI7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZSAmJiBzdWJqZWN0KSB7XG4gICAgICAgICAgICAvLyBMb29rIGZvciBhbiBleGlzdGluZyBhc3NlcnRpb25cbiAgICAgICAgICAgIGZvdW5kQWN0aW9uSGFuZGxlciA9IFtdO1xuICAgICAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbkhhbmRsZXIuc3ViamVjdCA9PT0gc3ViamVjdCAmJlxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIub2JqZWN0ID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRBY3Rpb25IYW5kbGVyLnB1c2goYWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZm91bmRBY3Rpb25IYW5kbGVyWzBdKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uSGFuZGxlciA9IGZvdW5kQWN0aW9uSGFuZGxlclswXS5vYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyID0gbmV3IEFjdGlvbkhhbmRsZXIoc3ViamVjdCwgcHJlZGljYXRlLCBvYmplY3QsIGRvUmVmZXJlbmNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXJzLnB1c2goYWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbXBvc3NpYmxlIHRvIGNyZWF0ZSBhbiBBY3Rpb24gSGFuZGxlcicgdHlwZSBvZiBhc3NlcnRpb24gd2l0aG91dCBhdCBsZWFzdCBhIHN1YmplY3QgYW5kIGEgcHJlZGljYXRlLlwiKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbkhhbmRsZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIG5ldyBhc3NlcnRpb25cbiAgICAgKiBAcGFyYW0gc3ViamVjdFxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgU3RhdGUucHJvdG90eXBlLnNldEFzc2VydGlvbiA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB2YXIgYXNzZXJ0aW9uO1xuICAgICAgICB2YXIgZm91bmRBc3NlcnRpb25zO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUgJiYgc3ViamVjdCkge1xuICAgICAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhpc3RpbmcgYXNzZXJ0aW9uXG4gICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMgPSBbXTtcbiAgICAgICAgICAgIC8vIHRvZG86IHVzZSBidWlsdCBpbmRleGVzIGluc3RlYWQgb2YgaXR0ZXJhdGluZyB0cm91Z2ggYWxsIHByZWRpY2F0ZXNcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXJ0aW9uLnN1YmplY3QgPT09IHN1YmplY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbi5vYmplY3QgPT09IG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZvdW5kQXNzZXJ0aW9uc1swXSkge1xuICAgICAgICAgICAgICAgIGFzc2VydGlvbiA9IGZvdW5kQXNzZXJ0aW9uc1swXS5vYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICBhc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW1wb3NzaWJsZSB0byBjcmVhdGUgYXNzZXJ0aW9uIHdpdGhvdXQgYXQgbGVhc3QgYSBzdWJqZWN0IGFuZCBhIHByZWRpY2F0ZS5cIilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NlcnRpb247XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5yZW1vdmVBc3NlcnRpb25zID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KSB7XG4gICAgICAgIC8vIExvb2sgZm9yIG1hdGNoaW5nIGFzc2VydGlvbnNcbiAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICB0aGlzLmFzc2VydGlvbnMgPSB0aGlzLmFzc2VydGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgIHZhciBrZWVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzdWJqZWN0ICYmIE9iamVjdC5pcyhvYmplY3QsIGFzc2VydGlvbi5zdWJqZWN0KSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSAmJiBPYmplY3QuaXMocHJlZGljYXRlLCBhc3NlcnRpb24ucHJlZGljYXRlKSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG9iamVjdCAmJiBPYmplY3QuaXMob2JqZWN0LCBhc3NlcnRpb24ub2JqZWN0KSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGtlZXA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5cbiAgICAvLyBUT0RPOiBSZW5hbWUgdG8gZ2V0QXNzZXJ0aW9ucyBhbmQgaGF2ZSBhIHZlcnNpb24gdGhhdCByZXR1cm4gMSBpdGVtIGFuZCBuZWVkIGFuIG9iamV0IGFyZ3VtZW50XG4gICAgU3RhdGUucHJvdG90eXBlLmdldEFzc2VydGlvbiA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIGFzc2VydGlvbjtcbiAgICAgICAgdmFyIGZvdW5kQXNzZXJ0aW9ucztcblxuICAgICAgICBpZiAocHJlZGljYXRlICYmIHN1YmplY3QpIHtcbiAgICAgICAgICAgIC8vIExvb2sgZm9yIGFuIGV4aXN0aW5nIGFzc2VydGlvblxuICAgICAgICAgICAgZm91bmRBc3NlcnRpb25zID0gW107XG4gICAgICAgICAgICAvLyB0b2RvOiB1c2UgYnVpbHQgaW5kZXhlcyBpbnN0ZWFkIG9mIGl0dGVyYXRpbmcgdHJvdWdoIGFsbCBwcmVkaWNhdGVzXG4gICAgICAgICAgICB0aGlzLmFzc2VydGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFzc2VydGlvbi5zdWJqZWN0ID09PSBzdWJqZWN0ICYmXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbi5wcmVkaWNhdGUgPT09IHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW1wb3NzaWJsZSB0byBmaW5kIGFzc2VydGlvbiB3aXRob3V0IGF0IGxlYXN0IGEgc3ViamVjdCBhbmQgYSBwcmVkaWNhdGUuXCIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRBc3NlcnRpb25zO1xuICAgIH07XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUuZ2V0QWN0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB2YXIgZm91bmRBY3Rpb25IYW5kbGVyO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUgJiYgc3ViamVjdCAmJiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIExvb2sgZm9yIGFuIGV4aXN0aW5nIGFzc2VydGlvblxuICAgICAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb25IYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbkhhbmRsZXIuc3ViamVjdCA9PT0gc3ViamVjdCAmJlxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25IYW5kbGVyLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIub2JqZWN0ID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRBY3Rpb25IYW5kbGVyID0gYWN0aW9uSGFuZGxlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkltcG9zc2libGUgdG8gZW5zdXJlIGEgc2luZ2xlIGFjdGlvbkhhbmRsZXIgd2l0aG91dCBhdCBsZWFzdCBhIHN1YmplY3QsIHByZWRpY2F0ZSBhbmQgb2JqZWN0LlwiKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kQWN0aW9uSGFuZGxlcjtcbiAgICB9O1xuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCBvciBjcmVhdGUgYSBuZXcgdHlwZSBvZiBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gX2lkXG4gICAgICovXG4gICAgU3RhdGUucHJvdG90eXBlLnByZWRpY2F0ZSA9IGZ1bmN0aW9uIChfaWQsIHR5cGUpIHtcbiAgICAgICAgdmFyIGlkID0gX2lkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBwcmVkaWNhdGU7XG4gICAgICAgIHZhciBzeW50YXg7XG5cbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHRocm93KFwiQXNzZXJ0aW9ucyBtdXN0IGhhdmUgYW4gaWRcIik7XG5cbiAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJlZGljYXRlIGZyb20gdGhlIHN5bnRheFxuICAgICAgICBzeW50YXggPSB0aGlzLnN5bnRheGVzW2lkXTtcbiAgICAgICAgaWYgKHN5bnRheCkgcHJlZGljYXRlID0gc3ludGF4LnByZWRpY2F0ZTtcblxuICAgICAgICBpZiAoIXByZWRpY2F0ZSkge1xuICAgICAgICAgICAgcHJlZGljYXRlID0gbmV3IFByZWRpY2F0ZShpZCwgdHlwZSwgdGhpcyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ3JlYXRlZCBuZXcgcHJlZGljYXRlXCIsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICB0aGlzLnByZWRpY2F0ZXNbaWRdID0gcHJlZGljYXRlO1xuICAgICAgICAgICAgdGhpcy5zeW50YXhlc1tpZF0gPSBuZXcgU3ludGF4KGlkLCBwcmVkaWNhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFuIGFzc2VydGlvbiBhYm91dCB0aGluZ3MgaW4gdGhlIGdyYXBoXG4gICAgICogQHBhcmFtIHN1YmplY3RcbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHBhcmFtIG9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIEJpZ01lc3MuQXNzZXJ0aW9uID0gQXNzZXJ0aW9uO1xuICAgIGZ1bmN0aW9uIEFzc2VydGlvbihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gYXNzZXJ0aW9uIG9mIGFuIGFjdGlvbiBvciBhbiBldmVudCBhYm91dCB0aGluZ3MgaW4gdGhlIGdyYXBoXG4gICAgICogQHBhcmFtIHN1YmplY3RcbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQHBhcmFtIG9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIEJpZ01lc3MuQWN0aW9uSGFuZGxlciA9IEFjdGlvbkhhbmRsZXI7XG4gICAgZnVuY3Rpb24gQWN0aW9uSGFuZGxlcihzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCwgZG9SZWZlcmVuY2UpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgICAgICB0aGlzLmRvID0gZG9SZWZlcmVuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBcInRoaW5nXCIgaW4gdGhlIGdyYXBoXG4gICAgICogQHBhcmFtIF9pZFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIEJpZ01lc3MuVGhpbmcgPSBUaGluZztcbiAgICBmdW5jdGlvbiBUaGluZyhfaWQsIHN0YXRlKSB7XG4gICAgICAgIHRoaXMuaWQgPV9pZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGFzc2VydGlvbiwgcmV0dXJucyBpdHNlbGYgb3IgdGhlIG9iamVjdCBvZiB0aGUgYXNzZXJ0aW9uIGZvdW5kLlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBUaGluZy5wcm90b3R5cGUuZ2V0QXNzZXJ0aW9uID0gZnVuY3Rpb24gKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRBc3NlcnRpb24odGhpcywgcHJlZGljYXRlKTtcbiAgICB9O1xuXG4gICAgVGhpbmcucHJvdG90eXBlLnNldEFzc2VydGlvbiA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB0aGlzLnN0YXRlLnNldEFzc2VydGlvbih0aGlzLCBwcmVkaWNhdGUsIG9iamVjdCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBUaGluZy5wcm90b3R5cGUucmVtb3ZlQXNzZXJ0aW9ucyA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB0aGlzLnN0YXRlLnJlbW92ZUFzc2VydGlvbnModGhpcywgcHJlZGljYXRlLCBvYmplY3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoaXMgdGhpbmcgYXMgdGV4dCAoc3RyaW5nKVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIFRoaW5nLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9O1xuXG4gICAgVGhpbmcucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbikge1xuICAgICAgICB2YXIgdGhpbmdJbkNvbnRleHQgPSB0aGlzO1xuICAgICAgICB2YXIgdG9rZW5zID0gZXhwcmVzc2lvbi5zcGxpdChcIi5cIik7XG4gICAgICAgIHZhciBwcmVkaWNhdGVzID0gdGhpcy5zdGF0ZS5nZXRQcmVkaWNhdGVzKHRva2Vucyk7XG4gICAgICAgIHZhciBhbGxSZXNvbHZlZCA9IFtdO1xuICAgICAgICBwcmVkaWNhdGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWRpY2F0ZSwgaW5kZXgsIHByZWRpY2F0ZXMpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NvbnRleHQnLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHZhciBhc3NlcnRpb25zO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlZGljYXRlJywgcHJlZGljYXRlKTtcbiAgICAgICAgICAgIGlmICh0aGluZ0luQ29udGV4dCkge1xuICAgICAgICAgICAgICAgIGFzc2VydGlvbnMgPSB0aGluZ0luQ29udGV4dC5nZXRBc3NlcnRpb24ocHJlZGljYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXJ0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXNzZXJ0aW9uJywgYXNzZXJ0aW9uWzBdLm9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIHRoZSBsYXN0IHByZWRpY2F0ZSwgcmV0dXJuIG11bHRpcGxlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IGFsbG93IHRvIGJyb2FkZXIgc2VhcmNoIChub3QganVzdCBjb2xsZWN0aW9uIG9uIHRoZSBsYXN0IGJyYW5jaClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZXMubGVuZ3RoID09PSBpbmRleCArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUmVzb2x2ZWQucHVzaChhc3NlcnRpb24ub2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmdJbkNvbnRleHQgPSBhc3NlcnRpb25zWzBdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmdJbkNvbnRleHQgPSBhc3NlcnRpb25zWzBdLm9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NvbnRleHQgbnVsbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nSW5Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWxsUmVzb2x2ZWQ7XG4gICAgfTtcblxuICAgIFRoaW5nLnByb3RvdHlwZS5yZXNvbHZlVmFsdWUgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbikge1xuICAgICAgICB0aGlzLnJlc29sdmUoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHZhciB0b2tlbnMgPSBleHByZXNzaW9uLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgdmFyIHByZWRpY2F0ZXMgPSB0aGlzLnN0YXRlLmdldFByZWRpY2F0ZXModG9rZW5zKTtcbiAgICAgICAgcHJlZGljYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NvbnRleHQnLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHZhciBhc3NlcnRpb247XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVkaWNhdGUnLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnRpb24gPSBjb250ZXh0LmdldEFzc2VydGlvbihwcmVkaWNhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChhc3NlcnRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Fzc2VydGlvbicsIGFzc2VydGlvblswXS5vYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXNzZXJ0aW9uWzBdLm9iamVjdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb250ZXh0IG51bGxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY29udGV4dCkgdmFsdWUgPSBjb250ZXh0O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQSBzeW50YXggb2YgbmF0dXJhbCBsYW5ndWFnZSB0aGF0IGJlIHVzZSB0byBkZWZpbmUgYSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBCaWdNZXNzLlN5bnRheCA9IFN5bnRheDtcbiAgICBmdW5jdGlvbiBTeW50YXgodGV4dCwgcHJlZGljYXRlKSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdHlwZSBvZiBwcmVkaWNhdGUgdXNlZCB0byBtYWtlIGFzc2VydGlvbnNcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBCaWdNZXNzLlByZWRpY2F0ZSA9IFByZWRpY2F0ZTtcbiAgICBmdW5jdGlvbiBQcmVkaWNhdGUoX2lkLCB0eXBlLCBiaWdNZXNzKSB7XG4gICAgICAgIHZhciBpZCA9IF9pZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubGFiZWwgPSBpZDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgbmV3IHN5bnRheCBmb3IgdGhpcyBwcmVkaWNhdGVcbiAgICAgICAgICogQHBhcmFtIHRleHRcbiAgICAgICAgICogQHJldHVybnMge1ByZWRpY2F0ZX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3ludGF4ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSB0ZXh0O1xuICAgICAgICAgICAgYmlnTWVzcy5zeW50YXgodGhpcywgdGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcblxuIl0sImZpbGUiOiJiaWdtZXNzLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

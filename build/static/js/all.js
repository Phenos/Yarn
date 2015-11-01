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

function game() {

    var game = new MindGame();

    return {
        game: game,
        bigMess: game.bigMess,
        state: game.bigMess.state
    };

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ2dhbWUnLCBnYW1lKTtcblxuZnVuY3Rpb24gZ2FtZSgpIHtcblxuICAgIHZhciBnYW1lID0gbmV3IE1pbmRHYW1lKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnYW1lOiBnYW1lLFxuICAgICAgICBiaWdNZXNzOiBnYW1lLmJpZ01lc3MsXG4gICAgICAgIHN0YXRlOiBnYW1lLmJpZ01lc3Muc3RhdGVcbiAgICB9O1xuXG59XG5cblxuXG4iXSwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
        game.bigMess.load(source).run();
    }

    return loadGameScripts;

}




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkR2FtZVNjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZmFjdG9yeSgnbG9hZEdhbWVTY3JpcHRzJywgbG9hZEdhbWVTY3JpcHRzKTtcblxuZnVuY3Rpb24gbG9hZEdhbWVTY3JpcHRzKGdhbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VTY3JpcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0TG9vcCkge1xuXG4gICAgZnVuY3Rpb24gbG9hZEdhbWVTY3JpcHRzKCkge1xuICAgICAgICAvLyBMb2FkIGFsbCBnYW1lIHNjaXB0c1xuICAgICAgICBsb2FkUGFnZVNjcmlwdHMoJ0JpZ01lc3MnLCBvbkxvYWRTY3JpcHQpLnRoZW4ob25Mb2FkQ29tcGxldGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTG9hZENvbXBsZXRlKCkge1xuICAgICAgICB3cml0ZXJzXG4gICAgICAgICAgICAuTG9nU3RvcnlJbnRyb2R1Y3Rpb24oKVxuICAgICAgICAgICAgLkRlc2NyaWJlV2hlcmVZb3VBcmUoKTtcbiAgICAgICAgcHJvbXB0TG9vcC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxvYWRTY3JpcHQoc291cmNlKSB7XG4gICAgICAgIC8vIFRPRE86IGdhbWUuZ2FtZSA/Pz8/PyBVR0xZIVxuICAgICAgICBnYW1lLmJpZ01lc3MubG9hZChzb3VyY2UpLnJ1bigpO1xuICAgIH1cblxuICAgIHJldHVybiBsb2FkR2FtZVNjcmlwdHM7XG5cbn1cblxuXG5cbiJdLCJmaWxlIjoibG9hZEdhbWVTY3JpcHRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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

    function WhereToDo(context) {
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
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);
            var room = state.thing(option.value);
            var isIn = state.predicate("isIn");
            if (room) {
                state.thing("You")
                    .removeAssertions(isIn)
                    .setAssertion(isIn, room);
            } else {
                storyLog.error("Failed to find this room [%s]", option.value);
            }
            writers.DescribeWhereYouAre(true);
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
            var isAboutTo = state.predicate("isAboutTo");
            state.thing("You").removeAssertions(isAboutTo);
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

    promptLoop.addContext("WhereToDo", WhereToDo);
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




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwcm9tcHRMb29wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3Byb21wdExvb3AnLCBwcm9tcHRMb29wKTtcblxuZnVuY3Rpb24gcHJvbXB0TG9vcChzdG9yeUxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICB3cml0ZXJzKSB7XG5cbiAgICB2YXIgc3RvcnlMb2cgPSBzdG9yeUxvZ1NlcnZpY2U7XG5cbiAgICB2YXIgc3RhdGUgPSBnYW1lLnN0YXRlO1xuXG4gICAgZnVuY3Rpb24gV2hlcmVUb0RvKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC53aGVuID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucmVzb2x2ZVZhbHVlKFwiWW91LmlzQWJvdXRUb1wiKTtcbiAgICAgICAgICAgIHJldHVybiBpc0Fib3V0VG8gPT09IFwibW92ZVwiO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGVyZSBkbyB5b3Ugd2FudCB0byBnbyA/XCI7XG4gICAgICAgICAgICB2YXIgcm9vbXMgPSBzdGF0ZS5yZXNvbHZlKFwieW91LmlzSW4ubGlua3NUb1wiKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3Jvb21zJywgcm9vbXMpO1xuICAgICAgICAgICAgcm9vbXMuZm9yRWFjaChmdW5jdGlvbiAocm9vbSkge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaXNOYW1lZFwiKTtcbiAgICAgICAgICAgICAgICBwcm9tcHQub3B0aW9uKGxhYmVsLCByb29tLmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LmFuc3dlciA9IGZ1bmN0aW9uIGFuc3dlcihwcm9tcHRMb29wLCBvcHRpb24pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS50cmFjZShcIi5hbnN3ZXIgZm9yIFdoZXJlVG9Eb1wiKTtcbiAgICAgICAgICAgIC8vIHRvZG86IHRoaXMgc2hvdWxkIGJlIGluamVjdGVkIGluc3RlYWQgb2YgdGFrZW4gZnJvbSBwYXJlbnQgc2NvcGVcbiAgICAgICAgICAgIHZhciBpc0Fib3V0VG8gPSBzdGF0ZS5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIik7XG4gICAgICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5yZW1vdmVBc3NlcnRpb25zKGlzQWJvdXRUbyk7XG4gICAgICAgICAgICB2YXIgcm9vbSA9IHN0YXRlLnRoaW5nKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB2YXIgaXNJbiA9IHN0YXRlLnByZWRpY2F0ZShcImlzSW5cIik7XG4gICAgICAgICAgICBpZiAocm9vbSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLnRoaW5nKFwiWW91XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBc3NlcnRpb25zKGlzSW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZXRBc3NlcnRpb24oaXNJbiwgcm9vbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3J5TG9nLmVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGhpcyByb29tIFslc11cIiwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdyaXRlcnMuRGVzY3JpYmVXaGVyZVlvdUFyZSh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHByb21wdExvb3A7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvTG9va0F0KGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC53aGVuID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucmVzb2x2ZVZhbHVlKFwiWW91LmlzQWJvdXRUb1wiKTtcbiAgICAgICAgICAgIHJldHVybiBpc0Fib3V0VG8gPT09IFwibG9va1wiO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGxvb2sgYXQgP1wiO1xuICAgICAgICAgICAgdmFyIHRoaW5nc0luUm9vbSA9IHN0YXRlLnJlc29sdmUoXCJZb3UuaXNJbi5oYXNJbkl0XCIpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndGhpbmdzSW5Sb29tJywgdGhpbmdzSW5Sb29tKTtcbiAgICAgICAgICAgIGlmICh0aGluZ3NJblJvb20ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpbmdzSW5Sb29tLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikucmVtb3ZlQXNzZXJ0aW9ucyhpc0Fib3V0VG8pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGluZyA9IHN0YXRlLnRoaW5nKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgd3JpdGVycy5EZXNjcmliZVRoaW5nKHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJOb3RoaW5nIHRvIGxvb2sgYXQgaGVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvVGFrZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQud2hlbiA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGlzQWJvdXRUbyA9IHN0YXRlLnJlc29sdmVWYWx1ZShcIllvdS5pc0Fib3V0VG9cIik7XG4gICAgICAgICAgICByZXR1cm4gaXNBYm91dFRvID09PSBcInRha2VcIjtcbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbiA9IGZ1bmN0aW9uIChwcm9tcHRMb29wLCBwcm9tcHQpIHtcbiAgICAgICAgICAgIHByb21wdC5xdWVzdGlvbiA9IFwiV2hhdCBkbyB5b3Ugd2FudCB0byB0YWtlID9cIjtcbiAgICAgICAgICAgIHZhciB0aGluZ3NJblJvb20gPSBzdGF0ZS5yZXNvbHZlKFwiWW91LmlzSW4uaGFzSW5JdFwiKTtcbiAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlSW52ZW50b3J5ID0gW107XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKFwidGhpbmdzSW5Sb29tXCIsIHRoaW5nc0luUm9vbSk7XG5cbiAgICAgICAgICAgIC8vIFRvZG86IFlVQ0suLi4gRmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhlc2UgY2hlY2tzISEhISFcbiAgICAgICAgICAgIHRoaW5nc0luUm9vbS5mb3JFYWNoKGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJ0aGluZ1wiLCB0aGluZy5pZCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXRlbSBpcyBhbiBJbnZlbnRvcnlJdGVtXG4gICAgICAgICAgICAgICAgdmFyIGlzSW52ZW50b3J5SXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciB0aGluZ3NUaGF0QXJlID0gdGhpbmcucmVzb2x2ZShcImlzQVwiKTtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlLmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJpcyBhXCIsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nID09PSBzdGF0ZS50aGluZyhcIkludmVudG9yeUl0ZW1cIikpIGlzSW52ZW50b3J5SXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzSW52ZW50b3J5SXRlbSkgdGhpbmdzVGhhdEFyZUludmVudG9yeS5wdXNoKHRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoaW5nc0luUm9vbScsIHRoaW5nc0luUm9vbSk7XG4gICAgICAgICAgICBpZiAodGhpbmdzVGhhdEFyZUludmVudG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGluZ3NUaGF0QXJlSW52ZW50b3J5LmZvckVhY2goZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByb21wdC5vcHRpb24obGFiZWwsIHRoaW5nLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29udGV4dC5hbnN3ZXIgPSBmdW5jdGlvbiBhbnN3ZXIocHJvbXB0TG9vcCwgb3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaXNBYm91dFRvID0gc3RhdGUucHJlZGljYXRlKFwiaXNBYm91dFRvXCIpO1xuICAgICAgICAgICAgc3RhdGUudGhpbmcoXCJZb3VcIikucmVtb3ZlQXNzZXJ0aW9ucyhpc0Fib3V0VG8pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9kbzogRmluZCBzZXhpZXIgYXBpIGZvciByZW1vdmluZyBhbiBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAvLyB0b2RvOiBJbXBsZW1lbnQgXCJ1bmlxdWVcIiBhc3NlcnRpb25zLi4uIHN1Y2ggYXMgd2hlbiBzb21lb25lIGlzXG4gICAgICAgICAgICAgICAgdmFyIHRoaW5nID0gc3RhdGUudGhpbmcob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzSW5JbnZlbnRvcnkgPSBzdGF0ZS5wcmVkaWNhdGUoXCJoYXNJbkludmVudG9yeVwiKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS50aGluZyhcIllvdVwiKS5zZXRBc3NlcnRpb24oaGFzSW5JbnZlbnRvcnksIHRoaW5nKTtcbiAgICAgICAgICAgICAgICB3cml0ZXJzLkRlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5KHRoaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcnlMb2cuZXJyb3IoXCJTb3JyeSwgbm90aGluZyB0byB0YWtlIGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gV2hhdFRvRG8oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LndoZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBjb250ZXh0LnF1ZXN0aW9uID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHByb21wdCkge1xuICAgICAgICAgICAgcHJvbXB0LnF1ZXN0aW9uID0gXCJXaGF0IGRvIHlvdSB3YW50IHRvIGRvID9cIjtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJNb3ZlXCIsIFwibW92ZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJMb29rXCIsIFwibG9va1wiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJUYWtlXCIsIFwidGFrZVwiKTtcbiAgICAgICAgICAgIHByb21wdC5vcHRpb24oXCJJbnZlbnRvcnlcIiwgXCJpbnZlbnRvcnlcIik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnRleHQuYW5zd2VyID0gZnVuY3Rpb24gYW5zd2VyKHByb21wdExvb3AsIG9wdGlvbikge1xuICAgICAgICAgICAgLy9jb25zb2xlLnRyYWNlKFwiLmFuc3dlciBmb3IgV2hhdFRvRG9cIik7XG4gICAgICAgICAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBpbmplY3RlZCBpbnN0ZWFkIG9mIHRha2VuIGZyb20gcGFyZW50IHNjb3BlXG4gICAgICAgICAgICBjb21tYW5kcy5jb21tYW5kKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIGluc3RhbnQgb2YgdGhlIHByb21wdExvb3BcbiAgICB2YXIgcHJvbXB0TG9vcCA9IG5ldyBQcm9tcHRMb29wKHN0YXRlKTtcblxuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoZXJlVG9Eb1wiLCBXaGVyZVRvRG8pO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb0xvb2tBdFwiLCBXaGF0VG9Mb29rQXQpO1xuICAgIHByb21wdExvb3AuYWRkQ29udGV4dChcIldoYXRUb1Rha2VcIiwgV2hhdFRvVGFrZSk7XG4gICAgcHJvbXB0TG9vcC5hZGRDb250ZXh0KFwiV2hhdFRvRG9cIiwgV2hhdFRvRG8pO1xuICAgIHByb21wdExvb3AudXBkYXRlKCk7XG5cbiAgICByZXR1cm4gcHJvbXB0TG9vcDtcbn1cblxuXG5cblxuZnVuY3Rpb24gUHJvbXB0TG9vcChzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmNvbnRleHRzID0gW107XG4gICAgdGhpcy5jb250ZXh0c1JlZiA9IFtdO1xuICAgIHRoaXMuY3VycmVudFByb21wdCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IGZ1bmN0aW9uKCkge307XG59XG5cblByb21wdExvb3AucHJvdG90eXBlLm9uVXBkYXRlID0gZnVuY3Rpb24gKG9uVXBkYXRlUHJvbXB0KSB7XG4gICAgdGhpcy51cGRhdGVQcm9tcHRVSSA9IG9uVXBkYXRlUHJvbXB0O1xufTtcblxuUHJvbXB0TG9vcC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbnRVcGRhdGVVSSkge1xuICAgIHZhciBwcm9tcHQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0cy5maW5kKGZpbmRDb250ZXh0KTtcblxuICAgIGZ1bmN0aW9uIGZpbmRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGZvdW5kO1xuICAgICAgICBpZiAoY29udGV4dC53aGVuKHNlbGYuc3RhdGUpKSBmb3VuZCA9IGNvbnRleHQ7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCB0aGUgcHJvbXB0IGlmIGEgY29udGV4dCB3YXMgZm91bmRcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICBwcm9tcHQgPSBuZXcgUHJvbXB0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFByb21wdCA9IHByb21wdDtcbiAgICAgICAgY29udGV4dC5xdWVzdGlvbih0aGlzLCBwcm9tcHQpO1xuICAgICAgICBpZiAocHJvbXB0Lm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcm9tcHQuYW5zd2VyID0gZnVuY3Rpb24gKHByb21wdExvb3AsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHByb21wdC5vcHRpb25zUmVmW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBvcHRpb24pO1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gY2hvaWNlcyBhdmFpbGFibGUuLi4gc2ltcGx5IHByb2Nlc3MgYSBudWxsIGFuc3dlclxuICAgICAgICAgICAgLy8gQW5kIHVwZGF0ZSB0aGUgc3RhdGUgYWZ0ZXJ3YXJkXG4gICAgICAgICAgICBjb250ZXh0LmFuc3dlcihzZWxmLCBudWxsKTtcbiAgICAgICAgICAgIC8vc2VsZi51cGRhdGVQcm9tcHRVSShzZWxmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRvbnRVcGRhdGVVSSkgdGhpcy51cGRhdGVQcm9tcHRVSSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNvbnRleHQgZm91bmQhXCIpO1xuICAgIH1cbn07XG5cblByb21wdExvb3AucHJvdG90eXBlLmFkZENvbnRleHQgPSBmdW5jdGlvbiAoaWQsIGNvbmZpZykge1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoaWQpO1xuICAgIGNvbmZpZyhjb250ZXh0KTtcbiAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgdGhpcy5jb250ZXh0c1JlZltpZF0gPSBjb250ZXh0O1xufTtcblxuZnVuY3Rpb24gQ29udGV4dChpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnF1ZXN0aW9uID0gbnVsbDtcbiAgICB0aGlzLndoZW4gPSBudWxsO1xuICAgIHRoaXMuYW5zd2VyID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gUHJvbXB0KCkge1xuICAgIHRoaXMucXVlc3Rpb24gPSBcIlwiO1xuICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgIHRoaXMub3B0aW9uc1JlZiA9IHt9O1xufVxuXG5Qcm9tcHQucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCwgdmFsdWUpIHtcbiAgICB2YXIgb3B0aW9uID0gbmV3IE9wdGlvbihsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMub3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgdGhpcy5vcHRpb25zUmVmW3ZhbHVlXSA9IG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIE9wdGlvbihsYWJlbCwgdmFsdWUpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG5cblxuIl0sImZpbGUiOiJwcm9tcHRMb29wLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('storyLogService', storyLogService);

function storyLogService() {

    function Logger() {
        var write;

        write = function() {
            console.error("Writer not ready yet...");
        };

        this.register = function (directive) {
            write = directive.write;
        }

        this.log = function (text) {
            write(text, "log");
        };

        this.debug = function (text) {
            write(text, "debug");
        };

        this.error = function (text) {
            write(text, "error");
        };

        this.heading = function (text) {
            write(text, "heading");
        };

        this.subHeading = function (text) {
            write(text, "subHeading");
        };

        this.divider = function (text) {
            write('<div class="divider"><svg viewBox="0 100 600 160" xmlns="http://www.w3.org/2000/svg"><g>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m130.424789,192.484528c5.347214,-7.567429 3.672729,-18.679031 -0.897858,-21.884766c-8.063118,-5.856277 -16.876259,6.366287 -12.837143,18.526962c4.031113,12.517319 14.122147,21.267746 27.859741,23.769913c29.803345,5.265564 88.753922,-27.178055 126.139771,-37.105835c27.772552,-7.374985 44.737732,3.70697 53.891937,15.980652c-18.814636,-13.327133 -35.962769,-8.691956 -53.610626,-5.4198c-40.492233,7.507782 -82.376175,39.384064 -126.758072,34.370102c-20.720802,-3.09549 -35.239151,-23.671143 -34.04528,-39.805344c0.106049,-1.433762 0.336189,-2.832489 0.697144,-4.180801c2.727554,-9.561676 7.519974,-13.483307 11.765518,-14.646454c11.540581,-3.161896 22.972786,17.871918 7.794868,30.39537z" id="path2383"/>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m487.119385,189.199921c-5.671265,7.631012 -3.895264,18.836304 0.952271,22.069031c8.551758,5.905624 17.89917,-6.419983 13.615234,-18.682968c-4.275269,-12.622757 -14.978088,-21.446869 -29.548309,-23.969986c-31.609894,-5.309998 -94.133331,27.406815 -133.785309,37.418243c-29.45575,7.437042 -47.449219,-3.73822 -57.158203,-16.115265c19.954956,13.439377 38.142334,8.765167 56.859802,5.465454c42.946655,-7.570999 87.369202,-39.715729 134.441101,-34.659546c21.976685,3.121552 37.375,23.870499 36.108826,40.140549c-0.112488,1.445938 -0.356628,2.856339 -0.739441,4.216019c-2.892883,9.642197 -7.975769,13.596756 -12.478638,14.769791c-12.240051,3.188507 -24.365143,-18.0224 -8.267334,-30.651321z" id="path2479"/>' +
                '</g></svg></div>', "divider");
        };

    }

    var logger = new Logger();

    return logger;
}





//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnbWluZGdhbWUnKS5mYWN0b3J5KCdzdG9yeUxvZ1NlcnZpY2UnLCBzdG9yeUxvZ1NlcnZpY2UpO1xuXG5mdW5jdGlvbiBzdG9yeUxvZ1NlcnZpY2UoKSB7XG5cbiAgICBmdW5jdGlvbiBMb2dnZXIoKSB7XG4gICAgICAgIHZhciB3cml0ZTtcblxuICAgICAgICB3cml0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldyaXRlciBub3QgcmVhZHkgeWV0Li4uXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICB3cml0ZSA9IGRpcmVjdGl2ZS53cml0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHdyaXRlKHRleHQsIFwibG9nXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVidWcgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgd3JpdGUodGV4dCwgXCJkZWJ1Z1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVycm9yID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHdyaXRlKHRleHQsIFwiZXJyb3JcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5oZWFkaW5nID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHdyaXRlKHRleHQsIFwiaGVhZGluZ1wiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN1YkhlYWRpbmcgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgd3JpdGUodGV4dCwgXCJzdWJIZWFkaW5nXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGl2aWRlciA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICB3cml0ZSgnPGRpdiBjbGFzcz1cImRpdmlkZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDEwMCA2MDAgMTYwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnPicgK1xuICAgICAgICAgICAgICAgICc8cGF0aCBmaWxsPVwiIzAwMFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxcHhcIiBkPVwibTEzMC40MjQ3ODksMTkyLjQ4NDUyOGM1LjM0NzIxNCwtNy41Njc0MjkgMy42NzI3MjksLTE4LjY3OTAzMSAtMC44OTc4NTgsLTIxLjg4NDc2NmMtOC4wNjMxMTgsLTUuODU2Mjc3IC0xNi44NzYyNTksNi4zNjYyODcgLTEyLjgzNzE0MywxOC41MjY5NjJjNC4wMzExMTMsMTIuNTE3MzE5IDE0LjEyMjE0NywyMS4yNjc3NDYgMjcuODU5NzQxLDIzLjc2OTkxM2MyOS44MDMzNDUsNS4yNjU1NjQgODguNzUzOTIyLC0yNy4xNzgwNTUgMTI2LjEzOTc3MSwtMzcuMTA1ODM1YzI3Ljc3MjU1MiwtNy4zNzQ5ODUgNDQuNzM3NzMyLDMuNzA2OTcgNTMuODkxOTM3LDE1Ljk4MDY1MmMtMTguODE0NjM2LC0xMy4zMjcxMzMgLTM1Ljk2Mjc2OSwtOC42OTE5NTYgLTUzLjYxMDYyNiwtNS40MTk4Yy00MC40OTIyMzMsNy41MDc3ODIgLTgyLjM3NjE3NSwzOS4zODQwNjQgLTEyNi43NTgwNzIsMzQuMzcwMTAyYy0yMC43MjA4MDIsLTMuMDk1NDkgLTM1LjIzOTE1MSwtMjMuNjcxMTQzIC0zNC4wNDUyOCwtMzkuODA1MzQ0YzAuMTA2MDQ5LC0xLjQzMzc2MiAwLjMzNjE4OSwtMi44MzI0ODkgMC42OTcxNDQsLTQuMTgwODAxYzIuNzI3NTU0LC05LjU2MTY3NiA3LjUxOTk3NCwtMTMuNDgzMzA3IDExLjc2NTUxOCwtMTQuNjQ2NDU0YzExLjU0MDU4MSwtMy4xNjE4OTYgMjIuOTcyNzg2LDE3Ljg3MTkxOCA3Ljc5NDg2OCwzMC4zOTUzN3pcIiBpZD1cInBhdGgyMzgzXCIvPicgK1xuICAgICAgICAgICAgICAgICc8cGF0aCBmaWxsPVwiIzAwMFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxcHhcIiBkPVwibTQ4Ny4xMTkzODUsMTg5LjE5OTkyMWMtNS42NzEyNjUsNy42MzEwMTIgLTMuODk1MjY0LDE4LjgzNjMwNCAwLjk1MjI3MSwyMi4wNjkwMzFjOC41NTE3NTgsNS45MDU2MjQgMTcuODk5MTcsLTYuNDE5OTgzIDEzLjYxNTIzNCwtMTguNjgyOTY4Yy00LjI3NTI2OSwtMTIuNjIyNzU3IC0xNC45NzgwODgsLTIxLjQ0Njg2OSAtMjkuNTQ4MzA5LC0yMy45Njk5ODZjLTMxLjYwOTg5NCwtNS4zMDk5OTggLTk0LjEzMzMzMSwyNy40MDY4MTUgLTEzMy43ODUzMDksMzcuNDE4MjQzYy0yOS40NTU3NSw3LjQzNzA0MiAtNDcuNDQ5MjE5LC0zLjczODIyIC01Ny4xNTgyMDMsLTE2LjExNTI2NWMxOS45NTQ5NTYsMTMuNDM5Mzc3IDM4LjE0MjMzNCw4Ljc2NTE2NyA1Ni44NTk4MDIsNS40NjU0NTRjNDIuOTQ2NjU1LC03LjU3MDk5OSA4Ny4zNjkyMDIsLTM5LjcxNTcyOSAxMzQuNDQxMTAxLC0zNC42NTk1NDZjMjEuOTc2Njg1LDMuMTIxNTUyIDM3LjM3NSwyMy44NzA0OTkgMzYuMTA4ODI2LDQwLjE0MDU0OWMtMC4xMTI0ODgsMS40NDU5MzggLTAuMzU2NjI4LDIuODU2MzM5IC0wLjczOTQ0MSw0LjIxNjAxOWMtMi44OTI4ODMsOS42NDIxOTcgLTcuOTc1NzY5LDEzLjU5Njc1NiAtMTIuNDc4NjM4LDE0Ljc2OTc5MWMtMTIuMjQwMDUxLDMuMTg4NTA3IC0yNC4zNjUxNDMsLTE4LjAyMjQgLTguMjY3MzM0LC0zMC42NTEzMjF6XCIgaWQ9XCJwYXRoMjQ3OVwiLz4nICtcbiAgICAgICAgICAgICAgICAnPC9nPjwvc3ZnPjwvZGl2PicsIFwiZGl2aWRlclwiKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIHZhciBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbiAgICByZXR1cm4gbG9nZ2VyO1xufVxuXG5cblxuXG4iXSwiZmlsZSI6InN0b3J5TG9nLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

angular.module('mindgame').factory('writers', writers);

// TODO:  storyLog and state are ASYNC ????

function writers(storyLogService,
                 game) {

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
        var room = state.resolveValue("you.isIn");
        //console.log("Your in room ", room);
        if (room) {
            var label = room.resolveValue("isNamed");
            if (justMoved) {
                storyLog.log("You moved to " + label);
            } else {
                storyLog.log("You are in " + label);
            }
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
            if (label) storyLog.log("You look at the " + label);
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




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ3cml0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtaW5kZ2FtZScpLmZhY3RvcnkoJ3dyaXRlcnMnLCB3cml0ZXJzKTtcblxuLy8gVE9ETzogIHN0b3J5TG9nIGFuZCBzdGF0ZSBhcmUgQVNZTkMgPz8/P1xuXG5mdW5jdGlvbiB3cml0ZXJzKHN0b3J5TG9nU2VydmljZSxcbiAgICAgICAgICAgICAgICAgZ2FtZSkge1xuXG4gICAgdmFyIHN0b3J5TG9nID0gc3RvcnlMb2dTZXJ2aWNlO1xuICAgIHZhciBzdGF0ZSA9IGdhbWUuc3RhdGU7XG5cbiAgICAvLyBTdG9yeSB3ZWxjb21lIG1lc3NhZ2UgYW5kIGludHJvZHVjdGlvblxuICAgIC8vIHRvZG86IE91dHB1dCBzcGVjaWFsbHkgc3R5bGVkIHRpdGxlcyBmb3Igc3RvcnkgYW5kIGNoYXB0ZXJzXG4gICAgZnVuY3Rpb24gTG9nU3RvcnlJbnRyb2R1Y3Rpb24oKSB7XG4gICAgICAgIHZhciBzdG9yeSA9IHN0YXRlLnRoaW5nKFwic3RvcnlcIik7XG4gICAgICAgIHZhciBzdG9yeVRpdGxlID0gc3RhdGUucmVzb2x2ZVZhbHVlKFwic3RvcnkuaXNOYW1lZFwiKTtcblxuICAgICAgICBpZiAoc3RvcnlUaXRsZSkgc3RvcnlMb2cuaGVhZGluZyhzdG9yeVRpdGxlKTtcblxuICAgICAgICB2YXIgc3RvcnlEZXNjcmlwdGlvbiA9IHN0YXRlLnJlc29sdmVWYWx1ZShcInN0b3J5LmlzRGVzY3JpYmVkQXNcIik7XG4gICAgICAgIGlmIChzdG9yeURlc2NyaXB0aW9uKSBzdG9yeUxvZy5zdWJIZWFkaW5nKHN0b3J5RGVzY3JpcHRpb24pO1xuICAgICAgICAvLyB0b2RvOiBPdXRwdXQgc3BlY2lhbGx5IHN0eWxlZCBzZXBhcmF0b3JzXG4gICAgICAgIHN0b3J5TG9nLmRpdmlkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvLyBEZXNjcmliZSB3aGVyZSB5b3UgYXJlIGF0IHRoZSBiZWdpbm5pbmdcbiAgICBmdW5jdGlvbiBEZXNjcmliZVdoZXJlWW91QXJlKGp1c3RNb3ZlZCkge1xuICAgICAgICB2YXIgcm9vbSA9IHN0YXRlLnJlc29sdmVWYWx1ZShcInlvdS5pc0luXCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiWW91ciBpbiByb29tIFwiLCByb29tKTtcbiAgICAgICAgaWYgKHJvb20pIHtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHJvb20ucmVzb2x2ZVZhbHVlKFwiaXNOYW1lZFwiKTtcbiAgICAgICAgICAgIGlmIChqdXN0TW92ZWQpIHtcbiAgICAgICAgICAgICAgICBzdG9yeUxvZy5sb2coXCJZb3UgbW92ZWQgdG8gXCIgKyBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3J5TG9nLmxvZyhcIllvdSBhcmUgaW4gXCIgKyBsYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSByb29tLnJlc29sdmVWYWx1ZShcImlzRGVzY3JpYmVkQXNcIik7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHN0b3J5TG9nLmxvZyhkZXNjcmlwdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9yeUxvZy5sb2coXCJZb3UgYXJlIG5vd2hlcmUgdG8gYmUgZm91bmQhIFBsYWNlIHlvdXIgaGVybyBzb21ld2hlcmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVUaGluZyh0aGluZykge1xuICAgICAgICBpZiAodGhpbmcpIHtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaW5nLnJlc29sdmVWYWx1ZShcImlzTmFtZWRcIik7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc0Rlc2NyaWJlZEFzXCIpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSBzdG9yeUxvZy5sb2coXCJZb3UgbG9vayBhdCB0aGUgXCIgKyBsYWJlbCk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHN0b3J5TG9nLmxvZyhkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRGVzY3JpYmUgd2hlcmUgeW91IGFyZSBhdCB0aGUgYmVnaW5uaW5nXG4gICAgZnVuY3Rpb24gRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnkodGhpbmcpIHtcbiAgICAgICAgaWYgKHRoaW5nKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGluZy5yZXNvbHZlVmFsdWUoXCJpc05hbWVkXCIpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSBzdG9yeUxvZy5sb2coXCJZb3UgdG9vayB0aGUgXCIgKyBsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRGVzY3JpYmVUaGluZ1Rha2VuSW5JbnZlbnRvcnk6IERlc2NyaWJlVGhpbmdUYWtlbkluSW52ZW50b3J5LFxuICAgICAgICBEZXNjcmliZVRoaW5nOkRlc2NyaWJlVGhpbmcsXG4gICAgICAgIERlc2NyaWJlV2hlcmVZb3VBcmU6RGVzY3JpYmVXaGVyZVlvdUFyZSxcbiAgICAgICAgTG9nU3RvcnlJbnRyb2R1Y3Rpb246TG9nU3RvcnlJbnRyb2R1Y3Rpb25cbiAgICB9O1xuXG59XG5cblxuXG4iXSwiZmlsZSI6IndyaXRlcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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

        function StoryLogController(storyLogService, $scope, $element, $compile) {

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yeUxvZy9zdG9yeUxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pbmRnYW1lJykuZGlyZWN0aXZlKCdzdG9yeUxvZycsIFN0b3J5TG9nRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIFN0b3J5TG9nRGlyZWN0aXZlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgICAgICByZWFkeTogXCImXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdzdG9yeUxvZycsXG4gICAgICAgICAgICAvL3RlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxvZ0l0ZW1zXCI+e3sgdXNlcklucHV0LnRleHQgfX08L2Rpdj4nLFxuICAgICAgICAgICAgY29udHJvbGxlcjogU3RvcnlMb2dDb250cm9sbGVyXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gU3RvcnlMb2dDb250cm9sbGVyKHN0b3J5TG9nU2VydmljZSwgJHNjb3BlLCAkZWxlbWVudCwgJGNvbXBpbGUpIHtcblxuICAgICAgICAgICAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uICh0ZXh0LCB0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgICAgICBzY29wZS50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICBzY29wZS50eXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgbG9nSXRlbUVsID0gJGNvbXBpbGUoJzxsb2ctaXRlbSB0eXBlPVwidHlwZVwiIHRleHQ9XCJ0ZXh0XCI+PC9sb2ctaXRlbT4nKShzY29wZSk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGxvZ0l0ZW1FbCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzdG9yeUxvZ1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiJdLCJmaWxlIjoic3RvcnlMb2cvc3RvcnlMb2cuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gQmlnTWVzcygpIHtcbiAgICB0aGlzLnNjcmlwdCA9IG5ldyBCaWdNZXNzLlNjcmlwdCgpO1xuICAgIHRoaXMuc3RhdGUgPSBuZXcgQmlnTWVzcy5TdGF0ZSgpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgQmlnTWVzcy5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjcmlwdC5ydW4odGhpcy5zdGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHRleHQgaW50byB2YXJpb3VzIHNlbWFudGljIHBhcnRzIHRvIGJlIGNvbnN1bWVkIGJ5IEJpZ01lc3NcbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqL1xuICAgIEJpZ01lc3MucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB0aGlzLnNjcmlwdC5sb2FkKHRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG59KSgpO1xuIl0sImZpbGUiOiJiaWdtZXNzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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

    BigMess.Runtime = Runtime;
    /**
     * Runtime class user to execute the ast with the state
     * @param ast
     * @param state
     * @constructor
     */
    function Runtime(ast, state) {
        this.ast = ast;
        this.state = state;
        this.cursor = new Cursor();
        this.stack = new Stack();
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
        var offset = (this.scopes.length > 2) ? -2 : -1;
        return this.scopes[this.scopes.length - offset];
    };

    Stack.prototype.root = function () {
        return this.scopes[0];
    };

    Stack.prototype.push = function (obj) {
        //console.log("Pushed : ", obj);
        this.scopes.push(new Scope(obj));
    };

    Stack.prototype.pop = function () {
        //console.log("pop!");
        this.scopes.pop();
    };

    function Scope(obj) {
        this.values = obj;
    }

    /**
     * Start to execute the AST
     */
    Runtime.prototype.run = function () {
        this.cursor.start(this.ast.root);
        this.runNode(this.ast.root);
    };

    Runtime.prototype.runNode = function (node) {
        var self = this;
        var predicate;
        var args;
        var returnValue;
        this.cursor.push(node);

        if (node.type === "root") {
            // Nothing to do really with the root instruction!
            this.stack.push({
                "this": "root"
            });
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "symbol") {
            // Get or create a new thing according to that symbol
            if (node.variant === "value") {
                returnValue = node.value;
                //console.log("VALUE variant:", node.value);
            } else if (node.variant === "reference") {
                returnValue = this.state.thing(node.value);
            } else if (node.variant === "constant") {
                returnValue = this.state.thing(node.value);
            } else {
                console.warn("Unknown node variant [" + node.variant + "]");
            }
            this.stack.push({
                "this": returnValue
            });
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "value") {
            this.stack.push({
                "this": node.value
            });
            returnValue = node.value;
            this.runSet(node.set);
            this.stack.pop();
        } else if (node.type === "instruction") {
            // Identify which predicate corresponds to this instruction
            predicate = this.state.predicate(node.value);
            // Run the child set of node to be used by the predicate
            args = this.runSet(node.set);
            // Create assertion from predicate
            if (args.length) {
                args.forEach(function (arg) {
                    //todo: Handle "non predicate" instructions such as "this/that", without creating new assertion
                    var currentThis = self.stack.head().values.this;
                    var assertion = self.state.setAssertion(currentThis, predicate, arg);
                    //console.log("created assetion: ", arg);
                });
            } else {
                var currentThis = self.stack.head().values.this;
                self.state.setAssertion(currentThis, predicate);
            }
            returnValue = null;
        } else {
            returnValue = null;
            console.warn("Set ignored, unrecognised node type [" + node.type + "]", node);
        }

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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnJ1bnRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChDdXJzb3IpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIEJpZ01lc3MuUnVudGltZSA9IFJ1bnRpbWU7XG4gICAgLyoqXG4gICAgICogUnVudGltZSBjbGFzcyB1c2VyIHRvIGV4ZWN1dGUgdGhlIGFzdCB3aXRoIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSBhc3RcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSdW50aW1lKGFzdCwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5hc3QgPSBhc3Q7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKCk7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBuZXcgU3RhY2soKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBTZWUgaWYgY29kZSBzaG91bGQgYmUgZ2VuZXJhbGl6ZWQgYmV0d2VlbiBTdGFjay9Qb2ludGVyL0N1cnNvclxuICAgIGZ1bmN0aW9uIFN0YWNrKCkge1xuICAgICAgICB0aGlzLnNjb3BlcyA9IFtdO1xuICAgIH1cblxuICAgIFN0YWNrLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBTdGFjay5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzW3RoaXMuc2NvcGVzLmxlbmd0aCAtIDFdO1xuICAgIH07XG5cbiAgICBTdGFjay5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMuc2NvcGVzLmxlbmd0aCA+IDIpID8gLTIgOiAtMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzW3RoaXMuc2NvcGVzLmxlbmd0aCAtIG9mZnNldF07XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXNbMF07XG4gICAgfTtcblxuICAgIFN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiUHVzaGVkIDogXCIsIG9iaik7XG4gICAgICAgIHRoaXMuc2NvcGVzLnB1c2gobmV3IFNjb3BlKG9iaikpO1xuICAgIH07XG5cbiAgICBTdGFjay5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicG9wIVwiKTtcbiAgICAgICAgdGhpcy5zY29wZXMucG9wKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFNjb3BlKG9iaikge1xuICAgICAgICB0aGlzLnZhbHVlcyA9IG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCB0byBleGVjdXRlIHRoZSBBU1RcbiAgICAgKi9cbiAgICBSdW50aW1lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3Vyc29yLnN0YXJ0KHRoaXMuYXN0LnJvb3QpO1xuICAgICAgICB0aGlzLnJ1bk5vZGUodGhpcy5hc3Qucm9vdCk7XG4gICAgfTtcblxuICAgIFJ1bnRpbWUucHJvdG90eXBlLnJ1bk5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwcmVkaWNhdGU7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWU7XG4gICAgICAgIHRoaXMuY3Vyc29yLnB1c2gobm9kZSk7XG5cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAgIC8vIE5vdGhpbmcgdG8gZG8gcmVhbGx5IHdpdGggdGhlIHJvb3QgaW5zdHJ1Y3Rpb24hXG4gICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIFwidGhpc1wiOiBcInJvb3RcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICAgICAgLy8gR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZyBhY2NvcmRpbmcgdG8gdGhhdCBzeW1ib2xcbiAgICAgICAgICAgIGlmIChub2RlLnZhcmlhbnQgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVkFMVUUgdmFyaWFudDpcIiwgbm9kZS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUudmFyaWFudCA9PT0gXCJyZWZlcmVuY2VcIikge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5zdGF0ZS50aGluZyhub2RlLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS52YXJpYW50ID09PSBcImNvbnN0YW50XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuc3RhdGUudGhpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVua25vd24gbm9kZSB2YXJpYW50IFtcIiArIG5vZGUudmFyaWFudCArIFwiXVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgICAgXCJ0aGlzXCI6IHJldHVyblZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucnVuU2V0KG5vZGUuc2V0KTtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgICAgXCJ0aGlzXCI6IG5vZGUudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ydW5TZXQobm9kZS5zZXQpO1xuICAgICAgICAgICAgdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09IFwiaW5zdHJ1Y3Rpb25cIikge1xuICAgICAgICAgICAgLy8gSWRlbnRpZnkgd2hpY2ggcHJlZGljYXRlIGNvcnJlc3BvbmRzIHRvIHRoaXMgaW5zdHJ1Y3Rpb25cbiAgICAgICAgICAgIHByZWRpY2F0ZSA9IHRoaXMuc3RhdGUucHJlZGljYXRlKG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgLy8gUnVuIHRoZSBjaGlsZCBzZXQgb2Ygbm9kZSB0byBiZSB1c2VkIGJ5IHRoZSBwcmVkaWNhdGVcbiAgICAgICAgICAgIGFyZ3MgPSB0aGlzLnJ1blNldChub2RlLnNldCk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYXNzZXJ0aW9uIGZyb20gcHJlZGljYXRlXG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IEhhbmRsZSBcIm5vbiBwcmVkaWNhdGVcIiBpbnN0cnVjdGlvbnMgc3VjaCBhcyBcInRoaXMvdGhhdFwiLCB3aXRob3V0IGNyZWF0aW5nIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaGlzID0gc2VsZi5zdGFjay5oZWFkKCkudmFsdWVzLnRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhc3NlcnRpb24gPSBzZWxmLnN0YXRlLnNldEFzc2VydGlvbihjdXJyZW50VGhpcywgcHJlZGljYXRlLCBhcmcpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY3JlYXRlZCBhc3NldGlvbjogXCIsIGFyZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGhpcyA9IHNlbGYuc3RhY2suaGVhZCgpLnZhbHVlcy50aGlzO1xuICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUuc2V0QXNzZXJ0aW9uKGN1cnJlbnRUaGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiU2V0IGlnbm9yZWQsIHVucmVjb2duaXNlZCBub2RlIHR5cGUgW1wiICsgbm9kZS50eXBlICsgXCJdXCIsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJzb3IucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH07XG5cbiAgICBSdW50aW1lLnByb3RvdHlwZS5ydW5TZXQgPSBmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcblxuICAgICAgICBzZXQubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBub2RlIHZhbHVlIGFzIGFuIGFyZ3VtZW50IHRvIGJlIGNvbnN1bWVkXG4gICAgICAgICAgICBhcmdzLnB1c2goc2VsZi5ydW5Ob2RlKG5vZGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH07XG5cbn0pKEJpZ01lc3MuQ3Vyc29yKTtcblxuIl0sImZpbGUiOiJiaWdtZXNzLnJ1bnRpbWUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function (Pointer, AST, Runtime) {
    "use strict";

    BigMess.Script = Script;
    function Script() {
        this.pointer = new Pointer();
        this.ast = new AST();
    }

    Script.prototype.load = function (text) {
        this.pointer.tokenize(text);
        this.compile(this.pointer.tokens); // Todo.. this should not be compile
        return this;
    };

    Script.prototype.run = function (state) {
        var runtime = new Runtime(this.ast, state);
        runtime.run();
    };

    Script.prototype.compile = function (tokens) {
        this.ast.compile(tokens);
        return this;
    };

})(BigMess.Pointer, BigMess.AST, BigMess.Runtime);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKFBvaW50ZXIsIEFTVCwgUnVudGltZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgQmlnTWVzcy5TY3JpcHQgPSBTY3JpcHQ7XG4gICAgZnVuY3Rpb24gU2NyaXB0KCkge1xuICAgICAgICB0aGlzLnBvaW50ZXIgPSBuZXcgUG9pbnRlcigpO1xuICAgICAgICB0aGlzLmFzdCA9IG5ldyBBU1QoKTtcbiAgICB9XG5cbiAgICBTY3JpcHQucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB0aGlzLnBvaW50ZXIudG9rZW5pemUodGV4dCk7XG4gICAgICAgIHRoaXMuY29tcGlsZSh0aGlzLnBvaW50ZXIudG9rZW5zKTsgLy8gVG9kby4uIHRoaXMgc2hvdWxkIG5vdCBiZSBjb21waWxlXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBTY3JpcHQucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB2YXIgcnVudGltZSA9IG5ldyBSdW50aW1lKHRoaXMuYXN0LCBzdGF0ZSk7XG4gICAgICAgIHJ1bnRpbWUucnVuKCk7XG4gICAgfTtcblxuICAgIFNjcmlwdC5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgdGhpcy5hc3QuY29tcGlsZSh0b2tlbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG59KShCaWdNZXNzLlBvaW50ZXIsIEJpZ01lc3MuQVNULCBCaWdNZXNzLlJ1bnRpbWUpO1xuXG4iXSwiZmlsZSI6ImJpZ21lc3Muc2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

(function () {
    "use strict";

    BigMess.State = State;
    function State() {
        this.assertions = [];
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
        html.push("</div>");

        function getStringFromThingOrValue(obj) {
            var value;
            if (typeof obj === "undefined") {
                value = "";
            } else if (typeof obj === "object") {
                value = obj.label || obj.id;
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
     * Get a new assertion and the objects associated to it
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
    /**
     * Get or create a new type of predicate
     * @param _id
     */
    State.prototype.predicate = function (_id) {
        var id = _id.toLowerCase();
        var predicate;
        var syntax;

        if (!id)
            throw("Assertions must have an id");

        // Resolve the predicate from the syntax
        syntax = this.syntaxes[id];
        if (syntax) predicate = syntax.predicate;

        if (!predicate) {
            predicate = new Predicate(id, this);
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
    function Predicate(_id, bigMess) {
        var id = _id.toLowerCase();
        this.id = id;
        this.label = id;

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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiaWdtZXNzLnN0YXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBCaWdNZXNzLlN0YXRlID0gU3RhdGU7XG4gICAgZnVuY3Rpb24gU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnRoaW5ncyA9IHt9O1xuICAgICAgICB0aGlzLnByZWRpY2F0ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5zeW50YXhlcyA9IHt9O1xuICAgIH1cblxuICAgIFN0YXRlLnByb3RvdHlwZS5nZXRQcmVkaWNhdGVzID0gZnVuY3Rpb24odG9rZW5zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHByZWRpY2F0ZXMgPSBbXTtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgcHJlZGljYXRlID0gc2VsZi5wcmVkaWNhdGUodG9rZW4pO1xuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUpIHRocm93IFwiVW5rbm93biBwcmVkaWNhdGUgW1wiICsgdG9rZW4gKyBcIl0gaW4gZXhwcmVzc2lvbiBbXCIgKyBleHByZXNzaW9uICsgXCJdXCI7XG4gICAgICAgICAgICBwcmVkaWNhdGVzLnB1c2gocHJlZGljYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzO1xuICAgIH07XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChleHByZXNzaW9uLCBfdGhpbmcpIHtcbiAgICAgICAgdmFyIHRoaW5nID0gX3RoaW5nO1xuICAgICAgICB2YXIgYWxsUmVzb2x2ZWQgPSBbXTtcbiAgICAgICAgLy8gSWYgYSB0aGluZyB3YXMgbm90IHN1cHBsaWVkIGFzIGEgc3RhcnRpbmcgcG9pbnQsIHVzZSB0aGUgZmlyc3QgdG9rZW4gYXMgdGhlIHRoaW5nIGlkXG4gICAgICAgIGlmICghdGhpbmcpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbnMgPSBleHByZXNzaW9uLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIHZhciB0aGluZ0lkID0gdG9rZW5zLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAodGhpbmdJZCkgdGhpbmcgPSB0aGlzLnRoaW5nKHRoaW5nSWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGluZyAmJiB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhbGxSZXNvbHZlZCA9IHRoaW5nLnJlc29sdmUodG9rZW5zLmpvaW4oXCIuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsUmVzb2x2ZWQ7XG4gICAgfTtcblxuXG4gICAgU3RhdGUucHJvdG90eXBlLnJlc29sdmVWYWx1ZSA9IGZ1bmN0aW9uIChleHByZXNzaW9uKSB7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIHJlc29sdmVkID0gdGhpcy5yZXNvbHZlKGV4cHJlc3Npb24pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdTdGF0ZS5yZXNvbHZlZCcsIHJlc29sdmVkKTtcbiAgICAgICAgaWYgKHJlc29sdmVkLmxlbmd0aCkgdmFsdWUgPSByZXNvbHZlZFswXTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBbXTtcblxuICAgICAgICBodG1sLnB1c2goXCI8ZGl2IGNsYXNzPSdhc3NlcnRpb25zJz5cIik7XG4gICAgICAgIHRoaXMuYXNzZXJ0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjxkaXYgY2xhc3M9J2Fzc2VydGlvbic+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKFwiPHNwYW4gY2xhc3M9J3N1YmplY3QgXCIgKyBnZXRUeXBlRnJvbVRoaW5nT3JWYWx1ZShhc3NlcnRpb24uc3ViamVjdCkgKyBcIic+XCIpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKGdldFN0cmluZ0Zyb21UaGluZ09yVmFsdWUoYXNzZXJ0aW9uLnN1YmplY3QpKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48c3BhbiBjbGFzcz0ncHJlZGljYXRlJz5cIik7XG4gICAgICAgICAgICBodG1sLnB1c2goZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShhc3NlcnRpb24ucHJlZGljYXRlKSk7XG4gICAgICAgICAgICBodG1sLnB1c2goXCI8L3NwYW4+PHNwYW4gY2xhc3M9J29iamVjdCBcIiArIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKGFzc2VydGlvbi5vYmplY3QpICsgXCInPlwiKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChnZXRTdHJpbmdGcm9tVGhpbmdPclZhbHVlKGFzc2VydGlvbi5vYmplY3QpKTtcbiAgICAgICAgICAgIGh0bWwucHVzaChcIjwvc3Bhbj48L2Rpdj5cIik7XG4gICAgICAgIH0pO1xuICAgICAgICBodG1sLnB1c2goXCI8L2Rpdj5cIik7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVRoaW5nT3JWYWx1ZShvYmopIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvYmoubGFiZWwgfHwgb2JqLmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFR5cGVGcm9tVGhpbmdPclZhbHVlKG9iaikge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJpc1VuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcImlzVGhpbmdcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIG9iajtcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJpc1wiICsgdHlwZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWwuam9pbihcIlwiKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZ1xuICAgICAqIEBwYXJhbSBfaWRcbiAgICAgKi9cbiAgICBTdGF0ZS5wcm90b3R5cGUudGhpbmcgPSBmdW5jdGlvbiAoX2lkKSB7XG4gICAgICAgIHZhciB0aGluZztcbiAgICAgICAgdmFyIGlkID0gX2lkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHRocm93KFwiVGhpbmdzIG11c3QgaGF2ZSBhbiBpZFwiKTtcbiAgICAgICAgdGhpbmcgPSB0aGlzLnRoaW5nc1tpZF07XG4gICAgICAgIGlmICghdGhpbmcpIHtcbiAgICAgICAgICAgIHRoaW5nID0gbmV3IFRoaW5nKGlkLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudGhpbmdzW2lkXSA9IHRoaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIGNyZWF0ZSBhIG5ldyB0aGluZ1xuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIFN0YXRlLnByb3RvdHlwZS5zeW50YXggPSBmdW5jdGlvbiAocHJlZGljYXRlLCB0ZXh0KSB7XG4gICAgICAgIHZhciBzeW50YXg7XG5cbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpXG4gICAgICAgICAgICB0aHJvdyhcIlN5bnRheCBtdXN0IGhhdmUgYSBwcmVkaWNhdGVcIik7XG4gICAgICAgIGlmICghdGV4dClcbiAgICAgICAgICAgIHRocm93KFwiU3ludGF4IG11c3QgaGF2ZSBhIHRleHRcIik7XG4gICAgICAgIHN5bnRheCA9IHRoaXMuc3ludGF4ZXNbdGV4dF07XG4gICAgICAgIGlmICghc3ludGF4KSB7XG4gICAgICAgICAgICBzeW50YXggPSBuZXcgU3ludGF4KHRleHQsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICB0aGlzLnN5bnRheGVzW3RleHRdID0gc3ludGF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzeW50YXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIG5ldyBhc3NlcnRpb24gYW5kIHRoZSBvYmplY3RzIGFzc29jaWF0ZWQgdG8gaXRcbiAgICAgKiBAcGFyYW0gc3ViamVjdFxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgU3RhdGUucHJvdG90eXBlLnNldEFzc2VydGlvbiA9IGZ1bmN0aW9uIChzdWJqZWN0LCBwcmVkaWNhdGUsIG9iamVjdCkge1xuICAgICAgICB2YXIgYXNzZXJ0aW9uO1xuICAgICAgICB2YXIgZm91bmRBc3NlcnRpb25zO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUgJiYgc3ViamVjdCkge1xuICAgICAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhpc3RpbmcgYXNzZXJ0aW9uXG4gICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMgPSBbXTtcbiAgICAgICAgICAgIC8vIHRvZG86IHVzZSBidWlsdCBpbmRleGVzIGluc3RlYWQgb2YgaXR0ZXJhdGluZyB0cm91Z2ggYWxsIHByZWRpY2F0ZXNcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXJ0aW9uLnN1YmplY3QgPT09IHN1YmplY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydGlvbi5vYmplY3QgPT09IG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZvdW5kQXNzZXJ0aW9uc1swXSkge1xuICAgICAgICAgICAgICAgIGFzc2VydGlvbiA9IGZvdW5kQXNzZXJ0aW9uc1swXS5vYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBhc3NlcnRpb25cbiAgICAgICAgICAgICAgICBhc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2VydGlvbnMucHVzaChhc3NlcnRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW1wb3NzaWJsZSB0byBjcmVhdGUgYXNzZXJ0aW9uIHdpdGhvdXQgYXQgbGVhc3QgYSBzdWJqZWN0IGFuZCBhIHByZWRpY2F0ZS5cIilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NlcnRpb247XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5yZW1vdmVBc3NlcnRpb25zID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSwgb2JqZWN0KSB7XG4gICAgICAgIC8vIExvb2sgZm9yIG1hdGNoaW5nIGFzc2VydGlvbnNcbiAgICAgICAgLy8gdG9kbzogdXNlIGJ1aWx0IGluZGV4ZXMgaW5zdGVhZCBvZiBpdHRlcmF0aW5nIHRyb3VnaCBhbGwgcHJlZGljYXRlc1xuICAgICAgICB0aGlzLmFzc2VydGlvbnMgPSB0aGlzLmFzc2VydGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgIHZhciBrZWVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzdWJqZWN0ICYmIE9iamVjdC5pcyhvYmplY3QsIGFzc2VydGlvbi5zdWJqZWN0KSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSAmJiBPYmplY3QuaXMocHJlZGljYXRlLCBhc3NlcnRpb24ucHJlZGljYXRlKSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG9iamVjdCAmJiBPYmplY3QuaXMob2JqZWN0LCBhc3NlcnRpb24ub2JqZWN0KSkga2VlcCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGtlZXA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5cbiAgICBTdGF0ZS5wcm90b3R5cGUuZ2V0QXNzZXJ0aW9uID0gZnVuY3Rpb24gKHN1YmplY3QsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIgYXNzZXJ0aW9uO1xuICAgICAgICB2YXIgZm91bmRBc3NlcnRpb25zO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUgJiYgc3ViamVjdCkge1xuICAgICAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhpc3RpbmcgYXNzZXJ0aW9uXG4gICAgICAgICAgICBmb3VuZEFzc2VydGlvbnMgPSBbXTtcbiAgICAgICAgICAgIC8vIHRvZG86IHVzZSBidWlsdCBpbmRleGVzIGluc3RlYWQgb2YgaXR0ZXJhdGluZyB0cm91Z2ggYWxsIHByZWRpY2F0ZXNcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NlcnRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXJ0aW9uLnN1YmplY3QgPT09IHN1YmplY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0aW9uLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kQXNzZXJ0aW9ucy5wdXNoKGFzc2VydGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbXBvc3NpYmxlIHRvIGZpbmQgYXNzZXJ0aW9uIHdpdGhvdXQgYXQgbGVhc3QgYSBzdWJqZWN0IGFuZCBhIHByZWRpY2F0ZS5cIilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZEFzc2VydGlvbnM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgb3IgY3JlYXRlIGEgbmV3IHR5cGUgb2YgcHJlZGljYXRlXG4gICAgICogQHBhcmFtIF9pZFxuICAgICAqL1xuICAgIFN0YXRlLnByb3RvdHlwZS5wcmVkaWNhdGUgPSBmdW5jdGlvbiAoX2lkKSB7XG4gICAgICAgIHZhciBpZCA9IF9pZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgcHJlZGljYXRlO1xuICAgICAgICB2YXIgc3ludGF4O1xuXG4gICAgICAgIGlmICghaWQpXG4gICAgICAgICAgICB0aHJvdyhcIkFzc2VydGlvbnMgbXVzdCBoYXZlIGFuIGlkXCIpO1xuXG4gICAgICAgIC8vIFJlc29sdmUgdGhlIHByZWRpY2F0ZSBmcm9tIHRoZSBzeW50YXhcbiAgICAgICAgc3ludGF4ID0gdGhpcy5zeW50YXhlc1tpZF07XG4gICAgICAgIGlmIChzeW50YXgpIHByZWRpY2F0ZSA9IHN5bnRheC5wcmVkaWNhdGU7XG5cbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgIHByZWRpY2F0ZSA9IG5ldyBQcmVkaWNhdGUoaWQsIHRoaXMpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNyZWF0ZWQgbmV3IHByZWRpY2F0ZVwiLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgdGhpcy5wcmVkaWNhdGVzW2lkXSA9IHByZWRpY2F0ZTtcbiAgICAgICAgICAgIHRoaXMuc3ludGF4ZXNbaWRdID0gbmV3IFN5bnRheChpZCwgcHJlZGljYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJlZGljYXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbiBhc3NlcnRpb24gYWJvdXQgdGhpbmdzIGluIHRoZSBncmFwaFxuICAgICAqIEBwYXJhbSBzdWJqZWN0XG4gICAgICogQHBhcmFtIHByZWRpY2F0ZVxuICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBCaWdNZXNzLkFzc2VydGlvbiA9IEFzc2VydGlvbjtcbiAgICBmdW5jdGlvbiBBc3NlcnRpb24oc3ViamVjdCwgcHJlZGljYXRlLCBvYmplY3QpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgXCJ0aGluZ1wiIGluIHRoZSBncmFwaFxuICAgICAqIEBwYXJhbSBfaWRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBCaWdNZXNzLlRoaW5nID0gVGhpbmc7XG4gICAgZnVuY3Rpb24gVGhpbmcoX2lkLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLmlkID1faWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBhc3NlcnRpb24sIHJldHVybnMgaXRzZWxmIG9yIHRoZSBvYmplY3Qgb2YgdGhlIGFzc2VydGlvbiBmb3VuZC5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICovXG4gICAgVGhpbmcucHJvdG90eXBlLmdldEFzc2VydGlvbiA9IGZ1bmN0aW9uIChwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0QXNzZXJ0aW9uKHRoaXMsIHByZWRpY2F0ZSk7XG4gICAgfTtcblxuICAgIFRoaW5nLnByb3RvdHlwZS5zZXRBc3NlcnRpb24gPSBmdW5jdGlvbiAocHJlZGljYXRlLCBvYmplY3QpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZXRBc3NlcnRpb24odGhpcywgcHJlZGljYXRlLCBvYmplY3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgVGhpbmcucHJvdG90eXBlLnJlbW92ZUFzc2VydGlvbnMgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBvYmplY3QpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yZW1vdmVBc3NlcnRpb25zKHRoaXMsIHByZWRpY2F0ZSwgb2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGlzIHRoaW5nIGFzIHRleHQgKHN0cmluZylcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBUaGluZy5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfTtcblxuICAgIFRoaW5nLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIHRoaW5nSW5Db250ZXh0ID0gdGhpcztcbiAgICAgICAgdmFyIHRva2VucyA9IGV4cHJlc3Npb24uc3BsaXQoXCIuXCIpO1xuICAgICAgICB2YXIgcHJlZGljYXRlcyA9IHRoaXMuc3RhdGUuZ2V0UHJlZGljYXRlcyh0b2tlbnMpO1xuICAgICAgICB2YXIgYWxsUmVzb2x2ZWQgPSBbXTtcbiAgICAgICAgcHJlZGljYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVkaWNhdGUsIGluZGV4LCBwcmVkaWNhdGVzKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb250ZXh0JywgY29udGV4dCk7XG4gICAgICAgICAgICB2YXIgYXNzZXJ0aW9ucztcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZWRpY2F0ZScsIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICBpZiAodGhpbmdJbkNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnRpb25zID0gdGhpbmdJbkNvbnRleHQuZ2V0QXNzZXJ0aW9uKHByZWRpY2F0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFzc2VydGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Fzc2VydGlvbicsIGFzc2VydGlvblswXS5vYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBpcyB0aGUgbGFzdCBwcmVkaWNhdGUsIHJldHVybiBtdWx0aXBsZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBhbGxvdyB0byBicm9hZGVyIHNlYXJjaCAobm90IGp1c3QgY29sbGVjdGlvbiBvbiB0aGUgbGFzdCBicmFuY2gpXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVkaWNhdGVzLmxlbmd0aCA9PT0gaW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnRpb25zLmZvckVhY2goZnVuY3Rpb24gKGFzc2VydGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFJlc29sdmVkLnB1c2goYXNzZXJ0aW9uLm9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5nSW5Db250ZXh0ID0gYXNzZXJ0aW9uc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5nSW5Db250ZXh0ID0gYXNzZXJ0aW9uc1swXS5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb250ZXh0IG51bGxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGluZ0luQ29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFsbFJlc29sdmVkO1xuICAgIH07XG5cbiAgICBUaGluZy5wcm90b3R5cGUucmVzb2x2ZVZhbHVlID0gZnVuY3Rpb24gKGV4cHJlc3Npb24pIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICB2YXIgdG9rZW5zID0gZXhwcmVzc2lvbi5zcGxpdChcIi5cIik7XG4gICAgICAgIHZhciBwcmVkaWNhdGVzID0gdGhpcy5zdGF0ZS5nZXRQcmVkaWNhdGVzKHRva2Vucyk7XG4gICAgICAgIHByZWRpY2F0ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb250ZXh0JywgY29udGV4dCk7XG4gICAgICAgICAgICB2YXIgYXNzZXJ0aW9uO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlZGljYXRlJywgcHJlZGljYXRlKTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0aW9uID0gY29udGV4dC5nZXRBc3NlcnRpb24ocHJlZGljYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXJ0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhc3NlcnRpb24nLCBhc3NlcnRpb25bMF0ub2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGFzc2VydGlvblswXS5vYmplY3Q7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY29udGV4dCBudWxsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvbnRleHQpIHZhbHVlID0gY29udGV4dDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEEgc3ludGF4IG9mIG5hdHVyYWwgbGFuZ3VhZ2UgdGhhdCBiZSB1c2UgdG8gZGVmaW5lIGEgcHJlZGljYXRlXG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcGFyYW0gcHJlZGljYXRlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgQmlnTWVzcy5TeW50YXggPSBTeW50YXg7XG4gICAgZnVuY3Rpb24gU3ludGF4KHRleHQsIHByZWRpY2F0ZSkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHR5cGUgb2YgcHJlZGljYXRlIHVzZWQgdG8gbWFrZSBhc3NlcnRpb25zXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgQmlnTWVzcy5QcmVkaWNhdGUgPSBQcmVkaWNhdGU7XG4gICAgZnVuY3Rpb24gUHJlZGljYXRlKF9pZCwgYmlnTWVzcykge1xuICAgICAgICB2YXIgaWQgPSBfaWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmxhYmVsID0gaWQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIG5ldyBzeW50YXggZm9yIHRoaXMgcHJlZGljYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICAgICAqIEByZXR1cm5zIHtQcmVkaWNhdGV9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN5bnRheCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gdGV4dDtcbiAgICAgICAgICAgIGJpZ01lc3Muc3ludGF4KHRoaXMsIHRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG5cbiJdLCJmaWxlIjoiYmlnbWVzcy5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

"use strict";

function MindGame () {

    this.bigMess = new BigMess();

    createPredicates(this.bigMess.state);
    defineKinds(this.bigMess.state);
}

MindGame.prototype.load = function (text) {
    return this.bigMess.load(text);
    //return this;
};

function defineKinds(state) {
    // Player
    state
        .thing("player");

    // Persons
    state
        .thing("person");

    // Places
    state
        .thing("room");

    // Objects (as in "object" in the game)
    state
        .thing("object");
}

function createPredicates(state) {

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
        .syntax("is at");

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
}


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtaW5kZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gTWluZEdhbWUgKCkge1xuXG4gICAgdGhpcy5iaWdNZXNzID0gbmV3IEJpZ01lc3MoKTtcblxuICAgIGNyZWF0ZVByZWRpY2F0ZXModGhpcy5iaWdNZXNzLnN0YXRlKTtcbiAgICBkZWZpbmVLaW5kcyh0aGlzLmJpZ01lc3Muc3RhdGUpO1xufVxuXG5NaW5kR2FtZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuYmlnTWVzcy5sb2FkKHRleHQpO1xuICAgIC8vcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBkZWZpbmVLaW5kcyhzdGF0ZSkge1xuICAgIC8vIFBsYXllclxuICAgIHN0YXRlXG4gICAgICAgIC50aGluZyhcInBsYXllclwiKTtcblxuICAgIC8vIFBlcnNvbnNcbiAgICBzdGF0ZVxuICAgICAgICAudGhpbmcoXCJwZXJzb25cIik7XG5cbiAgICAvLyBQbGFjZXNcbiAgICBzdGF0ZVxuICAgICAgICAudGhpbmcoXCJyb29tXCIpO1xuXG4gICAgLy8gT2JqZWN0cyAoYXMgaW4gXCJvYmplY3RcIiBpbiB0aGUgZ2FtZSlcbiAgICBzdGF0ZVxuICAgICAgICAudGhpbmcoXCJvYmplY3RcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByZWRpY2F0ZXMoc3RhdGUpIHtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIG9mIGEga2luZFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0F1dGhvcmVkQnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGNyZWF0ZWQgYnlcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF1dGhvcmVkIGJ5XCIpO1xuXG4gICAgLy8gVGhlIEFjdGlvbiB0aGUgdXNlciB3aGF0IGFib3V0IHRvIG1ha2UgKGV4LjogTW92ZSwgTG9vaywgZXRjKVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc0Fib3V0VG9cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFib3V0IHRvXCIpO1xuXG4gICAgLy8gV2hhdCBzb21ldGhpbmcgaXMgb2YgYSBraW5kXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzQVwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgYW5cIilcbiAgICAgICAgLnN5bnRheChcImlzIGFcIik7XG5cbiAgICAvLyBXaGF0IHNvbWV0aGluZyBoYXMgYW4gYXR0cmlidXRlXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImlzXCIpXG4gICAgICAgIC5zeW50YXgoXCJpc1wiKTtcblxuICAgIC8vIFdoYXQgc29tZXRoaW5nIGlzIGNhbGxlZFxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJpc05hbWVkXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyB0aXRsZWRcIilcbiAgICAgICAgLnN5bnRheChcImlzIG5hbWVkXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBjYWxsZWRcIik7XG5cbiAgICAvLyBXaGF0IHNvbWV0aGluZyBpcyBkZXNjcmliZWQgYXMgd2hlbiBsb29rZWQgYXRcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaXNEZXNjcmliZWRBc1wiKVxuICAgICAgICAuc3ludGF4KFwiaXMgZGVzY3JpYmVkXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBkZXNjcmliZWQgYXNcIik7XG5cbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaXNBbHNvRGVzY3JpYmVkQXNcIilcbiAgICAgICAgLnN5bnRheChcImlzIGFsc28gZGVzY3JpYmVkXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBhbHNvIGRlc2NyaWJlZCBhc1wiKTtcblxuICAgIC8vIFdoZW4gc29tZXRoaW5nIGlzIGluIGEgcGxhY2VcbiAgICBzdGF0ZVxuICAgICAgICAucHJlZGljYXRlKFwiaXNJblwiKVxuICAgICAgICAuc3ludGF4KFwiaXMgaW4gdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBpbnNpZGUgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBhdCB0aGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGluXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBpbnNpZGVcIilcbiAgICAgICAgLnN5bnRheChcImlzIGF0XCIpO1xuXG4gICAgLy8gV2hlbiBzb21ldGhpbmcgaGFzIHNvbWV0aGluZyBlbHNlLiBFeC46IEtpdGNoZW4gaGFzIGEgS2l0Y2hlbiBUYWJsZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJoYXNJbkl0XCIpXG4gICAgICAgIC5zeW50YXgoXCJoYXMgaW4gaXQgdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJoYXMgaW4gaXQgYVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGFcIik7XG5cbiAgICAvLyBXaGVuIHNvbWV0aGluZyBoYXMgc29tZXRoaW5nIGVsc2UuIEV4LjogS2l0Y2hlbiBoYXMgYSBLaXRjaGVuIFRhYmxlXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImhhc0luSW52ZW50b3J5XCIpXG4gICAgICAgIC5zeW50YXgoXCJoYXMgaW4gaW52ZW50b3J5IGFcIilcbiAgICAgICAgLnN5bnRheChcImhhcyBpbiBpbnZlbnRveVwiKVxuICAgICAgICAuc3ludGF4KFwiaGFzIGludmVudG95XCIpO1xuXG4gICAgLy8gV2hlbiBhIHBsYWNlIGlzIGxpbmtlZCB0byBhbm90aGVyIHBsYWNlXG4gICAgc3RhdGVcbiAgICAgICAgLnByZWRpY2F0ZShcImxpbmtzVG9cIilcbiAgICAgICAgLnN5bnRheChcImdvZXMgdG9cIilcbiAgICAgICAgLnN5bnRheChcImlzIG9wZW4gdG9cIilcbiAgICAgICAgLnN5bnRheChcImdvZXMgdG8gdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJpcyBvcGVuIHRvIHRoZVwiKVxuICAgICAgICAuc3ludGF4KFwibGlua3MgdG8gdGhlXCIpXG4gICAgICAgIC5zeW50YXgoXCJsaW5rcyB0b1wiKTtcblxuICAgIC8vIFdoZW4gYSBwbGFjZSBpcyBsaW5rZWQgdG8gYW5vdGhlciBwbGFjZVxuICAgIHN0YXRlXG4gICAgICAgIC5wcmVkaWNhdGUoXCJ0aGlzXCIpXG4gICAgICAgIC5zeW50YXgoXCJ0aGF0XCIpXG4gICAgICAgIC5zeW50YXgoXCJ0aGVcIik7XG59XG5cbiJdLCJmaWxlIjoibWluZGdhbWUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

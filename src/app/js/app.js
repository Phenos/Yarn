var mindgame = angular.module('mindgame', [
    'ui.router',
    'luegg.directives',
    'cfp.hotkeys'
]);

(function () {

    'use strict';

    angular.module('mindgame').config(function ($stateProvider,
                                                $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            controller: gameController,
            controllerAs: 'game',
            // todo: bind to controller
            //bindToController: {},
            templateUrl: './html/app.html'
        });

        function gameController(loadPageScripts,
                                promptLoop,
                                writers,
                                game) {

            // todo: this object should not be called "game"
            console.log("Game started!");
            var controller = this;

            this.ready = function () {
                // Load all game scipts
                loadPageScripts('BigMess', function (source) {
                    // TODO: game.game ????? UGLY!
                    game.game.load(source);
                    game.bigMess.runScript();
                }).then(function () {
                    controller.start()
                });

            };

            // TODO: Should that be there ?
            this.start = function () {
                writers.LogStoryIntroduction();
                writers.DescribeWhereYouAre();
                this.promptLoop = promptLoop(onUpdatePrompt);
            };

            // TODO: THIS READY WAS CALLED AFTER GETTING STORYLOG
            this.ready();

            // Load the appropriate prompt and setup the ui with the prompt
            function onUpdatePrompt(promptLoop) {
                var prompt = promptLoop.currentPrompt;
                if (prompt) {
                    //console.trace("prompt found", prompt);
                    // Prompt the user with a question
                    // todo: This should be inside a sort of REPL pattern with a handler for each types of context
                    controller.question = prompt.question;
                    controller.options = prompt.options;
                    controller.choose = function (value) {
                        prompt.answer(promptLoop, value);
                        promptLoop.update();
                    };
                } else {
                    console.error("OUPS!!!... no prompt were found!!!");
                }
            }


        }

    })

})();


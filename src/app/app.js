"use strict";

var mindgame = angular.module('mindgame', [
    'ui.router'
]);

angular.module('mindgame').config(function ($stateProvider, $urlRouterProvider) {
    console.log("config");

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('root', {
        url: '/',
        controller: mainController,
        template: '<div><userInput></userInput><storyLog></storyLog></div>'
    });

    function mainController() {
        console.log("ALLO!");
    }
});


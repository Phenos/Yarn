(function () {
    'use strict';


    angular.module('yarn').config(config);

    angular.module('yarn').run(function ($rootScope) {
        $rootScope.breakpoints = {
            0: 'isMobileWidth',
            480: 'isMobileLandscapeWidth',
            641: 'isTabletWidth',
            1025: 'isDesktopWidth',
            1281: 'isWidescreenLayout'
        };
    });

    // todo: Put config in separate file
    function config($stateProvider,
                    $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            url: '/',
            resolve: {
                "user": function ($window,
                                  $http) {
                    return $http({
                        method: 'GET',
                        url: '/auth/account/json'
                    }).then(function (res) {
                        var user = {};
                        if (res.data.username) {
                            console.log("USER: FOUND: ", res.data.username);
                            console.log("USER: Data ", res);
                            user = res.data;
                        } else {
                            // User is not logged in... redirect.
                            //$window.location.href = "/login";
                            $window.location.href = "/auth/twitter";
                        }
                        return user;
                    }, function (res) {
                        console.log("USER: JSON NOT FOUND! FAIL!", res);
                    });
                },
                "metadata": function (loadMetadata) {
                    return loadMetadata().then(function (metadata) {
                        return metadata;
                    });
                }
            },
            controllerAs: 'root',
            bindToController: {},
            templateUrl: './html/app.html',
            controller: 'root'
        });

    }
})();


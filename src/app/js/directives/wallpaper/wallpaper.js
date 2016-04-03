yarn.directive('wallpaper', function WallpaperDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        controllerAs: 'wallpaper',
        templateUrl: './html/wallpaper.html',
        controller: WallpaperController
    };

    function WallpaperController(wallpaper, $element) {
        wallpaper.onChange(function (options) {

            if (angular.isObject(options)) {
                if (angular.isDefined(options.image)) {
                    $element.css("background-image", "url(" + options.image + ")");
                }

                if (angular.isDefined(options.color)) {
                    $element.css("background-color", options.color);
                }

                if (angular.isDefined(options.layout)) {
                    if (options.layout === "fullscreen") {
                        $element.css( {
                            "background-repeat": "no-repeat",
                            "background-position": "center center",
                            "background-size": "cover"
                        });
                    } else if (options.layout === "pattern") {
                        $element.css( {
                            "background-repeat": "repeat",
                            "background-position": "center center",
                            "background-size": "inherit"
                        });
                    }
                }
            }
        });
    }
});


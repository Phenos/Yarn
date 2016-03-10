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

    function WallpaperController(wallpaperService, $element) {
        wallpaperService.onChange(function (image) {
            if (image) {
                $element.css("background-image", "url(" + image + ")");
            } else {
                $element.css("background-image", "none");
            }
        });
    }
});


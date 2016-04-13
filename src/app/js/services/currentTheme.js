/**
 * Global instance of the current theme
 * @name theme
 * @class
 */
yarn.service("currentTheme", function (step, Theme, wallpaper) {

    var currentTheme = new Theme();

    step.on("before endStep", function () {
        currentTheme.refresh();
        wallpaper.update();
    });

    return currentTheme;
});

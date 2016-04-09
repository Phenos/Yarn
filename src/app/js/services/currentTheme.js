/**
 * Global instance of the current theme
 * @name theme
 * @class
 */
yarn.service("currentTheme", function (Theme) {
    return new Theme();
});

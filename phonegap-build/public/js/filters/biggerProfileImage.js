yarn.filter('biggerProfileImage', function keyboardShortcutFilter() {

    return function (str) {
        if (angular.isString(str))
            return str.replace("normal", "bigger");
    };

});

